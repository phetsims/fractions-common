// Copyright 2018, University of Colorado Boulder

/**
 * Different ways a fraction can be shown.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'FractionDisplayType', new Enumeration( [
    'IMPROPER', // e.g. 3/2
    'MIXED' // e.g. 1 1/2
  ] ) );
} );
