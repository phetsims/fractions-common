// Copyright 2018, University of Colorado Boulder

/**
 * Displays an up/down control for incrementing/decrementing a Property
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const Property = require( 'AXON/Property' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class RoundNumberSpinner extends VBox {
    /**
     * @param {Property.<number>} numberProperty
     * @param {Property.<boolean>} increaseEnabledProperty
     * @param {Property.<boolean>} decreaseEnabledProperty
     * @param {Object} [options]
     */
    constructor( numberProperty, increaseEnabledProperty, decreaseEnabledProperty, options ) {
      assert && assert( numberProperty instanceof Property );
      assert && assert( increaseEnabledProperty instanceof Property );
      assert && assert( decreaseEnabledProperty instanceof Property );

      options = _.extend( {
        baseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
        rotation: 0,
        spacing: 3
      }, options );

      super( options );

      // @private {RoundArrowButton}
      this.increaseButton = new RoundArrowButton( {
        rotation: -options.rotation,
        baseColor: options.baseColor,
        arrowRotation: options.rotation,
        enabledProperty: increaseEnabledProperty,
        listener: () => {
          numberProperty.value++;
        }
      } );

      // @private {RoundArrowButton}
      this.decreaseButton = new RoundArrowButton( {
        rotation: -options.rotation,
        baseColor: options.baseColor,
        arrowRotation: Math.PI + options.rotation,
        enabledProperty: decreaseEnabledProperty,
        listener: () => {
          numberProperty.value--;
        }
      } );

      this.children = [
        this.increaseButton,
        this.decreaseButton
      ];
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.increaseButton.dispose();
      this.decreaseButton.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'RoundNumberSpinner', RoundNumberSpinner );
} );
