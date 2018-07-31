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
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );

  class FilledPartition {
    /**
     * @param {ShapePartition} shapePartition
     * @param {Array.<boolean>} fills
     */
    constructor( shapePartition, fills ) {
      assert && assert( shapePartition instanceof ShapePartition );
      assert && assert( Array.isArray( fills ) );
      assert && assert( fills.length === shapePartition.shapes.length );
      assert && fills.forEach( fill => assert( typeof fill === 'boolean' ) );

      // @public {ShapePartition}
      this.shapePartition = shapePartition;

      // @public {Array.<boolean>} - Index corresponds to the shapes in shapePartition
      this.fills = fills;

      // TODO: compute the fraction for this?
    }
  }

  fractionsCommon.register( 'FilledPartition', FilledPartition );

  return FilledPartition;
} );
