// Copyright 2018, University of Colorado Boulder

/**
 * Represents a place in a mixed fraction where a natural number can be potentially placed.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  //REVIEW: `const` instead of `var`?
  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var Property = require( 'AXON/Property' );

  class NumberSpot {
    /**
     * @param {NumberGroup} numberGroup
     * @param {NumberSpotType} type
     * @param {Bounds2} bounds
     */
    constructor( numberGroup, type, bounds ) {

      // @public {NumberGroup}
      this.numberGroup = numberGroup;

      // @public {NumberSpotType}
      this.type = type;

      // @public {Bounds2} - Model-coordinate area for its zone.
      this.bounds = bounds;

      // @public {Property.<NumberPiece|null>} - The piece our spot is "filled" with (if any)
      this.pieceProperty = new Property( null );

      // @public {Property.<boolean>} - Whether it should appear like it cannot be filled with a number piece currently
      // being dragged.
      this.showNotAllowedProperty = new BooleanProperty( false );
    }
  }

  return fractionsCommon.register( 'NumberSpot', NumberSpot );
} );
