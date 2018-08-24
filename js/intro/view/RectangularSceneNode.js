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
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RectangleNode = require( 'FRACTIONS_COMMON/intro/view/RectangleNode' );
  var RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/RectangularContainerNode' );
  var RectangularPieceNode = require( 'FRACTIONS_COMMON/intro/view/RectangularPieceNode' );

  /**
   * @constructor
   * @extends {CellSceneNode}
   *
   * @param {ContainerSetScreenView} model
   * @param {function} getBucketLocation - function(): Vector2, gives the location of the bucket when called
   * @param {Object} [options]
   */
  function RectangularSceneNode( model, getBucketLocation, options ) {
    // TODO: Don't do this! And don't pass in to children!
    this.options = options;
    CellSceneNode.call( this, model, getBucketLocation, options );
  }

  fractionsCommon.register( 'RectangularSceneNode', RectangularSceneNode );

  return inherit( CellSceneNode, RectangularSceneNode, {

    /**
     * Creates a Container Node with a specific callback function
     *
     * @param {Node} container
     * @param {function} cellDownCallback
     * @returns {RectangularContainerNode}
     * @public
     */
    createContainerNode: function( container, cellDownCallback ) {
      return new RectangularContainerNode( container, cellDownCallback, {
        rectangleOrientation: this.options.rectangleOrientation
      } );
    },

    /**
     * Creates a piece Node with a specific callback function and finished animation callback
     *
     * @param {Node} piece
     * @param {function} finishedAnimatingCallback
     * @param {function} droppedCallback
     * @returns {RectangularPieceNode}
     * @public
     */
    createPieceNode: function( piece, finishedAnimatingCallback, droppedCallback ) {
      return new RectangularPieceNode( piece, finishedAnimatingCallback, droppedCallback, this.options );
    },

    /**
     * Creates a rectangular Cell
     *
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     * @returns {RectangleNode}
     * @public
     */
    createCellNode: function( denominator, index, options ) {
      options = _.extend( this.options, options, { dropShadow: false } );
      return new RectangleNode( denominator, options );
    }

  } );
} );
