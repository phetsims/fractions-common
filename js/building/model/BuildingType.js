// Copyright 2018-2020, University of Colorado Boulder

/**
 * In a building situation, whether shapes or numbers are included.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

export default fractionsCommon.register( 'BuildingType', Enumeration.byKeys( [
  'SHAPE',
  'NUMBER'
] ) );