// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Shape = require( 'KITE/Shape' );
  var ShapeContainerNode = require( 'FRACTIONS_COMMON/building/view/ShapeContainerNode' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var CONTAINER_PADDING = FractionsCommonConstants.SHAPE_CONTAINER_PADDING;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapeGroup} shapeGroup
   * @param {Object} [options]
   */
  function ShapeGroupNode( shapeGroup, options ) {
    assert && assert( shapeGroup instanceof ShapeGroup );

    var self = this;

    options = _.extend( {
      isIcon: false, // TODO: cleanup?
      isSelectedProperty: new BooleanProperty( true ),
      dropListener: null,
      selectListener: null,
    }, options );

    // TODO: animation

    Node.call( this );

    // @public {ShapeGroup}
    this.shapeGroup = shapeGroup;

    // @public {ObservableArray.<ShapeContainerNode>} TODO: don't require this being public
    this.shapeContainerNodes = new ObservableArray();

    // @private {Node}
    this.shapeContainerLayer = new Node( {
      cursor: 'pointer' // We are where our input listener is added
    } );
    this.addChild( this.shapeContainerLayer );

    // @private {Node}
    this.controlLayer = new Node();
    this.addChild( this.controlLayer );

    options.isSelectedProperty.linkAttribute( this.controlLayer, 'visible' );

    // NOTE: Groups will disappear whenever their views disappear
    shapeGroup.shapeContainers.addItemAddedListener( this.addShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.addItemRemovedListener( this.removeShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.forEach( this.addShapeContainer.bind( this ) );    

    assert && assert( shapeGroup.shapeContainers.length > 0 );

    // TODO: reduplicate?
    var lineSize = 8;
    var addContainerButton = new MutableOptionsNode( RoundPushButton, [], {
      content: new Path( new Shape().moveTo( -lineSize, 0 ).lineTo( lineSize, 0 ).moveTo( 0, -lineSize ).lineTo( 0, lineSize ), {
        stroke: 'black',
        lineCap: 'round',
        lineWidth: 3.75
      } ),
      radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
      listener: function() {
        shapeGroup.increaseContainerCount();
      },
      enabled: !options.isIcon
    }, {
      baseColor: FractionsCommonColorProfile.greenRoundArrowButtonProperty
    } );
    var removeContainerButton = new MutableOptionsNode( RoundPushButton, [], {
      content: new Path( new Shape().moveTo( -lineSize, 0 ).lineTo( lineSize, 0 ), {
        stroke: 'black',
        lineCap: 'round',
        lineWidth: 3.75
      } ),
      radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
      listener: function() {
        shapeGroup.decreaseContainerCount();
      },
      enabled: !options.isIcon
    }, {
      baseColor: FractionsCommonColorProfile.redRoundArrowButtonProperty
    } );

    shapeGroup.shapeContainers.lengthProperty.link( function( numShapeContainers ) {
      addContainerButton.visible = numShapeContainers < FractionsCommonConstants.MAX_SHAPE_CONTAINERS;
      removeContainerButton.visible = numShapeContainers > 1;
    } );

    // @private {Node}
    this.rightButtonBox = new VBox( {
      spacing: CONTAINER_PADDING,
      children: [ addContainerButton, removeContainerButton ],
      centerY: 0
    } );
    this.controlLayer.addChild( this.rightButtonBox );
    this.updateRightButtonPosition();

    this.controlLayer.addChild( new HBox( {
      spacing: CONTAINER_PADDING,
      children: [
        new RoundArrowButton( {
          arrowRotation: -Math.PI / 2,
          enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
            return !options.isIcon && ( denominator > shapeGroup.partitionDenominatorProperty.range.min );
          } ),
          listener: function() {
            shapeGroup.partitionDenominatorProperty.value -= 1;
          }
        } ),
        new RoundArrowButton( {
          arrowRotation: Math.PI / 2,
          enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
            return !options.isIcon && ( denominator < shapeGroup.partitionDenominatorProperty.range.max );
          } ),
          listener: function() {
            shapeGroup.partitionDenominatorProperty.value += 1;
          }
        } )
      ],
      // TODO: improve? This is safe, given we can't trust container bounds
      top: ( shapeGroup.representation === Representation.VERTICAL_BAR ? FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT : FractionsCommonConstants.SHAPE_SIZE ) / 2 + CONTAINER_PADDING - 3,
      centerX: 0
    } ) );

    // TODO: Copied from UndoButton in expression-exchange. IF this is kept as-is, factor out into a common component.
    var ICON_HEIGHT = 17; // empirically determined, controls size of icon
    var undoArrowShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( 0, ICON_HEIGHT )
      .lineTo( ICON_HEIGHT, ICON_HEIGHT )
      .lineTo( ICON_HEIGHT * 0.7, ICON_HEIGHT * 0.7 )
      .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.1, ICON_HEIGHT * 2, ICON_HEIGHT * 0.75 )
      .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.5, ICON_HEIGHT * 0.3, ICON_HEIGHT * 0.3 )
      .close();
    var undoButton = new MutableOptionsNode( RectangularPushButton, [], {
      content: new Path( undoArrowShape, {
        fill: 'black',
        scale: 0.7
      } ),
      xMargin: 5,
      yMargin: 5,
      // TODO: Make it computational
      rightBottom: shapeGroup.representation === Representation.VERTICAL_BAR ? new Vector2( -50, -75 / 2 ) : new Vector2( -36, -36 ),
      listener: function() {
        shapeGroup.undoPiece();
      }
    }, {
      baseColor: FractionsCommonColorProfile.undoButtonProperty
    } );

    var undoArrowContainer = new Node();
    function updateUndoVisibility() {
      undoArrowContainer.children = shapeGroup.hasAnyPieces() ? [ undoButton ] : [];
    }
    shapeGroup.changedEmitter.addListener( updateUndoVisibility );
    updateUndoVisibility();
    this.controlLayer.addChild( undoArrowContainer );

    shapeGroup.positionProperty.linkAttribute( this, 'translation' );

    // @public {DragListener}
    this.dragListener = new DragListener( {
      // TODO: drag bounds
      targetNode: this,
      locationProperty: shapeGroup.positionProperty,
      start: function( event ) {
        options.selectListener && options.selectListener();
        self.moveToFront();
      },
      end: function( event ) {
        options.dropListener && options.dropListener();
      }
    } );
    this.shapeContainerLayer.addInputListener( this.dragListener );

    this.addInputListener( {
      down: function( event ) {
        options.selectListener && options.selectListener();
        event.handle();
      }
    } );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeGroupNode', ShapeGroupNode );

  return inherit( Node, ShapeGroupNode, {
    // TODO: doc
    updateRightButtonPosition: function() {
      // TODO;
      if ( this.rightButtonBox ) {
        // Subtracts 0.5 since our containers have their origins in their centers
        this.rightButtonBox.left = ( this.shapeContainerNodes.length - 0.5 ) * ( FractionsCommonConstants.SHAPE_SIZE + CONTAINER_PADDING );
      }
    },

    /**
     * Adds a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    addShapeContainer: function( shapeContainer ) {
      var shapeContainerNode = new ShapeContainerNode( shapeContainer );
      this.shapeContainerNodes.push( shapeContainerNode );
      this.shapeContainerLayer.addChild( shapeContainerNode );
      this.updateRightButtonPosition();
    },

    /**
     * Removes a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    removeShapeContainer: function( shapeContainer ) {
      var shapeContainerNode = this.shapeContainerNodes.find( function( shapeContainerNode ) {
        return shapeContainerNode.shapeContainer === shapeContainer;
      } );
      assert && assert( shapeContainerNode );

      this.shapeContainerNodes.remove( shapeContainerNode );
      this.shapeContainerLayer.removeChild( shapeContainerNode );
      this.updateRightButtonPosition();
    }
  } );
} );
