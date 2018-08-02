// Copyright 2017, University of Colorado Boulder

/**
 * Common settings for a panel that has a RadioButtonGroup inside.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
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
      // TODO: factor out with MaxSpinner's panel
      xMargin: 10,
      yMargin: 10
    }, options );

    // @public {AlignGroup}
    this.alignGroup = new AlignGroup( {
      matchHorizontal: false
    } );

    var content = new AlignBox( new RadioButtonGroup( property, items, {
      orientation: 'horizontal',
      baseColor: 'white',
      spacing: 12,
      buttonContentXMargin: 5,
      buttonContentYMargin: 10
    } ), {
      group: this.alignGroup
    } );

    Panel.call( this, content, options );
  }

  fractionsCommon.register( 'FractionsCommonRadioButtonPanel', FractionsCommonRadioButtonPanel );

  return inherit( Panel, FractionsCommonRadioButtonPanel );
} );
