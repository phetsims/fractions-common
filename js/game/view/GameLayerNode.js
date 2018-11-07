// Copyright 2018, University of Colorado Boulder

/**
 * Layer implementation for the game screens (contains views for groups and pieces)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const BuildingLayerNode = require( 'FRACTIONS_COMMON/building/view/BuildingLayerNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class GameLayerNode extends BuildingLayerNode {
    /**
     * @param {BuildingModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<Bounds2>} shapeDragBoundsProperty
     * @param {Property.<Bounds2>} numberDragBoundsProperty
     * @param {Node} targetsContainer
     * @param {Node} panel
     * @param {function} onCollection - Called with no arguments when something has been collected.
     */
    constructor( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, targetsContainer, panel, onCollection ) {
      super( model, modelViewTransform, shapeDragBoundsProperty, numberDragBoundsProperty, targetsContainer, panel, onCollection );

      // @private {Node}
      this.targetsContainer = targetsContainer;
      this.panel = panel;

      // @private {function}
      this.onCollection = onCollection;

      this.initialize();
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

      // TODO: reduce duplication here
      const modelPoints = shapeGroup.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        shapeGroup.hoveringTargetProperty.value = closestTarget;
      }
      else {
        shapeGroup.hoveringTargetProperty.value = null;
      }
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

      // TODO: handle the "cancel" properly
      shapeGroup.hoveringTargetProperty.value = null;

      const modelPoints = shapeGroup.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      const panelBounds = this.panel.bounds.dilated( 10 );

      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        if ( closestTarget.groupProperty.value === null && shapeGroup.totalFraction.reduced().equals( closestTarget.fraction.reduced() ) ) {
          this.model.collectShapeGroup( shapeGroup, closestTarget );
          this.onCollection();
          shapeGroup.hoveringTargetProperty.value = null;
        }
        else {
          this.model.centerShapeGroup( shapeGroup );
        }
      }
      else if ( _.some( viewPoints, viewPoints => panelBounds.containsPoint( viewPoints ) ) ) {
        this.model.returnShapeGroup( shapeGroup );
      }
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

      // TODO: reduce duplication here
      const modelPoints = numberGroup.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        numberGroup.hoveringTargetProperty.value = closestTarget;
      }
      else {
        numberGroup.hoveringTargetProperty.value = null;
      }
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

      // TODO: handle the "cancel" properly
      numberGroup.hoveringTargetProperty.value = null;

      // TODO: factor out with shape stuff above
      const modelPoints = numberGroup.centerPoints;
      const viewPoints = modelPoints.map( modelPoint => this.modelViewTransform.modelToViewPosition( modelPoint ) );
      const targetBounds = this.targetsContainer.bounds.dilated( 10 );
      const panelBounds = this.panel.bounds.dilated( 10 );

      if ( _.some( viewPoints, viewPoint => targetBounds.containsPoint( viewPoint ) ) ) {
        const closestTarget = this.model.findClosestTarget( modelPoints );
        if ( closestTarget.groupProperty.value === null && numberGroup.totalFraction.reduced().equals( closestTarget.fraction.reduced() ) ) {
          this.model.collectNumberGroup( numberGroup, closestTarget );
          this.onCollection();
          numberGroup.hoveringTargetProperty.value = null;
        }
        else {
          this.model.centerNumberGroup( numberGroup );
        }
      }
      else if ( _.some( viewPoints, viewPoints => panelBounds.containsPoint( viewPoints ) ) ) {
        this.model.returnNumberGroup( numberGroup );
      }
    }

    /**
     * Given a new ShapeGroup, this returns a boolean Property that should be used for whether the given group is
     * selected.
     * @protected
     * @override
     *
     * @param {ShapeGroup} shapeGroup
     * @returns {Property.<boolean>}
     */
    getShapeGroupSelectedProperty( shapeGroup ) {
      return this.model.getShapeControlsVisibleProperty( shapeGroup );
    }

    /**
     * Given a new NumberGroup, this returns a boolean Property that should be used for whether the given group is
     * selected.
     * @protected
     * @override
     *
     * @param {NumberGroup} numberGroup
     * @returns {Property.<boolean>}
     */
    getNumberGroupSelectedProperty( numberGroup ) {
      return new BooleanProperty( true );
    }
  }

  return fractionsCommon.register( 'GameLayerNode', GameLayerNode );
} );
