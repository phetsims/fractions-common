// Copyright 2013-2017, University of Colorado Boulder

/**
 * The main model for the matcher screens.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'FRACTIONS_COMMON/matcher/model/Constants' );
  const Emitter = require( 'AXON/Emitter' );
  const FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MatcherLevel = require( 'FRACTIONS_COMMON/matcher/model/MatcherLevel' );
  const MixedNumbersConstants = require( 'FRACTIONS_COMMON/matcher/model/MixedNumbersConstants' );
  const Property = require( 'AXON/Property' );

  class FractionMatcherModel {
    /**
     * @param {boolean} hasMixedNumbers
     */
    constructor( hasMixedNumbers ) {
      assert && assert( typeof hasMixedNumbers === 'boolean' );

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;

      // dimensions of the model's space
      // TODO: Don't do this.
      this.width = FractionMatcherView.LAYOUT_BOUNDS.width;
      this.height = FractionMatcherView.LAYOUT_BOUNDS.height;

      this.constants = hasMixedNumbers ? new MixedNumbersConstants() : new Constants();
      this.colorScheme = [ this.constants.COLORS.LIGHT_BLUE, this.constants.COLORS.LIGHT_GREEN, this.constants.COLORS.LIGHT_RED ];
      this.toSimplify = hasMixedNumbers;
      this.ANIMATION_TIME = 500;
      this.MAXIMUM_PAIRS = 6;
      this.MAX_POINTS_PER_GAME_LEVEL = 12;

      this.levels = [];
      this.highScores = [];
      this.bestTimes = [];

      this.currentLevelProperty = new Property( 0 );
      this.isTimerProperty = new Property( false );

      this.stepEmitter = new Emitter();

      this.constants.LEVEL_DESCRIPTION.forEach( ( levelDescription, index ) => {
        this.levels.push( new MatcherLevel( this, levelDescription, index + 1 ) );
        this.highScores.push( new Property( 0 ) );
        this.bestTimes.push( new Property( null ) );
      } );
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.currentLevelProperty.reset();
      this.isTimerProperty.reset();
      this.highScores.forEach( highScore => highScore.reset() );
      this.levels.forEach( levelModel => levelModel.reset() );
      this.bestTimes.forEach( bestTime => bestTime.reset() );
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      // TODO: actually have the level object (as normal)
      if ( this.currentLevelProperty.get() > 0 ) {
        this.levels[ this.currentLevelProperty.get() - 1 ].step( dt );
      }

      //Signify that a step occurred: used in animating the RewardNodes
      this.stepEmitter.emit1( dt );
    }
  }

  return fractionsCommon.register( 'FractionMatcherModel', FractionMatcherModel );
} );
