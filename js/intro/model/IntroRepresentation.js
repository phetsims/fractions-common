// Copyright 2018-2020, University of Colorado Boulder

/**
 * What type of representation is being shown (for intro-style screens)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

const IntroRepresentation = Enumeration.byKeys( [
  'CIRCLE',
  'HORIZONTAL_BAR',
  'VERTICAL_BAR',
  'BEAKER',
  'CAKE',
  'NUMBER_LINE'
] );

fractionsCommon.register( 'IntroRepresentation', IntroRepresentation );
export default IntroRepresentation;