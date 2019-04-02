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
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MatchSpot = require( 'FRACTIONS_COMMON/matching/model/MatchSpot' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class MatchTarget {
    constructor() {

      // @public {Property.<boolean>}
      this.isFilledProperty = new BooleanProperty( false );

      // @public {Array.<MatchSpot>}
      this.spots = _.range( 0, 2 ).map( () => new MatchSpot( {
        scale: 0.5,
        isTarget: true
      } ) );

      // @public {Property.<Bounds2>}
      this.targetBoundsProperty = new Property( Bounds2.EVERYTHING );

      // @public {Property.<number|null>}
      this.equalsXProperty = new Property( null );
      this.targetBoundsProperty.lazyLink( bounds => {
        if ( this.equalsXProperty.value === null ) {
          this.equalsXProperty.value = bounds.centerX;
        }
      } );

      // @public {Bounds2|null} - Written by view elements so that relative positioning can be done
      this.equalsSignBounds = null;
    }

    /**
     * Handles layout within the target (of both pieces and the equals sign), so that there is an equal amount of
     * padding between the sides and each component, thus from left to right, we have:
     * (padding) leftPiece (padding) equals-sign (padding) rightPiece (padding)
     * @public
     *
     * @param {MatchPiece} leftPiece
     * @param {MatchPiece} rightPiece
     */
    layout( leftPiece, rightPiece ) {
      const totalWidth = this.targetBoundsProperty.value.width;
      const leftWidth = leftPiece.getTargetScale() * leftPiece.localBounds.width;
      const rightWidth = rightPiece.getTargetScale() * rightPiece.localBounds.width;
      const equalsWidth = this.equalsSignBounds.width;

      const totalPaddingWidth = totalWidth - leftWidth - rightWidth - equalsWidth;
      // assert( totalPaddingWidth > 0 );

      const padding = totalPaddingWidth / 4;

      const leftX = this.targetBoundsProperty.value.left + padding + leftWidth / 2;
      const equalsX = leftX + leftWidth / 2 + padding + equalsWidth / 2;
      const rightX = equalsX + equalsWidth / 2 + padding + rightWidth / 2;

      this.equalsXProperty.value = equalsX;
      this.spots[ 0 ].positionProperty.value = new Vector2( leftX, this.spots[ 0 ].positionProperty.value.y );
      this.spots[ 1 ].positionProperty.value = new Vector2( rightX, this.spots[ 1 ].positionProperty.value.y );
    }
  }

  return fractionsCommon.register( 'MatchTarget', MatchTarget );
} );
