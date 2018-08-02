// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  const NumberSpotType = {
    WHOLE: 'WHOLE',
    NUMERATOR: 'NUMERATOR',
    DENOMINATOR: 'DENOMINATOR'
  };

  fractionsCommon.register( 'NumberSpotType', NumberSpotType );

  // @public {Array.<NumberSpotType>} - All values the enumeration can take.
  NumberSpotType.VALUES = [
    NumberSpotType.WHOLE,
    NumberSpotType.NUMERATOR,
    NumberSpotType.DENOMINATOR
  ];

  // TODO: doc
  NumberSpotType.getTypes = function( isMixedNumber ) {
    return isMixedNumber ? [ NumberSpotType.WHOLE, NumberSpotType.NUMERATOR, NumberSpotType.DENOMINATOR ] : [ NumberSpotType.NUMERATOR, NumberSpotType.DENOMINATOR ];
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( NumberSpotType ); }

  return NumberSpotType;
} );
