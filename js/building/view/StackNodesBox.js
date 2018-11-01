// Copyright 2018, University of Colorado Boulder

/**
 * An HBox of stack views, with logic for proper alignment and mouse/touch areas.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberGroupStackNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupStackNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapeGroupStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupStackNode' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const ShapeStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeStackNode' );
  const Vector2 = require( 'DOT/Vector2' );

  class StackNodesBox extends HBox {
    /**
     * @param {Array.<Stack>} stacks
     * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
     * @param {Object} [options]
     */
    constructor( stacks, pressCallback, options ) {
      options = _.extend( {
        padding: 20,
        maxHeightOverride: null
      }, options );

      super( {
        spacing: options.padding
      } );

      // @private {Array.<StackNode>}
      this.stackNodes = stacks.map( stack => {
        if ( stack instanceof NumberStack ) {
          return new NumberStackNode( stack );
        }
        else if ( stack instanceof ShapeStack ) {
          return new ShapeStackNode( stack );
        }
        else if ( stack instanceof NumberGroupStack ) {
          return new NumberGroupStackNode( stack );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          return new ShapeGroupStackNode( stack );
        }
        else {
          throw new Error( 'Unknown stack' );
        }
      } );

      // @private {Array.<function>} - For disposal
      this.lengthListeners = [];

      // @private {Array.<Node>} - We want to create custom-area targets for each stack that when clicked will activate
      // the "press" of the stack.
      this.stackTargets = this.stackNodes.map( stackNode => {
        const stackTarget = new Node( {
          children: [ stackNode ],
          cursor: 'pointer',
          inputListeners: [ DragListener.createForwardingListener( event => pressCallback( event, stackNode.stack ) ) ]
        } );
        stackTarget.layoutBounds = stackNode.localToParentBounds( stackNode.layoutBounds );

        // Shouldn't be pickable when it has no elements.
        const lengthListener = length => {
          stackTarget.pickable = length === 0 ? false : null;
        };
        this.lengthListeners.push( lengthListener );
        stackNode.stack.array.lengthProperty.link( lengthListener );

        return stackTarget;
      } );

      // Apply appropriate mouse/touch areas
      let maxTargetHeight = _.max( this.stackTargets.map( stackTarget => stackTarget.layoutBounds.height ) );
      if ( options.maxHeightOverride ) {
        assert && assert( maxTargetHeight <= options.maxHeightOverride );
        maxTargetHeight = options.maxHeightOverride;
      }
      this.stackTargets.forEach( node => {
        const layoutBounds = node.layoutBounds;
        assert && assert( layoutBounds.isValid() );
        const bounds = new Bounds2( -options.padding / 2 + layoutBounds.left, -maxTargetHeight / 2, layoutBounds.right + options.padding / 2, maxTargetHeight / 2 );
        node.mouseArea = bounds;
        node.touchArea = bounds;

        // For layout, handle verticality
        node.localBounds = new Bounds2( layoutBounds.left, -maxTargetHeight / 2, layoutBounds.right, maxTargetHeight / 2 );
      } );

      this.children = this.stackTargets;
    }

    /**
     * Sets the model positions of our model objects corresponding to their displayed (view) positions.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Node} panel
     */
    updateModelLocations( modelViewTransform, panel ) {
      this.stackNodes.forEach( stackNode => {
        stackNode.stack.positionProperty.value = modelViewTransform.viewToModelPosition(
          stackNode.getUniqueTrailTo( panel ).localToGlobalPoint( Vector2.ZERO )
        );
      } );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.stackNodes.forEach( ( stackNode, index ) => {
        stackNode.stack.array.lengthProperty.unlink( this.lengthListeners[ index ] );
        stackNode.dispose();
      } );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'StackNodesBox', StackNodesBox );
} );
