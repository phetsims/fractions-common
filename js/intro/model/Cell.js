// Copyright 2017, University of Colorado Boulder

/**
 * Represents a filled cell (of 1/N, for whatever denominator).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Piece = require( 'FRACTIONS_COMMON/intro/model/Piece' );

  class Cell {
    /**
     * @param {Container} container
     * @param {number} index
     */
    constructor( container, index ) {
      assert && assert( typeof index === 'number' );

      // @public {Container} - Sometimes this is easier to access when stored on the cell
      this.container = container;

      // @public {number} - Which cell is it? (Can determine rotation/location from this)
      this.index = index;

      // @public {Piece|null>} - The piece that is on its way to us.
      this.targetedPiece = null;

      // @public {Property.<boolean>} - Whether it is "logically" filled. Includes cells that have pieces animation to them.
      this.isFilledProperty = new BooleanProperty( false );

      // @public {Property.<boolean>} - Whether it is "visually" filled. Means isFilled and no piece animating to it.
      this.appearsFilledProperty = new BooleanProperty( false );
    }

    /**
     * Fills a totally empty cell (no piece incoming).
     * @public
     */
    fill() {
      assert && assert( !this.isFilledProperty.value && !this.appearsFilledProperty.value && !this.targetedPiece );

      this.isFilledProperty.value = true;
      this.appearsFilledProperty.value = true;
    }

    /**
     * Empties a totally full cell (no piece incoming).
     * @public
     */
    empty() {
      assert && assert( this.isFilledProperty.value && this.appearsFilledProperty.value && !this.targetedPiece );

      this.isFilledProperty.value = false;
      this.appearsFilledProperty.value = false;
    }

    /**
     * "Fills" the cell by noting that this piece will now be animating to us.
     * @public
     *
     * @param {Piece} piece
     */
    targetWithPiece( piece ) {
      assert && assert( piece instanceof Piece );
      assert && assert( !this.isFilledProperty.value && !this.appearsFilledProperty.value && !this.targetedPiece );

      piece.destinationCell = this;
      this.targetedPiece = piece;

      this.isFilledProperty.value = true;
    }

    /**
     * "Unfills" the cell by noting that this piece will not be animating to us anymore.
     * @public
     *
     * @param {Piece} piece
     */
    untargetFromPiece( piece ) {
      assert && assert( piece instanceof Piece );
      assert && assert( this.isFilledProperty.value && !this.appearsFilledProperty.value && this.targetedPiece );

      piece.destinationCell = null;
      this.targetedPiece = null;

      this.isFilledProperty.value = false;
    }

    /**
     * The piece that was animating to us finally "hit" us and filled us visually.
     * @public
     *
     * @param {Piece} piece
     */
    fillWithPiece( piece ) {
      assert && assert( piece instanceof Piece );
      assert && assert( this.isFilledProperty.value && !this.appearsFilledProperty.value && this.targetedPiece );

      piece.destinationCell = null;
      this.targetedPiece = null;

      this.appearsFilledProperty.value = true;
    }
  }

  return fractionsCommon.register( 'Cell', Cell );
} );
