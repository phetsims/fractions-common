// Copyright 2018-2020, University of Colorado Boulder

/**
 * What type of representation is being shown for building-type screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import fractionsCommon from '../../fractionsCommon.js';

const BuildingRepresentation = Enumeration.byKeys( [
  'PIE',
  'BAR'
], {
  beforeFreeze: BuildingRepresentation => {
    /**
     * Returns the offset for a stack given the index.
     * @public
     *
     * @param {BuildingRepresentation} representation
     * @param {number} index
     * @returns {Vector2}
     */
    BuildingRepresentation.getOffset = ( representation, index ) => {
      return new Vector2( ( representation === BuildingRepresentation.PIE ? 1 : -1 ) * 4 * index, -4 * index );
    };
  }
} );

fractionsCommon.register( 'BuildingRepresentation', BuildingRepresentation );
export default BuildingRepresentation;