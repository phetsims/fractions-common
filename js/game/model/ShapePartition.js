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
  const Matrix3 = require( 'DOT/Matrix3' );
  const PartitionType = require( 'FRACTIONS_COMMON/game/enum/PartitionType' );
  const Shape = require( 'KITE/Shape' );

  class ShapePartition {
    /**
     * @param {Array.<Shape>} shapes
     * @param {PartitionType} type
     */
    constructor( shapes, type ) {
      // @public {Array.<Shape>}
      this.shapes = shapes;

      // @public {Shape}
      this.outlineShape = Shape.union( shapes );

      // @public {PartitionType}
      this.type = type;

      // Make the shapes immutable, so it minimizes the number of listeners added later
      [ ...this.shapes, this.outlineShape ].forEach( shape => shape.makeImmutable() );
    }

    /**
     * Conditionally rescales a ShapePartition to have a given area.
     * @public
     *
     * @param {number} totalArea
     * @returns {ShapePartition}
     */
    rescaled( totalArea ) {
      const area = this.outlineShape.getArea();
      if ( Math.abs( area - totalArea ) < 1e-5 ) {
        return this;
      }
      else {
        const matrix = Matrix3.scale( Math.sqrt( totalArea / area ) );
        return new ShapePartition( this.shapes.map( shape => shape.transformed( matrix ) ), this.type );
      }
    }

    /**
     * Returns a pie-shaped partition.
     * @public
     *
     * @param {number} quantity - Number of pie pieces
     * @returns {ShapePartition}
     */
    static createPie( quantity ) {
      assert && assert( quantity >= 1 && quantity % 1 === 0 );

      const radius = 1;

      const shapes = [];
      if ( quantity > 1 ) {
        for ( let i = 0; i < quantity; i++ ) {
          const startAngle = 2 * Math.PI * i / quantity;
          const endAngle = 2 * Math.PI * ( i + 1 ) / quantity;
          const shape = new Shape()
            .moveTo( 0, 0 )
            .arc( 0, 0, radius, startAngle, endAngle, false )
            .close();
          shapes.push( shape );
        }
      }
      else {
        shapes.push( Shape.circle( 0, 0, radius ) );
      }
      return new ShapePartition( shapes, PartitionType.PIE );
    }
  }

  fractionsCommon.register( 'ShapePartition', ShapePartition );

  return ShapePartition;
} );
