// Copyright 2018-2020, University of Colorado Boulder

/**
 * Holds common settings to RadioButtonGroups for the intro-style screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import merge from '../../../../phet-core/js/merge.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import fractionsCommon from '../../fractionsCommon.js';

class IntroRadioButtonGroup extends RectangularRadioButtonGroup {
  /**
   * @param {Property.<*>} property
   * @param {Array.<*>} array
   * @param {Object} [options]
   */
  constructor( property, array, options ) {
    super( property, array, merge( {
      orientation: 'horizontal',
      baseColor: 'white',
      spacing: 12,
      buttonContentXMargin: 5,
      buttonContentYMargin: 10,
      touchAreaXDilation: 6,
      touchAreaYDilation: 6
    }, options ) );
  }
}

fractionsCommon.register( 'IntroRadioButtonGroup', IntroRadioButtonGroup );
export default IntroRadioButtonGroup;