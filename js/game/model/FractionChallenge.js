// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {ChallengeType} challengeType
   * @param {Array.<Target>} targets
   * @param {Array.<number>} pieces - An array (with duplicates allowed) of the denominators or numbers that are
   *                                  available to the user to interact with.
   */
  function FractionChallenge( challengeType, targets, pieces ) {
    assert && assert( ChallengeType.VALUES.includes( challengeType ) );
    assert && assert( Array.isArray( targets ) );
    assert && assert( Array.isArray( pieces ) );

    // @public {ChallengeType}
    this.challengeType = challengeType;

    // @public {Array.<Target>}
    this.targets = targets;

    // @public {Array.<number>} pieces
    this.pieces = pieces;
  }

  fractionsCommon.register( 'FractionChallenge', FractionChallenge );

  return inherit( Object, FractionChallenge );
} );
