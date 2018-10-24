// Copyright 2017-2018, University of Colorado Boulder

/**
 * Query parameters supported by fractions-common simulations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  var FractionsCommonQueryParameters = QueryStringMachine.getAll( {
    /**
     * Hack level one on the fractions screen to only show shapes, and only show shapes that can be displayed with the
     * denominator given by this query parameter. The numerator is between 1 and 6 (see Level 1 in model/Constants.js).
     * For example ?testDenominator=5 will show a variety of shapes that are able to be drawn when fractions
     * have that denominator,
     * see https://github.com/phetsims/fraction-matcher/issues/101
     */
    testDenominator: {
      type: 'number',
      defaultValue: 0
    }
  } );

  fractionsCommon.register( 'FractionsCommonQueryParameters', FractionsCommonQueryParameters );

  return FractionsCommonQueryParameters;
} );
