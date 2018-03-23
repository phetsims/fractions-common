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
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );

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
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( Object, BuildingLabModel, {
    reset: function() {
      this.topRepresentationProperty.reset();
    },

    step: function( dt ) {
      
    }
  } );
} );
