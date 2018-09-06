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
  const Ray2 = require( 'DOT/Ray2' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

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
  const ellipse = Shape.ellipse(
    CakeNode.CAKE_IMAGE_SIZE.width * 0.501,
    CakeNode.CAKE_IMAGE_SIZE.height * 0.641,
    CakeNode.CAKE_IMAGE_SIZE.width * 0.364,
    CakeNode.CAKE_IMAGE_SIZE.height * 0.276, 0 ).makeImmutable();
  const ellipseOffsetCenter = ellipse.bounds.center.plusXY( 0, -0.07 * CakeNode.CAKE_IMAGE_SIZE.height );

  class CakeContainerNode extends CellContainerNode {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      super( container, options );

      // The shape of the ellipse is determined empirically based on the image
      this.addChild( new Path( ellipse, {
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
      const rotation = denominator === 2 ? 0.5 * Math.PI : 0;
      for ( let i = 0; i < denominator; i++ ) {
        const angle = 2 * Math.PI * ( i / denominator ) + rotation;
        const direction = Vector2.createPolar( 1, angle ).componentTimes( new Vector2( 1, 0.565 ) ).normalized();
        const intersections = ellipse.intersection( new Ray2( ellipseOffsetCenter, direction ) );
        const endPoint = intersections[ 0 ].point;
        gridShape.moveToPoint( ellipseOffsetCenter.blend( endPoint, 0.001 ) ); // Work around chrome crash
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
