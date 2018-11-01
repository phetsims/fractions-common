// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * Its layout should be based around this node being centered (locally) around the proper origin
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var arrayRemove = require( 'PHET_CORE/arrayRemove' );
  var BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  var Util = require( 'DOT/Util' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapeContainer} shapeContainer
   * @param {Object} [options]
   */
  function ShapeContainerNode( shapeContainer, options ) {
    assert && assert( shapeContainer instanceof ShapeContainer );

    Node.call( this, {
      translation: shapeContainer.offset
    } );

    // @public {ShapeContainer}
    this.shapeContainer = shapeContainer;

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = [];

    // @private {Node}
    this.shapePieceLayer = new Node( {
      pickable: false
    } );

    var separatorPath = new Path( null, {
      stroke: FractionsCommonColorProfile.shapeContainerPartitionProperty,
      lineDash: [ 5, 5 ],
      pickable: false
    } );

    // Background
    if ( shapeContainer.representation === BuildingRepresentation.PIE ) {
      this.addChild( new Circle( CIRCLE_RADIUS, {
        fill: FractionsCommonColorProfile.shapeContainerFillProperty
      } ) );
      this.addChild( this.shapePieceLayer );
      this.addChild( separatorPath );
      shapeContainer.partitionDenominatorProperty.link( function( denominator ) {
        if ( denominator > 1 ) {
          var separatorShape = new Shape();
          // TODO: can we share this code with ShapeStackNode? One is stroked and has a separate color, etc.
          for ( var i = 0; i < denominator; i++ ) {
            var angle = -i * 2 * Math.PI / denominator;
            // TODO: remove commented out code once figured out (Chrome bug?) See https://github.com/phetsims/scenery/issues/750
            // separatorShape.moveTo( 0, 0 ).lineTo( CIRCLE_RADIUS * Math.cos( angle ), CIRCLE_RADIUS * Math.sin( angle ) );
            separatorShape.moveTo( 0.01 * Math.cos( angle ), 0.01 * Math.sin( angle ) ).lineTo( CIRCLE_RADIUS * Math.cos( angle ), CIRCLE_RADIUS * Math.sin( angle ) );
          }
          separatorPath.shape = separatorShape;
        }
        else {
          separatorPath.shape = null;
        }
      } );
      this.addChild( new Circle( CIRCLE_RADIUS, {
        stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty,
        pickable: false
      } ) );
    }
    else if ( shapeContainer.representation === BuildingRepresentation.BAR ) {
      var barBounds = ShapePiece.VERTICAL_BAR_BOUNDS;
      this.addChild( Rectangle.bounds( barBounds, {
        fill: FractionsCommonColorProfile.shapeContainerFillProperty
      } ) );
      this.addChild( this.shapePieceLayer );
      this.addChild( separatorPath );
      shapeContainer.partitionDenominatorProperty.link( function( denominator ) {
        // TODO: Share separator code
        var separatorShape = new Shape();
        for ( var i = 1; i < denominator; i++ ) {
          var x = Util.linear( 0, 1, barBounds.minX, barBounds.maxX, i / denominator );
          separatorShape.moveTo( x, barBounds.minY ).lineTo( x, barBounds.maxY );
        }
        separatorPath.shape = separatorShape;
      } );
      this.addChild( Rectangle.bounds( barBounds, {
        stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty,
        pickable: false
      } ) );
    }
    else {
      throw new Error( 'Unsupported representation for ShapeContainerNode: ' + shapeContainer.representation );
    }

    // NOTE: Containers will disappear whenever their views disappear
    shapeContainer.shapePieces.addItemAddedListener( this.addShapePiece.bind( this ) );
    shapeContainer.shapePieces.addItemRemovedListener( this.removeShapePiece.bind( this ) );
    shapeContainer.shapePieces.forEach( this.addShapePiece.bind( this ) );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeContainerNode', ShapeContainerNode );

  return inherit( Node, ShapeContainerNode, {
    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    addShapePiece: function( shapePiece ) {
      assert && assert( shapePiece.representation === this.shapeContainer.representation );

      var shapePieceNode = new ShapePieceNode( shapePiece );

      var ratio = this.shapeContainer.getShapeRatio( shapePiece );
      shapePieceNode.matrix = ShapeContainer.getShapeMatrix( ratio, shapePiece.fraction, shapePiece.representation );

      this.shapePieceNodes.push( shapePieceNode );
      this.shapePieceLayer.addChild( shapePieceNode );
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
      this.shapePieceLayer.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    }
  } );
} );
