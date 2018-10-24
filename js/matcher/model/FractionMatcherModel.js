// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model container for the game screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'FRACTIONS_COMMON/matcher/model/Constants' );
  var Emitter = require( 'AXON/Emitter' );
  var FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelModel = require( 'FRACTIONS_COMMON/matcher/model/LevelModel' );
  var MixedNumbersConstants = require( 'FRACTIONS_COMMON/matcher/model/MixedNumbersConstants' );
  var Property = require( 'AXON/Property' );
  var Sound = require( 'VIBE/Sound' );

  // sounds
  var correctAudio = require( 'sound!VEGAS/ding.mp3' );
  var wrongAudio = require( 'sound!VEGAS/boing.mp3' );

  /**
   * @param {string} game
   * @param {boolean} isMixedNumbers
   * @constructor
   */
  function FractionMatcherModel( game, isMixedNumbers ) {
    var self = this;
    // TODO: rename to hasMixedNumbers?
    this.isMixedNumbers = isMixedNumbers;

    // dimensions of the model's space
    this.width = FractionMatcherView.LAYOUT_BOUNDS.width;
    this.height = FractionMatcherView.LAYOUT_BOUNDS.height;

    // TODO: is this... just a title string?
    this.game = game;
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