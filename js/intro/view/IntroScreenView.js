// Copyright 2017, University of Colorado Boulder

/**
 * ScreeView for intro screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  var FractionNode = require( 'FRACTIONS_COMMON/intro/view/FractionNode' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MaxSpinner = require( 'FRACTIONS_COMMON/intro/view/MaxSpinner' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {ContainerSetScreenView}
   *
   * @param {IntroModel} model
   */
  function IntroScreenView( model ) {
    ContainerSetScreenView.call( this, model );

    // @private {Node}
    var mixedFractionNode = new FractionNode( model.numeratorProperty, model.denominatorProperty, {
      fractionRepresentation: 'mixed',
      wholeFont: new PhetFont( 150 ),
      font: new PhetFont( 110 ),
      dividingLineLength: 50,
      dividingLineWidth: 10
    } );
    this.addChild( mixedFractionNode );
    model.showMixedNumbersProperty.linkAttribute( mixedFractionNode, 'visible' );

    var maxPanel = new Panel( new AlignBox( new MaxSpinner( model.containerCountProperty, {
      right: this.layoutBounds.right - 20,
      top: this.layoutBounds.top + 25
    } ), {
      group: this.representationPanel.alignGroup
    } ), {
      fill: FractionsCommonColorProfile.panelBackgroundProperty,
      xMargin: 12,
      yMargin: 10
    } );
    this.addChild( maxPanel );

    // layout
    var margin = FractionsCommonConstants.PANEL_MARGIN;
    this.resetAllButton.rightBottom = this.layoutBounds.rightBottom.plusXY( -margin, -margin );
    // TODO: aligngroup for representation/max panel
    this.representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( margin, margin );
    maxPanel.rightTop = this.layoutBounds.rightTop.plusXY( -margin, margin );
    this.viewContainer.translation = new Vector2( this.representationPanel.centerX, this.representationPanel.bottom + 20 );
    this.fractionWithSpinners.rightCenter = this.layoutBounds.rightCenter.plusXY( -margin, 0 );
  }

  fractionsCommon.register( 'IntroScreenView', IntroScreenView );

  return inherit( ContainerSetScreenView, IntroScreenView );
} );
