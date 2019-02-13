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
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class MatchSpot {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        scale: 1,
        isTarget: false
      }, options );

      // @public {Property.<Vector2>} - To be updated by the view when its location changes (usually just initially)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {number}
      this.scale = options.scale;

      // @public {boolean}
      this.isTarget = options.isTarget;

      // @public {Property.<MatchingPiece|null>}
      this.pieceProperty = new Property( null );

      // If we move, our piece should move (if we have one)
      this.positionProperty.lazyLink( position => {
        if ( this.pieceProperty.value ) {
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
