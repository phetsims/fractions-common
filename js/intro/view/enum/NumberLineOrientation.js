// Copyright 2018, University of Colorado Boulder

/**
 * Represents the orientation of a number line.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'FRACTIONS_COMMON/common/enum/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'NumberLineOrientation', new Enumeration( [
    'HORIZONTAL',
    'VERTICAL'
  ] ) );
} );
