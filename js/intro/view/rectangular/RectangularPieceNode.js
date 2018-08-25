// Copyright 2018, University of Colorado Boulder

/**
 * The rectangular variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PieceNode = require( 'FRACTIONS_COMMON/intro/view/PieceNode' );
  const RectangularNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularNode' );

  class RectangularPieceNode extends PieceNode {
    /**
     * @param {Piece} piece
     * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
     * @param {function} droppedCallback - Called as function( {Piece} )
     * @param {Object} [options]
     */
    constructor( piece, finishedAnimatingCallback, droppedCallback, options ) {

      // @private TODO note more than just node, has midpointOffset variable
      // TODO: uhhh...?
      options = _.extend( options, {
        dropShadow: true
      } );

      const graphic = new RectangularNode( piece.denominator, options );

      super( piece, finishedAnimatingCallback, droppedCallback, {
        graphic
      } );

      // @private {RectangularNode} -- TODO: don't have to do this?
      this.graphic = graphic;

      this.mutate( options );
    }

    /**
     * Returns the midpoint of the piece
     * @public
     * @override
     *
     * @returns {Vector2}
     */
    getMidpoint() {
      return this.localToParentPoint( this.graphic.midpointOffset );
    }

    /**
     * Sets the midpoint of the piece
     * @protected TODO: check visibility
     *
     * @param {Vector2} midpoint
     */
    setMidpoint( midpoint ) {
      this.translation = this.translation.plus( midpoint.minus( this.localToParentPoint( this.graphic.midpointOffset ) ) );
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
        this.finishedAnimatingCallback();
      }
      else {
        var easedRatio = Easing.QUADRATIC_IN_OUT.value( this.ratio );
        this.setMidpoint( this.originProperty.value.blend( this.destinationProperty.value, easedRatio ) );
      }
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

  return fractionsCommon.register( 'RectangularPieceNode', RectangularPieceNode );
} );
