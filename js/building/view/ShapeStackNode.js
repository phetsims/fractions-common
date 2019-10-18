// Copyright 2018-2019, University of Colorado Boulder

/**
 * View for a ShapeStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const merge = require( 'PHET_CORE/merge' );
  const Property = require( 'AXON/Property' );
  const ShapeLayerNode = require( 'FRACTIONS_COMMON/building/view/ShapeLayerNode' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  class ShapeStackNode extends StackNode {
    /**
     * @param {ShapeStack} shapeStack
     * @param {Object} [options]
     */
    constructor( shapeStack, options ) {
      assert && assert( shapeStack instanceof ShapeStack );

      options = merge( {
        // {number} - Stacks should be a bit smaller than in-play objects in general
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE
      }, options );

      super( shapeStack );

      // @public {ShapeStack}
      this.shapeStack = shapeStack;

      // @private {Array.<ShapePieceNode>}
      this.shapePieceNodes = [];

      // @private {Node}
      this.shapeLayerNode = new ShapeLayerNode( shapeStack.representation, new Property( shapeStack.fraction.denominator ) );
      this.addChild( this.shapeLayerNode );

      // @private {function}
      this.shapePieceAddedListener = this.addShapePiece.bind( this );
      this.shapePieceRemovedListener = this.removeShapePiece.bind( this );

      this.stack.shapePieces.addItemAddedListener( this.shapePieceAddedListener );
      this.stack.shapePieces.addItemRemovedListener( this.shapePieceRemovedListener );
      this.stack.shapePieces.forEach( this.shapePieceAddedListener );

      // Inform about our available layout bounds
      const bounds = this.localBounds.copy();
      const shapePiece = new ShapePiece( this.shapeStack.fraction, this.shapeStack.representation, this.shapeStack.color );
      const shapePieceNode = new ShapePieceNode( shapePiece );
      for ( let i = 0; i < this.shapeStack.layoutQuantity; i++ ) {
        shapePieceNode.matrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, i );
        bounds.includeBounds( shapePieceNode.bounds );
      }
      shapePieceNode.dispose();
      this.layoutBounds = bounds;

      this.mutate( options );
    }

    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    addShapePiece( shapePiece ) {
      assert && assert( shapePiece.fraction.equals( this.shapeStack.fraction ) );
      assert && assert( shapePiece.representation === this.shapeStack.representation );

      const shapePieceNode = new ShapePieceNode( shapePiece, {
        matrix: ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, this.shapePieceNodes.length )
      } );
      this.shapePieceNodes.push( shapePieceNode );
      this.addChild( shapePieceNode );
    }

    /**
     * Removes a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    removeShapePiece( shapePiece ) {
      const shapePieceNode = _.find( this.shapePieceNodes, shapePieceNode => {
        return shapePieceNode.shapePiece === shapePiece;
      } );
      assert && assert( shapePieceNode );

      arrayRemove( this.shapePieceNodes, shapePieceNode );
      this.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.shapePieceNodes.forEach( shapePieceNode => shapePieceNode.dispose() );
      this.stack.shapePieces.removeItemAddedListener( this.shapePieceAddedListener );
      this.stack.shapePieces.removeItemRemovedListener( this.shapePieceRemovedListener );
      this.shapeLayerNode.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'ShapeStackNode', ShapeStackNode );
} );
