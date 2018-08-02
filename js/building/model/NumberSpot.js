// Copyright 2017, University of Colorado Boulder

/**
 * Represents a place in a mixed fraction where a natural number can be potentially placed.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

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

      // @public {Bounds2}
      this.bounds = bounds;

      // @public {Property.<NumberPiece|null>}
      this.pieceProperty = new Property( null );

      // @public {Property.<boolean>}
      this.showNotAllowedProperty = new BooleanProperty( false );
    }
  }

  return fractionsCommon.register( 'NumberSpot', NumberSpot );
} );
