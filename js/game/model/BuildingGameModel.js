// Copyright 2017, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  var ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  var FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  var FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} hasMixedNumbers - Whether this is the equivalent of the "Build a Fraction" or "Mixed Numbers" game
   */
  function BuildingGameModel( hasMixedNumbers ) {

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
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 2
      new FractionLevel( 2, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 3
      new FractionLevel( 3, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 4
      new FractionLevel( 4, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 5
      new FractionLevel( 5, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 6
      new FractionLevel( 6, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 7
      new FractionLevel( 7, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 8
      new FractionLevel( 8, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 9
      new FractionLevel( 9, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Mixed Numbers" Shapes level 10
      new FractionLevel( 10, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } )
    ] : [
      // "Build a Fraction" Shapes level 1
      new FractionLevel( 1, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 2
      new FractionLevel( 2, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 3
      new FractionLevel( 3, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 4
      new FractionLevel( 4, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 5
      new FractionLevel( 5, 3, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 6
      new FractionLevel( 6, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 7
      new FractionLevel( 7, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 8
      new FractionLevel( 8, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 9
      new FractionLevel( 9, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } ),
      // "Build a Fraction" Shapes level 10
      new FractionLevel( 10, 4, BuildingType.SHAPE, function() {
        var targets = [];
        var pieces = [];
        var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
        return new FractionChallenge( type, targets, pieces );
      } )
    ];

    // @public {FractionLevel}
    this.numberLevels = hasMixedNumbers ? [
      // "Mixed Numbers" Numbers level 1
      new FractionLevel( 1, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 2
      new FractionLevel( 2, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 3
      new FractionLevel( 3, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 4
      new FractionLevel( 4, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 5
      new FractionLevel( 5, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 6
      new FractionLevel( 6, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 7
      new FractionLevel( 7, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 8
      new FractionLevel( 8, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 9
      new FractionLevel( 9, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Mixed Numbers" Numbers level 10
      new FractionLevel( 10, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } )
    ] : [
      // "Build a Fraction" Numbers level 1
      new FractionLevel( 1, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 2
      new FractionLevel( 2, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 3
      new FractionLevel( 3, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 4
      new FractionLevel( 4, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 5
      new FractionLevel( 5, 3, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 6
      new FractionLevel( 6, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 7
      new FractionLevel( 7, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 8
      new FractionLevel( 8, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 9
      new FractionLevel( 9, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } ),
      // "Build a Fraction" Numbers level 10
      new FractionLevel( 10, 4, BuildingType.NUMBER, function() {
        var targets = [];
        var pieces = [];
        return new FractionChallenge( ChallengeType.NUMBER, targets, pieces );
      } )
    ];
  }

  fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );

  return inherit( Object, BuildingGameModel, {
    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
      
    },

    /**
     * Resets the entire model.
     * @public
     */
    reset: function() {
      this.levelProperty.reset();
      this.soundEnabledProperty.reset();
      this.shapeLevels.forEach( function( level ) { level.reset(); } );
      this.numberLevels.forEach( function( level ) { level.reset(); } );
    }
  } );
} );
