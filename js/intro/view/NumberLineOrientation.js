// Copyright 2018-2019, University of Colorado Boulder

/**
 * Represents the orientation of a number line.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'NumberLineOrientation', Enumeration.byKeys( [
    'HORIZONTAL',
    'VERTICAL'
  ] ) );
} );
