// Copyright 2017, University of Colorado Boulder

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
  var NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  var StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  /**
   * @constructor
   * @extends {StackNode}
   *
   * @param {NumberStackGroup} numberGroupStack
   * @param {Object} [options]
   */
  function NumberGroupStackNode( numberGroupStack, options ) {

    StackNode.call( this, numberGroupStack );

    // @private {boolean}
    this.isMixedNumber = numberGroupStack.isMixedNumber;

    var icon = NumberGroupNode.createIcon( numberGroupStack.isMixedNumber );

    this.addChild( icon );

    numberGroupStack.numberGroups.lengthProperty.link( function( length ) {
      icon.visible = length > 0;
    } );

    this.mutate( options );
  }

  fractionsCommon.register( 'NumberGroupStackNode', NumberGroupStackNode );

  return inherit( StackNode, NumberGroupStackNode );
} );
