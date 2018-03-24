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
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
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

  return inherit( Object, ShapePiece );
} );
