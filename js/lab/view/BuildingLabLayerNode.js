// Copyright 2018, University of Colorado Boulder

/**
 * Layer implementation for the lab screens (contains views for groups and pieces)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingLayerNode = require( 'FRACTIONS_COMMON/building/view/BuildingLayerNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class BuildingLabLayerNode extends BuildingLayerNode {
    /**
     * @param {BuildingModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<Bounds2>} shapeDragBoundsProperty
     * @param {Property.<Bounds2>} numberDragBoundsProperty
     * @param {Node} shapePanel
     * @param {Node} numberPanel
     */
    constructor( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, shapePanel, numberPanel ) {
      super( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, shapePanel, numberPanel );

      // @private {Node}
      this.shapePanel = shapePanel;
      this.numberPanel = numberPanel;

      this.initialize();
    }

    /**
     * Called when a ShapeGroup is dropped.
     * @protected
     * @override
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupDrop( shapeGroup ) {
      super.onShapeGroupDrop( shapeGroup );

      // TODO: What about groups with lots of containers?
      if ( this.shapePanel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( shapeGroup.positionProperty.value ) ) ) {
        this.model.returnShapeGroup( shapeGroup );
      }
    }

    /**
     * Called when a ShapeGroup is selected.
     * @protected
     * @override
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupSelect( shapeGroup ) {
      super.onShapeGroupSelect( shapeGroup );

      this.model.selectedGroupProperty.value = shapeGroup;
    }

    /**
     * Called when a NumberGroup is dropped.
     * @protected
     * @override
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupDrop( numberGroup ) {
      super.onNumberGroupDrop( numberGroup );

      if ( this.numberPanel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value ) ) ) {
        this.model.returnNumberGroup( numberGroup );
      }
    }

    /**
     * Called when a NumberGroup is selected.
     * @protected
     * @override
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupSelect( numberGroup ) {
      super.onNumberGroupSelect( numberGroup );

      this.model.selectedGroupProperty.value = numberGroup;
    }

    /**
     * Given a group, this returns a boolean Property that should be used for whether the given group is selected.
     * @protected
     * @override
     *
     * @param {Group} group
     * @returns {Property.<boolean>}
     */
    getGroupSelectedProperty( group ) {
      return new DerivedProperty( [ this.model.selectedGroupProperty ], selectedGroup => selectedGroup === group );
    }
  }

  return fractionsCommon.register( 'BuildingLabLayerNode', BuildingLabLayerNode );
} );
