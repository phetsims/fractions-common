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
  const Easing = require( 'TWIXT/Easing' );
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
      const graphic = new CircularNode( piece.denominator, 0, { dropShadow: true } );

      super( piece, finishedAnimatingCallback, droppedCallback, {
        graphic: graphic
      } );

      // @private TODO note more than just node, has midpointOffset variable
      this.graphic = graphic;

      // @private (convenience variable)
      this.angleUnit = 2 * Math.PI / piece.denominator;

      // circle specific
      var originCell = piece.originCell;
      if ( originCell ) {
        this.graphic.rotateCircle( originCell.index * this.angleUnit );
      }
    }

    /**
     * Steps forward in time.
     * @public
     * @override
     *
     * @param {number} dt
     */
    step( dt ) {
      if ( this.isUserControlled ) {
        return;
      }

      // Smaller animations are somewhat faster
      this.ratio = Math.min( 1, this.ratio + dt * 20 / Math.sqrt( this.originProperty.value.distance( this.destinationProperty.value ) ) );
      if ( this.ratio === 1 ) {
        this.finishedAnimatingCallback();
      }
      else {
        // rotate before centering
        var destinationCell = this.piece.destinationCell;

        var originRotation = this.originRotation;
        var targetRotation = destinationCell ? destinationCell.index * this.angleUnit : 0;

        // Hack to get closest rotation AND deduplicate this code
        if ( targetRotation - originRotation > Math.PI ) {
          targetRotation -= 2 * Math.PI;
        }
        this.graphic.rotateCircle( ( 1 - this.ratio ) * this.originRotation + this.ratio * targetRotation );

        var easedRatio = Easing.QUADRATIC_IN_OUT.value( this.ratio );
        this.setMidpoint( this.originProperty.value.blend( this.destinationProperty.value, easedRatio ) );
      }
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

      var originRotation = this.graphic.getCircleRotation();
      var targetRotation = closestCell.index * this.angleUnit;

      // Hack to get closest rotation AND deduplicate this code
      if ( targetRotation - originRotation > Math.PI ) {
        targetRotation -= 2 * Math.PI;
      }

      var midpoint = this.getMidpoint();

      var rotationAmount = 5 * dt;
      if ( targetRotation > originRotation ) {
        this.graphic.rotateCircle( Math.min( targetRotation, originRotation + rotationAmount ) );
      }
      else if ( targetRotation < originRotation ) {
        this.graphic.rotateCircle( Math.max( targetRotation, originRotation - rotationAmount ) );
      }

      this.setMidpoint( midpoint );
    }
  }

  return fractionsCommon.register( 'CircularPieceNode', CircularPieceNode );
} );
