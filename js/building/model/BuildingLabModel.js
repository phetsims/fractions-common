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

    // @public {ObservableArray.<ShapeGroup>}
    this.shapeGroups = new ObservableArray();

    // @public {ObservableArray.<ShapePiece>} - Shape pieces in the play area (controlled or animating)
    this.activeShapePieces = new ObservableArray();

    // @public {Property.<ShapeGroup|null>} - We'll only show controls for this shape group
    this.selectedShapeGroupProperty = new Property( null );

    // Shared to set up some initial state
    this.reset();
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( Object, BuildingLabModel, {
    /**
     * Returns the closest ShapeContainer to a given ShapePiece within a certain threshold. The threshold will probably
     * be larger for touch usage, etc.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @param {number} threshold - Should be 0 or greater generally.
     * @returns {ShapeContainer|null}
     */
    getClosestShapeContainer: function( shapePiece, threshold ) {
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

    returnActiveShapePiece: function( shapePiece ) {
      var self = this;

      var shapeStack = _.find( shapePiece.representation === Representation.CIRCLE ? this.circleStacks : this.barStacks, function( stack ) {
        return stack.fraction.equals( shapePiece.fraction );
      } );

      // TODO: Don't use hard-coded constant for game screens
      var shapeMatrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, 1 );
      var position = shapeStack.positionProperty.value.plus( shapeMatrix.timesVector2( Vector2.ZERO ).timesScalar( FractionsCommonConstants.SHAPE_BUILD_SCALE ) );
      shapePiece.animateTo( position, FractionsCommonConstants.SHAPE_BUILD_SCALE, shapeStack.positionProperty, Easing.QUADRATIC_IN, function() {
        self.activeShapePieces.remove( shapePiece );
      } );
    },

    // TODO: doc
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

    // TODO: symmetric methods
    removeShapeGroup: function( shapeGroup ) {
      while ( shapeGroup.hasAnyPieces() ) {
        this.removeLastPieceFromGroup( shapeGroup );
      }
      this.shapeGroups.remove( shapeGroup );
    },

    reset: function() {
      this.topRepresentationProperty.reset();
      this.shapeGroups.reset();

      // Initial state
      var shapeGroup = this.addShapeGroup( Representation.CIRCLE );
      shapeGroup.positionProperty.value = new Vector2( 170, 0 );

      this.selectedShapeGroupProperty.value = shapeGroup;
    },

    step: function( dt ) {
      this.activeShapePieces.forEach( function( shapePiece ) {
        shapePiece.step( dt );
      } );
    }
  } );
} );
