// Copyright 2018, University of Colorado Boulder

/**
 * Shows a round push-button with a directional arrow.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Path = require( 'SCENERY/nodes/Path' );
  const RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  const Shape = require( 'KITE/Shape' );

  class RoundArrowButton extends RoundPushButton {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      // TODO: Use this for all of those arrow buttons

      options = _.extend( {
        radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
        fireOnHold: true,
        arrowRotation: 0,
        baseColor: FractionsCommonColorProfile.greenRoundArrowButtonProperty,
        enabledProperty: new BooleanProperty( true )
      }, options );

      // "center" the shape around the origin (where we want it to rotate around)
      const size = options.radius * 0.5;
      const ratio = 0.4;
      const arrowShape = new Shape().moveTo( -size, ratio * size ).lineTo( 0, ( ratio - 1 ) * size ).lineTo( size, ratio * size );
      const arrowPath = new Path( arrowShape, {
        stroke: 'black',
        lineWidth: size * 0.5,
        lineCap: 'round',
        rotation: options.arrowRotation
      } );

      // Provide offsets so that it will place our origin at the actual center
      options.content = arrowPath;
      options.xContentOffset = arrowPath.centerX;
      options.yContentOffset = arrowPath.centerY;

      super( options );

      // @private {Property.<boolean>}
      this.enabledProperty = options.enabledProperty;

      // @private {function}
      this.enabledListener = this.onEnabledChange.bind( this );

      this.enabledProperty.link( this.enabledListener );
    }

    /**
     * Sets whether this is enabled.
     * @private
     *
     * @param {boolean} enabled
     */
    onEnabledChange( enabled ) {
      this.enabled = this.enabledProperty.value;
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.enabledProperty.unlink( this.enabledListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'RoundArrowButton', RoundArrowButton );
} );
