// Copyright 2018, University of Colorado Boulder

/**
 * Represents the three main different styles of game challenges.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'ChallengeType', new Enumeration( [
    'PIE',
    'BAR',
    'NUMBER'
  ] ) );
} );
