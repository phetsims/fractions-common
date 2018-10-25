// Copyright 2018, University of Colorado Boulder

/**
 * A stack that holds ShapePieces.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class ShapeStack extends Stack {
    /**
     * @param {Fraction} fraction
     * @param {number} layoutQuantity
     * @param {BuildingRepresentation} representation
     * @param {ColorDef} color
     * @param {boolean} [isMutable]
     */
    constructor( fraction, layoutQuantity, representation, color, isMutable = true ) {
      super( layoutQuantity, isMutable );

      // @public {Fraction}
      this.fraction = fraction;

      // @public {BuildingRepresentation}
      this.representation = representation;

      // @public {ColorDef}
      this.color = color;

      // @public {ObservableArray.<ShapePiece>} - NOTE: These should only ever be popped/pushed.
      this.shapePieces = this.array;
    }

    /**
     * Returns the matrix transform (locally) for how to position a piece with the given properties.
     * @public
     *
     * @param {Fraction} fraction
     * @param {BuildingRepresentation} representation
     * @param {number} index
     * @returns {Matrix3}
     */
    static getShapeMatrix( fraction, representation, index ) {
      return Matrix3.translationFromVector( BuildingRepresentation.getOffset( representation, index ) ).timesMatrix( ShapeContainer.getShapeMatrix( 0, fraction, representation ) );
    }
  }

  return fractionsCommon.register( 'ShapeStack', ShapeStack );
} );
