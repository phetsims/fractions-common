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
  const Matrix3 = require( 'DOT/Matrix3' );
  const Property = require( 'AXON/Property' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const Shape = require( 'KITE/Shape' );
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
        spacing: 3,
        longTouchDilation: 12,
        sideTouchDilation: 12,
        touchRadius: 10
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

      const rotationMatrix = Matrix3.rotation2( options.rotation );

      this.increaseButton.touchArea = Shape.boundsOffsetWithRadii( this.increaseButton.localBounds, {
        left: options.sideTouchDilation,
        right: options.sideTouchDilation,
        top: options.longTouchDilation,
        bottom: options.spacing / 2
      }, {
        topLeft: options.touchRadius,
        topRight: options.touchRadius
      } ).transformed( rotationMatrix );

      this.decreaseButton.touchArea = Shape.boundsOffsetWithRadii( this.decreaseButton.localBounds, {
        left: options.sideTouchDilation,
        right: options.sideTouchDilation,
        top: options.spacing / 2,
        bottom: options.longTouchDilation
      }, {
        bottomLeft: options.touchRadius,
        bottomRight: options.touchRadius
      } ).transformed( rotationMatrix );

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
