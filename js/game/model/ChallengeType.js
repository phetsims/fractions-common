// Copyright 2018-2020, University of Colorado Boulder

/**
 * Represents the three main different styles of game challenges.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

export default fractionsCommon.register( 'ChallengeType', Enumeration.byKeys( [
  'PIE',
  'BAR',
  'NUMBER'
] ) );