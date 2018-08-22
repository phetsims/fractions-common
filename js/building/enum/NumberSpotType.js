// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'FRACTIONS_COMMON/common/enum/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'NumberSpotType', new Enumeration( [
    'WHOLE',
    'NUMERATOR',
    'DENOMINATOR'
  ], NumberSpotType => {
    // TODO: doc
    NumberSpotType.getTypes = function( isMixedNumber ) {
      return isMixedNumber ? [ NumberSpotType.WHOLE, NumberSpotType.NUMERATOR, NumberSpotType.DENOMINATOR ] : [ NumberSpotType.NUMERATOR, NumberSpotType.DENOMINATOR ];
    };
  } ) );
} );
