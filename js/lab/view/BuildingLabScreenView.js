// Copyright 2018-2019, University of Colorado Boulder

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
  const BuildingLabLayerNode = require( 'FRACTIONS_COMMON/lab/view/BuildingLabLayerNode' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/model/BuildingRepresentation' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const FractionsCommonGlobals = require( 'FRACTIONS_COMMON/common/FractionsCommonGlobals' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const LabNumberPanel = require( 'FRACTIONS_COMMON/lab/view/LabNumberPanel' );
  const LabShapePanel = require( 'FRACTIONS_COMMON/lab/view/LabShapePanel' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
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
        const modelPoint = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
        if ( stack instanceof ShapeStack ) {
          const shapePiece = new ShapePiece( stack.fraction, stack.representation, stack.color );
          shapePiece.positionProperty.value = modelPoint;
          model.dragShapePieceFromStack( shapePiece );
          const shapePieceNode = this.layerNode.getShapePieceNode( shapePiece );
          shapePieceNode.dragListener.press( event, shapePieceNode );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          const shapeGroup = model.addShapeGroup( stack.representation );
          shapeGroup.positionProperty.value = modelPoint;
          const shapeGroupNode = this.layerNode.getShapeGroupNode( shapeGroup );
          shapeGroupNode.dragListener.press( event, shapeGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      // @private {Node}
      this.numberPanel = new LabNumberPanel( model, ( event, stack ) => {
        const modelPoint = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
        if ( stack instanceof NumberStack ) {
          const numberPiece = new NumberPiece( stack.number );
          numberPiece.positionProperty.value = modelPoint;
          model.dragNumberPieceFromStack( numberPiece );
          const numberPieceNode = this.layerNode.getNumberPieceNode( numberPiece );
          numberPieceNode.dragListener.press( event, numberPieceNode );
        }
        else if ( stack instanceof NumberGroupStack ) {
          const numberGroup = model.addNumberGroup( stack.isMixedNumber );
          numberGroup.positionProperty.value = modelPoint;
          const numberGroupNode = this.layerNode.getNumberGroupNode( numberGroup );
          numberGroupNode.dragListener.press( event, numberGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      phet.joist.display.addInputListener( {
        down: event => {
          const screen = phet.joist.sim.currentScreenProperty.value;
          if ( screen && screen.view === this ) {

            const isActive = this.layerNode.activePointerProperty.value === event.pointer;

            // See if our press was a "miss" (trail length 1) or a hit on our screen (screen.view in the trail).
            // We really want to exclude home-screen clicks so that things start focused.
            const doesTrailMatch = _.includes( event.trail.nodes, screen.view ) || event.trail.length <= 1;

            if ( !isActive && doesTrailMatch ) {
              // Any event on a shape group should handle it.
              model.selectedGroupProperty.value = null;
            }
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

      // dynamic layout
      this.visibleBoundsProperty.link( visibleBounds => {
        topAlignBox.alignBounds = visibleBounds;
        bottomAlignBox.alignBounds = visibleBounds;
        // Don't compensate for the right side expanding out, see https://github.com/phetsims/fractions-common/issues/51
        bottomRightAlignBox.alignBounds = visibleBounds.withMaxX( this.layoutBounds.right );
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
     * Creates the icon for the unmixed lab screens.
     * @public
     *
     * @returns {Node}
     */
    static createUnmixedScreenIcon() {

      const numberGroup = new NumberGroup( false );
      numberGroup.numeratorSpot.pieceProperty.value = new NumberPiece( 7 );
      numberGroup.denominatorSpot.pieceProperty.value = new NumberPiece( 8 );

      const numberGroupNode = new NumberGroupNode( numberGroup, {
        isIcon: true,
        positioned: false,
        scale: 0.8
      } );

      const shapeGroup = new ShapeGroup( BuildingRepresentation.PIE );
      [
        new Fraction( 1, 2 ),
        new Fraction( 1, 4 ),
        new Fraction( 1, 8 )
      ].forEach( fraction => {
        shapeGroup.shapeContainers.get( 0 ).shapePieces.push( new ShapePiece( fraction, BuildingRepresentation.PIE, FractionsCommonColorProfile.shapeRedProperty ) );
      } );

      const shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        hasButtons: false,
        isIcon: true,
        positioned: false
      } );

      return FractionsCommonGlobals.wrapIcon( new HBox( {
        spacing: 20,
        children: [
          numberGroupNode,
          shapeGroupNode
        ],
        scale: 2.3
      } ), FractionsCommonColorProfile.otherScreenBackgroundProperty );
    }

    /**
     * Creates the icon for the mixed lab screens.
     * @public
     *
     * @returns {Node}
     */
    static createMixedScreenIcon() {

      const shapeGroup = new ShapeGroup( BuildingRepresentation.PIE );
      shapeGroup.increaseContainerCount();
      shapeGroup.shapeContainers.get( 0 ).shapePieces.push( new ShapePiece( Fraction.ONE, BuildingRepresentation.PIE, FractionsCommonColorProfile.shapeRedProperty ) );
      [
        new Fraction( 1, 2 ),
        new Fraction( 1, 4 ),
        new Fraction( 1, 8 )
      ].forEach( fraction => {
        shapeGroup.shapeContainers.get( 1 ).shapePieces.push( new ShapePiece( fraction, BuildingRepresentation.PIE, FractionsCommonColorProfile.shapeRedProperty ) );
      } );

      const shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        hasButtons: false,
        isIcon: true,
        positioned: false,
        scale: 2.1
      } );

      return FractionsCommonGlobals.wrapIcon( shapeGroupNode, FractionsCommonColorProfile.otherScreenBackgroundProperty );
    }
  }

  return fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );
} );
