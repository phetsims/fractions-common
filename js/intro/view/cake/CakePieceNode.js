// Copyright 2018, University of Colorado Boulder

/**
 * The cake variant of a piece node.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CakeNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeNode' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PieceNode = require( 'FRACTIONS_COMMON/intro/view/PieceNode' );

  class CakePieceNode extends PieceNode {
    /**
     * TODO: there is a lot of duplication here
     *
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
     * @param {function} droppedCallback - Called as function( {Piece} )
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback ) {
      // TODO: a lot of this is duplicated

      super( piece, finishedAnimatingCallback, droppedCallback, {
        graphic: new CakeNode( piece.denominator, 0 )
      } );

      // cake specific
      var originCell = piece.originCell;
      if ( originCell ) {
        this.graphic.setCakeIndex( originCell.index );
      }
      // cake specific
      var destinationCell = piece.destinationCell;
      if ( destinationCell ) {
        this.graphic.setCakeIndex( destinationCell.index );
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

      var midpoint = this.getMidpoint();
      this.graphic.setCakeIndex( closestCell.index );
      this.setMidpoint( midpoint );
    }
  }

  return fractionsCommon.register( 'CakePieceNode', CakePieceNode );
} );
