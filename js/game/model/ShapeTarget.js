// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );

  class ShapeTarget extends Target {
    /**
     * @param {Fraction} fraction
     * @param {ColorDef} color
     */
    constructor( fraction, color ) {
      super( fraction );

      // @public {ColorDef}
      this.color = color;
    }
  }

  return fractionsCommon.register( 'ShapeTarget', ShapeTarget );
} );
