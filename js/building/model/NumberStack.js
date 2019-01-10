// Copyright 2018, University of Colorado Boulder

/**
 * A stack that holds NumberPieces.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingType = require( 'FRACTIONS_COMMON/building/model/BuildingType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );
  const Vector2 = require( 'DOT/Vector2' );

  class NumberStack extends Stack {
    /**
     * @param {number} number
     * @param {number} layoutQuantity
     * @param {boolean} [isMutable]
     */
    // REVIEW: Could you respond in #29 about this notation/syntax "isMutable = true" in the constructor arguements?
    // REVIEW: If 'isMutable' is always true why is it a parameter and not a const?
    // REVIEW*: It's a default value for a parameter (that it gets if not provided). BuildingLabModel provides false.
    constructor( number, layoutQuantity, isMutable = true ) {
      super( BuildingType.NUMBER, layoutQuantity, isMutable );

      // @public {number}
      this.number = number;

      // @public {ObservableArray.<NumberPiece>} - NOTE: These should only ever be popped/pushed.
      this.numberPieces = this.array;
    }

    /**
     * Returns the desired visual offset of an item in the stack from the base.
     * @public
     *
     * @param {number} index
     * @returns {Vector2}
     */
    static getOffset( index ) {
      return new Vector2( 4 * index, 4 * index );
    }
  }

  return fractionsCommon.register( 'NumberStack', NumberStack );
} );
