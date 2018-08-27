// Copyright 2018, University of Colorado Boulder

/**
 * Base type for displaying a piece.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  // TODO: Get rid of SimpleDragHandler usage

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

      // TODO: check visibilities, things are not as they seem

      // @public {Piece} - Accessed from elsewhere
      this.piece = piece;

      // @protected {Node}
      this.graphic = options.graphic;

      // @protected (read-only) {function}
      this.finishedAnimatingCallback = finishedAnimatingCallback;

      // @public {Property.<Vector2>}
      this.originProperty = new Property( Vector2.ZERO );
      this.destinationProperty = new Property( Vector2.ZERO );

      // @public <boolean>
      this.isUserControlled = false;

      // @private {number} - Animation progress, from 0 to 1.
      this.ratio = 0;

      // TODO: duplication with other pieces? BeakerPieceNode?
      this.originProperty.lazyLink( origin => {
        this.ratio = 0;
        this.setMidpoint( origin );

        // circle specific
        //TODO : fixed for when not a circle
        if ( this.graphic.getCircleRotation ) {
          this.originRotation = this.graphic.getCircleRotation();
        }
      } );
      this.destinationProperty.lazyLink( () => {
        this.ratio = 0;
      } );

      // @public
      var initialOffset;
      this.dragListener = new SimpleDragHandler( {
        start: event => {
          initialOffset = this.getMidpoint().minus( this.globalToParentPoint( event.pointer.point ) );
        },
        drag: event => {
          this.setMidpoint( this.globalToParentPoint( event.pointer.point ).plus( initialOffset ) );
        },
        end: () => {
          droppedCallback( piece );
        }
      } );
    }

    /**
     * gets the mid point of this piece
     * @returns {Vector2}
     * @public
     */
    getMidpoint() {
      // TODO: Use centroids?
      return this.localToParentPoint( this.graphic.midpointOffset );
    }

    /**
     * sets the midpoint of this piece
     * @param {Vector2} midpoint
     * @private
     */
    setMidpoint( midpoint ) {
      this.translation = this.translation.plus( midpoint.minus( this.localToParentPoint( this.graphic.midpointOffset ) ) );
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      // TODO: just override instead of abstract (call parent step)
      throw new Error( 'unimplemented' );
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
     */
    dispose() {
      this.interruptSubtreeInput();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'PieceNode', PieceNode );
} );
