// Copyright 2018, University of Colorado Boulder

/**
 * What type of representation is being shown for building-type screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Vector2 = require( 'DOT/Vector2' );

  const BuildingRepresentation = new Enumeration( [
    'PIE',
    'BAR'
  ], BuildingRepresentation => {
    /**
     * Returns the offset for a stack given the index.
     * @public
     *
     * @param {BuildingRepresentation} representation
     * @param {number} index
     *
     * @returns {Vector2}
     */
    BuildingRepresentation.getOffset = ( representation, index ) => {
      return new Vector2( ( representation === BuildingRepresentation.PIE ? 1 : -1 ) * 4 * index, -4 * index );
    };
  } );

  return fractionsCommon.register( 'BuildingRepresentation', BuildingRepresentation );
} );
