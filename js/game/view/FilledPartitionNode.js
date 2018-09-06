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
        borderLineWidth: 2
      }, options );

      assert && assert( options.primaryFill, 'primaryFill should be provided' );

      this.children = [
        ...filledPartition.shapePartition.shapes.map( ( shape, index ) => new Path( shape, {
          fill: filledPartition.fills[ index ] ? options.primaryFill : options.backgroundFill,
          // fill: new phet.scenery.Color( index / ( filledPartition.shapePartition.length - 1 ) * 255, index / ( filledPartition.shapePartition.length - 1 ) * 255, index / ( filledPartition.shapePartition.length - 1 ) * 255 ),
          stroke: options.interiorStroke,
          lineWidth: options.interiorLineWidth
        } ) ),
        new Path( filledPartition.shapePartition.outlineShape, {
          stroke: options.borderStroke,
          lineWidth: options.borderLineWidth
        } )
      ];

      this.mutate( options );
    }
  }

  fractionsCommon.register( 'FilledPartitionNode', FilledPartitionNode );

  return FilledPartitionNode;
} );
