// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the circular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/CircularContainerNode' );
  const CircularNode = require( 'FRACTIONS_COMMON/intro/view/CircularNode' );
  const CircularPieceNode = require( 'FRACTIONS_COMMON/intro/view/CircularPieceNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class CircularSceneNode extends CellSceneNode {
    /**
     * Creates the container node for the given type of cell.
     * @public
     * @override
     *
     * @param {Container} container
     * @param {Function} cellDownCallback
     * @returns {Node}
     */
    createContainerNode( container, cellDownCallback ) {
      return new CircularContainerNode( container, cellDownCallback );
    }

    /**
     * Creates the piece node for the given type of cell.
     * @public
     * @override
     *
     * @param {Piece} piece
     * @param {Function} finishedAnimatingCallback
     * @param {Function} droppedCallback
     * @returns {Node}
     */
    createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
      return new CircularPieceNode( piece, finishedAnimatingCallback, droppedCallback );
    }

    /**
     * Creates the cell node for the given type of cell.
     * @public
     * @override
     *
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     * @returns {Node}
     */
    createCellNode( denominator, index, options ) {
      return new CircularNode( denominator, index, options );
    }
  }

  return fractionsCommon.register( 'CircularSceneNode', CircularSceneNode );
} );
