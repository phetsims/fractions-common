// Copyright 2018, University of Colorado Boulder

/**
 * Model representation for the pieces/stacks/groups for numbers/pies/bars.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const Vector2 = require( 'DOT/Vector2' );

  const scratchVector = new Vector2();

  class BuildingModel {
    constructor() {

      // @public {Array.<ShapeStack>}
      this.shapeStacks = [];

      // @public {Array.<NumberStack>}
      this.numberStacks = [];

      // @public {Array.<ShapeGroupStack>}
      this.shapeGroupStacks = [];

      // @public {Array.<NumberGroupStack>}
      this.numberGroupStacks = [];

      // @public {ObservableArray.<ShapeGroup>}
      this.shapeGroups = new ObservableArray();

      // @public {ObservableArray.<ShapePiece>} - Shape pieces in the play area (controlled or animating)
      this.activeShapePieces = new ObservableArray();

      // @public {ObservableArray.<NumberGroup>}
      this.numberGroups = new ObservableArray();

      // @public {ObservableArray.<NumberPiece>} - Number pieces in the play area (controlled or animating)
      this.activeNumberPieces = new ObservableArray();

      // @public {ObservableArray.<NumberPiece>} - Tracking number pieces being dragged, so we can decide whether each
      // number group should show any "do not drop here" symbols on their spots.
      this.draggedNumberPieces = new ObservableArray();

      // @public {Property.<Range|null>} - null when there are no active numbers, otherwise a range of all values being
      // dragged.
      this.activeNumberRangeProperty = new Property( null, {
        useDeepEquality: true
      } );

      // Check for duplicates (but only when assertions are enabled, don't want to use `allowDuplicates` for
      // ObservableArray)
      if ( assert ) {
        this.activeShapePieces.addItemAddedListener( () => {
          const array = this.activeShapePieces.getArray();
          assert( array.length === _.uniq( array ).length, 'Duplicate items should not be added to activeShapePieces' );
        } );
        this.activeNumberPieces.addItemAddedListener( () => {
          const array = this.activeNumberPieces.getArray();
          assert( array.length === _.uniq( array ).length, 'Duplicate items should not be added to activeNumberPieces' );
        } );
      }

      const rangeListener = this.updateDraggedNumberRange.bind( this );
      this.draggedNumberPieces.addItemAddedListener( rangeListener );
      this.draggedNumberPieces.addItemRemovedListener( rangeListener );
      rangeListener();
    }

    /**
     * Called when the user drags a shape piece from the specified stack (usually from a panel).
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @param {ShapeStack} shapeStack
     */
    dragShapePieceFromStack( shapePiece, shapeStack ) {
      this.activeShapePieces.push( shapePiece );
    }

    /**
     * Called when the user drags a number piece from the specified stack (usually from a panel).
     * @public
     *
     * @param {NumberPiece} numberPiece
     * @param {NumberStack} numberStack
     */
    dragNumberPieceFromStack( numberPiece, numberStack ) {
      this.activeNumberPieces.push( numberPiece );
      this.draggedNumberPieces.push( numberPiece );
    }

    /**
     * Returns a corresponding ShapeStack that should be used as the "home" of a given ShapePiece (if it's returned from
     * the play area with an animation, etc.)
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {ShapeStack|null}
     */
    findMatchingShapeStack( shapePiece ) {
      return _.find( this.shapeStacks, stack => stack.representation === shapePiece.representation && stack.fraction.equals( shapePiece.fraction ) ) || null;
    }

    /**
     * Returns a corresponding NumberStack that should be used as the "home" of a given NumberPiece (if it's returned from
     * the play area with an animation, etc.)
     * @public
     *
     * @param {NumberPiece} numberPiece
     * @returns {NumberStack|null}
     */
    findMatchingNumberStack( numberPiece ) {
      return _.find( this.numberStacks, stack => stack.number === numberPiece.number ) || null;
    }

    /**
     * Returns the index to which pieces should animate to in the shape stack.
     * @protected
     *
     * @param {ShapeStack} shapeStack
     * @returns {number}
     */
    getShapeStackIndex( shapeStack ) {
      return shapeStack.shapePieces.length;
    }

    /**
     * Returns the index to which pieces should animate to in the number stack.
     * @protected
     *
     * @param {NumberStack} numberStack
     * @returns {number}
     */
    getNumberStackIndex( numberStack ) {
      return numberStack.numberPieces.length;
    }

    returnActiveShapePiece( shapePiece ) {
      const shapeStack = this.findMatchingShapeStack( shapePiece );
      const shapeMatrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, this.getShapeStackIndex( shapeStack ) );
      shapePiece.animator.animateTo( {
        position: shapeStack.positionProperty.value.plus( shapeMatrix.timesVector2( Vector2.ZERO ).timesScalar( FractionsCommonConstants.SHAPE_BUILD_SCALE ) ),
        rotation: 0, // TODO: do we need to customize this so it is as in the "bucket"?
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        shadow: 0,
        animationInvalidationProperty: shapeStack.positionProperty,
        endAnimationCallback: () => {
          this.activeShapePieces.remove( shapePiece );
          if ( shapeStack.isMutable ) {
            shapeStack.shapePieces.push( shapePiece );
          }
        }
      } );
    }

    returnActiveNumberPiece( numberPiece ) {
      const numberStack = this.findMatchingNumberStack( numberPiece );
      const offset = NumberStack.getOffset( this.getNumberStackIndex( numberStack ) );
      numberPiece.animator.animateTo( {
        position: numberStack.positionProperty.value.plus( offset.timesScalar( FractionsCommonConstants.NUMBER_BUILD_SCALE ) ),
        scale: 1,
        animationInvalidationProperty: numberStack.positionProperty,
        endAnimationCallback: () => {
          this.activeNumberPieces.remove( numberPiece );
          if ( numberStack.isMutable ) {
            numberStack.numberPieces.push( numberPiece );
          }
        }
      } );
    }

    /**
     * Places a ShapePiece into a ShapeContainer.
     * @public
     *
     * @param {ShapePiece}
     * @param {ShapeContainer} shapeContainer
     * @param {ShapeGroup} shapeGroup
     */
    placeActiveShapePiece( shapePiece, shapeContainer, shapeGroup ) {
      const shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.getShapeRatio( shapePiece ), shapePiece.fraction, shapePiece.representation );
      // TODO: also invalidate if our container goes away?
      // NOTE: Handle it if it starts animation and THEN the piece gets moved somewhere else. Instant animate
      shapePiece.animator.animateTo( {
        position: shapeGroup.positionProperty.value.plus( shapeContainer.offset ).plus( shapeMatrix.timesVector2( Vector2.ZERO ) ),
        rotation: shapeMatrix.rotation,
        scale: 1,
        shadow: 0,
        animationInvalidationProperty:  shapeGroup.positionProperty,
        easing: Easing.QUADRATIC_IN_OUT,
        // TODO: adjust the velocity of  this?
        endAnimationCallback: () => {
          this.activeShapePieces.remove( shapePiece );
        }
      } );
    }

    closestDroppableShapeContainer( shapePiece, threshold ) {
      let closestContainer = null;
      let closestDistance = threshold;

      const point = shapePiece.positionProperty.value;

      this.shapeGroups.forEach( shapeGroup => {
        const localPoint = scratchVector.set( point ).subtract( shapeGroup.positionProperty.value );

        shapeGroup.shapeContainers.forEach( shapeContainer => {
          if ( shapeContainer.canFitPiece( shapePiece ) ) {
            const distance = shapeContainer.distanceFromPoint( localPoint );
            if ( distance <= closestDistance ) {
              closestDistance = distance;
              closestContainer = shapeContainer;
            }
          }
        } );
      } );

      return closestContainer;
    }

    shapePieceDropped( shapePiece, threshold ) {
      let closestContainer = this.closestDroppableShapeContainer( shapePiece, threshold );

      if ( closestContainer ) {
        closestContainer.shapePieces.push( shapePiece );
        this.placeActiveShapePiece( shapePiece, closestContainer, closestContainer.shapeGroup );
      }
      else {
        this.returnActiveShapePiece( shapePiece );
      }
    }

    numberPieceDropped( numberPiece, threshold ) {
      let closestSpot = null;
      let closestDistance = threshold;

      const point = numberPiece.positionProperty.value;

      this.numberGroups.forEach( numberGroup => {
        const localPoint = scratchVector.set( point ).subtract( numberGroup.positionProperty.value );

        numberGroup.spots.forEach( spot => {
          if ( numberGroup.canPlaceNumberInSpot( numberPiece.number, spot ) ) {
            const distance = Math.sqrt( spot.bounds.minimumDistanceToPointSquared( localPoint ) );
            if ( distance <= closestDistance ) {
              closestDistance = distance;
              closestSpot = spot;
            }
          }
        } );
      } );

      this.draggedNumberPieces.remove( numberPiece );

      if ( closestSpot ) {
        // Instant like the old sim (for now)
        this.placeNumberPiece( closestSpot, numberPiece );
      }
      else {
        this.returnActiveNumberPiece( numberPiece );
      }
    }

    /**
     * Places a NumberPiece in a NumberSpot
     * @public
     *
     * @param {NumberSpot} numberSpot
     * @param {NumberPiece} numberPiece
     */
    placeNumberPiece( numberSpot, numberPiece ) {
      numberSpot.pieceProperty.value = numberPiece;
      this.activeNumberPieces.remove( numberPiece );
    }

    // TODO: doc
    removeLastPieceFromShapeGroup( shapeGroup ) {
      for ( let i = shapeGroup.shapeContainers.length - 1; i >= 0; i-- ) {
        const shapeContainer = shapeGroup.shapeContainers.get( i );
        if ( shapeContainer.shapePieces.length ) {
          const shapePiece = shapeContainer.shapePieces.pop();

          // If the piece hasn't arrived yet, just complete the animation
          shapePiece.animator.endAnimation();

          // TODO: Better determination of the position, including with centroid and rotation offsets
          const shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.totalFractionProperty.value.value, shapePiece.fraction, shapePiece.representation );
          const containerPoint = shapeGroup.positionProperty.value.plus( shapeContainer.offset );
          shapePiece.positionProperty.value = containerPoint.plus( shapeMatrix.timesVector2( Vector2.ZERO ) );
          shapePiece.rotationProperty.value = shapeMatrix.rotation;
          this.activeShapePieces.push( shapePiece );
          this.returnActiveShapePiece( shapePiece );
          return;
        }
      }
      throw new Error( 'Could not find a piece to remove' );
    }

    removeLastPieceFromNumberGroup( numberGroup ) {
      for ( let i = 0; i < numberGroup.spots.length; i++ ) {
        const spot = numberGroup.spots[ i ];
        if ( spot.pieceProperty.value !== null ) {
          const numberPiece = spot.pieceProperty.value;
          spot.pieceProperty.value = null;

          numberPiece.positionProperty.value = spot.bounds.center.plus( numberGroup.positionProperty.value );
          if ( spot.type === NumberSpotType.WHOLE ) {
            numberPiece.scaleProperty.value = FractionsCommonConstants.WHOLE_FRACTIONAL_SIZE_RATIO;
          }
          this.activeNumberPieces.push( numberPiece );
          this.returnActiveNumberPiece( numberPiece );
          return;
        }
      }
    }

    addShapeGroup( representation, maxContainers = FractionsCommonConstants.MAX_SHAPE_CONTAINERS ) {
      const shapeGroup = new ShapeGroup( representation, {
        returnPieceListener: () => {
          this.removeLastPieceFromShapeGroup( shapeGroup );
        },
        maxContainers
      } );
      this.shapeGroups.push( shapeGroup );
      return shapeGroup;
    }

    addNumberGroup( isMixedNumber ) {
      const numberGroup = new NumberGroup( isMixedNumber, {
        activeNumberRangeProperty: this.activeNumberRangeProperty
      } );
      this.numberGroups.push( numberGroup );

      return numberGroup;
    }

    returnShapeGroup( shapeGroup ) {
      while ( shapeGroup.hasAnyPieces() ) {
        this.removeLastPieceFromShapeGroup( shapeGroup );
      }

      while ( shapeGroup.shapeContainers.length > 1 ) {
        shapeGroup.decreaseContainerCount();
      }

      const shapeGroupStack = _.find( this.shapeGroupStacks, shapeGroupStack => shapeGroupStack.representation === shapeGroup.representation );
      const positionProperty = shapeGroupStack.positionProperty;
      shapeGroup.animator.animateTo( {
        position: positionProperty.value,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        animationInvalidationProperty: positionProperty,
        endAnimationCallback: () => {
          this.shapeGroups.remove( shapeGroup );
          if ( shapeGroupStack.isMutable ) {
            shapeGroupStack.shapeGroups.push( shapeGroup );
          }
        }
      } );
    }

    returnNumberGroup( numberGroup ) {
      while ( numberGroup.hasAnyPieces() ) {
        this.removeLastPieceFromNumberGroup( numberGroup );
      }

      const numberGroupStack = _.find( this.numberGroupStacks, numberGroupStack => numberGroupStack.isMixedNumber === numberGroup.isMixedNumber );
      const positionProperty = numberGroupStack.positionProperty;
      numberGroup.animator.animateTo( {
        position: positionProperty.value,
        scale: FractionsCommonConstants.NUMBER_BUILD_SCALE,
        animationInvalidationProperty: positionProperty,
        endAnimationCallback: () => {
          // TODO: More methods for adding/removing to make things un-missable
          this.numberGroups.remove( numberGroup );
          if ( numberGroupStack.isMutable ) {
            numberGroupStack.numberGroups.push( numberGroup );
          }
          else {
            numberGroup.dispose();
          }
        }
      } );
    }

    updateDraggedNumberRange() {
      if ( this.draggedNumberPieces.length === 0 ) {
        this.activeNumberRangeProperty.value = null;
      }
      else {
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        this.draggedNumberPieces.forEach( numberPiece => {
          min = Math.min( min, numberPiece.number );
          max = Math.max( max, numberPiece.number );
        } );

        this.activeNumberRangeProperty.value = new Range( min, max );
      }
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.shapeGroups.forEach( shapeGroup => {
        shapeGroup.animator.endAnimation();
      } );
      this.shapeGroups.reset();

      this.numberGroups.forEach( numberGroup => {
        numberGroup.animator.endAnimation();
        if ( !numberGroup.disposed ) {
          numberGroup.dispose();
        }
      } );
      this.numberGroups.reset();

      this.activeShapePieces.forEach( shapePiece => {
        shapePiece.animator.endAnimation();
      } );
      this.activeShapePieces.reset();

      this.activeNumberPieces.forEach( shapePiece => {
        shapePiece.animator.endAnimation();
      } );
      this.activeNumberPieces.reset();
      this.draggedNumberPieces.reset();
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      // TODO: minimize garbage
      this.shapeGroups.forEach( shapeGroup => {
        shapeGroup.step( dt );
      } );

      this.numberGroups.forEach( numberGroup => {
        numberGroup.step( dt );
      } );

      this.activeShapePieces.forEach( shapePiece => {
        shapePiece.step( dt );

        // Don't compute the closest for ALL pieces, that would hurt performance.
        if ( shapePiece.representation === BuildingRepresentation.PIE && shapePiece.isUserControlledProperty.value ) {
          var closestContainer = this.closestDroppableShapeContainer( shapePiece, Number.POSITIVE_INFINITY );
          if ( closestContainer ) {
            shapePiece.orientTowardsContainer( closestContainer, dt );
          }
        }
      } );

      this.activeNumberPieces.forEach( numberPiece => {
        numberPiece.step( dt );
      } );
    }
  }

  return fractionsCommon.register( 'BuildingModel', BuildingModel );
} );
