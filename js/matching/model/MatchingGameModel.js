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
  const MatchingLevel = require( 'FRACTIONS_COMMON/matching/model/MatchingLevel' );
  const Property = require( 'AXON/Property' );

  class MatchingGameModel {
    /**
     * @param {boolean} hasMixedNumbers
     * @param {boolean} [useShortTitle]
     */
    constructor( hasMixedNumbers, useShortTitle = false ) {

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;
      this.useShortTitle = useShortTitle;

      // @public {Property.<MatchingLevel|null>}
      this.levelProperty = new Property( null );

      // @public {Property.<MatchingChallenge|null}
      this.challengeProperty = new DynamicProperty( this.levelProperty, {
        derive: 'challengeProperty'
      } );

      // @public {Property.<boolean>}
      this.timeVisibleProperty = new BooleanProperty( false );

      // TODO: improve
      const descriptions = hasMixedNumbers ? MatchingLevel.getMixedLevelDescriptions() : MatchingLevel.getUnmixedLevelDescriptions();

      // @public {Array.<MatchingLevel>}
      this.levels = _.range( 1, 9 ).map( number => new MatchingLevel( descriptions[ number - 1 ], number, {
        timeVisibleProperty: this.timeVisibleProperty
      } ) );
    }

    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      if ( this.challengeProperty.value ) {
        this.challengeProperty.value.elapsedTimeProperty.value += dt;
      }
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.levelProperty.reset();
      this.timeVisibleProperty.reset();
    }
  }

  return fractionsCommon.register( 'MatchingGameModel', MatchingGameModel );
} );
