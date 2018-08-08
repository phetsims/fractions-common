// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  /**
   * @constructor
   * @extends {StackNode}
   *
   * @param {ShapeStackGroup} shapeGroupStack
   * @param {Object} [options]
   */
  function ShapeGroupStackNode( shapeGroupStack, options ) {

    StackNode.call( this, shapeGroupStack );

    // @private {Representation}
    this.representation = shapeGroupStack.representation;

    // @private {Node}
    this.icon = ShapeGroupNode.createIcon( shapeGroupStack.representation );

    // NOTE: Stacks and their nodes should be persistent, no need to unlink
    shapeGroupStack.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
    shapeGroupStack.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
    shapeGroupStack.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

    // @public {Bounds2}
    this.layoutBounds = this.computeLayoutBounds();

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeGroupStackNode', ShapeGroupStackNode );

  return inherit( StackNode, ShapeGroupStackNode, {
    /**
     * Returns the ideal layout bounds for this node (that should be used for layout).
     * @public
     *
     * @returns {Bounds2}
     */
    computeLayoutBounds() {
      const bounds = Bounds2.NOTHING.copy();
      const iconBounds = this.icon.bounds;
      for ( let i = 0; i < this.stack.layoutQuantity; i++ ) {
        const offset = ShapeGroupStack.getOffset( this.representation, i );
        bounds.includeBounds( iconBounds.shifted( offset.x, offset.y ) );
      }
      return bounds;
    },

    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    addShapeGroup: function( shapeGroup ) {
      var numOffsets = FractionsCommonConstants.SHAPE_BUILD_SCALE * this.children.length;

      this.addChild( new Node( {
        children: [ this.icon ],
        translation: ShapeGroupStack.getOffset( this.representation, numOffsets )
      } ) );
    },

    /**
     * Removes a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    removeShapeGroup: function( shapeGroup ) {
      this.removeChild( this.children[ this.children.length - 1 ] );
    }
  } );
} );
