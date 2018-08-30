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
  }

  return fractionsCommon.register( 'BeakerPieceNode', BeakerPieceNode );
} );
