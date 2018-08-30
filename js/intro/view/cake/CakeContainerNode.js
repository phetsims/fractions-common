// Copyright 2018, University of Colorado Boulder

/**
 * Container for the cake representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CakeNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeNode' );
  const ContainerNode = require( 'FRACTIONS_COMMON/intro/view/ContainerNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  // images
  const cake_grid_1Image = require( 'image!FRACTIONS_COMMON/cake_grid_1.png' );
  const cake_grid_2Image = require( 'image!FRACTIONS_COMMON/cake_grid_2.png' );
  const cake_grid_3Image = require( 'image!FRACTIONS_COMMON/cake_grid_3.png' );
  const cake_grid_4Image = require( 'image!FRACTIONS_COMMON/cake_grid_4.png' );
  const cake_grid_5Image = require( 'image!FRACTIONS_COMMON/cake_grid_5.png' );
  const cake_grid_6Image = require( 'image!FRACTIONS_COMMON/cake_grid_6.png' );
  const cake_grid_7Image = require( 'image!FRACTIONS_COMMON/cake_grid_7.png' );
  const cake_grid_8Image = require( 'image!FRACTIONS_COMMON/cake_grid_8.png' );

  const cakeGridImageArray = [
    cake_grid_1Image,
    cake_grid_2Image,
    cake_grid_3Image,
    cake_grid_4Image,
    cake_grid_5Image,
    cake_grid_6Image,
    cake_grid_7Image,
    cake_grid_8Image
  ];

  class CakeContainerNode extends ContainerNode {
    /**
     * TODO: factor out common things with RectangularContainerNode and CircularContainerNode
     *
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      super( container, options );

      // @private {Image} create grid image of the cake with the appropriate number of cells
      this.gridImage = new Image( cakeGridImageArray[ container.cells.lengthProperty.value - 1 ], {
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        localBounds: CakeNode.CAKE_IMAGE_BOUNDS,
        translation: CakeNode.CAKE_OFFSET.negated()
      } );

      // create white background for the cake.
      // The shape of the ellipse is determined empirically based on the image
      var cakeGridBase = new Path( Shape.ellipse(
        CakeNode.CAKE_IMAGE_SIZE.width * 0.501,
        CakeNode.CAKE_IMAGE_SIZE.height * 0.641,
        CakeNode.CAKE_IMAGE_SIZE.width * 0.364,
        CakeNode.CAKE_IMAGE_SIZE.height * 0.276, 0 ), {
        fill: 'white',
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        translation: CakeNode.CAKE_OFFSET.negated()
      } );

      // @private {Node} Node layer to hold the cake slices with the correct z-order
      this.cakeLayers = new Node();

      this.children = [ cakeGridBase, this.gridImage, this.cakeLayers ];

      // @private {function}
      this.rebuildListener = this.rebuild.bind( this );

      // @private {Array.<CakeNode>}
      this.cellNodes = [];

      container.cells.lengthProperty.link( this.rebuildListener );

      this.mutate( options );
    }

    /**
     * Returns the midpoint offset for the given child node at the specified index.
     * @public
     *
     * @param {number} index
     * @returns {Vector2}
     */
    getMidpointByIndex( index ) {
      return this.cellNodes[ index ].translation;
    }

    /**
     * rebuild the container
     * @private
     */
    rebuild() {
      this.removeCellNodes();

      const denominator = this.container.cells.length;

      // update the grid image
      this.gridImage.setImage( cakeGridImageArray[ denominator - 1 ] );

      // {number[]} an array indicating the appropriate z order of a slice of cake, see zLayerOrder method for more details
      const zLayerArray = this.zLayerOrder( denominator );

      // {Image[]} array of cake slices arranged in z-order from back to front
      const slicesImage = [];

      for ( let i = 0; i < denominator; i++ ) {
        const cell = this.container.cells.get( i );

        // {integer} order of the slice, higher value indicates a higher z value
        const zOrder = zLayerArray[ i ];

        // place the cakeImage in the z ordered array
        const cellNode = new CakeNode( denominator, i );
        cellNode.translation = cellNode.getOffset();
        slicesImage[ zOrder ] = cellNode;

        this.cellNodes.push( cellNode );
        cellNode.cursor = 'pointer';
        cellNode.addInputListener( {
          down: event => {
            this.cellDownCallback( cell, event );
          }
        } );

        // TODO: don't do it this way
        cellNode.cell = cell;
        cellNode.visibilityListener = cell.appearsFilledProperty.linkAttribute( cellNode, 'visible' );
      }

      // remove all missing cakeImage from slicesImage array
      this.cakeLayers.setChildren( slicesImage.filter( n => n !== undefined ) );
    }

    /** updates cells array and removes links when denominator is decreased
     *
     * @private
     */
    removeCellNodes() {
      while ( this.cellNodes.length ) {
        var cellNode = this.cellNodes.pop();
        cellNode.cell.appearsFilledProperty.unlink( cellNode.visibilityListener );
        this.cakeLayers.removeChild( cellNode );
      }
    }

    /**
     * Each array corresponds to the z layers of the cake slices
     * The higher the value in the array, the higher the z-order level
     * For instance for a denominator of 2, the array [1,0] indicates that
     * the 0th element has a z value of 1 and is on top of the 1st element whose z value is 0

     * @param {number} denominator
     * @returns {number[]}
     * @private
     */
    zLayerOrder( denominator ) {
      switch( denominator ) {
        case 1:
          return [ 0 ];
        case 2:
          return [ 1, 0 ];
        case 3:
          return [ 0, 1, 2 ];
        case 4:
          return [ 0, 1, 2, 3 ];
        case 5:
          return [ 1, 0, 2, 4, 3 ];
        case 6:
          return [ 1, 0, 2, 3, 5, 4 ];
        case 7:
          return [ 1, 0, 2, 3, 4, 6, 5 ];
        case 8:
          return [ 1, 0, 2, 3, 4, 5, 7, 6 ];
        default:
          throw new Error( 'Unknown denominator: ' + denominator );
      }
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.removeCellNodes();
      this.container.cells.lengthProperty.unlink( this.rebuildListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'CakeContainerNode', CakeContainerNode );
} );
