// Copyright 2018, University of Colorado Boulder

/**
 * The rectangular variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PieceNode = require( 'FRACTIONS_COMMON/intro/view/PieceNode' );
  const RectangularNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularNode' );

  class RectangularPieceNode extends PieceNode {
    /**
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
     * @param {function} droppedCallback - Called as function( {Piece} )
     * @param {Object} [options]
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback, options ) {
      super( piece, finishedAnimatingCallback, droppedCallback, {
        // TODO: don't pass options down like this
        graphic: new RectangularNode( piece.denominator, _.extend( {
          dropShadow: true
        }, options ) )
      } );

      this.mutate( options );
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.interruptSubtreeInput();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'RectangularPieceNode', RectangularPieceNode );
} );
