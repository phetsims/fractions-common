// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for nodes that show a representation of a cell-based container.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const ColorDef = require( 'SCENERY/util/ColorDef' );
  const Container = require( 'FRACTIONS_COMMON/intro/model/Container' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Vector2 = require( 'DOT/Vector2' );

  class ContainerNode extends Node {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      assert && assert( container instanceof Container );

      options = merge( {
        // {ColorDef} - If non-null, this will be used instead of the container's usual color
        colorOverride: null,

        // {function} - If provided, will be called as function( {Cell} cell, {Event} event ) when a cell is
        // pressed by a pointer.
        cellDownCallback: () => {}
      }, options );

      assert && assert( ColorDef.isColorDef( options.colorOverride ) );
      assert && assert( typeof options.cellDownCallback === 'function' );

      super();

      // @public {Container}
      this.container = container;

      // @protected {ColorDef}
      this.colorOverride = options.colorOverride;

      // @protected {function}
      this.cellDownCallback = options.cellDownCallback;
    }

    /**
     * Return the midpoint offset of this node.
     * @public
     *
     * @param {number} index
     * @returns {Vector2}
     */
    getMidpointByIndex( index ) {
      return Vector2.ZERO;
    }
  }

  return fractionsCommon.register( 'ContainerNode', ContainerNode );
} );
