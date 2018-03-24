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
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
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
    var circleStackNodes = model.circleStacks.map( function( circleStack ) {
      return new AlignBox( new ShapeStackNode( circleStack ), { group: stackAlignGroup } );
    } );
    var barStackNodes = model.barStacks.map( function( barStack ) {
      return new AlignBox( new ShapeStackNode( barStack ), { group: stackAlignGroup } );
    } );

    function createGroupIcon( representation ) {
      var iconGroup = new ShapeGroup( representation );
      iconGroup.increaseContainerCount();
      var iconNode = new ShapeGroupNode( iconGroup, {
        isIcon: true,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE
      } );
      // TODO: better way? At least this is safe
      iconNode.localBounds = iconNode.localBounds.withMinY( iconNode.localBounds.minY - 2 * iconNode.localBounds.centerY );
      return new AlignBox( iconNode, { group: stackAlignGroup } );
    }
    var circleGroupIcon = createGroupIcon( Representation.CIRCLE );
    var barGroupIcon = createGroupIcon( Representation.VERTICAL_BAR );

    var shapeBox = new HBox( {
      spacing: 20
    } );
    model.topRepresentationProperty.link( function( representation ) {
      var leftSideNodes = [ representationSelectionNode ];
      var middleNodes = representation === Representation.CIRCLE ? circleStackNodes : barStackNodes;
      var rightSideNodes = [ representation === Representation.CIRCLE ? circleGroupIcon : barGroupIcon ];
      shapeBox.children = leftSideNodes.concat( middleNodes ).concat( rightSideNodes );
    } );

    // TODO: background color customizable
    var shapePanel = new Panel( shapeBox, {
      xMargin: 15
    } );
    shapePanel.centerTop = this.layoutBounds.centerTop.plusXY( 0, PANEL_MARGIN );
    this.addChild( shapePanel );

    // @private {Node}
    this.groupLayer = new Node();
    this.addChild( this.groupLayer );

    // @private {Array.<ShapeGroupNode>}
    this.shapeGroupNodes = [];

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
    addShapeGroup: function( shapeGroup ) {
      var shapeGroupNode = new ShapeGroupNode( shapeGroup );
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
