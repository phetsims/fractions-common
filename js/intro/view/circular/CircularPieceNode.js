// Copyright 2018, University of Colorado Boulder

/**
 * The circular variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CircularNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PieceNode = require( 'FRACTIONS_COMMON/intro/view/PieceNode' );

  class CircularPieceNode extends PieceNode {
    /**
     * TODO: dedup with RectangularPieceNode
     *
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
     * @param {function} droppedCallback - Called as function( {Piece} )
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback ) {
      super( piece, finishedAnimatingCallback, droppedCallback, {
        graphic: new CircularNode( piece.denominator, 0, { dropShadow: true } )
      } );

      // @private {number} (convenience variable)
      this.angleUnit = -2 * Math.PI / piece.denominator;

      // circle specific
      const originCell = piece.originCell;
      if ( originCell ) {
        this.graphic.setRotationAngle( originCell.index * this.angleUnit );
      }
      else {
        this.graphic.setRotationAngle( this.graphic.bucketRotation );
      }
    }

    /**
     * Handles operations in step() before midpoint is set.
     * @protected
     * @override
     */
    beforeMidpointSet() {
      // rotate before centering
      const destinationCell = this.piece.destinationCell;

      const originRotation = this.originRotation;
      let targetRotation = destinationCell ? destinationCell.index * this.angleUnit : this.graphic.bucketRotation;

      // Hack to get closest rotation AND deduplicate this code
      if ( targetRotation - originRotation > Math.PI ) {
        targetRotation -= 2 * Math.PI;
      }
      if ( targetRotation - originRotation < -Math.PI ) {
        targetRotation += 2 * Math.PI;
      }
      this.graphic.setRotationAngle( ( 1 - this.ratio ) * this.originRotation + this.ratio * targetRotation );
    }

    /**
     * Orients the piece to match the closest cell.
     * @public
     * @override
     *
     * @param {Cell} closestCell
     * @param {number} dt
     */
    orient( closestCell, dt ) {
      super.orient( closestCell, dt );

      const originRotation = this.graphic.getCircleRotation();
      let targetRotation = closestCell.index * this.angleUnit;

      // Hack to get closest rotation AND deduplicate this code
      if ( targetRotation - originRotation > Math.PI ) {
        targetRotation -= 2 * Math.PI;
      }
      if ( targetRotation - originRotation < -Math.PI ) {
        targetRotation += 2 * Math.PI;
      }

      const midpoint = this.getMidpoint();

      const rotationAmount = 5 * dt;
      if ( targetRotation > originRotation ) {
        this.graphic.setRotationAngle( Math.min( targetRotation, originRotation + rotationAmount ) );
      }
      else if ( targetRotation < originRotation ) {
        this.graphic.setRotationAngle( Math.max( targetRotation, originRotation - rotationAmount ) );
      }

      this.setMidpoint( midpoint );
    }
  }

  return fractionsCommon.register( 'CircularPieceNode', CircularPieceNode );
} );
