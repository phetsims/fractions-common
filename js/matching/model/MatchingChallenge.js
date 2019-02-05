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
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  class MatchingChallenge {
    /**
     * @param {number} levelNumber
     * @param {Object} [options]
     */
    constructor( levelNumber, options ) {

      options = _.extend( {
        timeVisibleProperty: new BooleanProperty( true )
      }, options );

      // @public {Property.<boolean>}
      this.timeVisibleProperty = options.timeVisibleProperty;

      // @public {number}
      this.levelNumber = levelNumber;

      // @public {Property.<number>}
      this.scoreProperty = new NumberProperty( 0 );

      // @public {Property.<number>}
      this.elapsedTimeProperty = new NumberProperty( 0 );

      // @public {MatchingChallenge} - Set externally if, when going from this challenge to the specified one, there
      // should instead be a "refresh" animation instead of "next" challenge.
      this.refreshedChallenge = null;
    }

    cheat() {
      // TODO
    }
  }

  return fractionsCommon.register( 'MatchingChallenge', MatchingChallenge );
} );
