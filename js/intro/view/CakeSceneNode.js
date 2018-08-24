// Copyright 2018, University of Colorado Boulder

/**
 * TODO: Doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var CakeContainerNode = require( 'FRACTIONS_COMMON/intro/view/CakeContainerNode' );
  var CakeNode = require( 'FRACTIONS_COMMON/intro/view/CakeNode' );
  var CakePieceNode = require( 'FRACTIONS_COMMON/intro/view/CakePieceNode' );
  var CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
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
  function CakeSceneNode( model, getBucketLocation, options ) {

    CellSceneNode.call( this, model, getBucketLocation, options );
  }

  fractionsCommon.register( 'CakeSceneNode', CakeSceneNode );

  return inherit( CellSceneNode, CakeSceneNode, {
    /**
     * create a cake container that holds a cake plate and the cakeNodes
     * @param {Container} container
     * @param {Function} cellDownCallback
     * @returns {CakeContainerNode}
     * @public
     */
    createContainerNode: function( container, cellDownCallback ) {
      return new CakeContainerNode( container, cellDownCallback );
    },

    /**
     * create a cake piece node
     * @param {Piece} piece
     * @param {Function} finishedAnimatingCallback
     * @param {Function} droppedCallback
     * @returns {CakePieceNode}
     * @public
     */
    createPieceNode: function( piece, finishedAnimatingCallback, droppedCallback ) {
      return new CakePieceNode( piece, finishedAnimatingCallback, droppedCallback );
    },

    /**
     * Creates a cell node of a cake aka slice
     *
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     * @returns {CakeNode}
     * @public
     */
    createCellNode: function( denominator, index, options ) {
      return new CakeNode( denominator, index, options );
    }
  } );
} );
