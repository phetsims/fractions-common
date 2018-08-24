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

    // @private {Node}
    this.icon = NumberGroupNode.createIcon( numberGroupStack.isMixedNumber );

    this.addChild( this.icon );

    numberGroupStack.numberGroups.lengthProperty.link( length => {
      this.icon.visible = length > 0;
    } );

    // @public {Bounds2}
    this.layoutBounds = this.computeLayoutBounds();

    this.mutate( options );
  }

  fractionsCommon.register( 'NumberGroupStackNode', NumberGroupStackNode );

  return inherit( StackNode, NumberGroupStackNode, {
    /**
     * Returns the ideal layout bounds for this node (that should be used for layout).
     * @public
     *
     * @returns {Bounds2}
     */
    computeLayoutBounds() {
      return this.icon.bounds;
    }

  } );
} );
