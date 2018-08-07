// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  var NumberGroupStackNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupStackNode' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  var ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  var ShapeGroupStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupStackNode' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var ShapeStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeStackNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {HBox}
   *
   * @param {Array.<Stack>} stacks
   * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
   * @param {Object} [options]
   */
  function StackNodesBox( stacks, pressCallback, options ) {

    options = _.extend( {
      padding: 20,
      maxHeightOverride: null
    }, options );

    // @private {Array.<StackNode>}
    this.stackNodes = stacks.map( function( stack ) {
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

    // @private {Array.<Node>}
    this.stackTargets = this.stackNodes.map( function( stackNode ) {
      const stackTarget = new Node( {
        children: [ stackNode ],
        cursor: 'pointer', // TODO: only pointer if it has 1+ in stack
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            pressCallback( event, stackNode.stack );
          } )
        ]
      } );
      stackNode.stack.array.lengthProperty.link( length => {
        stackTarget.pickable = length === 0 ? false : null;
      } );
      return stackTarget;
    } );

    // Apply appropriate mouse/touch areas
    var maxTargetHeight = _.max( this.stackTargets.map( function( stackTarget ) { return stackTarget.height; } ) );
    if ( options.maxHeightOverride ) {
      assert && assert( maxTargetHeight <= options.maxHeightOverride );
      maxTargetHeight = options.maxHeightOverride;
    }
    this.stackTargets.forEach( function( node ) {
      var bounds = new Bounds2( -options.padding / 2 + node.left, -maxTargetHeight / 2, node.right + options.padding / 2, maxTargetHeight / 2 );
      assert && assert( node.bounds.isValid() );
      node.mouseArea = bounds;
      node.touchArea = bounds;

      // For layout, handle verticality
      node.localBounds = new Bounds2( node.left, -maxTargetHeight / 2, node.right, maxTargetHeight / 2 );
    } );

    HBox.call( this, {
      spacing: options.padding,
      children: this.stackTargets
    } );
  }

  fractionsCommon.register( 'StackNodesBox', StackNodesBox );

  return inherit( HBox, StackNodesBox, {
    // TODO: doc
    updateModelLocations: function( modelViewTransform, panel ) {
      this.stackNodes.forEach( function( stackNode ) {
        stackNode.stack.positionProperty.value = modelViewTransform.viewToModelPosition(
          stackNode.getUniqueTrailTo( panel ).localToGlobalPoint( Vector2.ZERO )
        );
      } );
    }
  } );
} );
