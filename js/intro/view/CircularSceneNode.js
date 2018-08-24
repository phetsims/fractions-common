// Copyright 2018, University of Colorado Boulder

/**
 * TODO: Doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  var CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/CircularContainerNode' );
  var CircularNode = require( 'FRACTIONS_COMMON/intro/view/CircularNode' );
  var CircularPieceNode = require( 'FRACTIONS_COMMON/intro/view/CircularPieceNode' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {CellSceneNode}
   *
   * @param {ContainerSetModel} model
   * @param {function} getBucketLocation - function(): Vector2, gives the location of the bucket when called
   * @param {Object} [options]
   */
  function CircularSceneNode( model, getBucketLocation, options ) {
    CellSceneNode.call( this, model, getBucketLocation, options );
  }

  fractionsCommon.register( 'CircularSceneNode', CircularSceneNode );

  return inherit( CellSceneNode, CircularSceneNode, {
    /**
     * create a circular container node that comprises a circle divided into cells.
     * @param {Container} container
     * @param {Function} cellDownCallback
     * @returns {CircularContainerNode}
     * @public
     */
    createContainerNode: function( container, cellDownCallback ) {
      return new CircularContainerNode( container, cellDownCallback );
    },

    /**
     * create a circular piece node
     * @param {Piece} piece
     * @param {Function} finishedAnimatingCallback
     * @param {Function} droppedCallback
     * @returns {CircularPieceNode}
     * @public
     */
    createPieceNode: function( piece, finishedAnimatingCallback, droppedCallback ) {
      return new CircularPieceNode( piece, finishedAnimatingCallback, droppedCallback );
    },

    /**
     * Creates a circular Cell node
     *
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     * @returns {CircularNode}
     * @public
     */
    createCellNode: function( denominator, index, options ) {
      return new CircularNode( denominator, index, options );
    }
  } );
} );
