// Copyright 2018, University of Colorado Boulder

/**
 * The beaker variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PieceNode = require( 'FRACTIONS_COMMON/intro/view/PieceNode' );

  class BeakerPieceNode extends PieceNode {
    /**
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {BeakerPieceNode} )
     * @param {function} droppedCallback - Called as function( {BeakerPieceNode} )
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback ) {
      super( piece, finishedAnimatingCallback, droppedCallback, {
        graphic: new BeakerNode( 1, piece.denominator )
      } );
    }

    /**
     * Steps forward in time.
     * @public
     * @override
     *
     * @param {number} dt
     */
    step( dt ) {
      // TODO: check step methods for duplication
      if ( this.isUserControlled ) {
        return;
      }

      // Smaller animations are somewhat faster
      this.ratio = Math.min( 1, this.ratio + dt * 20 / Math.sqrt( this.originProperty.value.distance( this.destinationProperty.value ) ) );
      if ( this.ratio === 1 ) {
        this.finishedAnimatingCallback( this );
      }
      else {
        var easedRatio = Easing.QUADRATIC_IN_OUT.value( this.ratio );
        this.setCenter( this.originProperty.value.blend( this.destinationProperty.value, easedRatio ) );
      }
    }
  }

  return fractionsCommon.register( 'BeakerPieceNode', BeakerPieceNode );
} );
