// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model container for the game screen.
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
  const inherit = require( 'PHET_CORE/inherit' );
  const LevelModel = require( 'FRACTIONS_COMMON/matcher/model/LevelModel' );
  const MixedNumbersConstants = require( 'FRACTIONS_COMMON/matcher/model/MixedNumbersConstants' );
  const Property = require( 'AXON/Property' );
  const Sound = require( 'VIBE/Sound' );

  // sounds
  const correctAudio = require( 'sound!VEGAS/ding.mp3' );
  const wrongAudio = require( 'sound!VEGAS/boing.mp3' );

  /**
   * @param {boolean} isMixedNumbers
   * @constructor
   */
  function FractionMatcherModel( isMixedNumbers ) {
    var self = this;
    // TODO: rename to hasMixedNumbers?
    this.isMixedNumbers = isMixedNumbers;

    // dimensions of the model's space
    this.width = FractionMatcherView.LAYOUT_BOUNDS.width;
    this.height = FractionMatcherView.LAYOUT_BOUNDS.height;

    this.constants = isMixedNumbers ? new MixedNumbersConstants() : new Constants();
    this.colorScheme = [ this.constants.COLORS.LIGHT_BLUE, this.constants.COLORS.LIGHT_GREEN, this.constants.COLORS.LIGHT_RED ];
    this.toSimplify = isMixedNumbers;
    this.ANIMATION_TIME = 500;
    this.MAXIMUM_PAIRS = 6;
    this.MAX_POINTS_PER_GAME_LEVEL = 12;

    this.sounds = {
      correct: new Sound( correctAudio ),
      incorrect: new Sound( wrongAudio )
    };

    this.levels = [];
    this.highScores = [];
    this.bestTimes = [];

    this.currentLevelProperty = new Property( 0 );
    this.isTimerProperty = new Property( false );

    this.stepEmitter = new Emitter();

    this.constants.LEVEL_DESCRIPTION.forEach( function( levelDescription, index ) {
      self.levels.push( new LevelModel( self, levelDescription, index + 1 ) );
      self.highScores.push( new Property( 0 ) );
      self.bestTimes.push( new Property( null ) );
    } );
  }

  fractionsCommon.register( 'FractionMatcherModel', FractionMatcherModel );

  return inherit( Object, FractionMatcherModel, {

    // Resets all model elements
    reset: function() {
      this.currentLevelProperty.reset();
      this.isTimerProperty.reset();
      this.highScores.forEach( function( highScore ) {
        highScore.reset();
      } );
      this.levels.forEach( function( levelModel ) {
        levelModel.reset();
      } );
      this.bestTimes.forEach( function( bestTime ) {
        bestTime.reset();
      } );
      Sound.audioEnabledProperty.reset();
    },

    step: function( dt ) {
      if ( this.currentLevelProperty.get() > 0 ) {
        this.levels[ this.currentLevelProperty.get() - 1 ].step( dt );
      }

      //Signify that a step occurred: used in animating the RewardNodes
      this.stepEmitter.emit1( dt );
    }
  } );
} );