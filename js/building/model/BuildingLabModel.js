// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var Vector2 = require( 'DOT/Vector2' );

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

    // @public {Property.<ShapeGroup|null>} - We'll only show controls for this shape group
    this.selectedShapeGroupProperty = new Property( null );

    // Shared to set up some initial state
    this.reset();
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( Object, BuildingLabModel, {
    reset: function() {
      this.topRepresentationProperty.reset();
      this.shapeGroups.reset();

      // Initial state
      var group = new ShapeGroup( Representation.CIRCLE );
      group.increaseContainerCount();
      // TODO: constants
      group.positionProperty.value = new Vector2( 1024 * 2 / 3, 618 / 2 );
      this.shapeGroups.push( group );

      this.selectedShapeGroupProperty.value = group;
    },

    step: function( dt ) {
      
    }
  } );
} );
