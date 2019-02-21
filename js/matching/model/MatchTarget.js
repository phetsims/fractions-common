// Copyright 2019, University of Colorado Boulder

/**
 * A match target near the top (holds a matched pair of pieces).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MatchSpot = require( 'FRACTIONS_COMMON/matching/model/MatchSpot' );

  class MatchTarget {
    constructor() {

      // @public {Property.<boolean>}
      this.isFilledProperty = new BooleanProperty( false );

      // @public {Array.<MatchSpot>}
      this.spots = _.range( 0, 2 ).map( () => new MatchSpot( {
        scale: 0.5,
        isTarget: true
      } ) );
    }
  }

  return fractionsCommon.register( 'MatchTarget', MatchTarget );
} );
