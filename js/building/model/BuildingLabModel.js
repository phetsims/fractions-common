// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Easing = require( 'TWIXT/Easing' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var Vector2 = require( 'DOT/Vector2' );

  var scratchVector = new Vector2();

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} allowMixedNumbers
   */
  function BuildingLabModel( allowMixedNumbers ) {

    // @public {boolean}
    this.allowMixedNumbers = allowMixedNumbers;

    // @public {Property.<Representation>}
    this.topRepresentationProperty = new Property( Representation.CIRCLE );

    function createStacks( representation, colorProperty ) {
      return _.range( 1, 9 ).map( function( denominator ) {
        var stack = new ShapeStack( new Fraction( 1, denominator ), representation, colorProperty );
        stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, colorProperty ) );
        stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, colorProperty ) );
        return stack;
      } );
    }

    // @public {Array.<ShapeStack>}
    this.circleStacks = createStacks( Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty );
    this.barStacks = createStacks( Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty );

    // @public {Array.<NumberStack>}
    this.numberStacks = _.range( 1, 9 ).map( function( number ) {
      var stack = new NumberStack( number );
      stack.numberPieces.push( new NumberPiece( number ) );
      stack.numberPieces.push( new NumberPiece( number ) );
      return stack;
    } );

    // @public {Property.<Vector2>}
    this.returnShapeGroupPositionProperty = new Property( Vector2.ZERO );

    // @public {Property.<Vector2>} TODO: Can we AMP THE VERBOSITY UP A BIT?
    this.returnNonMixedNumberGroupPositionProperty = new Property( Vector2.ZERO );

    // @public {Property.<Vector2>}
    this.returnMixedNumberGroupPositionProperty = new Property( Vector2.ZERO );

    // @public {ObservableArray.<ShapeGroup>}
    this.shapeGroups = new ObservableArray();

    // @public {ObservableArray.<ShapePiece>} - Shape pieces in the play area (controlled or animating)
    this.activeShapePieces = new ObservableArray();

    // @public {Property.<ShapeGroup|null>} - We'll only show controls for this shape group
    this.selectedShapeGroupProperty = new Property( null );

    // @public {ObservableArray.<NumberGroup>}
    this.numberGroups = new ObservableArray();

    // Shared to set up some initial state
    this.reset();
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( Object, BuildingLabModel, {
    returnActiveShapePiece: function( shapePiece ) {
      var self = this;

      var shapeStack = _.find( shapePiece.representation === Representation.CIRCLE ? this.circleStacks : this.barStacks, function( stack ) {
        return stack.fraction.equals( shapePiece.fraction );
      } );

      // TODO: Don't use hard-coded constant (index 1) for game screens
      var shapeMatrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, 1 );
      var position = shapeStack.positionProperty.value.plus( shapeMatrix.timesVector2( Vector2.ZERO ).timesScalar( FractionsCommonConstants.SHAPE_BUILD_SCALE ) );
      var speed = 40 / Math.sqrt( position.distance( shapePiece.positionProperty.value ) );
      shapePiece.animator.animateTo( position, 0, FractionsCommonConstants.SHAPE_BUILD_SCALE, shapeStack.positionProperty, Easing.QUADRATIC_IN, speed, function() {
        self.activeShapePieces.remove( shapePiece );
      } );
    },

    placeActiveShapePiece: function( shapePiece, shapeContainer, shapeGroup ) {
      var self = this;

      var shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.getShapeRatio( shapePiece ), shapePiece.fraction, shapePiece.representation );
      // TODO: rotation
      var position = shapeGroup.positionProperty.value.plus( shapeContainer.offset ).plus( shapeMatrix.timesVector2( Vector2.ZERO ) );
      // TODO: also invalidate if our container goes away?
      // NOTE: Handle it if it starts animation and THEN the piece gets moved somewhere else. Instant animate
      shapePiece.animator.animateTo( position, shapeMatrix.rotation, 1, shapeGroup.positionProperty, Easing.QUADRATIC_IN_OUT, 5, function() {
        self.activeShapePieces.remove( shapePiece );
      } );
    },

    findClosestDroppableContainer: function( shapePiece, threshold ) {
      var closestContainer = null;
      var closestDistance = threshold;

      var point = shapePiece.positionProperty.value;

      this.shapeGroups.forEach( function( shapeGroup ) {
        var localPoint = scratchVector.set( point ).subtract( shapeGroup.positionProperty.value );

        shapeGroup.shapeContainers.forEach( function( shapeContainer ) {
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
    },

    shapePieceDropped: function( shapePiece, threshold ) {
      var closestContainer = this.findClosestDroppableContainer( shapePiece, threshold );

      if ( closestContainer ) {
        closestContainer.shapePieces.push( shapePiece );
        this.placeActiveShapePiece( shapePiece, closestContainer, closestContainer.shapeGroup );
      }
      else {
        this.returnActiveShapePiece( shapePiece );
      }
    },

    // TODO: doc
    // TODO: rename to make it shape-specific
    removeLastPieceFromGroup: function( shapeGroup ) {
      for ( var i = shapeGroup.shapeContainers.length - 1; i >= 0; i-- ) {
        var shapeContainer = shapeGroup.shapeContainers.get( i );
        if ( shapeContainer.shapePieces.length ) {
          var shapePiece = shapeContainer.shapePieces.pop();

          // TODO: Better determination of the position, including with centroid and rotation offsets
          var shapeMatrix = ShapeContainer.getShapeMatrix( shapeContainer.totalFractionProperty.value.getValue(), shapePiece.fraction, shapePiece.representation );
          var containerPoint = shapeGroup.positionProperty.value.plus( shapeContainer.offset );
          shapePiece.positionProperty.value = containerPoint.plus( shapeMatrix.timesVector2( Vector2.ZERO ) );
          shapePiece.rotationProperty.value = shapeMatrix.rotation;
          this.activeShapePieces.push( shapePiece );
          this.returnActiveShapePiece( shapePiece );

          return;
        }
      }
      throw new Error( 'Could not find a piece to remove' );
    },

    addShapeGroup: function( representation ) {
      var self = this;

      var shapeGroup = new ShapeGroup( representation, {
        returnPieceListener: function() {
          self.removeLastPieceFromGroup( shapeGroup );
        }
      } );
      this.shapeGroups.push( shapeGroup );

      return shapeGroup;
    },

    returnShapeGroup: function( shapeGroup ) {
      var self = this;
      
      while ( shapeGroup.hasAnyPieces() ) {
        this.removeLastPieceFromGroup( shapeGroup );
      }

      var position = this.returnShapeGroupPositionProperty.value;
      var speed = 40 / Math.sqrt( position.distance( shapeGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      shapeGroup.animator.animateTo( position, 0, FractionsCommonConstants.SHAPE_BUILD_SCALE, this.returnShapeGroupPositionProperty, Easing.QUADRATIC_IN, speed, function() {
        self.shapeGroups.remove( shapeGroup );
      } );
    },

    returnNumberGroup: function( numberGroup ) {
      var self = this;
      
      // TODO: RETURN ALL THE THINGS

      var returnPositionProperty = ( numberGroup.isMixedNumber ? this.returnMixedNumberGroupPositionProperty : this.returnNonMixedNumberGroupPositionProperty );
      var position = returnPositionProperty.value;
      var speed = 40 / Math.sqrt( position.distance( numberGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      numberGroup.animator.animateTo( position, 0, FractionsCommonConstants.NUMBER_BUILD_SCALE, returnPositionProperty, Easing.QUADRATIC_IN, speed, function() {
        self.numberGroups.remove( numberGroup );
      } );
    },

    reset: function() {
      this.topRepresentationProperty.reset();

      this.shapeGroups.forEach( function( shapeGroup ) {
        shapeGroup.animator.endAnimation();
      } );
      this.shapeGroups.reset();

      this.numberGroups.forEach( function( numberGroup ) {
        numberGroup.animator.endAnimation();
      } );
      this.numberGroups.reset();

      this.activeShapePieces.forEach( function( shapePiece ) {
        shapePiece.animator.endAnimation();
      } );
      this.activeShapePieces.reset();

      // Initial state
      var shapeGroup = this.addShapeGroup( Representation.CIRCLE );
      shapeGroup.positionProperty.value = new Vector2( 170, 0 );
      this.selectedShapeGroupProperty.value = shapeGroup;

      var numberGroup = new NumberGroup( false );
      this.numberGroups.push( numberGroup );
      numberGroup.positionProperty.value = new Vector2( -170, 0 );
    },

    step: function( dt ) {
      var self = this;

      // TODO: minimize garbage
      this.shapeGroups.forEach( function( shapeGroup ) {
        shapeGroup.step( dt );
      } );

      this.numberGroups.forEach( function( numberGroup ) {
        numberGroup.step( dt );
      } );

      this.activeShapePieces.forEach( function( shapePiece ) {
        shapePiece.step( dt );

        // Don't compute the closest for ALL pieces, that would hurt performance.
        if ( shapePiece.representation === Representation.CIRCLE && shapePiece.isUserControlledProperty.value ) {
          var closestContainer = self.findClosestDroppableContainer( shapePiece, Number.POSITIVE_INFINITY );
          if ( closestContainer ) {
            shapePiece.orientTowardsContainer( closestContainer, dt );
          }
        }
      } );
    }
  } );
} );
