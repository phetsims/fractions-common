// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const BuildingLabLayerNode = require( 'FRACTIONS_COMMON/building/view/BuildingLabLayerNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const LabNumberPanel = require( 'FRACTIONS_COMMON/building/view/LabNumberPanel' );
  const LabShapePanel = require( 'FRACTIONS_COMMON/building/view/LabShapePanel' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );

  // constants
  const PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class BuildingLabScreenView extends ScreenView {
    /**
     * @param {BuildingLabModel} model
     */
    constructor( model ) {
      super();

      // @private
      this.model = model;

      // @public {ModelViewTransform2}
      this.modelViewTransform = new ModelViewTransform2( Matrix3.translationFromVector( this.layoutBounds.center ) );

      // @private {Property.<Bounds2>}
      this.shapeDragBoundsProperty = new Property( this.visibleBounds );
      this.numberDragBoundsProperty = new Property( this.visibleBounds );

      // @private {Node}
      this.shapePanel = new LabShapePanel( model, ( event, stack ) => {
        if ( stack instanceof ShapeStack ) {
          const shapePiece = new ShapePiece( stack.fraction, stack.representation, stack.color );
          shapePiece.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          model.activeShapePieces.push( shapePiece );
          const shapePieceNode = this.layerNode.getShapePieceNode( shapePiece );
          shapePieceNode.dragListener.press( event, shapePieceNode );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          // TODO: encapsulation
          const shapeGroup = model.addShapeGroup( stack.representation );
          shapeGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          const shapeGroupNode = this.layerNode.getShapeGroupNode( shapeGroup );
          shapeGroupNode.dragListener.press( event, shapeGroupNode );
          event.handle(); // for our selection
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      // @private {Node}
      this.numberPanel = new LabNumberPanel( model, ( event, stack ) => {
        if ( stack instanceof NumberStack ) {
          const numberPiece = new NumberPiece( stack.number );
          numberPiece.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          model.dragNumberPieceFromStack( numberPiece, stack );
          const numberPieceNode = this.layerNode.getNumberPieceNode( numberPiece );
          numberPieceNode.dragListener.press( event, numberPieceNode );
        }
        else if ( stack instanceof NumberGroupStack ) {
          const numberGroup = model.addNumberGroup( stack.isMixedNumber );
          numberGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          const numberGroupNode = this.layerNode.getNumberGroupNode( numberGroup );
          numberGroupNode.dragListener.press( event, numberGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      phet.joist.display.addInputListener( {
        down: () => {
          const screen = phet.joist.sim.currentScreenProperty.value;
          if ( screen && screen.view === this ) {
            // Any event on a shape group should handle it.
            model.selectedGroupProperty.value = null;
          }
        }
      } );

      // @private {Node}
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput();
          model.reset();
        }
      } );

      const topAlignBox = new AlignBox( this.shapePanel, {
        xAlign: 'center',
        yAlign: 'top',
        margin: PANEL_MARGIN
      } );

      const bottomAlignBox = new AlignBox( this.numberPanel, {
        xAlign: 'center',
        yAlign: 'bottom',
        margin: PANEL_MARGIN
      } );

      const bottomRightAlignBox = new AlignBox( resetAllButton, {
        xAlign: 'right',
        yAlign: 'bottom',
        margin: PANEL_MARGIN
      } );

      this.visibleBoundsProperty.link( visibleBounds => {
        topAlignBox.alignBounds = visibleBounds;
        bottomAlignBox.alignBounds = visibleBounds;
        bottomRightAlignBox.alignBounds = visibleBounds;
        this.shapePanel.updateModelLocations( this.modelViewTransform );
        this.numberPanel.updateModelLocations( this.modelViewTransform );

        this.shapeDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( new Bounds2(
          visibleBounds.left,
          visibleBounds.top,
          visibleBounds.right,
          this.numberPanel.top
        ) );
        this.numberDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( new Bounds2(
          visibleBounds.left,
          this.shapePanel.bottom,
          visibleBounds.right,
          visibleBounds.bottom
        ) );
      } );

      // @private {BuildingLabLayerNode}
      this.layerNode = new BuildingLabLayerNode( model, this.modelViewTransform, this.shapeDragBoundsProperty, this.numberDragBoundsProperty, this.shapePanel, this.numberPanel );

      this.children = [
        bottomRightAlignBox,
        topAlignBox,
        bottomAlignBox,
        this.layerNode
      ];
    }

    /**
     * Steps forward in time.
     * @public
     */
    step( dt ) {

    }
  }

  return fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );
} );
