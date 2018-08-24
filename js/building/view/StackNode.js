// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {Stack} stack
   * @param {Object} [options]
   */
  function StackNode( stack, options ) {

    Node.call( this, {
      pickable: false
    } );

    // @public {Stack}
    this.stack = stack;
  }

  // TODO: note abstract layoutBounds? (guaranteed?)

  fractionsCommon.register( 'StackNode', StackNode );

  return inherit( Node, StackNode );
} );
