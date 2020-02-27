// Copyright 2018, University of Colorado Boulder

/**
 * The beaker variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import fractionsCommon from '../../../fractionsCommon.js';
import PieceNode from '../PieceNode.js';
import BeakerNode from './BeakerNode.js';

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

fractionsCommon.register( 'BeakerPieceNode', BeakerPieceNode );
export default BeakerPieceNode;