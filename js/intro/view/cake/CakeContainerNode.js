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
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

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
      this.addChild( new Path( Shape.segments( [ CakeNode.BASE_ELLIPSE ], true ).makeImmutable(), {
        fill: 'white',
        stroke: this.strokeProperty,
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        translation: CakeNode.CAKE_OFFSET.negated()
      } ) );

      // @private {Path}
      this.gridPath = new Path( null, {
        stroke: this.strokeProperty,
        scale: CakeNode.CAKE_DEFAULT_SCALE,
        localBounds: CakeNode.CAKE_IMAGE_BOUNDS,
        translation: CakeNode.CAKE_OFFSET.negated()
      } );
      this.addChild( this.gridPath );

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

      const gridShape = new Shape();
      for ( let i = 0; i < denominator; i++ ) {
        const endPoint = CakeNode.getBaseIntersection( CakeNode.getStartAngle( denominator, i ) ).point;
        gridShape.moveToPoint( CakeNode.BASE_ELLIPSE_OFFSET_CENTER.blend( endPoint, 0.001 ) ); // Work around chrome crash
        gridShape.lineToPoint( endPoint );
      }
      this.gridPath.shape = denominator > 1 ? gridShape : null;

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
