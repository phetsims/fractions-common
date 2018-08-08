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
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );
  const Vector2 = require( 'DOT/Vector2' );

  class NumberStack extends Stack {
    /**
     * @param {number} number
     * @param {number} layoutQuantity
     * @param {boolean} [isMutable]
     */
    constructor( number, layoutQuantity, isMutable = true ) {
      super( layoutQuantity, isMutable );

      // @public {number}
      this.number = number;

      // @public {ObservableArray.<NumberPiece>} - NOTE: These should only ever be popped/pushed.
      this.numberPieces = this.array;
    }

    // TODO: doc
    static getOffset( index ) {
      return new Vector2( 4 * index, 4 * index );
    }
  }

  return fractionsCommon.register( 'NumberStack', NumberStack );
} );
