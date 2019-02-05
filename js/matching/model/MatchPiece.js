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
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class MatchPiece {
    constructor() {

      // @public {Property.<Vector2>} - To be updated by the view when its location changes (usually just initially)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {Property.<number>]}
      this.scaleProperty = new NumberProperty( 1 );

      // @public {Property.<MatchSpot|null>}
      this.spotProperty = new Property( null );
    }
  }

  return fractionsCommon.register( 'MatchPiece', MatchPiece );
} );
