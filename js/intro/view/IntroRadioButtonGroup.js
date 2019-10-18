// Copyright 2018-2019, University of Colorado Boulder

/**
 * Holds common settings to RadioButtonGroups for the intro-style screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  class IntroRadioButtonGroup extends RadioButtonGroup {
    /**
     * @param {Property.<*>} property
     * @param {Array.<*>} array
     * @param {Object} [options]
     */
    constructor( property, array, options ) {
      super( property, array, merge( {
        orientation: 'horizontal',
        baseColor: 'white',
        spacing: 12,
        buttonContentXMargin: 5,
        buttonContentYMargin: 10,
        touchAreaXDilation: 6,
        touchAreaYDilation: 6
      }, options ) );
    }
  }

  return fractionsCommon.register( 'IntroRadioButtonGroup', IntroRadioButtonGroup );
} );
