// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for implementations of the layer containing views for groups and pieces.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );

  class BuildingLayerNode extends Node {
    /**
     * @param {BuildingModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<Bounds2>} shapeDragBoundsProperty
     * @param {Property.<Bounds2>} numberDragBoundsProperty
     */
    constructor( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty ) {
      super();

      // @private {BuildingModel}
      this.model = model;

      // @public {ModelViewTransform2}
      this.modelViewTransform = modelViewTransform;

      // @private {Property.<Bounds2>}
      this.shapeDragBoundsProperty = shapeDragBoundsProperty;
      this.numberDragBoundsProperty = numberDragBoundsProperty;

      // @private {function}
      this.addShapeGroupListener = this.addShapeGroup.bind( this );
      this.removeShapeGroupListener = this.removeShapeGroup.bind( this );
      this.addNumberGroupListener = this.addNumberGroup.bind( this );
      this.removeNumberGroupListener = this.removeNumberGroup.bind( this );
      this.addShapePieceListener = this.addShapePiece.bind( this );
      this.removeShapePieceListener = this.removeShapePiece.bind( this );
      this.addNumberPieceListener = this.addNumberPiece.bind( this );
      this.removeNumberPieceListener = this.removeNumberPiece.bind( this );

      // @private {Node}
      this.groupLayer = new Node();

      // @private {Node}
      this.pieceLayer = new Node();

      this.children = [
        this.groupLayer,
        this.pieceLayer
      ];

      // @private {Array.<ShapeGroupNode>}
      this.shapeGroupNodes = []; // TODO: interrupt on reset

      // @private {Array.<NumberGroupNode>}
      this.numberGroupNodes = []; // TODO: interrupt on reset

      // @private {Array.<ShapePieceNode>}
      this.shapePieceNodes = []; // TODO: interrupt on reset

      // @private {Array.<NumberPieceNode>}
      this.numberPieceNodes = []; // TODO: interrupt on reset
    }

    /**
     * Completes initialization of the layer node. This is needed since subtypes may need to set properties on `this`
     * that can't be done before the super(), so this should be done once all setup is complete.
     * @protected
     */
    initialize() {
      this.model.shapeGroups.addItemAddedListener( this.addShapeGroupListener );
      this.model.shapeGroups.addItemRemovedListener( this.removeShapeGroupListener );
      this.model.shapeGroups.forEach( this.addShapeGroupListener );

      this.model.numberGroups.addItemAddedListener( this.addNumberGroupListener );
      this.model.numberGroups.addItemRemovedListener( this.removeNumberGroupListener );
      this.model.numberGroups.forEach( this.addNumberGroupListener );

      this.model.activeShapePieces.addItemAddedListener( this.addShapePieceListener );
      this.model.activeShapePieces.addItemRemovedListener( this.removeShapePieceListener );
      this.model.activeShapePieces.forEach( this.addShapePieceListener );

      this.model.activeNumberPieces.addItemAddedListener( this.addNumberPieceListener );
      this.model.activeNumberPieces.addItemRemovedListener( this.removeNumberPieceListener );
      this.model.activeNumberPieces.forEach( this.addNumberPieceListener );
    }

    /**
     * Returns the corresponding ShapeGroupNode for a given ShapeGroup.
     * @public
     *
     * @param {ShapeGroup} shapeGroup
     * @returns {ShapeGroupNode}
     */
    getShapeGroupNode( shapeGroup ) {
      return _.find( this.shapeGroupNodes, shapeGroupNode => shapeGroupNode.shapeGroup === shapeGroup );
    }

    /**
     * Returns the corresponding NumberGroupNode for a given NumberGroup.
     * @public
     *
     * @param {NumberGroup} numberGroup
     * @returns {NumberGroupNode}
     */
    getNumberGroupNode( numberGroup ) {
      return _.find( this.numberGroupNodes, numberGroupNode => numberGroupNode.numberGroup === numberGroup );
    }

    /**
     * Returns the corresponding ShapePieceNode for a given ShapePiece.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {ShapePieceNode}
     */
    getShapePieceNode( shapePiece ) {
      return _.find( this.shapePieceNodes, shapePieceNode => shapePieceNode.shapePiece === shapePiece );
    }

    /**
     * Returns the corresponding NumberPieceNode for a given NumberPiece.
     * @public
     *
     * @param {NumberPiece} numberPiece
     * @returns {NumberPieceNode}
     */
    getNumberPieceNode( numberPiece ) {
      return _.find( this.numberPieceNodes, numberPieceNode => numberPieceNode.numberPiece === numberPiece );
    }

    /**
     * Called when a ShapeGroup is dragged.
     * @protected
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupDrag( shapeGroup ) {

    }

    /**
     * Called when a ShapeGroup is dropped.
     * @protected
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupDrop( shapeGroup ) {

    }

    /**
     * Called when the "return/remove last" button is pressed on a ShapeGroup.
     * @protected
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupRemoveLastListener( shapeGroup ) {
      this.model.removeLastPieceFromShapeGroup( shapeGroup );
    }

    /**
     * Called when a ShapeGroup is selected.
     * @protected
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupSelect( shapeGroup ) {

    }

    /**
     * Called when a NumberGroup is dragged.
     * @protected
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupDrag( numberGroup ) {

    }

    /**
     * Called when a NumberGroup is dropped.
     * @protected
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupDrop( numberGroup ) {

    }

    /**
     * Called when the "return/remove last" button is pressed on a NumberGroup.
     * @protected
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupRemoveLastListener( numberGroup ) {
      this.model.removeLastPieceFromNumberGroup( numberGroup );
    }

    /**
     * Called when a NumberGroup is selected.
     * @protected
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupSelect( numberGroup ) {

    }

    /**
     * Given a new ShapeGroup, this returns a boolean Property that should be used for whether the given group is
     * selected.
     * @protected
     *
     * @param {ShapeGroup} shapeGroup
     * @returns {Property.<boolean>}
     */
    getShapeGroupSelectedProperty( shapeGroup ) {
      throw new Error( 'abstract method' );
    }

    /**
     * Given a new NumberGroup, this returns a boolean Property that should be used for whether the given group is
     * selected.
     * @protected
     *
     * NOTE: The returned property will be disposed by the caller. No need to track it in this method.
     *
     * @param {NumberGroup} numberGroup
     * @returns {Property.<boolean>}
     */
    getNumberGroupSelectedProperty( numberGroup ) {
      throw new Error( 'abstract method' );
    }

    /**
     * Called when a new ShapeGroup is added to the model (we'll create the view).
     * @private
     *
     * @param {ShapeGroup} shapeGroup
     */
    addShapeGroup( shapeGroup ) {
      var shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        dragBoundsProperty: this.shapeDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,
        dragListener: this.onShapeGroupDrag.bind( this, shapeGroup ),
        dropListener: this.onShapeGroupDrop.bind( this, shapeGroup ),
        selectListener: this.onShapeGroupSelect.bind( this, shapeGroup ),
        removeLastListener: this.onShapeGroupRemoveLastListener.bind( this, shapeGroup ),
        isSelectedProperty: this.getShapeGroupSelectedProperty( shapeGroup )
      } );
      this.shapeGroupNodes.push( shapeGroupNode );
      this.groupLayer.addChild( shapeGroupNode );
    }

    /**
     * Called when a ShapeGroup is removed from the model (we'll remove the view).
     * @private
     *
     * @param {ShapeGroup} shapeGroup
     */
    removeShapeGroup( shapeGroup ) {
      const shapeGroupNode = _.find( this.shapeGroupNodes, shapeGroupNode => shapeGroupNode.shapeGroup === shapeGroup );
      assert && assert( shapeGroupNode );

      arrayRemove( this.shapeGroupNodes, shapeGroupNode );
      this.groupLayer.removeChild( shapeGroupNode );
      shapeGroupNode.dispose();
    }

    /**
     * Called when a new NumberGroup is added to the model (we'll create the view).
     * @private
     *
     * @param {NumberGroup} numberGroup
     */
    addNumberGroup( numberGroup ) {
      const numberGroupNode = new NumberGroupNode( numberGroup, {
        dragBoundsProperty: this.numberDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,
        dragListener: this.onNumberGroupDrag.bind( this, numberGroup ),
        dropListener: this.onNumberGroupDrop.bind( this, numberGroup ),
        selectListener: this.onNumberGroupSelect.bind( this, numberGroup ),
        removeLastListener: this.onNumberGroupRemoveLastListener.bind( this, numberGroup ),
        isSelectedProperty: this.getNumberGroupSelectedProperty( numberGroup )
      } );
      this.numberGroupNodes.push( numberGroupNode );
      this.groupLayer.addChild( numberGroupNode );
    }

    /**
     * Called when a NumberGroup is removed from the model (we'll remove the view).
     * @private
     *
     * @param {NumberGroup} numberGroup
     */
    removeNumberGroup( numberGroup ) {
      const numberGroupNode = _.find( this.numberGroupNodes, numberGroupNode => numberGroupNode.numberGroup === numberGroup );
      assert && assert( numberGroupNode );

      arrayRemove( this.numberGroupNodes, numberGroupNode );
      this.groupLayer.removeChild( numberGroupNode );
      numberGroupNode.dispose();
    }

    /**
     * Called when a new ShapePiece is added to the model (we'll create the view).
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    addShapePiece( shapePiece ) {
      var shapePieceNode = new ShapePieceNode( shapePiece, {
        positioned: true,
        modelViewTransform: this.modelViewTransform,
        dropListener: wasTouch => {
          this.model.shapePieceDropped( shapePiece, wasTouch ? 100 : 50 );
        }
      } );
      this.shapePieceNodes.push( shapePieceNode );
      this.pieceLayer.addChild( shapePieceNode );
    }

    /**
     * Called when a ShapePiece is removed from the model (we'll remove the view).
     * @private
     *
     * @param {ShapePiece} shapePiece
     */
    removeShapePiece( shapePiece ) {
      var shapePieceNode = _.find( this.shapePieceNodes, shapePieceNode => shapePieceNode.shapePiece === shapePiece );

      arrayRemove( this.shapePieceNodes, shapePieceNode );
      this.pieceLayer.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    }

    /**
     * Called when a new NumberPiece is added to the model (we'll create the view).
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    addNumberPiece( numberPiece ) {
      var numberPieceNode = new NumberPieceNode( numberPiece, {
        positioned: true,
        modelViewTransform: this.modelViewTransform,
        dropListener: wasTouch => {
          this.model.numberPieceDropped( numberPiece, wasTouch ? 50 : 20 );
        }
      } );
      this.numberPieceNodes.push( numberPieceNode );
      this.pieceLayer.addChild( numberPieceNode );
    }

    /**
     * Called when a NumberPiece is removed from the model (we'll remove the view).
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    removeNumberPiece( numberPiece ) {
      var numberPieceNode = _.find( this.numberPieceNodes, numberPieceNode => numberPieceNode.numberPiece === numberPiece );

      arrayRemove( this.numberPieceNodes, numberPieceNode );
      this.pieceLayer.removeChild( numberPieceNode );
      numberPieceNode.dispose();
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.model.shapeGroups.removeItemAddedListener( this.addShapeGroupListener );
      this.model.shapeGroups.removeItemRemovedListener( this.removeShapeGroupListener );

      this.model.numberGroups.removeItemAddedListener( this.addNumberGroupListener );
      this.model.numberGroups.removeItemRemovedListener( this.removeNumberGroupListener );

      this.model.activeShapePieces.removeItemAddedListener( this.addShapePieceListener );
      this.model.activeShapePieces.removeItemRemovedListener( this.removeShapePieceListener );

      this.model.activeNumberPieces.removeItemAddedListener( this.addNumberPieceListener );
      this.model.activeNumberPieces.removeItemRemovedListener( this.removeNumberPieceListener );

      this.shapeGroupNodes.forEach( shapeGroupNode => shapeGroupNode.dispose() );
      this.numberGroupNodes.forEach( numberGroupNode => numberGroupNode.dispose() );
      this.shapePieceNodes.forEach( shapePieceNode => shapePieceNode.dispose() );
      this.numberPieceNodes.forEach( numberPieceNode => numberPieceNode.dispose() );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'BuildingLayerNode', BuildingLayerNode );
} );
