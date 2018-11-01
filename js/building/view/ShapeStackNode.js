// Copyright 2018, University of Colorado Boulder

/**
 * View for a ShapeStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );
  const Util = require( 'DOT/Util' );

  // constants
  const CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;

  class ShapeStackNode extends StackNode {
    /**
     * @param {ShapeStack} shapeStack
     * @param {Object} [options]
     */
    constructor( shapeStack, options ) {
      assert && assert( shapeStack instanceof ShapeStack );

      options = _.extend( {
        // {number} - Stacks should be a bit smaller than in-play objects in general
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE
      }, options );

      super( shapeStack );

      // TODO: consider using this.stack?
      // @public {ShapeStack}
      this.shapeStack = shapeStack;

      // @private {Array.<ShapePieceNode>}
      this.shapePieceNodes = [];

      const denominator = shapeStack.fraction.denominator;
      const separatorShape = new Shape();

      // Background
      if ( shapeStack.representation === BuildingRepresentation.PIE ) {
        this.addChild( new Circle( CIRCLE_RADIUS, {
          fill: FractionsCommonColorProfile.shapeStackFillProperty
        } ) );
        if ( denominator > 1 ) {
          for ( let i = 0; i < denominator; i++ ) {
            const angle = -i * 2 * Math.PI / denominator;
            // Slight offset for https://github.com/phetsims/fractions-common/issues/2
            separatorShape.moveTo( 1e-5 * Math.cos( angle ), 1e-5 * Math.sin( angle ) ).lineTo( CIRCLE_RADIUS * Math.cos( angle ), CIRCLE_RADIUS * Math.sin( angle ) );
          }
          this.addChild( new Path( separatorShape, {
            stroke: FractionsCommonColorProfile.shapeStackSeparatorStrokeProperty
          } ) );
        }
        this.addChild( new Circle( CIRCLE_RADIUS, {
          stroke: FractionsCommonColorProfile.shapeStackStrokeProperty
        } ) );
      }
      else if ( shapeStack.representation === BuildingRepresentation.BAR ) {
        // TODO: Share separator code
        const barBounds = ShapePiece.VERTICAL_BAR_BOUNDS;
        this.addChild( Rectangle.bounds( barBounds, {
          fill: FractionsCommonColorProfile.shapeStackFillProperty
        } ) );
        for ( let i = 1; i < denominator; i++ ) {
          const x = Util.linear( 0, 1, barBounds.minX, barBounds.maxX, i / denominator );
          separatorShape.moveTo( x, barBounds.minY ).lineTo( x, barBounds.maxY );
        }
        this.addChild( new Path( separatorShape, {
          stroke: FractionsCommonColorProfile.shapeStackSeparatorStrokeProperty
        } ) );
        this.addChild( Rectangle.bounds( barBounds, {
          stroke: FractionsCommonColorProfile.shapeStackStrokeProperty
        } ) );
      }
      else {
        throw new Error( 'Unsupported representation for ShapeStackNode: ' + shapeStack.representation );
      }

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

      super.dispose();
    }
  }

  return fractionsCommon.register( 'ShapeStackNode', ShapeStackNode );
} );
