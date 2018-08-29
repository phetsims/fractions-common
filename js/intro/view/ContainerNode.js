// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for nodes that show a representation of a cell-based container.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );

  class ContainerNode extends Node {
    /**
     * @param {Container} container
     * @param {function} cellDownCallback - function( {Cell} cell, {Event} event ) - Should be called when a cell is
     *                                      pressed by a pointer.
     */
    constructor( container, cellDownCallback ) {
      super();

      // @public {Container}
      this.container = container;

      // @protected {function}
      this.cellDownCallback = cellDownCallback;
    }
  }

  return fractionsCommon.register( 'ContainerNode', ContainerNode );
} );
