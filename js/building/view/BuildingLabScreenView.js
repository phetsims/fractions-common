// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var arrayRemove = require( 'PHET_CORE/arrayRemove' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  var ShapeStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeStackNode' );

  // constants
  var PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {BuildingLabModel} model
   */
  function BuildingLabScreenView( model ) {
    var self = this;

    ScreenView.call( this );

    // TODO: Move all this code out to a named panel?
    var representationSelectionNode = new MutableOptionsNode( RadioButtonGroup, [ model.topRepresentationProperty, [
      {
        value: Representation.CIRCLE,
        node: new ShapePieceNode( new ShapePiece( new Fraction( 1, 1 ), Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty ), {
          scale: 0.3
        } )
      },
      {
        value: Representation.VERTICAL_BAR,
        node: new ShapePieceNode( new ShapePiece( new Fraction( 1, 1 ), Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty ), {
          scale: 0.3
        } )
      }
    ] ], _.extend( {
      orientation: 'vertical',
      buttonContentXMargin: 6,
      buttonContentYMargin: 6,
      selectedLineWidth: 2,
      touchAreaXDilation: 5,
      touchAreaYDilation: 2.5,
      spacing: 5
    } ), {
      selectedStroke: FractionsCommonColorProfile.radioStrokeProperty,
      baseColor: FractionsCommonColorProfile.radioBaseProperty
    } );

    var stackAlignGroup = new AlignGroup();
    function createStackNode( stack ) {
      var node = new ShapeStackNode( stack, {
        pickable: false
      } );
      return new AlignBox( node, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            var shapePiece = new ShapePiece( stack.fraction, stack.representation, stack.colorProperty );
            var shapePieceNode = new ShapePieceNode( shapePiece, {
              dropListener: function() {
                arrayRemove( self.shapePieceNodes, shapePieceNode );
                self.pieceLayer.removeChild( shapePieceNode );
                var shapeContainer = self.getClosestShapeContainer( shapePiece, 1 );
                if ( shapeContainer ) {
                  shapeContainer.shapePieces.push( shapePiece );
                }
              }
            } );
            self.shapePieceNodes.push( shapePieceNode );
            self.pieceLayer.addChild( shapePieceNode );
            // TODO: don't require this be set after the node creation, see our lazy link in the node
            shapePiece.positionProperty.value = self.globalToLocalPoint( event.pointer.point );
            shapePieceNode.dragListener.press( event, shapePieceNode );
          } )
        ]
      } );
    }
    var circleStackNodes = model.circleStacks.map( createStackNode );
    var barStackNodes = model.barStacks.map( createStackNode );

    function createGroupIcon( representation ) {
      var iconGroup = new ShapeGroup( representation );
      iconGroup.increaseContainerCount();
      var iconNode = new ShapeGroupNode( iconGroup, {
        isIcon: true,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        pickable: false
      } );
      // TODO: better way? At least this is safe
      iconNode.localBounds = iconNode.localBounds.withMinY( iconNode.localBounds.minY - 2 * iconNode.localBounds.centerY );
      return new AlignBox( iconNode, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            // TODO: encapsulation
            var shapeGroup = new ShapeGroup( representation );
            shapeGroup.increaseContainerCount();
            shapeGroup.positionProperty.value = self.globalToLocalPoint( event.pointer.point );
            model.shapeGroups.push( shapeGroup );
            var shapeGroupNode = _.find( self.shapeGroupNodes, function( shapeGroupNode ) {
              return shapeGroupNode.shapeGroup === shapeGroup;
            } );
            shapeGroupNode.dragListener.press( event, shapeGroupNode );
          } )
        ]
      } );
    }
    var circleGroupIcon = createGroupIcon( Representation.CIRCLE );
    var barGroupIcon = createGroupIcon( Representation.VERTICAL_BAR );

    var STACK_PADDING = 20;

    // TODO: a better way of doing this. maybe make it an AlignBox feature
    function linkPointerAreas( node ) {
      Property.multilink( [ stackAlignGroup.maxWidthProperty, stackAlignGroup.maxHeightProperty ], function( width, height ) {
        var bounds = new Bounds2( -STACK_PADDING / 2, 0, width + STACK_PADDING / 2, height );
        node.mouseArea = bounds;
        node.touchArea = bounds;
      } );
    }
    circleStackNodes.forEach( linkPointerAreas );
    barStackNodes.forEach( linkPointerAreas );
    linkPointerAreas( circleGroupIcon );
    linkPointerAreas( barGroupIcon );

    var shapeBox = new HBox( {
      spacing: STACK_PADDING
    } );
    model.topRepresentationProperty.link( function( representation ) {
      var leftSideNodes = [ representationSelectionNode ];
      var middleNodes = representation === Representation.CIRCLE ? circleStackNodes : barStackNodes;
      var rightSideNodes = [ representation === Representation.CIRCLE ? circleGroupIcon : barGroupIcon ];
      shapeBox.children = leftSideNodes.concat( middleNodes ).concat( rightSideNodes );
    } );

    // TODO: background color customizable
    // @private {Panel}
    this.shapePanel = new Panel( shapeBox, {
      xMargin: 15
    } );
    this.shapePanel.centerTop = this.layoutBounds.centerTop.plusXY( 0, PANEL_MARGIN );
    this.addChild( this.shapePanel );

    // @private {Node}
    this.groupLayer = new Node();
    this.addChild( this.groupLayer );

    // @private {Node}
    this.pieceLayer = new Node();
    this.addChild( this.pieceLayer );

    // @private {Array.<ShapeGroupNode>}
    this.shapeGroupNodes = []; // TODO: interrupt on reset

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = []; // TODO: interrupt on reset

    model.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
    model.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
    model.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );

  return inherit( ScreenView, BuildingLabScreenView, {
    // container or null TODO doc it
    // TODO: model method?
    getClosestShapeContainer: function( shapePiece, threshold ) {
      // TODO: This is a wreck. Move more position info into the model
      var closestContainer = null;
      var closestDistance = threshold; // TODO: a threshold
      // TODO: LOTS of cleanup, holy crap. Decide how much layout info goes in the model (probably all)
      this.shapeGroupNodes.forEach( function( shapeGroupNode ) {
        if ( shapeGroupNode.shapeGroup.representation === shapePiece.representation ) {
          shapeGroupNode.shapeContainerNodes.forEach( function( shapeContainerNode ) {
            var shapeContainer = shapeContainerNode.shapeContainer;

            if ( shapeContainer.canFitPiece( shapePiece ) ) {
              // TODO: UNCLEAN use of view. Handle this in the model
              var localPoint = shapePiece.positionProperty.value.minus( shapeGroupNode.translation ).minus( shapeContainerNode.translation );
              var distance;
              if ( shapePiece.representation === Representation.CIRCLE ) {
                distance = Math.max( 0, localPoint.magnitude() - FractionsCommonConstants.SHAPE_WIDTH / 2 );
              }
              // TODO: other checks
              else {
                distance = Math.sqrt( shapeContainerNode.localBounds.minimumDistanceToPointSquared( localPoint ) );
              }
              if ( distance < closestDistance ) {
                closestContainer = shapeContainerNode.shapeContainer;
                closestDistance = distance;
              }
            }
            
          } );
        }
      } );
      return closestContainer;
    },

    addShapeGroup: function( shapeGroup ) {
      var self = this;

      var shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        dropListener: function() {
          if ( shapeGroup.positionProperty.value.y < self.shapePanel.bottom ) {
            self.removeShapeGroup( shapeGroup );
          }
        }
      } );
      this.shapeGroupNodes.push( shapeGroupNode );
      this.groupLayer.addChild( shapeGroupNode );
    },

    removeShapeGroup: function( shapeGroup ) {
      var shapeGroupNode = _.find( this.shapeGroupNodes, function( shapeGroupNode ) {
        return shapeGroupNode.shapeGroup === shapeGroup;
      } );
      assert && assert( shapeGroupNode );

      arrayRemove( this.shapeGroupNodes, shapeGroupNode );
      this.groupLayer.removeChild( shapeGroupNode );
    },

    step: function( dt ) {

    }
  } );
} );
