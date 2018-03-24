// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Fraction} fraction
   * @param {Representation} representation
   * @param {Property.<Color>} colorProperty
   */
  function ShapePiece( fraction, representation, colorProperty ) {
    assert && assert( colorProperty instanceof Property );

    // @public {Fraction}
    this.fraction = fraction;
    
    // @public {Representation}
    this.representation = representation;
    
    // @public {Property.<Color>}
    this.colorProperty = colorProperty;

    // @public {Property.<Vector2>} - Applies only while out in the play area (being animated or dragged)
    this.positionProperty = new Property( Vector2.ZERO );
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  return inherit( Object, ShapePiece, {
    getCentroid: function() {
      if ( this.representation === Representation.CIRCLE ) {
        if ( this.fraction.getValue() === 1 ) {
          return Vector2.ZERO;
        }
        else {
          var positiveAngle = this.fraction.getValue() * 2 * Math.PI;

          // Compute the centroid for a circular sector
          var radius = FractionsCommonConstants.SHAPE_WIDTH / 2;
          var distanceFromCenter = 4 / 3 * radius * Math.sin( positiveAngle / 2 ) / positiveAngle;
          return Vector2.createPolar( distanceFromCenter, -positiveAngle / 2 );
        }
      }
      else {
        return new Vector2( FractionsCommonConstants.SHAPE_WIDTH * this.fraction.getValue() / 2, 0 );
      }
    }
  } );
} );
