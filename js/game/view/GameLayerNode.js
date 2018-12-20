// Copyright 2018, University of Colorado Boulder

/**
 * Layer implementation for the game screens (contains views for groups and pieces)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingLayerNode = require( 'FRACTIONS_COMMON/building/view/BuildingLayerNode' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class GameLayerNode extends BuildingLayerNode {
    /**
     * @param {BuildingModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<Bounds2>} shapeDragBoundsProperty
     * @param {Property.<Bounds2>} numberDragBoundsProperty
     * @param {Node} targetsContainer
     * @param {Node} panel
     */
    constructor( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, targetsContainer, panel ) {
      super( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, targetsContainer, panel );

      // @private {Node}
      this.targetsContainer = targetsContainer;
      this.panel = panel;

      this.initialize();
    }

    /**
     * Utility function for when a Group is dragged
     * @private
     *
     * @param {Group} group
     */
    onGroupDrag( group ) {
      const modelPoints = group.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        group.hoveringTargetProperty.value = closestTarget;
      }
      else {
        group.hoveringTargetProperty.value = null;
      }
    }

    /**
     * Utility function for when a Group is dropped
     * @private
     *
     * @param {Group} group
     */
    onGroupDrop( group ) {
      group.hoveringTargetProperty.value = null;

      const modelPoints = group.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      const panelBounds = this.panel.bounds.dilated( 10 );

      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        if ( closestTarget.groupProperty.value === null && group.totalFraction.reduced().equals( closestTarget.fraction.reduced() ) ) {
          if ( group.type === BuildingType.SHAPE ) {
            this.model.collectShapeGroup( group, closestTarget );
          }
          else {
            this.model.collectNumberGroup( group, closestTarget );
          }
          group.hoveringTargetProperty.value = null;
        }
        else {
          this.model.centerGroup( group );
        }
      }
      else if ( _.some( viewPoints, viewPoints => panelBounds.containsPoint( viewPoints ) ) ) {
        if ( group.type === BuildingType.SHAPE ) {
          this.model.returnShapeGroup( group );
        }
        else {
          this.model.returnNumberGroup( group );
        }
      }
    }

    /**
     * Called when a ShapeGroup is dragged.
     * @protected
     * @override
     *
     * @param {ShapeGroup} shapeGroup
     */
    onShapeGroupDrag( shapeGroup ) {
      super.onShapeGroupDrag( shapeGroup );

      this.onGroupDrag( shapeGroup );
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

      this.onGroupDrop( shapeGroup );
    }

    /**
     * Called when a NumberGroup is dragged.
     * @protected
     * @override
     *
     * @param {NumberGroup} numberGroup
     */
    onNumberGroupDrag( numberGroup ) {
      super.onNumberGroupDrag( numberGroup );

      this.onGroupDrag( numberGroup );
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

      this.onGroupDrop( numberGroup );
    }
  }

  return fractionsCommon.register( 'GameLayerNode', GameLayerNode );
} );
