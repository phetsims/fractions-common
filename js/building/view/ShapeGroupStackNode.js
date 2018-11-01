// Copyright 2018, University of Colorado Boulder

/**
 * View for a ShapeGroupStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  class ShapeGroupStackNode extends StackNode {
    /**
     * @param {ShapeStackGroup} shapeGroupStack
     * @param {Object} [options]
     */
    constructor( shapeGroupStack, options ) {
      super( shapeGroupStack );

      // @private {BuildingRepresentation}
      this.representation = shapeGroupStack.representation;

      // @private {Node}
      // TODO: Can we NOT recreate these icons, and reuse (and unparent correctly?)
      this.icon = ShapeGroupNode.createIcon( shapeGroupStack.representation );

      // @private {function}
      this.shapeGroupAddedListener = this.addShapeGroup.bind( this );
      this.shapeGroupRemovedListener = this.removeShapeGroup.bind( this );

      this.stack.shapeGroups.addItemAddedListener( this.shapeGroupAddedListener );
      this.stack.shapeGroups.addItemRemovedListener( this.shapeGroupRemovedListener );
      this.stack.shapeGroups.forEach( this.shapeGroupAddedListener );

      // Inform about our available layout bounds
      const bounds = Bounds2.NOTHING.copy();
      const iconBounds = this.icon.bounds;
      for ( let i = 0; i < this.stack.layoutQuantity; i++ ) {
        const offset = ShapeGroupStack.getOffset( this.representation, i );
        bounds.includeBounds( iconBounds.shifted( offset.x, offset.y ) );
      }
      this.layoutBounds = bounds;

      this.mutate( options );
    }

    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    addShapeGroup( shapeGroup ) {
      const numOffsets = FractionsCommonConstants.SHAPE_BUILD_SCALE * this.children.length;

      this.addChild( new Node( {
        children: [ this.icon ],
        translation: ShapeGroupStack.getOffset( this.representation, numOffsets )
      } ) );
    }

    /**
     * Removes a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    removeShapeGroup( shapeGroup ) {
      this.removeChild( this.children[ this.children.length - 1 ] );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.icon.dispose();
      this.stack.shapeGroups.removeItemAddedListener( this.shapeGroupAddedListener );
      this.stack.shapeGroups.removeItemRemovedListener( this.shapeGroupRemovedListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'ShapeGroupStackNode', ShapeGroupStackNode );
} );
