// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
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

  fractionsCommon.register( 'StackNode', StackNode );

  return inherit( Node, StackNode );
} );
