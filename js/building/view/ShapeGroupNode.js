// Copyright 2018, University of Colorado Boulder

/**
 * View for a ShapeGroup.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/model/BuildingRepresentation' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const GroupNode = require( 'FRACTIONS_COMMON/building/view/GroupNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const ReturnButton = require( 'FRACTIONS_COMMON/building/view/ReturnButton' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  const Shape = require( 'KITE/Shape' );
  const ShapeContainerNode = require( 'FRACTIONS_COMMON/building/view/ShapeContainerNode' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const CONTAINER_PADDING = FractionsCommonConstants.SHAPE_CONTAINER_PADDING;

  class ShapeGroupNode extends GroupNode {
    /**
     * @param {ShapeGroup} shapeGroup
     * @param {Object} [options]
     */
    constructor( shapeGroup, options ) {
      assert && assert( shapeGroup instanceof ShapeGroup );

      options = _.extend( {
        hasButtons: true,
        removeLastListener: null,
        dragBoundsProperty: null
      }, options );

      super( shapeGroup, options );

      // @public {ShapeGroup}
      this.shapeGroup = shapeGroup;

      // @private {ObservableArray.<ShapeContainerNode>}
      this.shapeContainerNodes = new ObservableArray();

      // @private {Property.<Bounds2>} - Our original drag bounds (which we'll need to map before providing to our
      // drag listener)
      this.generalDragBoundsProperty = options.dragBoundsProperty;

      // @private {Node}
      this.shapeContainerLayer = new Node( {
        cursor: 'pointer' // We are where our input listener is added
      } );
      this.addChild( this.shapeContainerLayer );

      // @private {Node}
      this.controlLayer = new Node();
      this.addChild( this.controlLayer );

      this.isSelectedProperty.linkAttribute( this.controlLayer, 'visible' );

      // @private {function}
      this.addShapeContainerListener = this.addShapeContainer.bind( this );
      this.removeShapeContainerListener = this.removeShapeContainer.bind( this );

      this.shapeGroup.shapeContainers.addItemAddedListener( this.addShapeContainerListener );
      this.shapeGroup.shapeContainers.addItemRemovedListener( this.removeShapeContainerListener );
      this.shapeGroup.shapeContainers.forEach( this.addShapeContainerListener );

      assert && assert( shapeGroup.shapeContainers.length > 0 );

      const lineSize = 8;

      // @private {Node}
      this.addContainerButton = new RoundPushButton( {
        content: new Path( new Shape().moveTo( -lineSize, 0 ).lineTo( lineSize, 0 ).moveTo( 0, -lineSize ).lineTo( 0, lineSize ), {
          stroke: 'black',
          lineCap: 'round',
          lineWidth: 3.75
        } ),
        radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
        listener: shapeGroup.increaseContainerCount.bind( shapeGroup ),
        enabled: !this.isIcon,
        baseColor: FractionsCommonColorProfile.greenRoundArrowButtonProperty
      } );

      // @private {Node}
      this.removeContainerButton = new RoundPushButton( {
        content: new Path( new Shape().moveTo( -lineSize, 0 ).lineTo( lineSize, 0 ), {
          stroke: 'black',
          lineCap: 'round',
          lineWidth: 3.75
        } ),
        radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
        listener: shapeGroup.decreaseContainerCount.bind( shapeGroup ),
        enabled: !this.isIcon,
        baseColor: FractionsCommonColorProfile.redRoundArrowButtonProperty
      } );

      // Touch areas for add/remove buttons
      const addRemoveOffsets = {
        left: CONTAINER_PADDING / 2,
        right: CONTAINER_PADDING * 1.2,
        inside: CONTAINER_PADDING / 2,
        outside: CONTAINER_PADDING
      };
      this.addContainerButton.touchArea = Shape.boundsOffsetWithRadii( this.addContainerButton.localBounds, {
        top: addRemoveOffsets.outside,
        bottom: addRemoveOffsets.inside,
        left: addRemoveOffsets.left,
        right: addRemoveOffsets.right
      }, {
        topRight: 10
      } );
      this.removeContainerButton.touchArea = Shape.boundsOffsetWithRadii( this.removeContainerButton.localBounds, {
        top: addRemoveOffsets.inside,
        bottom: addRemoveOffsets.outside,
        left: addRemoveOffsets.left,
        right: addRemoveOffsets.right
      }, {
        bottomRight: 10
      } );

      // @private {function}
      this.addRemoveVisibleListener = numShapeContainers => {
        this.addContainerButton.visible = numShapeContainers < shapeGroup.maxContainers;
        this.removeContainerButton.visible = numShapeContainers > 1;
      };
      this.shapeGroup.shapeContainers.lengthProperty.link( this.addRemoveVisibleListener );

      // @private {Node}
      this.rightButtonBox = new VBox( {
        spacing: CONTAINER_PADDING,
        children: [ this.addContainerButton, this.removeContainerButton ],
        centerY: 0
      } );
      if ( options.hasButtons && shapeGroup.maxContainers > 1 ) {
        this.controlLayer.addChild( this.rightButtonBox );
      }

      // @private {Property.<boolean>}
      this.decreaseEnabledProperty = new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], denominator => {
        return !this.isIcon && ( denominator > shapeGroup.partitionDenominatorProperty.range.min );
      } );
      this.increaseEnabledProperty = new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], denominator => {
        return !this.isIcon && ( denominator < shapeGroup.partitionDenominatorProperty.range.max );
      } );

      // @private {Node}
      this.decreasePartitionCountButton = new RoundArrowButton( {
        arrowRotation: -Math.PI / 2,
        enabledProperty: this.decreaseEnabledProperty,
        listener: () => {
          shapeGroup.partitionDenominatorProperty.value -= 1;
        }
      } );
      // @private {Node}
      this.increasePartitionCountButton = new RoundArrowButton( {
        arrowRotation: Math.PI / 2,
        enabledProperty: this.increaseEnabledProperty,
        listener: () => {
          shapeGroup.partitionDenominatorProperty.value += 1;
        }
      } );

      // Set up touch areas for the partition buttons
      const partitionCountOffsets = {
        top: CONTAINER_PADDING / 2,
        bottom: CONTAINER_PADDING * 1.2,
        inside: CONTAINER_PADDING / 2,
        outside: CONTAINER_PADDING * 1.5
      };
      this.decreasePartitionCountButton.touchArea = Shape.boundsOffsetWithRadii( this.decreasePartitionCountButton.localBounds, {
        top: partitionCountOffsets.top,
        bottom: partitionCountOffsets.bottom,
        left: partitionCountOffsets.outside,
        right: partitionCountOffsets.inside
      }, {
        bottomLeft: 10
      } );
      this.increasePartitionCountButton.touchArea = Shape.boundsOffsetWithRadii( this.increasePartitionCountButton.localBounds, {
        top: partitionCountOffsets.top,
        bottom: partitionCountOffsets.bottom,
        left: partitionCountOffsets.inside,
        right: partitionCountOffsets.outside
      }, {
        bottomRight: 10
      } );

      if ( options.hasButtons ) {
        this.controlLayer.addChild( new HBox( {
          spacing: CONTAINER_PADDING,
          children: [ this.decreasePartitionCountButton, this.increasePartitionCountButton ],
          top: ( shapeGroup.representation === BuildingRepresentation.BAR ? FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT : FractionsCommonConstants.SHAPE_SIZE ) / 2 + CONTAINER_PADDING - 3,
          centerX: 0
        } ) );
      }

      // @private {Node}
      this.returnButton = new ReturnButton( options.removeLastListener, {
        // constants tuned for current appearance
        rightBottom: shapeGroup.representation === BuildingRepresentation.BAR
          ? new Vector2( -50, -75 / 2 )
          : new Vector2( -36, -36 )
      } );

      // Construct a touch shape
      let returnTouchShape = Shape.boundsOffsetWithRadii( this.returnButton.localBounds, {
        top: 10, left: 10, bottom: 12, right: 12
      }, {
        bottomRight: 10, topLeft: 10, topRight: 10, bottomLeft: 10
      } );
      const returnInverseTransform = Matrix3.translationFromVector( this.returnButton.translation.negated() );
      if ( shapeGroup.representation === BuildingRepresentation.BAR ) {
        returnTouchShape = returnTouchShape.shapeDifference( Shape.bounds( ShapePiece.VERTICAL_BAR_BOUNDS ).transformed( returnInverseTransform ) );
      }
      else {
        returnTouchShape = returnTouchShape.shapeDifference( Shape.circle( 0, 0, FractionsCommonConstants.SHAPE_SIZE / 2 ).transformed( returnInverseTransform ) );
      }
      this.returnButton.touchArea = returnTouchShape;

      const undoArrowContainer = new Node();

      // @private {function}
      this.updateVisibilityListener = () => {
        undoArrowContainer.children = shapeGroup.hasAnyPieces() ? [ this.returnButton ] : [];
      };
      this.shapeGroup.changedEmitter.addListener( this.updateVisibilityListener );
      this.updateVisibilityListener();
      if ( options.hasButtons ) {
        this.controlLayer.addChild( undoArrowContainer );
      }


      if ( !this.isIcon ) {
        // @private {Property.<Bounds2>}
        this.dragBoundsProperty = new Property( Bounds2.NOTHING );

        // @private {function}
        this.dragBoundsListener = this.updateDragBounds.bind( this );
        this.generalDragBoundsProperty.link( this.dragBoundsListener );

        // Keep the group in the drag bounds (when they change)
        this.dragBoundsProperty.lazyLink( dragBounds => {
          shapeGroup.positionProperty.value = dragBounds.closestPointTo( shapeGroup.positionProperty.value );
        } );

        this.attachDragListener( this.dragBoundsProperty, this.shapeContainerLayer, options );
      }

      // Now that we have a return button and drag bounds, we should update right-button positions
      this.updateRightButtonPosition();

      this.mutate( options );
    }

    /**
     * Updates the available drag bounds. This can be influenced not only by the "general" drag bounds (places in the
     * play area), but since our size can change we need to compensate for shifts in size.
     * @private
     */
    updateDragBounds() {
      if ( this.generalDragBoundsProperty ) {
        let safeBounds = this.controlLayer.bounds.union( this.returnButton.bounds ); // undo button not always in the control layer

        const containerTop = -( this.shapeGroup.representation === BuildingRepresentation.PIE ? FractionsCommonConstants.SHAPE_SIZE : FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT ) / 2;
        safeBounds = safeBounds.withMinY( Math.min( safeBounds.top, containerTop ) );
        this.dragBoundsProperty.value = this.generalDragBoundsProperty.value.withOffsets( safeBounds.left, safeBounds.top, -safeBounds.right, -safeBounds.bottom );
      }
    }

    /**
     * Updates the position of the rightButtonBox (and potentially updates drag bounds based on that).
     * @private
     */
    updateRightButtonPosition() {
      // Our container initializers are called before we add things in the subtype, so we need an additional check here.
      if ( this.rightButtonBox ) {
        // Subtracts 0.5 since our containers have their origins in their centers
        this.rightButtonBox.left = ( this.shapeContainerNodes.length - 0.5 ) * ( FractionsCommonConstants.SHAPE_SIZE + CONTAINER_PADDING );

        this.updateDragBounds();
      }
    }

    /**
     * Adds a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    addShapeContainer( shapeContainer ) {
      const shapeContainerNode = new ShapeContainerNode( shapeContainer );
      this.shapeContainerNodes.push( shapeContainerNode );
      this.shapeContainerLayer.addChild( shapeContainerNode );
      this.updateRightButtonPosition();
    }

    /**
     * Removes a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    removeShapeContainer( shapeContainer ) {
      const shapeContainerNode = this.shapeContainerNodes.find( shapeContainerNode => {
        return shapeContainerNode.shapeContainer === shapeContainer;
      } );
      assert && assert( shapeContainerNode );

      this.shapeContainerNodes.remove( shapeContainerNode );
      this.shapeContainerLayer.removeChild( shapeContainerNode );
      shapeContainerNode.dispose();
      this.updateRightButtonPosition();
    }

    /**
     * Releases references
     * @public
     * @override
     */
    dispose() {
      this.shapeContainerNodes.forEach( shapeContainer => shapeContainer.dispose() );
      this.shapeGroup.changedEmitter.removeListener( this.updateVisibilityListener );
      this.shapeGroup.shapeContainers.lengthProperty.unlink( this.addRemoveVisibleListener );
      this.generalDragBoundsProperty && this.generalDragBoundsProperty.unlink( this.dragBoundsListener );

      this.shapeGroup.shapeContainers.removeItemAddedListener( this.addShapeContainerListener );
      this.shapeGroup.shapeContainers.removeItemRemovedListener( this.removeShapeContainerListener );

      this.decreasePartitionCountButton.dispose();
      this.increasePartitionCountButton.dispose();
      this.decreaseEnabledProperty.dispose();
      this.increaseEnabledProperty.dispose();
      this.addContainerButton.dispose();
      this.removeContainerButton.dispose();
      this.returnButton.dispose();

      super.dispose();
    }

    /**
     * Creates an icon that looks like a ShapeGroupNode.
     * @public
     *
     * @param {BuildingRepresentation} representation
     * @param {boolean} hasExpansionButtons
     * @returns {Node}
     */
    static createIcon( representation, hasExpansionButtons ) {
      const iconNode = new ShapeGroupNode( new ShapeGroup( representation, {
        maxContainers: hasExpansionButtons ? 6 : 1
      } ), {
        isIcon: true,
        scale: FractionsCommonConstants.SHAPE_BUILD_SCALE,
        pickable: false
      } );
      iconNode.localBounds = iconNode.localBounds.withMinY( iconNode.localBounds.minY - 2 * iconNode.localBounds.centerY );
      return iconNode;
    }
  }

  return fractionsCommon.register( 'ShapeGroupNode', ShapeGroupNode );
} );
