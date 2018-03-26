// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  var ShapeStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeStackNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {BuildingLabModel} model
   * @param {Object} options
   */
  function LabShapePanel( model, options ) {
    var self = this;

    options = _.extend( {
      dragPieceFromStackListener: null,
      dragGroupFromStackListener: null
    }, options );

    // @private {Property.<Representation>}
    this.representationProperty = model.topRepresentationProperty;

    // TODO: Move all this code out to a named panel?
    var representationSelectionNode = new MutableOptionsNode( RadioButtonGroup, [ this.representationProperty, [
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

    // @private {Array.<ShapeStackNode>}
    this.shapeStackNodes = [];

    var stackAlignGroup = new AlignGroup();
    function createStackNode( stack ) {
      var node = new ShapeStackNode( stack, {
        pickable: false
      } );
      self.shapeStackNodes.push( node );
      return new AlignBox( node, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            // TODO: doc
            options.dragPieceFromStackListener( event, stack );
          } )
        ]
      } );
    }
    var circleStackNodes = model.circleStacks.map( createStackNode );
    var barStackNodes = model.barStacks.map( createStackNode );

    // @private {Array.<ShapeGroupNode>}
    this.shapeGroupNodes = [];

    function createGroupIcon( representation ) {
      var iconGroup = new ShapeGroup( representation );
      var iconNode = new ShapeGroupNode( iconGroup, {
        isIcon: true,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        pickable: false
      } );
      self.shapeGroupNodes.push( iconNode );
      // TODO: better way? At least this is safe
      iconNode.localBounds = iconNode.localBounds.withMinY( iconNode.localBounds.minY - 2 * iconNode.localBounds.centerY );
      return new AlignBox( iconNode, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            options.dragGroupFromStackListener( event, representation );
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
    this.representationProperty.link( function( representation ) {
      var leftSideNodes = [ representationSelectionNode ];
      var middleNodes = representation === Representation.CIRCLE ? circleStackNodes : barStackNodes;
      var rightSideNodes = [ representation === Representation.CIRCLE ? circleGroupIcon : barGroupIcon ];
      shapeBox.children = leftSideNodes.concat( middleNodes ).concat( rightSideNodes );
    } );

    // TODO: background color customizable
    Panel.call( this, shapeBox, {
      xMargin: 15
    } );
  }

  fractionsCommon.register( 'LabShapePanel', LabShapePanel );

  return inherit( Panel, LabShapePanel, {
    /**
     * Since only one representation has positions at a time (even if they don't change), we need to do some legwork.
     * @public
     *
     * @param {Fraction} fraction
     * @returns {Vector2}
     */
    getStackLocation: function( fraction ) {
      for ( var i = 0; i < this.shapeStackNodes.length; i++ ) {
        var shapeStackNode = this.shapeStackNodes[ i ];
        var shapeStack = shapeStackNode.shapeStack;
        if ( shapeStack.fraction.equals( fraction ) && shapeStack.representation === this.representationProperty.value ) {
          return shapeStackNode.getUniqueTrailTo( this ).localToGlobalPoint( Vector2.ZERO );
        }
      }
      throw new Error( 'Stack location not found!' );
    }
  } );
} );
