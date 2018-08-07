// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
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
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Shape = require( 'KITE/Shape' );
  var ShapeContainerNode = require( 'FRACTIONS_COMMON/building/view/ShapeContainerNode' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var TemporaryUndoButton = require( 'FRACTIONS_COMMON/building/view/TemporaryUndoButton' );
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
      isSelectedProperty: new BooleanProperty( true ), // takes ownership, will dispose at the end
      dropListener: null,
      selectListener: null,
      removeLastListener: null,
      dragBoundsProperty: null,
      modelViewTransform: null // {ModelViewTransform2|null} - Not needed if we are an icon
    }, options );

    // TODO: animation

    Node.call( this );

    // @public {ShapeGroup}
    this.shapeGroup = shapeGroup;

    // @public {ObservableArray.<ShapeContainerNode>} TODO: don't require this being public
    this.shapeContainerNodes = new ObservableArray();

    // @private {Property.<Bounds2>}
    this.generalDragBoundsProperty = options.dragBoundsProperty;

    // @private {Node}
    this.shapeContainerLayer = new Node( {
      cursor: 'pointer' // We are where our input listener is added
    } );
    this.addChild( this.shapeContainerLayer );

    // @private {Node}
    this.controlLayer = new Node();
    this.addChild( this.controlLayer );

    // @private {Property.<boolean>}
    this.isSelectedProperty = options.isSelectedProperty;
    this.isSelectedProperty.linkAttribute( this.controlLayer, 'visible' );

    // NOTE: Groups will disappear whenever their views disappear
    shapeGroup.shapeContainers.addItemAddedListener( this.addShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.addItemRemovedListener( this.removeShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.forEach( this.addShapeContainer.bind( this ) );

    assert && assert( shapeGroup.shapeContainers.length > 0 );

    // TODO: reduplicate?
    var lineSize = 8;
    // @private {Node}
    this.addContainerButton = new MutableOptionsNode( RoundPushButton, [], {
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
    // @private {Node}
    this.removeContainerButton = new MutableOptionsNode( RoundPushButton, [], {
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
      self.addContainerButton.visible = numShapeContainers < FractionsCommonConstants.MAX_SHAPE_CONTAINERS;
      self.removeContainerButton.visible = numShapeContainers > 1;
    } );

    // @private {Node}
    this.rightButtonBox = new VBox( {
      spacing: CONTAINER_PADDING,
      children: [ this.addContainerButton, this.removeContainerButton ],
      centerY: 0
    } );
    this.controlLayer.addChild( this.rightButtonBox );
    this.updateRightButtonPosition();

    // @private {Node}
    this.decreasePartitionCountButton = new RoundArrowButton( {
      arrowRotation: -Math.PI / 2,
      enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
        return !options.isIcon && ( denominator > shapeGroup.partitionDenominatorProperty.range.min );
      } ),
      listener: function() {
        shapeGroup.partitionDenominatorProperty.value -= 1;
      }
    } );
    // @private {Node}
    this.increasePartitionCountButton = new RoundArrowButton( {
      arrowRotation: Math.PI / 2,
      enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
        return !options.isIcon && ( denominator < shapeGroup.partitionDenominatorProperty.range.max );
      } ),
      listener: function() {
        shapeGroup.partitionDenominatorProperty.value += 1;
      }
    } );

    this.controlLayer.addChild( new HBox( {
      spacing: CONTAINER_PADDING,
      children: [ this.decreasePartitionCountButton, this.increasePartitionCountButton ],
      // TODO: improve? This is safe, given we can't trust container bounds
      top: ( shapeGroup.representation === Representation.VERTICAL_BAR ? FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT : FractionsCommonConstants.SHAPE_SIZE ) / 2 + CONTAINER_PADDING - 3,
      centerX: 0
    } ) );

    // @private {Node}
    this.undoButton = new TemporaryUndoButton( options.removeLastListener, {
      // TODO: Make it computational
      rightBottom: shapeGroup.representation === Representation.VERTICAL_BAR ? new Vector2( -50, -75 / 2 ) : new Vector2( -36, -36 )
    } );

    var undoArrowContainer = new Node();
    function updateUndoVisibility() {
      undoArrowContainer.children = shapeGroup.hasAnyPieces() ? [ self.undoButton ] : [];
    }
    shapeGroup.changedEmitter.addListener( updateUndoVisibility );
    updateUndoVisibility();
    this.controlLayer.addChild( undoArrowContainer );

    // TODO: Presumably won't need an unlink, since our lifetimes are the same
    if ( !options.isIcon ) {
      // TODO: proper disposal handling!
      shapeGroup.positionProperty.link( function( position ) {
        self.translation = options.modelViewTransform.modelToViewPosition( position );
      } );
      shapeGroup.scaleProperty.link( function( scale ) {
        self.setScaleMagnitude( scale );
      } );

      // Don't allow touching once we start animating
      shapeGroup.isAnimatingProperty.link( function( isAnimating ) {
        if ( isAnimating ) {
          self.pickable = false;
        }
      } );

      // @private {Property.<Bounds2>}
      this.dragBoundsProperty = new Property( Bounds2.NOTHING );

      this.dragBoundsListener = this.updateDragBounds.bind( this );
      this.generalDragBoundsProperty.link( this.dragBoundsListener );

      // Keep the group in the drag bounds (when they change)
      this.dragBoundsProperty.lazyLink( function( dragBounds ) {
        shapeGroup.positionProperty.value = dragBounds.closestPointTo( shapeGroup.positionProperty.value );
      } );

      // @public {DragListener}
      this.dragListener = new DragListener( {
        // TODO: drag bounds
        targetNode: this,
        dragBoundsProperty: this.dragBoundsProperty,
        locationProperty: shapeGroup.positionProperty,
        transform: options.modelViewTransform,
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
    }


    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeGroupNode', ShapeGroupNode );

  return inherit( Node, ShapeGroupNode, {
    updateDragBounds: function() {
      var safeBounds = this.controlLayer.bounds.union( this.undoButton.bounds ); // undo button not always in the control layer

      var containerTop = -( this.shapeGroup.representation === Representation.CIRCLE ? FractionsCommonConstants.SHAPE_SIZE : FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT ) / 2;
      safeBounds = safeBounds.withMinY( Math.min( safeBounds.top, containerTop ) );
      this.dragBoundsProperty.value = this.generalDragBoundsProperty.value.withOffsets( safeBounds.left, safeBounds.top, -safeBounds.right, -safeBounds.bottom );
    },

    // TODO: doc
    updateRightButtonPosition: function() {
      // TODO;
      if ( this.rightButtonBox ) {
        // Subtracts 0.5 since our containers have their origins in their centers
        this.rightButtonBox.left = ( this.shapeContainerNodes.length - 0.5 ) * ( FractionsCommonConstants.SHAPE_SIZE + CONTAINER_PADDING );

        // TODO:
        if ( this.undoButton ) {
          this.updateDragBounds();
        }
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
    },

    /**
     * Releases references
     * @public
     * @override
     */
    dispose: function() {
      Node.prototype.dispose.call( this );

      this.decreasePartitionCountButton.dispose();
      this.increasePartitionCountButton.dispose();
      this.addContainerButton.dispose();
      this.removeContainerButton.dispose();
      this.undoButton.dispose();
      this.isSelectedProperty.dispose();
      this.generalDragBoundsProperty.unlink( this.dragBoundsListener );
      this.dragListener.dispose();
    }
  }, {
    createIcon: function( representation ) {
      var iconNode = new ShapeGroupNode( new ShapeGroup( representation ), {
        isIcon: true,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        pickable: false
      } );
      // TODO: better way? At least this is safe
      iconNode.localBounds = iconNode.localBounds.withMinY( iconNode.localBounds.minY - 2 * iconNode.localBounds.centerY );
      return iconNode;
    }
  } );
} );
