// Copyright 2018-2019, University of Colorado Boulder

/**
 * The different slots in a number group where number pieces can go.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

export default fractionsCommon.register( 'NumberSpotType', Enumeration.byKeys( [
  'WHOLE',
  'NUMERATOR',
  'DENOMINATOR'
], {
  beforeFreeze: NumberSpotType => {
    /**
     * @param {boolean} isMixedNumber
     * @returns {Array.<NumberSpotType>} - Shows the number spots available for whether mixed numbers are an option.
     */
    NumberSpotType.getTypes = isMixedNumber => isMixedNumber ? [
      NumberSpotType.WHOLE,
      NumberSpotType.NUMERATOR,
      NumberSpotType.DENOMINATOR
    ] : [
      NumberSpotType.NUMERATOR,
      NumberSpotType.DENOMINATOR
    ];
  }
} ) );