// Copyright 2017, University of Colorado Boulder
/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @constructor
   * @extends {MutableOptionsNode}
   *
   * @param {Object} [options]
   */
  function RoundArrowButton( options ) {

    // TODO: Use this for all of those arrow buttons

    options = _.extend( {
      radius: FractionsCommonConstants.ROUND_BUTTON_RADIUS,
      fireOnHold: true,
      arrowRotation: 0,
      mutableBaseColor: FractionsCommonColorProfile.greenRoundArrowButtonProperty,
      enabledProperty: new BooleanProperty( true )
    }, options );

    // @private {Property.<boolean>}
    this.enabledProperty = options.enabledProperty;

    // "center" the shape around the origin (where we want it to rotate around)
    var size = options.radius * 0.5;
    var ratio = 0.5;
    var arrowShape = new Shape().moveTo( -size, ratio * size ).lineTo( 0,  ( ratio - 1 ) * size ).lineTo( size, ratio * size );
    var arrowPath = new Path( arrowShape, {
      stroke: 'black',
      lineWidth: size * 0.5,
      lineCap: 'round',
      rotation: options.arrowRotation
    } );

    // Provide offsets so that it will place our origin at the actual center
    options.content = arrowPath;
    options.xContentOffset = arrowPath.centerX;
    options.yContentOffset = arrowPath.centerY;

    // Doesn't support a mutable baseColor... so we wrap it
    MutableOptionsNode.call( this, RoundPushButton, [], options, {
      baseColor: options.mutableBaseColor
    } );

    // @private {function}
    this.enabledListener = this.setEnabled.bind( this );
    this.enabledProperty.link( this.enabledListener );
    this.nodeProperty.link( this.enabledListener );
  }

  fractionsCommon.register( 'RoundArrowButton', RoundArrowButton );

  return inherit( MutableOptionsNode, RoundArrowButton, {
    /**
     * Sets whether this is enabled.
     * @private
     */
    setEnabled: function( enabled ) {
      this.nodeProperty.value.enabled = this.enabledProperty.value;
    },

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.enabledProperty.unlink( this.enabledListener );

      MutableOptionsNode.prototype.dispose.call( this );
    }
  } );
} );
