// Copyright 2018-2019, University of Colorado Boulder

/**
 * Enumerates strategies for turning ShapePartition + Fraction => FilledPartition
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

export default fractionsCommon.register( 'FillType', Enumeration.byKeys( [
  'SEQUENTIAL',
  'MIXED', // when number of shapes > 1, first shape will be completely filled and the 2nd shape will be random
  'RANDOM'
] ) );