// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MatchingChallenge = require( 'FRACTIONS_COMMON/matching/model/MatchingChallenge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );

  class MatchingLevel {
    /**
     * @param {number} number
     * @param {Object} [options]
     */
    constructor( number, options ) {

      options = _.extend( {
        timeVisibleProperty: new BooleanProperty( true )
      }, options );

      // @private {Property.<boolean>}
      this.timeVisibleProperty = options.timeVisibleProperty;

      // @public {number}
      this.number = number;

      // @public {Property.<MatchingChallenge>}
      this.challengeProperty = new Property( this.nextChallenge() );

      // @public {Property.<number>}
      this.scoreProperty = new DynamicProperty( this.challengeProperty, {
        derive: 'scoreProperty'
      } );

      // @public {Property.<number>}
      this.highScoreProperty = new NumberProperty( 0 );
    }

    /**
     * Returns a new challenge.
     * @private
     *
     * @returns {MatchingChallenge}
     */
    nextChallenge() {
      return new MatchingChallenge( this.number, {
        timeVisibleProperty: this.timeVisibleProperty
      } );
    }

    /**
     * Refreshes the level's challenge, without changing permanent things like the high score.
     * @public
     */
    refresh() {
      const nextChallenge = this.nextChallenge();
      this.challengeProperty.value.refreshedChallenge = nextChallenge;
      this.challengeProperty.value = nextChallenge;
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.refresh();
      this.highScoreProperty.reset();
    }
  }

  return fractionsCommon.register( 'MatchingLevel', MatchingLevel );
} );
