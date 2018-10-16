// Copyright 2018, University of Colorado Boulder

/**
 * Model representation for the pieces/stacks/groups for numbers/pies/bars.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
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

      // TODO: better encapsulation, so things don't reach in here

      // @public {ObservableArray.<ShapeGroup>}
      this.shapeGroups = new ObservableArray();

      // @public {ObservableArray.<ShapePiece>} - Shape pieces in the play area (controlled or animating)
      this.activeShapePieces = new ObservableArray();

      // @public {ObservableArray.<NumberGroup>}
      this.numberGroups = new ObservableArray();

      // @public {ObservableArray.<NumberPiece>} - Number pieces in the play area (controlled or animating)
      this.activeNumberPieces = new ObservableArray();

      // @public {ObservableArray.<NumberPiece>}
      this.draggedNumberPieces = new ObservableArray();

      // @public {Property.<Range|null>} - null when there are no active numbers, otherwise a range of all values being dragged.
      this.activeNumberRangeProperty = new Property( null, {
        useDeepEquality: true
      } );

      var rangeListener = this.updateDraggedNumberRange.bind( this );
      this.draggedNumberPieces.addItemAddedListener( rangeListener );
      this.draggedNumberPieces.addItemRemovedListener( rangeListener );
      rangeListener();
    }

    // NOTE: Meant to override
    getShapeControlsVisibleProperty( shapeGroup ) {
      return new BooleanProperty( true );
    }

    dragNumberPieceFromStack( numberPiece, numberStack ) {
      this.activeNumberPieces.push( numberPiece );
      this.draggedNumberPieces.push( numberPiece );

      // Support for the game where they can be removed
      if ( numberStack.numberPieces.contains( numberPiece ) ) {
        numberStack.numberPieces.remove( numberPiece );
      }
    }

    findMatchingShapeStack( shapePiece ) {
      return _.find( this.shapeStacks, stack => {
        return stack.representation === shapePiece.representation && stack.fraction.equals( shapePiece.fraction );
      } ) || null;
    }

    findMatchingNumberStack( numberPiece ) {
      return _.find( this.numberStacks, stack => stack.number === numberPiece.number ) || null;
    }

    returnActiveShapePiece( shapePiece ) {
      var self = this;

      var shapeStack = this.findMatchingShapeStack( shapePiece );

      // TODO: Don't use hard-coded constant (index 1) for game screens
      var shapeMatrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, 1 );
      var position = shapeStack.positionProperty.value.plus( shapeMatrix.timesVector2( Vector2.ZERO ).timesScalar( FractionsCommonConstants.SHAPE_BUILD_SCALE ) );
      var speed = 40 / Math.sqrt( position.distance( shapePiece.positionProperty.value ) );
      shapePiece.animator.animateTo( position, 0, FractionsCommonConstants.SHAPE_BUILD_SCALE, 0, shapeStack.positionProperty, Easing.QUADRATIC_IN, speed, () => {
        self.activeShapePieces.remove( shapePiece );
        if ( shapeStack.isMutable ) {
          shapeStack.shapePieces.push( shapePiece );
        }
      } );
    }

    returnActiveNumberPiece( numberPiece ) {
      var self = this;

      var numberStack = this.findMatchingNumberStack( numberPiece );

      // TODO: Don't use hard-coded constant (index 1) for game screens
      var offset = NumberStack.getOffset( 1 );
      var position = numberStack.positionProperty.value.plus( offset.timesScalar( FractionsCommonConstants.NUMBER_BUILD_SCALE ) );
      var speed = 40 / Math.sqrt( position.distance( numberPiece.positionProperty.value ) );
      numberPiece.animator.animateTo( position, 0, 1, 0, numberStack.positionProperty, Easing.QUADRATIC_IN, speed, () => {
        self.activeNumberPieces.remove( numberPiece );
        if ( numberStack.isMutable ) {
          numberStack.numberPieces.push( numberPiece );
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
      var self = this;

      var shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.getShapeRatio( shapePiece ), shapePiece.fraction, shapePiece.representation );
      // TODO: rotation
      var position = shapeGroup.positionProperty.value.plus( shapeContainer.offset ).plus( shapeMatrix.timesVector2( Vector2.ZERO ) );
      // TODO: also invalidate if our container goes away?
      // NOTE: Handle it if it starts animation and THEN the piece gets moved somewhere else. Instant animate
      shapePiece.animator.animateTo( position, shapeMatrix.rotation, 1, 0, shapeGroup.positionProperty, Easing.QUADRATIC_IN_OUT, 5, () => {
        self.activeShapePieces.remove( shapePiece );
      } );
    }

    closestDroppableShapeContainer( shapePiece, threshold ) {
      var closestContainer = null;
      var closestDistance = threshold;

      var point = shapePiece.positionProperty.value;

      this.shapeGroups.forEach( shapeGroup => {
        var localPoint = scratchVector.set( point ).subtract( shapeGroup.positionProperty.value );

        shapeGroup.shapeContainers.forEach( shapeContainer => {
          if ( shapeContainer.canFitPiece( shapePiece ) ) {
            var distance = shapeContainer.distanceFromPoint( localPoint );
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
      var closestContainer = this.closestDroppableShapeContainer( shapePiece, threshold );

      if ( closestContainer ) {
        closestContainer.shapePieces.push( shapePiece );
        this.placeActiveShapePiece( shapePiece, closestContainer, closestContainer.shapeGroup );
      }
      else {
        this.returnActiveShapePiece( shapePiece );
      }
    }

    numberPieceDropped( numberPiece, threshold ) {
      var closestSpot = null;
      var closestDistance = threshold;

      var point = numberPiece.positionProperty.value;

      this.numberGroups.forEach( numberGroup => {
        var localPoint = scratchVector.set( point ).subtract( numberGroup.positionProperty.value );

        numberGroup.spots.forEach( spot => {
          if ( numberGroup.canPlaceNumberInSpot( numberPiece.number, spot ) ) {
            var distance = Math.sqrt( spot.bounds.minimumDistanceToPointSquared( localPoint ) );
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
      for ( var i = shapeGroup.shapeContainers.length - 1; i >= 0; i-- ) {
        var shapeContainer = shapeGroup.shapeContainers.get( i );
        if ( shapeContainer.shapePieces.length ) {
          var shapePiece = shapeContainer.shapePieces.pop();

          // TODO: Better determination of the position, including with centroid and rotation offsets
          var shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.totalFractionProperty.value.value, shapePiece.fraction, shapePiece.representation );
          var containerPoint = shapeGroup.positionProperty.value.plus( shapeContainer.offset );
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
      for ( var i = 0; i < numberGroup.spots.length; i++ ) {
        var spot = numberGroup.spots[ i ];
        if ( spot.pieceProperty.value !== null ) {
          var numberPiece = spot.pieceProperty.value;
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
      var self = this;

      var shapeGroup = new ShapeGroup( representation, {
        returnPieceListener() {
          self.removeLastPieceFromShapeGroup( shapeGroup );
        },

        maxContainers
      } );
      this.shapeGroups.push( shapeGroup );

      return shapeGroup;
    }

    addNumberGroup( isMixedNumber ) {
      var numberGroup = new NumberGroup( isMixedNumber, {
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
      var positionProperty = shapeGroupStack.positionProperty;
      var speed = 40 / Math.sqrt( positionProperty.value.distance( shapeGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      shapeGroup.animator.animateTo( positionProperty.value, 0, FractionsCommonConstants.SHAPE_BUILD_SCALE, 0, positionProperty, Easing.QUADRATIC_IN, speed, () => {
        this.shapeGroups.remove( shapeGroup );
        if ( shapeGroupStack.isMutable ) {
          shapeGroupStack.shapeGroups.push( shapeGroup );
        }
      } );
    }

    returnNumberGroup( numberGroup ) {
      while ( numberGroup.hasAnyPieces() ) {
        this.removeLastPieceFromNumberGroup( numberGroup );
      }

      const numberGroupStack = _.find( this.numberGroupStacks, numberGroupStack => numberGroupStack.isMixedNumber === numberGroup.isMixedNumber );
      var positionProperty = numberGroupStack.positionProperty;
      var speed = 40 / Math.sqrt( positionProperty.value.distance( numberGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      numberGroup.animator.animateTo( positionProperty.value, 0, FractionsCommonConstants.NUMBER_BUILD_SCALE, 0, positionProperty, Easing.QUADRATIC_IN, speed, () => {
        // TODO: More methods for adding/removing to make things un-missable
        this.numberGroups.remove( numberGroup );
        if ( numberGroupStack.isMutable ) {
          numberGroupStack.numberGroups.push( numberGroup );
        }
        else {
          numberGroup.dispose();
        }
      } );
    }

    updateDraggedNumberRange() {
      if ( this.draggedNumberPieces.length === 0 ) {
        this.activeNumberRangeProperty.value = null;
      }
      else {
        var min = Number.POSITIVE_INFINITY;
        var max = Number.NEGATIVE_INFINITY;

        this.draggedNumberPieces.forEach( numberPiece => {
          min = Math.min( min, numberPiece.number );
          max = Math.max( max, numberPiece.number );
        } );

        this.activeNumberRangeProperty.value = new Range( min, max );
      }
    }

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

    step( dt ) {
      var self = this;

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
        if ( shapePiece.representation === Representation.CIRCLE && shapePiece.isUserControlledProperty.value ) {
          var closestContainer = self.closestDroppableShapeContainer( shapePiece, Number.POSITIVE_INFINITY );
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
