// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the cake representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CakeContainerNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeContainerNode' );
  const CakeNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeNode' );
  const CakePieceNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakePieceNode' );
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class CakeSceneNode extends CellSceneNode {
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
      return new CakeContainerNode( container, cellDownCallback );
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
      return new CakePieceNode( piece, finishedAnimatingCallback, droppedCallback );
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
      return new CakeNode( denominator, index, options );
    }
  }

  return fractionsCommon.register( 'CakeSceneNode', CakeSceneNode );
} );
