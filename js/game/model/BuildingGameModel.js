// Copyright 2017, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Property = require( 'AXON/Property' );

  class BuildingGameModel {
    /**
     * @param {boolean} hasMixedNumbers - Whether this is the equivalent of the "Build a Fraction" or "Mixed Numbers" game
     */
    constructor( hasMixedNumbers ) {

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;

      // @public {Property.<FractionLevel|null>}
      this.levelProperty = new Property( null );

      // @public {Property.<boolean>}
      this.soundEnabledProperty = new BooleanProperty( true );

      // @public {FractionLevel}
      this.shapeLevels = hasMixedNumbers ? [
        // "Mixed Numbers" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Mixed Numbers" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } )
      ] : [
        // "Build a Fraction" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } ),
        // "Build a Fraction" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, function() {
          // TODO: unimplemented
          var targets = [];
          var shapePieces = [];
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          return new FractionChallenge( type, targets, shapePieces, [] );
        } )
      ];

      // @public {FractionLevel}
      this.numberLevels = hasMixedNumbers ? [
        // "Mixed Numbers" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Mixed Numbers" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } )
      ] : [
        // "Build a Fraction" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } ),
        // "Build a Fraction" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, function() {
          // TODO: unimplemented
          var targets = [];
          var numberPieces = [];
          return new FractionChallenge( ChallengeType.NUMBER, targets, [], numberPieces );
        } )
      ];
    }

    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {

    }

    /**
     * Resets the entire model.
     * @public
     */
    reset() {
      this.levelProperty.reset();
      this.soundEnabledProperty.reset();
      this.shapeLevels.forEach( function( level ) { level.reset(); } );
      this.numberLevels.forEach( function( level ) { level.reset(); } );
    }
  }

  return fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );
} );
