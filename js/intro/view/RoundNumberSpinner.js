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
        rotation: 0
      }, options );

      const increaseButton = new RoundArrowButton( {
        rotation: -options.rotation,
        mutableBaseColor: options.baseColor,
        arrowRotation: options.rotation,
        enabledProperty: increaseEnabledProperty,
        listener: () => {
          numberProperty.value++;
        }
      } );
      const decreaseButton = new RoundArrowButton( {
        rotation: -options.rotation,
        mutableBaseColor: options.baseColor,
        arrowRotation: Math.PI + options.rotation,
        enabledProperty: decreaseEnabledProperty,
        listener: () => {
          numberProperty.value--;
        }
      } );

      super( _.extend( {
        spacing: 3,
        children: [
          increaseButton,
          decreaseButton
        ]
      }, options ) );
    }
  }

  return fractionsCommon.register( 'RoundNumberSpinner', RoundNumberSpinner );
} );
