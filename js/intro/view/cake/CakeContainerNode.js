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
  const CellContainerNode = require( 'FRACTIONS_COMMON/intro/view/CellContainerNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );
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

  // constants
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
  // The order of indices for visual layering (for each denominator)
  const layerOrder = {
    1: [ 0 ],
    2: [ 1, 0 ],
    3: [ 0, 1, 2 ],
    4: [ 0, 1, 2, 3 ],
    5: [ 1, 0, 2, 4, 3 ],
    6: [ 1, 0, 2, 3, 5, 4 ],
    7: [ 1, 0, 2, 3, 4, 6, 5 ],
    8: [ 1, 0, 2, 3, 4, 5, 7, 6 ]
  };

  class CakeContainerNode extends CellContainerNode {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      super( container, options );

      // The shape of the ellipse is determined empirically based on the image
      this.addChild( new Path( Shape.ellipse(
        CakeNode.CAKE_IMAGE_SIZE.width * 0.501,
        CakeNode.CAKE_IMAGE_SIZE.height * 0.641,
        CakeNode.CAKE_IMAGE_SIZE.width * 0.364,
        CakeNode.CAKE_IMAGE_SIZE.height * 0.276, 0 ), {
        fill: 'white',
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        translation: CakeNode.CAKE_OFFSET.negated()
      } ) );

      // @private {Image} create grid image of the cake with the appropriate number of cells
      this.gridImage = new Image( cakeGridImageArray[ container.cells.lengthProperty.value - 1 ], {
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        localBounds: CakeNode.CAKE_IMAGE_BOUNDS,
        translation: CakeNode.CAKE_OFFSET.negated()
      } );
      this.addChild( this.gridImage );

      this.rebuild();
      this.mutate( options );
    }

    /**
     * Rebuilds the full container (required when the number of cells changes).
     * @protected
     * @override
     */
    rebuild() {
      super.rebuild();

      const denominator = this.container.cells.length;

      // update the grid image
      this.gridImage.setImage( cakeGridImageArray[ denominator - 1 ] );

      for ( let i = 0; i < denominator; i++ ) {
        const index = layerOrder[ denominator ][ i ];
        const cell = this.container.cells.get( index );

        const cellNode = new CakeNode( denominator, index );
        cellNode.translation = cellNode.getOffset();

        this.addCellNode( cell, cellNode );
      }
    }

    /**
     * Return the midpoint offset of this node.
     * @public
     * @override
     *
     * @param {number} index
     * @returns {Vector2}
     */
    getMidpointByIndex( index ) {
      return this.cellEntries[ layerOrder[ this.container.cells.length ][ index ] ].node.translation;
    }
  }

  return fractionsCommon.register( 'CakeContainerNode', CakeContainerNode );
} );
