// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'FRACTIONS_COMMON/common/enum/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'ChallengeType', new Enumeration( [
    'PIE',
    'BAR',
    'NUMBER'
  ] ) );
} );
