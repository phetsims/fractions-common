// Copyright 2018, University of Colorado Boulder

/**
 * The different slots in a number group where number pieces can go.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'NumberSpotType', new Enumeration( [
    'WHOLE',
    'NUMERATOR',
    'DENOMINATOR'
  ], NumberSpotType => {
    /**
     * @param {boolean} isMixedNumber
     * @returns {Array.<NumberSpotType>} - Shows the number spots available for whether mixed numbers are an option.
     */
    NumberSpotType.getTypes = isMixedNumber => isMixedNumber ? [
      NumberSpotType.WHOLE,
      NumberSpotType.NUMERATOR,
      NumberSpotType.DENOMINATOR
    ] : [
      NumberSpotType.NUMERATOR,
      NumberSpotType.DENOMINATOR
    ];
  } ) );
} );
