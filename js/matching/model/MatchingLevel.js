// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MatchingChallenge = require( 'FRACTIONS_COMMON/matching/model/MatchingChallenge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );

  class MatchingLevel {
    /**
     * @param {number} number
     */
    constructor( number ) {

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
      return new MatchingChallenge();
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {

    }
  }

  return fractionsCommon.register( 'MatchingLevel', MatchingLevel );
} );
