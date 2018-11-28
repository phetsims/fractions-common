// Copyright 2018, University of Colorado Boulder

/**
 * View for a NumberGroupStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  class NumberGroupStackNode extends StackNode {
    /**
     * @param {NumberStackGroup} numberGroupStack
     * @param {Object} [options]
     */
    constructor( numberGroupStack, options ) {
      super( numberGroupStack );

      // @private {boolean}
      this.isMixedNumber = numberGroupStack.isMixedNumber;

      // @private {Node}
      this.icon = NumberGroupNode.createIcon( numberGroupStack.isMixedNumber );

      this.addChild( this.icon );

      // @private {function}
      this.stackLengthListener = this.onStackLengthChange.bind( this );
      this.stack.numberGroups.lengthProperty.link( this.stackLengthListener );

      // Inform about our available layout bounds
      this.layoutBounds = this.icon.bounds;

      this.mutate( options );
    }

    /**
     * How to handle changes to the stack length.
     * @private
     *
     * @param {number} length
     */
    onStackLengthChange( length ) {
      this.icon.visible = length > 0;
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.icon.dispose();
      this.stack.numberGroups.lengthProperty.unlink( this.stackLengthListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'NumberGroupStackNode', NumberGroupStackNode );
} );
