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
   * @param {Array.<ShapePiece>} shapePieces
   * @param {Array.<NumberPiece>} numberPieces
   */
  function FractionChallenge( challengeType, targets, shapePieces, numberPieces ) {
    assert && assert( ChallengeType.VALUES.includes( challengeType ) );
    assert && assert( Array.isArray( targets ) );
    assert && assert( Array.isArray( shapePieces ) );
    assert && assert( Array.isArray( numberPieces ) );

    // @public {ChallengeType}
    this.challengeType = challengeType;

    // @public {Array.<Target>}
    this.targets = targets;

    // @public {Array.<ShapePiece>}
    this.shapePieces = shapePieces;

    // @public {Array.<NumberPiece>}
    this.numberPieces = numberPieces;



    // TODO: Supertype for something that can have shapes/numbers with groups (and locations for groups).
    // share code with BuildingLabModel.js


    // @public {Array.<ShapeStack>}
    this.shapeStacks = [];

    // @public {Array.<NumberStack>}
    this.numberStacks = [];
  }

  fractionsCommon.register( 'FractionChallenge', FractionChallenge );

  return inherit( Object, FractionChallenge );
} );
