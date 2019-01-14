// Copyright 2018, University of Colorado Boulder

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
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const MatcherLevel = require( 'FRACTIONS_COMMON/matcher/model/MatcherLevel' );
  const MixedNumbersConstants = require( 'FRACTIONS_COMMON/matcher/model/MixedNumbersConstants' );
  const Property = require( 'AXON/Property' );

  class FractionMatcherModel {
    /**
     * @param {boolean} hasMixedNumbers
     * @param {boolean} [useShortTitle]
     */
    constructor( hasMixedNumbers, useShortTitle = false ) {
      assert && assert( typeof hasMixedNumbers === 'boolean' );

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;
      this.useShortTitle = useShortTitle;

      // dimensions of the model's space
      // TODO: Don't do this.
      this.width = FractionMatcherView.LAYOUT_BOUNDS.width;
      this.height = FractionMatcherView.LAYOUT_BOUNDS.height;

      this.constants = hasMixedNumbers ? new MixedNumbersConstants() : new Constants();
      this.colorScheme = [
        FractionsCommonColorProfile.shapeBlueProperty,
        FractionsCommonColorProfile.shapeGreenProperty,
        FractionsCommonColorProfile.shapeRedProperty
      ];
      this.toSimplify = hasMixedNumbers;
      this.ANIMATION_TIME = 500;
      this.MAXIMUM_PAIRS = 6;
      this.MAX_POINTS_PER_GAME_LEVEL = 12;

      this.levels = [];

      this.currentLevelProperty = new Property( 0 );
      this.isTimerProperty = new Property( false );

      this.stepEmitter = new Emitter();

      this.constants.LEVEL_DESCRIPTION.forEach( ( levelDescription, index ) => {
        this.levels.push( new MatcherLevel( this, levelDescription, index + 1 ) );
      } );
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.currentLevelProperty.reset();
      this.isTimerProperty.reset();
      this.levels.forEach( level => {
        level.reset();
        level.resetHistory();
      } );
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
