// Copyright 2018, University of Colorado Boulder

/**
 * Tracks a cell and it's corresponding view node, and handles visibility.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class CellEntry {
    /**
     * @param {Cell} cell
     * @param {Node} node
     */
    constructor( cell, node ) {
      // @public {Cell}
      this.cell = cell;

      // @public {Node}
      this.node = node;

      // @private {function}
      this.visibilityListener = this.cell.appearsFilledProperty.linkAttribute( node, 'visible' );
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.cell.appearsFilledProperty.unlink( this.visibilityListener );
    }
  }

  return fractionsCommon.register( 'CellEntry', CellEntry );
} );
