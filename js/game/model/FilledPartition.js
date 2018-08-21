// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );

  class FilledPartition {
    /**
     * @param {ShapePartition} shapePartition
     * @param {Array.<boolean>} fills
     * @param {ColorDef} color
     */
    constructor( shapePartition, fills, color ) {
      assert && assert( shapePartition instanceof ShapePartition );
      assert && assert( Array.isArray( fills ) );
      assert && assert( fills.length === shapePartition.shapes.length );
      assert && fills.forEach( fill => assert( typeof fill === 'boolean' ) );

      // @public {ShapePartition}
      this.shapePartition = shapePartition;

      // @public {Array.<boolean>} - Index corresponds to the shapes in shapePartition
      this.fills = fills;

      // @public {ColorDef}
      this.color = color;

      // @public {Fraction} - The computed fraction for the value of this filled partition
      this.fraction = new Fraction( fills.filter( _.identity ).length, fills.length ).reduce();
    }

    /**
     * Returns a list of filled partitions, filled sequentially from the start.
     * @public
     *
     * @param {ShapePartition} shapePartition
     * @param {Fraction} fraction
     * @param {ColorDef} color
     * @returns {Array.<FilledPartition>}
     */
    static sequentialFill( shapePartition, fraction, color ) {
      const result = [];

      while ( Fraction.ZERO.isLessThan( fraction ) ) {
        result.push( new FilledPartition( shapePartition, shapePartition.shapes.map( ( _, index ) => {
          return index < fraction.numerator * ( shapePartition.shapes.length / fraction.denominator );
        } ), color ) );
        fraction = fraction.minus( Fraction.ONE );
      }

      return result;
    }

    /**
     * Returns a list of filled partitions, filled randomly.
     * @public
     *
     * @param {ShapePartition} shapePartition
     * @param {Fraction} fraction
     * @param {ColorDef} color
     * @returns {Array.<FilledPartition>}
     */
    static randomFill( shapePartition, fraction, color ) {
      const numSlicesPerPartition = shapePartition.shapes.length;
      const numFilledSlices = fraction.numerator * ( numSlicesPerPartition / fraction.denominator );
      const numPartitions = Math.ceil( fraction.getValue() );
      const numTotalSlices = numPartitions * numSlicesPerPartition;
      const fills = phet.joist.random.shuffle( [
        ..._.times( numFilledSlices, () => true ),
        ..._.times( numTotalSlices - numFilledSlices, () => false )
      ] );
      return _.range( 0, numPartitions ).map( i => {
        return new FilledPartition( shapePartition, fills.slice( i * numSlicesPerPartition, ( i + 1 ) * numSlicesPerPartition ), color );
      } );
    }
  }

  fractionsCommon.register( 'FilledPartition', FilledPartition );

  return FilledPartition;
} );
