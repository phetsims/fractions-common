// Copyright 2017, University of Colorado Boulder

/**
 * TODO: Doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  var CircleNode = require( 'FRACTIONS_COMMON/intro/view/CircleNode' );
  var CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/CircularContainerNode' );
  var CircularPieceNode = require( 'FRACTIONS_COMMON/intro/view/CircularPieceNode' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {CellSceneNode}
   *
   * @param {ContainerSetScreenView} model
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
     * @returns {CircleNode}
     * @public
     */
    createCellNode: function( denominator, index, options ) {
      return new CircleNode( denominator, index, options );
    }
  } );
} );
