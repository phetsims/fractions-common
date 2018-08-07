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
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class ShapeGroupStack extends Stack {
    /**
     * @param {Representation} representation
     * @param {boolean} [isMutable]
     */
    constructor( representation, isMutable = true ) {
      super( isMutable );

      // @public {Representation}
      this.representation = representation;

      // @public {ObservableArray.<ShapeGroup>} - NOTE: These should only ever be popped/pushed.
      this.shapeGroups = this.array;
    }

    /**
     * Returns the desired visual offset of an item in the stack from the base.
     *
     * @param {Representation} representation
     * @param {number} index
     * @returns {Vector2}
     */
    static getOffset( representation, index ) {
      assert && assert( _.includes( Representation.SHAPE_VALUES, representation ) );
      assert && assert( typeof index === 'number' );

      return Representation.getOffset( representation, index );
    }
  }

  return fractionsCommon.register( 'ShapeGroupStack', ShapeGroupStack );
} );
