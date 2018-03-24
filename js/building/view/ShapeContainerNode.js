// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * Its layout should be based around this node being centered (locally) around the proper origin
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
  var ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_WIDTH / 2;
  var BAR_WIDTH = FractionsCommonConstants.SHAPE_WIDTH;
  var BAR_HEIGHT = FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapeContainer} shapeContainer
   * @param {Object} [options]
   */
  function ShapeContainerNode( shapeContainer, options ) {
    assert && assert( shapeContainer instanceof ShapeContainer );

    Node.call( this );

    // @public {ShapeContainer}
    this.shapeContainer = shapeContainer;

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = [];

    // @private {Node}
    this.shapePieceLayer = new Node();

    var separatorPath = new Path( null, {
      stroke: FractionsCommonColorProfile.shapeContainerPartitionProperty,
      lineDash: [ 5, 5 ]
    } );

    // Background
    if ( shapeContainer.representation === Representation.CIRCLE ) {
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
        stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty
      } ) );
    }
    else if ( shapeContainer.representation === Representation.VERTICAL_BAR ) {
      this.addChild( new Rectangle( -BAR_WIDTH / 2, -BAR_HEIGHT / 2, BAR_WIDTH, BAR_HEIGHT, {
        fill: FractionsCommonColorProfile.shapeContainerFillProperty
      } ) );
      this.addChild( this.shapePieceLayer );
      this.addChild( separatorPath );
      shapeContainer.partitionDenominatorProperty.link( function( denominator ) {
        var separatorShape = new Shape();
        for ( var i = 1; i < denominator; i++ ) {
          var x = ( i / denominator - 0.5 ) * BAR_WIDTH;
          separatorShape.moveTo( x, -BAR_HEIGHT / 2 ).lineTo( x, BAR_HEIGHT / 2 );
        }
        separatorPath.shape = separatorShape;
      } );
      this.addChild( new Rectangle( -BAR_WIDTH / 2, -BAR_HEIGHT / 2, BAR_WIDTH, BAR_HEIGHT, {
        stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty
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
      if ( this.shapeContainer.representation === Representation.CIRCLE ) {
        shapePieceNode.rotation = -2 * Math.PI * ratio;
      }
      else if ( this.shapeContainer.representation === Representation.VERTICAL_BAR ) {
        shapePieceNode.x = ( ratio - 0.5 ) * BAR_WIDTH;
      }
      else {
        throw new Error( 'Unsupported representation for ShapeContainerNode: ' + this.shapeContainer.representation );
      }

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

      this.shapePieceNodes.remove( shapePieceNode );
      this.shapePieceLayer.removeChild( shapePieceNode );
    }
  } );
} );
