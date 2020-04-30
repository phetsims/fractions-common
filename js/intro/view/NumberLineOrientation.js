// Copyright 2018-2020, University of Colorado Boulder

/**
 * Represents the orientation of a number line.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

const NumberLineOrientation = Enumeration.byKeys( [
  'HORIZONTAL',
  'VERTICAL'
] );
fractionsCommon.register( 'NumberLineOrientation', NumberLineOrientation );
export default NumberLineOrientation;