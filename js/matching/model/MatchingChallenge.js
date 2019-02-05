// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  class MatchingChallenge {
    constructor() {
      // @public {Property.<number>}
      this.scoreProperty = new NumberProperty( 0 );

      // @public {Property.<number>}
      this.elapsedTimeProperty = new NumberProperty( 0 );
    }
  }

  return fractionsCommon.register( 'MatchingChallenge', MatchingChallenge );
} );
