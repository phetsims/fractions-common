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
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class Stack {
    /**
     * @param {boolean} [isMutable]
     */
    constructor( isMutable = true ) {
      assert && assert( typeof isMutable === 'boolean' );

      // @public {Property.<Vector2>} - Position of our stack in model units (updated from the view)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {ObservableArray.<*>}
      this.array = new ObservableArray();

      // @public {boolean}
      this.isMutable = isMutable;
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
