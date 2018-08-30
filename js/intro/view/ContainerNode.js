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
  const Node = require( 'SCENERY/nodes/Node' );

  class ContainerNode extends Node {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      assert && assert( container instanceof Container );

      options = _.extend( {
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
  }

  return fractionsCommon.register( 'ContainerNode', ContainerNode );
} );
