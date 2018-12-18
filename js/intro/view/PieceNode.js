// Copyright 2018, University of Colorado Boulder

/**
 * Base type for displaying a piece.
 *
 * NOTE: The graphics of a piece are set up so that its logical "center" (that it may rotate around or corresponds to
 * its best "drag" location) will be at its origin.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class PieceNode extends Node {
    /**
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
     * @param {function} droppedCallback - Called as function( {Piece} )
     * @param {Object} [options]
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback, options ) {
      options = _.extend( {
        // TODO: better way of handling default. rename to config
        graphic: new Node()
      }, options );

      super( {
        children: [ options.graphic ]
      } );

      // @public {Piece} - Accessed from elsewhere
      this.piece = piece;

      // @protected {Node}
      this.graphic = options.graphic;

      // @private {function}
      this.finishedAnimatingCallback = finishedAnimatingCallback;

      // @public {Property.<Vector2>}
      this.originProperty = new Property( Vector2.ZERO );
      this.destinationProperty = new Property( Vector2.ZERO );

      // @public <boolean>
      this.isUserControlled = false;

      // @protected {number} - Animation progress, from 0 to 1.
      this.ratio = 0;

      this.originProperty.lazyLink( origin => {
        this.ratio = 0;
        piece.positionProperty.value = origin;
        this.setMidpoint( origin );

        // circle specific
        if ( this.graphic.getCircleRotation ) {
          // @protected {number}
          this.originRotation = this.graphic.getCircleRotation();
        }
      } );
      this.destinationProperty.lazyLink( () => {
        this.ratio = 0;
      } );

      // @private {function}
      this.positionListener = position => this.setMidpoint( position );
      this.piece.positionProperty.link( this.positionListener );

      // @public {DragListener}
      this.dragListener = new DragListener( {
        targetNode: this,
        locationProperty: piece.positionProperty,
        end: () => droppedCallback( piece )
      } );
    }

    /**
     * Returns the midpoint of the piece (in the parent's coordinate bounds).
     * @public
     *
     * @returns {Vector2}
     */
    getMidpoint() {
      return this.localToParentPoint( Vector2.ZERO );
    }

    /**
     * Translates the piece by moving its midpoint.
     * @protected
     *
     * @param {Vector2} midpoint
     */
    setMidpoint( midpoint ) {
      // TODO: why doesn't this use getMidpoint?
      this.translation = this.translation.plus( midpoint.minus( this.localToParentPoint( Vector2.ZERO ) ) );
    }

    /**
     * Handles operations in step() before midpoint is set.
     * @protected
     */
    beforeMidpointSet() {
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      if ( this.isUserControlled ) {
        return;
      }

      // Smaller animations are somewhat faster
      const distance = Math.sqrt( this.originProperty.value.distance( this.destinationProperty.value ) );
      this.ratio = distance === 0 ? 1 : Math.min( 1, this.ratio + dt * 60 / distance );
      if ( this.ratio === 1 ) {
        this.finishedAnimatingCallback( this );
      }
      else {
        this.beforeMidpointSet();

        const easedRatio = Easing.QUADRATIC_IN_OUT.value( this.ratio );
        this.setMidpoint( this.originProperty.value.blend( this.destinationProperty.value, easedRatio ) );
      }
    }

    /**
     * Orients the piece to match the closest cell.
     * @public
     *
     * @param {Cell} closestCell
     * @param {number} dt
     */
    orient( closestCell, dt ) {
      // extra behavior added in subclasses
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.piece.positionProperty.unlink( this.positionListener );
      this.interruptSubtreeInput();
      this.dragListener.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'PieceNode', PieceNode );
} );
