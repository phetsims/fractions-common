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
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const LabNumberPanel = require( 'FRACTIONS_COMMON/building/view/LabNumberPanel' );
  const LabShapePanel = require( 'FRACTIONS_COMMON/building/view/LabShapePanel' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
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
          // TODO: factor this "find" usage out
          const shapePieceNode = _.find( this.shapePieceNodes, shapePieceNode => {
            return shapePieceNode.shapePiece === shapePiece;
          } );
          shapePieceNode.dragListener.press( event, shapePieceNode );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          // TODO: encapsulation
          const shapeGroup = model.addShapeGroup( stack.representation );
          shapeGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          const shapeGroupNode = _.find( this.shapeGroupNodes, shapeGroupNode => {
            return shapeGroupNode.shapeGroup === shapeGroup;
          } );
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
          // TODO: factor this "find" usage out
          const numberPieceNode = _.find( this.numberPieceNodes, numberPieceNode => {
            return numberPieceNode.numberPiece === numberPiece;
          } );
          numberPieceNode.dragListener.press( event, numberPieceNode );
        }
        else if ( stack instanceof NumberGroupStack ) {
          const numberGroup = model.addNumberGroup( stack.isMixedNumber );
          numberGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          const numberGroupNode = _.find( this.numberGroupNodes, numberGroupNode => {
            return numberGroupNode.numberGroup === numberGroup;
          } );
          numberGroupNode.dragListener.press( event, numberGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      // @private {Node}
      this.groupLayer = new Node();

      // @private {Node}
      this.pieceLayer = new Node();

      // @private {Array.<ShapeGroupNode>}
      this.shapeGroupNodes = []; // TODO: interrupt on reset

      model.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
      model.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
      model.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

      // @private {Array.<NumberGroupNode>}
      this.numberGroupNodes = []; // TODO: interrupt on reset

      model.numberGroups.addItemAddedListener( this.addNumberGroup.bind( this ) );
      model.numberGroups.addItemRemovedListener( this.removeNumberGroup.bind( this ) );
      model.numberGroups.forEach( this.addNumberGroup.bind( this ) );

      // @private {Array.<ShapePieceNode>}
      this.shapePieceNodes = []; // TODO: interrupt on reset

      model.activeShapePieces.addItemAddedListener( shapePiece => {
        const shapePieceNode = new ShapePieceNode( shapePiece, {
          positioned: true,
          modelViewTransform: this.modelViewTransform,
          dropListener: wasTouch => {
            model.shapePieceDropped( shapePiece, wasTouch ? 100 : 50 );
          }
        } );
        this.shapePieceNodes.push( shapePieceNode );
        this.pieceLayer.addChild( shapePieceNode );
      } );
      model.activeShapePieces.addItemRemovedListener( shapePiece => {
        const shapePieceNode = _.find( this.shapePieceNodes, shapePieceNode => {
          return shapePieceNode.shapePiece === shapePiece;
        } );

        arrayRemove( this.shapePieceNodes, shapePieceNode );
        this.pieceLayer.removeChild( shapePieceNode );
        shapePieceNode.dispose();
      } );

      // @private {Array.<NumberPieceNode>}
      this.numberPieceNodes = []; // TODO: interrupt on reset

      model.activeNumberPieces.addItemAddedListener( numberPiece => {
        const numberPieceNode = new NumberPieceNode( numberPiece, {
          positioned: true,
          modelViewTransform: this.modelViewTransform,
          dropListener: wasTouch => {
            model.numberPieceDropped( numberPiece, wasTouch ? 50 : 20 );
          }
        } );
        this.numberPieceNodes.push( numberPieceNode );
        this.pieceLayer.addChild( numberPieceNode );
      } );
      model.activeNumberPieces.addItemRemovedListener( numberPiece => {
        const numberPieceNode = _.find( this.numberPieceNodes, numberPieceNode => {
          return numberPieceNode.numberPiece === numberPiece;
        } );

        arrayRemove( this.numberPieceNodes, numberPieceNode );
        this.pieceLayer.removeChild( numberPieceNode );
        numberPieceNode.dispose();
      } );

      phet.joist.display.addInputListener( {
        down: () => {
          // Any event on a shape group should handle it.
          // TODO: How do we.... handle number groups? Use same property presumably. TODO
          model.selectedGroupProperty.value = null;
        }
      } );

      // @private {Node}
      const resetAllButton = new ResetAllButton( {
        listener: () => {
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

      this.children = [
        bottomRightAlignBox,
        topAlignBox,
        bottomAlignBox,
        this.groupLayer,
        this.pieceLayer
      ];

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
    }

    addShapeGroup( shapeGroup ) {
      const shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        dragBoundsProperty: this.shapeDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,
        dropListener: () => {
          // TODO: What about groups with lots of containers?
          if ( this.shapePanel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( shapeGroup.positionProperty.value ) ) ) {
            this.model.returnShapeGroup( shapeGroup );
          }
        },
        selectListener: () => {
          this.model.selectedGroupProperty.value = shapeGroup;
        },
        removeLastListener: () => {
          this.model.removeLastPieceFromShapeGroup( shapeGroup );
        },
        isSelectedProperty: this.model.getShapeControlsVisibleProperty( shapeGroup )
      } );
      this.shapeGroupNodes.push( shapeGroupNode );
      this.groupLayer.addChild( shapeGroupNode );
    }

    removeShapeGroup( shapeGroup ) {
      const shapeGroupNode = _.find( this.shapeGroupNodes, shapeGroupNode => {
        return shapeGroupNode.shapeGroup === shapeGroup;
      } );
      assert && assert( shapeGroupNode );

      arrayRemove( this.shapeGroupNodes, shapeGroupNode );
      this.groupLayer.removeChild( shapeGroupNode );
      shapeGroupNode.dispose();
    }

    addNumberGroup( numberGroup ) {
      const numberGroupNode = new NumberGroupNode( numberGroup, {
        dragBoundsProperty: this.numberDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,

        dropListener: () => {
          if ( this.numberPanel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value ) ) ) {
            this.model.returnNumberGroup( numberGroup );
          }
        },
        selectListener: () => {
          this.model.selectedGroupProperty.value = numberGroup;
        },
        removeLastListener: () => {
          this.model.removeLastPieceFromNumberGroup( numberGroup );
        },
        isSelectedProperty: new DerivedProperty( [ this.model.selectedGroupProperty ], selectedGroup => {
          return selectedGroup === numberGroup;
        } )
      } );
      this.numberGroupNodes.push( numberGroupNode );
      this.groupLayer.addChild( numberGroupNode );
    }

    removeNumberGroup( numberGroup ) {
      const numberGroupNode = _.find( this.numberGroupNodes, numberGroupNode => {
        return numberGroupNode.numberGroup === numberGroup;
      } );
      assert && assert( numberGroupNode );

      arrayRemove( this.numberGroupNodes, numberGroupNode );
      this.groupLayer.removeChild( numberGroupNode );
      numberGroupNode.dispose();
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
