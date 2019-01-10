// Copyright 2018, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/model/BuildingType' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const Emitter = require( 'AXON/Emitter' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Property = require( 'AXON/Property' );

  class BuildingGameModel {
    /**
     * @param {boolean} hasMixedNumbers - Whether this is the equivalent of the "Build a Fraction" or "Mixed Numbers" game
     */
    constructor( hasMixedNumbers ) {

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;

      // We wrap the main challenge generation so we can get pseudo-random (but evenly distributed) pie/bar for levels
      // 1-4.
      FractionChallenge.beginFullGeneration();

      // @public {FractionLevel}
      this.shapeLevels = BuildingGameModel.getShapeLevels( hasMixedNumbers );

      // @public {FractionLevel}
      this.numberLevels = BuildingGameModel.getNumberLevels( hasMixedNumbers );

      FractionChallenge.endFullGeneration();

      assert && assert( this.shapeLevels.length === FractionsCommonConstants.NUM_LEVELS );
      assert && assert( this.numberLevels.length === FractionsCommonConstants.NUM_LEVELS );

      // @public {Property.<FractionLevel|null>}
      this.levelProperty = new Property( null );

      // @public {Property.<FractionChallenge|null>}
      this.challengeProperty = new DynamicProperty( this.levelProperty, {
        derive: 'challengeProperty'
      } );

      // @public {Property.<boolean>}
      this.soundEnabledProperty = new BooleanProperty( true );

      // @public {Emitter} - Triggers when all 10 levels are completed
      this.allLevelsCompleteEmitter = new Emitter();

      // @public {Emitter} - Triggers when a level is completed, but it doesn't complete all 10 levels
      this.singleLevelCompleteEmitter = new Emitter();

      // @public {Emitter} - Triggers when a group is collected (but not when the level is completed)
      this.collectedGroupEmitter = new Emitter();

      // @public {Emitter} - Triggers when a user tries to drag a group over a target that doesn't match.
      this.incorrectAttemptEmitter = new Emitter();

      // Fire the level complete emitters when needed
      [ this.shapeLevels, this.numberLevels ].forEach( levels => {
        const countMissing = () => _.sum( levels.map( level => level.numTargets - level.scoreProperty.value > 0 ? 1 : 0 ) );
        let lastCountMissing = countMissing();
        levels.forEach( level => {
          level.scoreProperty.lazyLink( ( newScore, oldScore ) => {
            const numMissing = countMissing();
            if ( numMissing === 0 ) {
              this.allLevelsCompleteEmitter.emit();
            }
            else if ( numMissing < lastCountMissing ) {
              this.singleLevelCompleteEmitter.emit();
            }
            else if ( newScore > oldScore ) {
              this.collectedGroupEmitter.emit();
            }
            lastCountMissing = numMissing;
          } );
        } );
      } );
    }

    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.challengeProperty.value && this.challengeProperty.value.step( dt );
    }

    /**
     * Moves to the next level (if possible)
     * @public
     */
    nextLevel() {
      [ this.shapeLevels, this.numberLevels ].forEach( levels => {
        const currentIndex = levels.indexOf( this.levelProperty.value );

        if ( currentIndex >= 0 ) {
          // Levels to search through next in order (see https://github.com/phetsims/fractions-common/issues/47)
          this.levelProperty.value = [
            ...levels.slice( currentIndex + 1 ),
            ...levels.slice( 0, currentIndex + 1 )
          ].filter( level => {
            // Fall back to the current level if all is lost (shouldn't generally happen)
            return level.scoreProperty.value < level.numTargets || level === this.levelProperty.value;
          } )[ 0 ];
        }
      } );
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.levelProperty.reset();
      this.soundEnabledProperty.reset();

      FractionChallenge.beginFullGeneration();

      this.shapeLevels.forEach( level => level.reset() );
      this.numberLevels.forEach( level => level.reset() );

      FractionChallenge.endFullGeneration();
    }

    /**
     * Generates a list of all shape levels.
     * @public
     *
     * @param {boolean} hasMixedNumbers
     * @returns {Array.<FractionLevel>}
     */
    static getShapeLevels( hasMixedNumbers ) {
      return hasMixedNumbers ? [
        // "Mixed Numbers" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level1Property, FractionLevel.level1ShapesMixed ),
        // "Mixed Numbers" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level2Property, FractionLevel.level2ShapesMixed ),
        // "Mixed Numbers" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level3Property, FractionLevel.level3ShapesMixed ),
        // "Mixed Numbers" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level4Property, FractionLevel.level4ShapesMixed ),
        // "Mixed Numbers" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level5Property, FractionLevel.level5ShapesMixed ),
        // "Mixed Numbers" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level6Property, FractionLevel.level6ShapesMixed ),
        // "Mixed Numbers" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level7Property, FractionLevel.level7ShapesMixed ),
        // "Mixed Numbers" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level8Property, FractionLevel.level8ShapesMixed ),
        // "Mixed Numbers" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level9Property, FractionLevel.level9ShapesMixed ),
        // "Mixed Numbers" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level10Property, FractionLevel.level10ShapesMixed )
      ] : [
        // "Build a Fraction" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level1Property, FractionLevel.level1Shapes ),
        // "Build a Fraction" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level2Property, FractionLevel.level2Shapes ),
        // "Build a Fraction" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level3Property, FractionLevel.level3Shapes ),
        // "Build a Fraction" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level4Property, FractionLevel.level4Shapes ),
        // "Build a Fraction" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level5Property, FractionLevel.level5Shapes ),
        // "Build a Fraction" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level6Property, FractionLevel.level6Shapes ),
        // "Build a Fraction" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level7Property, FractionLevel.level7Shapes ),
        // "Build a Fraction" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level8Property, FractionLevel.level8Shapes ),
        // "Build a Fraction" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level9Property, FractionLevel.level9Shapes ),
        // "Build a Fraction" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level10Property, FractionLevel.level10Shapes )
      ];
    }

    /**
     * Generates a list of all number levels.
     * @public
     *
     * @param {boolean} hasMixedNumbers
     * @returns {Array.<FractionLevel>}
     */
    static getNumberLevels( hasMixedNumbers ) {
      return hasMixedNumbers ? [
        // "Mixed Numbers" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level1Property, FractionLevel.level1NumbersMixed ),
        // "Mixed Numbers" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level2Property, FractionLevel.level2NumbersMixed ),
        // "Mixed Numbers" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level3Property, FractionLevel.level3NumbersMixed ),
        // "Mixed Numbers" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level4Property, FractionLevel.level4NumbersMixed ),
        // "Mixed Numbers" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level5Property, FractionLevel.level5NumbersMixed ),
        // "Mixed Numbers" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level6Property, FractionLevel.level6NumbersMixed ),
        // "Mixed Numbers" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level7Property, FractionLevel.level7NumbersMixed ),
        // "Mixed Numbers" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level8Property, FractionLevel.level8NumbersMixed ),
        // "Mixed Numbers" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level9Property, FractionLevel.level9NumbersMixed ),
        // "Mixed Numbers" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level10Property, FractionLevel.level10NumbersMixed )
      ] : [
        // "Build a Fraction" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level1Property, FractionLevel.level1Numbers ),
        // "Build a Fraction" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level2Property, FractionLevel.level2Numbers ),
        // "Build a Fraction" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level3Property, FractionLevel.level3Numbers ),
        // "Build a Fraction" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level4Property, FractionLevel.level4Numbers ),
        // "Build a Fraction" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level5Property, FractionLevel.level5Numbers ),
        // "Build a Fraction" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level6Property, FractionLevel.level6Numbers ),
        // "Build a Fraction" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level7Property, FractionLevel.level7Numbers ),
        // "Build a Fraction" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level8Property, FractionLevel.level8Numbers ),
        // "Build a Fraction" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level9Property, FractionLevel.level9Numbers ),
        // "Build a Fraction" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level10Property, FractionLevel.level10Numbers )
      ];
    }
  }

  return fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );
} );
