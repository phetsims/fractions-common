// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );

  class FilledPartitionNode extends Node {
    /**
     * @param {FilledPartition} filledPartition
     * @param {Object} config
     */
    constructor( filledPartition, config ) {
      super();

      config = _.extend( {
        // {PaintDef} - Fills and strokes
        primaryFill: null, // required
        backgroundFill: FractionsCommonColorProfile.shapePartitionBackgroundProperty,
        interiorStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,
        borderStroke: FractionsCommonColorProfile.shapePartitionBorderProperty,

        interiorLineWidth: 1,
        borderLineWidth: 2
      }, config );

      assert && assert( config.primaryFill, 'primaryFill should be provided' );

      this.children = [
        ...filledPartition.shapePartition.shapes.map( ( shape, index ) => new Path( shape, {
          fill: filledPartition.fills[ index ] ? config.primaryFill : config.backgroundFill,
          stroke: config.interiorStroke,
          lineWidth: config.interiorLineWidth
        } ) ),
        new Path( filledPartition.shapePartition.outlineShape, {
          stroke: config.borderStroke,
          lineWidth: config.borderLineWidth
        } )
      ];

      this.mutate( config );
    }
  }

  fractionsCommon.register( 'FilledPartitionNode', FilledPartitionNode );

  return FilledPartitionNode;
} );
