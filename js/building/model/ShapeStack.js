// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class ShapeStack extends Stack {
    /**
     * @param {Fraction} fraction
     * @param {Representation} representation
     * @param {Property.<Color>} colorProperty
     */
    constructor( fraction, representation, colorProperty ) {
      super();

      // @public {Fraction}
      this.fraction = fraction;

      // @public {Representation}
      this.representation = representation;

      // @public {Property.<Color>}
      this.colorProperty = colorProperty;

      // @public {ObservableArray.<ShapePiece>} - NOTE: These should only ever be popped/pushed.
      this.shapePieces = new ObservableArray();
    }

    /**
     * Returns the matrix transform (locally) for how to position a piece with the given properties.
     * @public
     *
     * @param {Fraction} fraction
     * @param {Representation} representation
     * @param {number} index
     * @returns {Matrix3}
     */
    static getShapeMatrix( fraction, representation, index ) {
      return Matrix3.translation( ( representation === Representation.CIRCLE ? 1 : -1 ) * 4 * index, -4 * index ).timesMatrix( ShapeContainer.getShapeMatrix( 0, fraction, representation ) );
    }
  }

  return fractionsCommon.register( 'ShapeStack', ShapeStack );
} );
