// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildingModel = require( 'FRACTIONS_COMMON/building/model/BuildingModel' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {BuildingModel}
   *
   * @param {boolean} allowMixedNumbers
   */
  function BuildingLabModel( allowMixedNumbers ) {
    var self = this;

    // @public {boolean}
    this.allowMixedNumbers = allowMixedNumbers;

    // @public {Property.<Representation>}
    this.topRepresentationProperty = new Property( Representation.CIRCLE );

    // @public {Property.<ShapeGroup|NumberGroup|null>} - We'll only show controls for this shape group
    this.selectedGroupProperty = new Property( null );

    BuildingModel.call( this );

    // Shape stacks
    function addShapeStacks( representation, colorProperty ) {
      return _.range( 1, 9 ).map( function( denominator ) {
        var stack = new ShapeStack( new Fraction( 1, denominator ), representation, colorProperty );
        stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, colorProperty ) );
        stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, colorProperty ) );
        self.shapeStacks.push( stack );
      } );
    }
    addShapeStacks( Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty );
    addShapeStacks( Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty );

    // Number stacks
    _.range( 1, 9 ).map( function( number ) {
      var stack = new NumberStack( number );
      stack.numberPieces.push( new NumberPiece( number ) );
      stack.numberPieces.push( new NumberPiece( number ) );
      self.numberStacks.push( stack );
    } );

    // Shared to set up some initial state
    this.reset();
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( BuildingModel, BuildingLabModel, {
    // NOTE: Meant to override
    getShapeControlsVisibleProperty: function( shapeGroup ) {
      return new DerivedProperty( [ this.selectedGroupProperty ], function( selectedGroup ) {
        return selectedGroup === shapeGroup;
      } );
    },

    reset: function() {
      this.topRepresentationProperty.reset();

      BuildingModel.prototype.reset.call( this );

      // Initial state
      var shapeGroup = this.addShapeGroup( Representation.CIRCLE );
      shapeGroup.positionProperty.value = new Vector2( 170, 0 );
      this.selectedGroupProperty.value = shapeGroup;

      var numberGroup = this.addNumberGroup( false );
      numberGroup.positionProperty.value = new Vector2( -170, 0 );
    }
  } );
} );
