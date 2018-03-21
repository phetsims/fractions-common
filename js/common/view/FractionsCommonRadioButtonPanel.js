// Copyright 2017, University of Colorado Boulder

/**
 * Common settings for a panel that has a RadioButtonGroup inside.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {Property.<*>} property
   * @param {Array.<*>} items - For the RadioButtonGroup
   * @param {Object} [options]
   */
  function FractionsCommonRadioButtonPanel( property, items, options ) {

    options = _.extend( {
      fill: FractionsCommonColorProfile.panelBackgroundProperty,
      xMargin: 10,
      yMargin: 10
    }, options );

    var content = new RadioButtonGroup( property, items, {
      orientation: 'horizontal',
      baseColor: 'white',
      cornerRadius: 10,
      spacing: 12,
      buttonContentXMargin: 5,
      buttonContentYMargin: 10
    } );

    Panel.call( this, content, options );
  }

  fractionsCommon.register( 'FractionsCommonRadioButtonPanel', FractionsCommonRadioButtonPanel );

  return inherit( Panel, FractionsCommonRadioButtonPanel );
} );
