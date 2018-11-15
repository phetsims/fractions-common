// Copyright 2018, University of Colorado Boulder

/**
 * A stack of ShapeGroups of a particular representation.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class ShapeGroupStack extends Stack {
    /**
     * @param {number} layoutQuantity
     * @param {BuildingRepresentation} representation
     * @param {boolean} [isMutable]
     */
    constructor( layoutQuantity, representation, isMutable = true ) {
      super( layoutQuantity, isMutable );

      // @public {BuildingRepresentation}
      this.representation = representation;

      // @public {ObservableArray.<ShapeGroup>} - NOTE: These should only ever be popped/pushed.
      this.shapeGroups = this.array;
    }

    /**
     * Returns the desired visual offset of an item in the stack from the base.
     * @public
     *
     * @param {BuildingRepresentation} representation
     * @param {number} index
     * @returns {Vector2}
     */
    static getOffset( representation, index ) {
      assert && assert( _.includes( BuildingRepresentation.VALUES, representation ) );
      assert && assert( typeof index === 'number' );

      return BuildingRepresentation.getOffset( representation, index );
    }
  }

  return fractionsCommon.register( 'ShapeGroupStack', ShapeGroupStack );
} );
