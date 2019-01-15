// Copyright 2018, University of Colorado Boulder

/**
 * In a building situation, whether shapes or numbers are included.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'BuildingType', new Enumeration( [
    'SHAPE',
    'NUMBER'
  ] ) );
} );