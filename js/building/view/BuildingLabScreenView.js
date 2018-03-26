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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
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

    // @private
    this.model = model;

    ScreenView.call( this );

    // @public {ModelViewTransform2}
    this.modelViewTransform = new ModelViewTransform2( Matrix3.translationFromVector( this.layoutBounds.center ) );

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
            shapePiece.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
            model.activeShapePieces.push( shapePiece );
            // TODO: factor this "find" usage out
            var shapePieceNode = _.find( self.shapePieceNodes, function( shapePieceNode ) {
              return shapePieceNode.shapePiece === shapePiece;
            } );
            shapePieceNode.dragListener.press( event, shapePieceNode );
          } )
        ]
      } );
    }
    var circleStackNodes = model.circleStacks.map( createStackNode );
    var barStackNodes = model.barStacks.map( createStackNode );

    function createGroupIcon( representation ) {
      var iconGroup = new ShapeGroup( representation );
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
            var shapeGroup = model.addShapeGroup( representation );
            shapeGroup.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
            var shapeGroupNode = _.find( self.shapeGroupNodes, function( shapeGroupNode ) {
              return shapeGroupNode.shapeGroup === shapeGroup;
            } );
            shapeGroupNode.dragListener.press( event, shapeGroupNode );
            event.handle(); // for our selection
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

    // @private {Node}
    this.groupLayer = new Node();

    // @private {Node}
    this.pieceLayer = new Node();

    // @private {Array.<ShapeGroupNode>}
    this.shapeGroupNodes = []; // TODO: interrupt on reset

    model.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
    model.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
    model.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = []; // TODO: interrupt on reset

    model.activeShapePieces.addItemAddedListener( function( shapePiece ) {
      var shapePieceNode = new ShapePieceNode( shapePiece, {
        positioned: true,
        modelViewTransform: self.modelViewTransform,
        dropListener: function() {
          // TODO: touch increase
          // TODO: rename method to include droppable?
          var shapeContainer = model.getClosestShapeContainer( shapePiece, 0 );
          if ( shapeContainer ) {
            shapeContainer.shapePieces.push( shapePiece );
            // TODO: animate
            model.activeShapePieces.remove( shapePiece );
            // shapePiece.animateTo( getLocationInContainer, groupPositionWhatever -- to invalidate in motion, someCallbackWHenDoneThatRemoves )
            // NOTE: Handle it if it starts animation and THEN the piece gets moved somewhere else. Instant animate
          }
          else {
            // TODO: animate
            model.activeShapePieces.remove( shapePiece );
            // shapePiece.animateTo( getLocationInPanel, visibleBOundsProperty -- to invalidate in motion, someCallbackWHenDoneThatRemoves )
          }
        }
      } );
      self.shapePieceNodes.push( shapePieceNode );
      self.pieceLayer.addChild( shapePieceNode );
    } );
    model.activeShapePieces.addItemRemovedListener( function( shapePiece ) {
      var shapePieceNode = _.find( self.shapePieceNodes, function( shapePieceNode ) {
        return shapePieceNode.shapePiece === shapePiece;
      } );

      arrayRemove( self.shapePieceNodes, shapePieceNode );
      self.pieceLayer.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    } );

    phet.joist.display.addInputListener( {
      down: function() {
        // Any event on a shape group should handle it.
        // TODO: How do we.... handle number groups? Use same property presumably. TODO
        model.selectedShapeGroupProperty.value = null;
      }
    } );

    // @private {Node}
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var topAlignBox = new AlignBox( this.shapePanel, {
      xAlign: 'center',
      yAlign: 'top',
      margin: PANEL_MARGIN
    } );

    var bottomRightAlignBox = new AlignBox( resetAllButton, {
      xAlign: 'right',
      yAlign: 'bottom',
      margin: PANEL_MARGIN
    } );

    this.visibleBoundsProperty.link( function( visibleBounds ) {
      topAlignBox.alignBounds = visibleBounds;
      bottomRightAlignBox.alignBounds = visibleBounds;
    } );

    this.children = [
      bottomRightAlignBox,
      topAlignBox,
      this.groupLayer,
      this.pieceLayer
    ];
  }

  fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );

  return inherit( ScreenView, BuildingLabScreenView, {
    addShapeGroup: function( shapeGroup ) {
      var self = this;

      var shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        modelViewTransform: this.modelViewTransform,
        dropListener: function() {
          // TODO: What about groups with lots of containers?
          if ( self.shapePanel.bounds.dilated( 10 ).containsPoint( self.modelViewTransform.modelToViewPosition( shapeGroup.positionProperty.value ) ) ) {
            self.model.removeShapeGroup( shapeGroup );
          }
        },
        selectListener: function() {
          self.model.selectedShapeGroupProperty.value = shapeGroup;
        },
        removeLastListener: function() {
          self.model.removeLastPieceFromGroup( shapeGroup );
        },
        isSelectedProperty: new DerivedProperty( [ self.model.selectedShapeGroupProperty ], function( selectedShapeGroup ) {
          return selectedShapeGroup === shapeGroup;
        } )
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
