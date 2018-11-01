// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for views for Stacks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );

  class StackNode extends Node {
    /**
     * @param {Stack} stack
     * @param {Object} [options]
     */
    constructor( stack, options ) {
      super( {
        pickable: false
      } );

      // @public {Stack}
      this.stack = stack;

      // @public {Bounds2} - The ideal layout bounds for this node (that should be used for layout). This should be
      // defined by the concrete subtype.
      this.layoutBounds = Bounds2.NOTHING;
    }
  }

  return fractionsCommon.register( 'StackNode', StackNode );
} );
