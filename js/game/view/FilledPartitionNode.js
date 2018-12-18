// Copyright 2018, University of Colorado Boulder

/**
 * Displays a filled partition (shapes) visually.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );

  class FilledPartitionNode extends Node {
    /**
     * @param {FilledPartition} filledPartition
     * @param {Object} [options]
     */
    constructor( filledPartition, options ) {
      super();

      options = _.extend( {
        // {PaintDef} - Fills and strokes
        primaryFill: filledPartition.color,
        backgroundFill: FractionsCommonColorProfile.shapePartitionBackgroundProperty,
        interiorStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,
        borderStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,

        interiorLineWidth: 1,
        borderLineWidth: 2,

        // {number|null} - If non-null, the width of this node will be padded to make sure it is the same width as if
        // the filledPartition's outlineShape has this width.
        layoutShapeWidth: null
      }, options );

      assert && assert( options.primaryFill, 'primaryFill should be provided' );

      this.children = [
        ...filledPartition.shapePartition.shapes.map( ( shape, index ) => new Path( shape, {
          fill: filledPartition.fills[ index ] ? options.primaryFill : options.backgroundFill,
          stroke: options.interiorStroke,
          lineWidth: options.interiorLineWidth
        } ) ),
        new Path( filledPartition.shapePartition.outlineShape, {
          stroke: options.borderStroke,
          lineWidth: options.borderLineWidth
        } )
      ];

      // Enforce layoutShapeWidth
      if ( options.layoutShapeWidth !== null ) {
        const center = this.localBounds.centerX;
        // NOTE: We're doubling the borderLineWidth due to miter possibilities
        this.localBounds = this.localBounds.withMinX(
          center - options.layoutShapeWidth / 2 + options.borderLineWidth
        ).withMaxX(
          center + options.layoutShapeWidth / 2 + options.borderLineWidth
        );
      }

      this.mutate( options );
    }
  }

  fractionsCommon.register( 'FilledPartitionNode', FilledPartitionNode );

  return FilledPartitionNode;
} );
