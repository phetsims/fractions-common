// Copyright 2018, University of Colorado Boulder

/**
 * Base class for different types of object stacks (usually for pieces and groups) that are placed in panels usually.
 *
 * "mutable" stacks have elements dynamically added/removed, whereas "immutable" ones are not affected by the user.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class Stack {
    /**
     * @param {number} layoutQuantity
     * @param {boolean} [isMutable]
     */
    constructor( layoutQuantity, isMutable = true ) {
      assert && assert( typeof layoutQuantity === 'number' && layoutQuantity >= 1 && layoutQuantity % 1 === 0 );
      assert && assert( typeof isMutable === 'boolean' );

      // @public {boolean}
      this.layoutQuantity = layoutQuantity;

      // @public {boolean}
      this.isMutable = isMutable;

      // @public {Property.<Vector2>} - Position of our stack in model units (updated from the view)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {ObservableArray.<*>}
      this.array = new ObservableArray();
    }

    /**
     * Returns whether it is empty.
     * @public
     *
     * @returns {boolean}
     */
    isEmpty() {
      return this.array.length === 0;
    }
  }

  return fractionsCommon.register( 'Stack', Stack );
} );
