// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const FilledPartitionNode = require( 'FRACTIONS_COMMON/game/view/FilledPartitionNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Vector2 = require( 'DOT/Vector2' );

  class MatchPieceNode extends Node {
    /**
     * @param {MatchPiece} piece
     */
    constructor( piece ) {
      super( {
        cursor: 'pointer'
      } );

      // @private {MatchPiece}
      this.piece = piece;

      if ( piece.filledPartitions ) {
        this.addChild( new HBox( {
          spacing: 10,
          children: piece.filledPartitions.map( filledPartition => new FilledPartitionNode( filledPartition ) ),
          center: Vector2.ZERO,
          scale: piece.hasGreaterThanOne ? 0.6 : 1.2
        } ) );
      }
      else {
        const numberOptions = piece.hasMixedNumbers ? {
          whole: Math.floor( piece.fraction.value ),
          numerator: piece.fraction.numerator % piece.fraction.denominator,
          denominator: piece.fraction.denominator
        } : {
          numerator: piece.fraction.numerator,
          denominator: piece.fraction.denominator
        };
        this.addChild( new MixedFractionNode( _.extend( numberOptions, {
          center: Vector2.ZERO,
          scale: 1.3
        } ) ) );
      }

      // @private {function}
      this.positionListener = position => {
        this.translation = position;
      };
      this.scaleListener = scale => {
        this.setScaleMagnitude( scale );
      };

      this.piece.positionProperty.link( this.positionListener );
      this.piece.scaleProperty.link( this.scaleListener );

      // @private {function}
      this.spotListener = spot => {
        if ( spot && spot.isTarget ) {
          this.pickable = false;
        }
      };

      this.piece.spotProperty.link( this.spotListener );

      this.mouseArea = this.touchArea = new Bounds2(
        -MatchPieceNode.DIMENSION.width / 2,
        -MatchPieceNode.DIMENSION.height / 2,
        MatchPieceNode.DIMENSION.width / 2,
        MatchPieceNode.DIMENSION.height / 2
      );

      // @private {DragListener}
      this.dragListener = new DragListener( {
        targetNode: this,
        locationProperty: piece.positionProperty,
        start: () => {
          this.moveToFront();
          piece.grab();
        },
        end: () => piece.drop()
      } );
      this.addInputListener( this.dragListener );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.piece.positionProperty.unlink( this.positionListener );
      this.piece.scaleProperty.unlink( this.scaleListener );
      this.piece.spotProperty.unlink( this.spotListener );

      this.dragListener.dispose();

      super.dispose();
    }
  }

  // @public {Dimension2}
  MatchPieceNode.DIMENSION = new Dimension2( 145, 110 );

  return fractionsCommon.register( 'MatchPieceNode', MatchPieceNode );
} );
