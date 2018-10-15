// Copyright 2018, University of Colorado Boulder

/**
 * Represents the orientation of the rectangular view (one representation is more vertical, one is more horizontal).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'RectangularOrientation', new Enumeration( [
    'HORIZONTAL',
    'VERTICAL'
  ] ) );
} );
