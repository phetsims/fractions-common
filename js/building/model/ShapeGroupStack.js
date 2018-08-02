// Copyright 2017, University of Colorado Boulder

/**
 * A stack of ShapeGroups of a particular representation.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );
  const Vector2 = require( 'DOT/Vector2' );

  class ShapeGroupStack extends Stack {
    /**
     * @param {Representation} representation
     */
    constructor( representation ) {
      super();

      // @public {Representation}
      this.representation = representation;

      // @public {ObservableArray.<ShapeGroup>} - NOTE: These should only ever be popped/pushed.
      this.shapeGroups = new ObservableArray();
    }

    /**
     * Returns the desired visual offset of an item in the stack from the base.
     *
     * @param {number} index
     * @returns {Vector2}
     */
    static getOffset( index ) {
      return new Vector2( -4 * index, 4 * index );
    }
  }

  return fractionsCommon.register( 'ShapeGroupStack', ShapeGroupStack );
} );
