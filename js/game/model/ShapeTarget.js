// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const FilledPartition = require( 'FRACTIONS_COMMON/game/model/FilledPartition' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );

  class ShapeTarget extends Target {
    /**
     * @param {Fraction} fraction
     * @param {Array.<FilledPartition>} filledPartitions
     */
    constructor( fraction, filledPartitions ) {
      super( fraction );

      // @public {Array.<FilledPartition>}
      this.filledPartitions = filledPartitions;
    }

    /**
     * Returns a target filled in the specified manner.
     * @public
     *
     * @param {ShapePartition} shapePartition
     * @param {Fraction} fraction
     * @param {ColorDef} color
     * @param {FillType} fillType
     * @returns {ShapeTarget}
     */
    static fill( shapePartition, fraction, color, fillType ) {
      return new ShapeTarget( fraction, FilledPartition.fill( shapePartition, fraction, color, fillType ) );
    }

    /**
     * Returns a target filled sequentially from the start.
     * @public
     *
     * @param {ShapePartition} shapePartition
     * @param {Fraction} fraction
     * @param {ColorDef} color
     * @returns {ShapeTarget}
     */
    static sequentialFill( shapePartition, fraction, color ) {
      return new ShapeTarget( fraction, FilledPartition.sequentialFill( shapePartition, fraction, color ) );
    }

    /**
     * Returns a target filled randomly.
     * @public
     *
     * @param {ShapePartition} shapePartition
     * @param {Fraction} fraction
     * @param {ColorDef} color
     * @returns {ShapeTarget}
     */
    static randomFill( shapePartition, fraction, color ) {
      return new ShapeTarget( fraction, FilledPartition.randomFill( shapePartition, fraction, color ) );
    }
  }

  return fractionsCommon.register( 'ShapeTarget', ShapeTarget );
} );
