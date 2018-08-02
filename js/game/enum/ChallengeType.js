// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // TODO: Use this more
  const ChallengeType = {
    PIE: 'PIE',
    BAR: 'BAR',
    NUMBER: 'NUMBER'
  };

  fractionsCommon.register( 'ChallengeType', ChallengeType );

  // @public {Array.<ChallengeType>} - All values the enumeration can take.
  ChallengeType.VALUES = [
    ChallengeType.PIE,
    ChallengeType.BAR,
    ChallengeType.NUMBER
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( ChallengeType ); }

  return ChallengeType;
} );
