// Copyright 2019, University of Colorado Boulder

/**
 * A specific place a piece can be "stored" (either a target, a scale, or a source spot near the bottom).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  class MatchSpot {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = merge( {
        scale: 1,
        isTarget: false,
        isScale: false
      }, options );

      // @public - To be updated by the view when its location changes (usually just initially)
      this.positionProperty = new Vector2Property( Vector2.ZERO, {
        useDeepEquality: true
      } );

      // @public {number} - How piece nodes should be scaled when placed in this spot
      this.scale = options.scale;

      // @public {boolean}
      this.isTarget = options.isTarget;
      this.isScale = options.isScale;

      // @public {Property.<MatchingPiece|null>}
      this.pieceProperty = new Property( null );

      // If we move, our piece should move (if we have one)
      this.positionProperty.lazyLink( position => {
        if ( this.pieceProperty.value && !options.isScale ) {
          this.pieceProperty.value.positionProperty.value = position;
        }
      } );
    }

    /**
     * Attaches the given piece to this spot.
     * @public
     *
     * @param {MatchPiece} piece
     */
    attachPiece( piece ) {
      this.pieceProperty.value = piece;
      piece.spotProperty.value = this;
    }

    /**
     * Detaches the given piece from this spot.
     * @public
     *
     * @param {MatchPiece} piece
     */
    detachPiece( piece ) {
      this.pieceProperty.value = null;
      piece.spotProperty.value = null;
    }
  }

  return fractionsCommon.register( 'MatchSpot', MatchSpot );
} );
