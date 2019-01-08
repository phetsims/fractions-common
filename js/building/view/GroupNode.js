// Copyright 2018, University of Colorado Boulder

/**
 * Superclass for Group views.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Group = require( 'FRACTIONS_COMMON/building/model/Group' );
  const Node = require( 'SCENERY/nodes/Node' );

  class GroupNode extends Node {
    /**
     * @param {Group} group
     * @param {Object} [options]
     */
    constructor( group, options ) {
      assert && assert( group instanceof Group );

      options = _.extend( {
        // {boolean} - For pieces placed in stacks/containers, we don't care about the positionProperty. In addition,
        // pieces in stacks/containers ALSO care about not showing up when the piece is user-controlled or animating.
        isIcon: false,

        // {ModelViewTransform2|null}
        modelViewTransform: null,

        // {boolean}
        positioned: true,

        // {function|null} - Listeners for if drag listeners are attached. Passed the pointer.
        dragListener: null,
        dropListener: null,
        selectListener: null,

        // {Property.<boolean>}
        isSelectedProperty: new BooleanProperty( true ) // takes ownership, will dispose at the end
      }, options );

      super();

      // @private {Group}
      this.group = group;

      // @private {boolean} - Whether this will just be a "read-only" icon, or a "read-write" view object
      this.isIcon = options.isIcon;

      // @private {ModelViewTransform2|null}
      this.modelViewTransform = options.modelViewTransform;

      // @private {Array.<*>}
      this.itemsToDispose = [];

      assert && assert( this.isIcon || this.modelViewTransform, 'Positioned GroupNodes need a MVT' );

      // @private {function}
      this.visibilityListener = isAnimating => {
        if ( !options.positioned ) {
          this.visible = !isAnimating;
        }
      };
      this.group.isAnimatingProperty.link( this.visibilityListener );

      // @private {Property.<boolean>}
      this.isSelectedProperty = options.isSelectedProperty;
      this.itemsToDispose.push( this.isSelectedProperty );

      if ( !this.isIcon ) {
        // @private {function}
        this.positionListener = position => {
          this.translation = this.modelViewTransform.modelToViewPosition( position );
        };
        this.group.positionProperty.link( this.positionListener );

        // @private {function}
        this.scaleListener = scale => {
          this.setScaleMagnitude( scale );
        };
        this.group.scaleProperty.link( this.scaleListener );

        // Don't allow touching once we start animating
        // @private {function}
        this.isAnimatingListener = isAnimating => {
          this.pickable = !isAnimating;
        };
        this.group.isAnimatingProperty.link( this.isAnimatingListener );
      }
    }

    /**
     * Hooks up drag handling.
     * @protected
     *
     * @param {Property.<Bounds2>} dragBoundsProperty
     * @param {Node} dragListenerTarget - The node that the main listener is put on.
     * @param {Object} options - The main options object
     */
    attachDragListener( dragBoundsProperty, dragListenerTarget, options ) {

      let pointer = null;

      // @public {DragListener}
      this.dragListener = new DragListener( {
        targetNode: this,
        dragBoundsProperty,
        transform: this.modelViewTransform,
        locationProperty: this.group.positionProperty,
        start: ( event, listener ) => {
          pointer = listener.pointer;

          options.selectListener && options.selectListener( pointer );
          this.moveToFront();

        },
        drag: ( event, listener ) => {
          options.dragListener && options.dragListener( pointer );
        },
        end: listener => {
          options.dropListener && options.dropListener( pointer );
        }
      } );
      this.itemsToDispose.push( this.dragListener );
      dragListenerTarget.addInputListener( this.dragListener );

      this.addInputListener( {
        down: event => {
          options.selectListener && options.selectListener( event.pointer );
        }
      } );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.group.isAnimatingProperty.unlink( this.visibilityListener );
      this.positionListener && this.group.positionProperty.unlink( this.positionListener );
      this.scaleListener && this.group.scaleProperty.unlink( this.scaleListener );
      this.isAnimatingListener && this.group.isAnimatingProperty.unlink( this.isAnimatingListener );
      this.itemsToDispose.forEach( item => item.dispose() );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'GroupNode', GroupNode );
} );
