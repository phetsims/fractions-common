// Copyright 2018, University of Colorado Boulder

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
  var Target = require( 'FRACTIONS_COMMON/game/model/Target' );

  /**
   * @constructor
   * @extends {Target}
   *
   * @param {Fraction} fraction
   * @param {Property.<Color>} colorProperty
   */
  function ShapeTarget( fraction, colorProperty ) {

    // TODO: add things

    Target.call( this, fraction );

    // @public {Property.<Color>}
    this.colorProperty = colorProperty;
  }

  fractionsCommon.register( 'ShapeTarget', ShapeTarget );

  return inherit( Target, ShapeTarget );
} );
