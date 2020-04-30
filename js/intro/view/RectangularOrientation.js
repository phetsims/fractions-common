// Copyright 2018-2020, University of Colorado Boulder

/**
 * Represents the orientation of the rectangular view (one representation is more vertical, one is more horizontal).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

const RectangularOrientation = Enumeration.byKeys( [
  'HORIZONTAL',
  'VERTICAL'
] );
fractionsCommon.register( 'RectangularOrientation', RectangularOrientation );
export default RectangularOrientation;