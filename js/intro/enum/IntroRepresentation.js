// Copyright 2018, University of Colorado Boulder

/**
 * What type of representation is being shown (for intro-style screens)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  const IntroRepresentation = new Enumeration( [
    'CIRCLE',
    'HORIZONTAL_BAR',
    'VERTICAL_BAR',
    'BEAKER',
    'CAKE',
    'NUMBER_LINE'
  ] );

  return fractionsCommon.register( 'IntroRepresentation', IntroRepresentation );
} );
