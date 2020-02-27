// Copyright 2018-2019, University of Colorado Boulder

/**
 * Represents the orientation of the rectangular view (one representation is more vertical, one is more horizontal).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

export default fractionsCommon.register( 'RectangularOrientation', Enumeration.byKeys( [
  'HORIZONTAL',
  'VERTICAL'
] ) );