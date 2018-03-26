// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Shape = require( 'KITE/Shape' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapeStack} shapeStack
   * @param {Object} [options]
   */
  function ShapeStackNode( shapeStack, options ) {
    assert && assert( shapeStack instanceof ShapeStack );

    options = _.extend( {
      scale: FractionsCommonConstants.SHAPE_BUILD_SCALE // stacks should be a bit smaller than in-play objects in general
    }, options );

    Node.call( this );

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
          separatorShape.moveTo( 0, 0 ).lineTo( CIRCLE_RADIUS * Math.cos( angle ), CIRCLE_RADIUS * Math.sin( angle ) );
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

    // NOTE: Stacks and their nodes should be persistent, no need to unlink
    shapeStack.shapePieces.addItemAddedListener( this.addShapePiece.bind( this ) );
    shapeStack.shapePieces.addItemRemovedListener( this.removeShapePiece.bind( this ) );
    shapeStack.shapePieces.forEach( this.addShapePiece.bind( this ) );    

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeStackNode', ShapeStackNode );

  return inherit( Node, ShapeStackNode, {
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

      this.shapePieceNodes.remove( shapePieceNode );
      this.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    },

    // TODO: doc
    getModelStackLocation: function( modelViewTransform, shapePanel ) {
      return modelViewTransform.viewToModelPosition( this.getUniqueTrailTo( shapePanel ).localToGlobalPoint( Vector2.ZERO ) );
    }
  } );
} );
