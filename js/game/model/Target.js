// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Property = require( 'AXON/Property' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class Target {
    /**
     * @param {Fraction} fraction
     */
    constructor( fraction ) {

      // @public {Fraction}
      this.fraction = fraction;

      // @public {Property.<ShapeGroup|NumberGroup|null>}
      this.groupProperty = new Property( null );
    }
  }

  return fractionsCommon.register( 'Target', Target );
} );
