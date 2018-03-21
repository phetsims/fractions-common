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
  var Checkbox = require( 'SUN/Checkbox' );
  var ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  var FractionNode = require( 'FRACTIONS_COMMON/intro/view/FractionNode' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ContainerCountSpinner = require( 'FRACTIONS_COMMON/intro/view/ContainerCountSpinner' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var mixedNumberString = require( 'string!FRACTIONS_COMMON/mixedNumber' );

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

    var maxPanel = new Panel( new AlignBox( new ContainerCountSpinner( model.containerCountProperty, {
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

    var mixedNumbersCheckbox = new Checkbox( new Text( mixedNumberString, { font: new PhetFont( 26 ) } ), model.showMixedNumbersProperty, {
      boxWidth: 30
    } );
    if ( model.allowMixedNumbers ) {
      this.addChild( mixedNumbersCheckbox );
    }

    // layout
    var margin = FractionsCommonConstants.PANEL_MARGIN;
    this.resetAllButton.rightBottom = this.layoutBounds.rightBottom.plusXY( -margin, -margin );
    this.representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( margin + model.allowMixedNumbers ? 100 : 0, margin );
    maxPanel.rightTop = this.layoutBounds.rightTop.plusXY( -margin, margin );
    this.viewContainer.translation = new Vector2( this.representationPanel.centerX, this.representationPanel.bottom + 60 );
    // TODO: factor out bucket offset?
    this.bucketContainer.translation = new Vector2( this.representationPanel.centerX, this.layoutBounds.bottom - 120 );
    this.fractionWithSpinners.rightCenter = this.layoutBounds.rightCenter.plusXY( -margin, 0 );
    mixedNumbersCheckbox.rightTop = new Vector2( this.layoutBounds.right - margin, this.fractionWithSpinners.bottom + 40 );
    mixedFractionNode.leftCenter = this.layoutBounds.leftCenter.plusXY( margin, 0 );
  }

  fractionsCommon.register( 'IntroScreenView', IntroScreenView );

  return inherit( ContainerSetScreenView, IntroScreenView );
} );
