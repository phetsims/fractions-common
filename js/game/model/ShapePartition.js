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
  const Vector2 = require( 'DOT/Vector2' );

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
          const startAngle = 2 * Math.PI * i / quantity - Math.PI / 2;
          const endAngle = 2 * Math.PI * ( i + 1 ) / quantity - Math.PI / 2;
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

    /**
     * Returns a regular polygon-shaped partition, sliced like a pizza
     * @public
     *
     * @param {number} quantity - Number of triangles
     * @returns {ShapePartition}
     */
    static createPolygon( quantity ) {
      assert && assert( quantity >= 3 && quantity % 1 === 0 );

      return new ShapePartition(
        _.range( 0, quantity ).map( i => Shape.polygon( [
          Vector2.ZERO,
          Vector2.createPolar( 1, 2 * Math.PI * i / quantity - Math.PI / 2 ),
          Vector2.createPolar( 1, 2 * Math.PI * ( i + 1 ) / quantity - Math.PI / 2 )
        ] ) ),
        PartitionType.POLYGON
      );
    }

    /**
     * Returns a stack of horizontal bars.
     * @public
     *
     * @param {number} quantity - Number of bars
     * @returns {ShapePartition}
     */
    static createHorizontalBars( quantity ) {
      assert && assert( quantity >= 1 && quantity % 1 === 0 );

      return new ShapePartition(
        _.range( 0, quantity ).map( i => Shape.rect( -1, 2 * i / quantity - 1, 2, 2 / quantity ) ),
        PartitionType.HORIZONTAL_BARS
      );
    }

    /**
     * Returns a stack of vertical bars.
     * @public
     *
     * @param {number} quantity - Number of bars
     * @returns {ShapePartition}
     */
    static createVerticalBars( quantity ) {
      assert && assert( quantity >= 1 && quantity % 1 === 0 );

      return new ShapePartition(
        _.range( 0, quantity ).map( i => Shape.rect( 2 * i / quantity - 1, -1, 2 / quantity, 2 ) ),
        PartitionType.VERTICAL_BARS
      );
    }
  }

  fractionsCommon.register( 'ShapePartition', ShapePartition );

  return ShapePartition;
} );
