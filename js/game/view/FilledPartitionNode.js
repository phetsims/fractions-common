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
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );

  class FilledPartitionNode extends Node {
    /**
     * @param {FilledPartition} filledPartition
     * @param {Object} [options]
     */
    constructor( filledPartition, options ) {
      super();

      options = merge( {
        // {PaintDef} - Fills and strokes
        primaryFill: filledPartition.color,
        backgroundFill: FractionsCommonColorProfile.shapePartitionBackgroundProperty,
        interiorStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,
        borderStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,

        interiorLineWidth: 0.7,
        borderLineWidth: 2 * 0.7,

        // {number}
        layoutScale: 1,

        // {boolean} - If true, it will apply relative scaling so that partitions will have closer to the same width
        adaptiveScale: false
      }, options );

      assert && assert( options.primaryFill, 'primaryFill should be provided' );

      let scale = options.layoutScale;
      if ( options.adaptiveScale ) {
        const scaleMultiplier = Math.min(
          96 / filledPartition.shapePartition.outlineShape.bounds.width,
          80 / filledPartition.shapePartition.outlineShape.bounds.height
        );
        scale *= scaleMultiplier;
      }

      this.children = [
        ...filledPartition.shapePartition.shapes.map( ( shape, index ) => new Path( shape, {
          fill: filledPartition.fills[ index ] ? options.primaryFill : options.backgroundFill,
          stroke: options.interiorStroke,
          lineWidth: options.interiorLineWidth / scale
        } ) ),
        new Path( filledPartition.shapePartition.outlineShape, {
          stroke: options.borderStroke,
          lineWidth: options.borderLineWidth / scale
        } )
      ];

      this.scale( scale );

      this.mutate( options );
    }
  }

  fractionsCommon.register( 'FilledPartitionNode', FilledPartitionNode );

  return FilledPartitionNode;
} );
