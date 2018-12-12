// Copyright 2018, University of Colorado Boulder

/**
 * Represents a floating piece that is not in a cell.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class Piece {
    /**
     * @param {number} denominator
     */
    constructor( denominator ) {

      // @private {number} - If the denominator would ever change, this piece would just cease to exist.
      this.denominator = denominator;

      // @public {Cell|null} - Where this piece started
      this.originCell = null;

      // @public {Cell|null} - Where this piece will end up. If set to a cell, it will change the cell appearance when
      // the piece goes away.
      this.destinationCell = null;

      // @public {Property.<Vector2>}
      this.positionProperty = new Property( Vector2.ZERO );
    }
  }

  return fractionsCommon.register( 'Piece', Piece );
} );
