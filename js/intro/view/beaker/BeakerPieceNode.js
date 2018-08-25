// Copyright 2018, University of Colorado Boulder

/**
 * The beaker variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Property = require( 'AXON/Property' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  class BeakerPieceNode extends BeakerNode {
    /**
     * TODO: dedup if necessary?
     *
     * @param {number} denominator
     * @param {function} finishedAnimatingCallback - Called as function( {BeakerPieceNode} )
     * @param {function} droppedCallback - Called as function( {BeakerPieceNode} )
     */
    constructor( denominator, finishedAnimatingCallback, droppedCallback ) {
      super( 1, denominator );

      // @private
      this.finishedAnimatingCallback = finishedAnimatingCallback;

      // @public {Property.<Vector2>}
      this.originProperty = new Property( Vector2.ZERO );
      this.destinationProperty = new Property( Vector2.ZERO );

      // @public {boolean}
      this.isUserControlled = false;

      // @private {number} - Animation progress, from 0 to 1.
      this.ratio = 0;

      this.originProperty.lazyLink( origin => {
        this.ratio = 0;
        this.center = origin;
      } );
      this.destinationProperty.lazyLink( () => {
        this.ratio = 0;
      } );

      // @public
      var initialOffset;
      this.dragListener = new SimpleDragHandler( {
        start: event => {
          initialOffset = this.getCenter().minus( this.globalToParentPoint( event.pointer.point ) );
        },
        drag: event => {
          this.setCenter( this.globalToParentPoint( event.pointer.point ).plus( initialOffset ) );
        },
        end: () => {
          droppedCallback( this );
        }
      } );
    }

    /**
     * Steps forward in time.
     * @public
     * @override
     *
     * @param {number} dt
     */
    step( dt ) {
      if ( this.isUserControlled ) {
        return;
      }

      // Smaller animations are somewhat faster
      this.ratio = Math.min( 1, this.ratio + dt * 20 / Math.sqrt( this.originProperty.value.distance( this.destinationProperty.value ) ) );
      if ( this.ratio === 1 ) {
        this.finishedAnimatingCallback( this );
      }
      else {
        var easedRatio = Easing.QUADRATIC_IN_OUT.value( this.ratio );
        this.setCenter( this.originProperty.value.blend( this.destinationProperty.value, easedRatio ) );
      }
    }
  }

  return fractionsCommon.register( 'BeakerPieceNode', BeakerPieceNode );
} );
