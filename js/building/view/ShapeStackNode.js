// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const Shape = require( 'KITE/Shape' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );
  const Util = require( 'DOT/Util' );

  // constants
  const CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;

  /**
   * @constructor
   * @extends {StackNode}
   *
   * @param {ShapeStack} shapeStack
   * @param {Object} [options]
   */
  function ShapeStackNode( shapeStack, options ) {
    assert && assert( shapeStack instanceof ShapeStack );

    options = _.extend( {
      scale: FractionsCommonConstants.SHAPE_BUILD_SCALE // stacks should be a bit smaller than in-play objects in general
    }, options );

    StackNode.call( this, shapeStack );

    // TODO: consider using this.stack?
    // @public {ShapeStack}
    this.shapeStack = shapeStack;

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = [];

    var denominator = shapeStack.fraction.denominator;
    var i;
    var separatorShape = new Shape();

    // Background
    if ( shapeStack.representation === Representation.CIRCLE ) {
      this.addChild( new Circle( CIRCLE_RADIUS, {
        fill: FractionsCommonColorProfile.shapeStackFillProperty
      } ) );
      if ( denominator > 1 ) {
        for ( i = 0; i < denominator; i++ ) {
          var angle = -i * 2 * Math.PI / denominator;
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
    else if ( shapeStack.representation === Representation.VERTICAL_BAR ) {
      // TODO: Share separator code
      var barBounds = ShapePiece.VERTICAL_BAR_BOUNDS;
      this.addChild( Rectangle.bounds( barBounds, {
        fill: FractionsCommonColorProfile.shapeStackFillProperty
      } ) );
      for ( i = 1; i < denominator; i++ ) {
        var x = Util.linear( 0, 1, barBounds.minX, barBounds.maxX, i / denominator );
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

    // @private {Bounds2} - The bounds that include the main display (besides the pieces)
    this.vanillaBounds = this.localBounds;

    // NOTE: Stacks and their nodes should be persistent, no need to unlink
    shapeStack.shapePieces.addItemAddedListener( this.addShapePiece.bind( this ) );
    shapeStack.shapePieces.addItemRemovedListener( this.removeShapePiece.bind( this ) );
    shapeStack.shapePieces.forEach( this.addShapePiece.bind( this ) );

    // @public {Bounds2}
    this.layoutBounds = this.computeLayoutBounds();

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeStackNode', ShapeStackNode );

  return inherit( StackNode, ShapeStackNode, {
    /**
     * Returns the ideal layout bounds for this node (that should be used for layout).
     * @public
     *
     * @returns {Bounds2}
     */
    computeLayoutBounds() {
      const bounds = this.vanillaBounds.copy();
      const shapePiece = new ShapePiece( this.shapeStack.fraction, this.shapeStack.representation, this.shapeStack.color );
      const shapePieceNode = new ShapePieceNode( shapePiece );
      for ( let i = 0; i < this.shapeStack.layoutQuantity; i++ ) {
        shapePieceNode.matrix = ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, i );
        bounds.includeBounds( shapePieceNode.bounds );
      }
      shapePieceNode.dispose();
      return bounds;
    },

    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    addShapePiece: function( shapePiece ) {
      assert && assert( shapePiece.fraction.equals( this.shapeStack.fraction ) );
      assert && assert( shapePiece.representation === this.shapeStack.representation );

      var shapePieceNode = new ShapePieceNode( shapePiece, {
        matrix: ShapeStack.getShapeMatrix( shapePiece.fraction, shapePiece.representation, this.shapePieceNodes.length )
      } );
      this.shapePieceNodes.push( shapePieceNode );
      this.addChild( shapePieceNode );
    },

    /**
     * Removes a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    removeShapePiece: function( shapePiece ) {
      var shapePieceNode = _.find( this.shapePieceNodes, function( shapePieceNode ) {
        return shapePieceNode.shapePiece === shapePiece;
      } );
      assert && assert( shapePieceNode );

      arrayRemove( this.shapePieceNodes, shapePieceNode );
      this.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    }
  } );
} );
