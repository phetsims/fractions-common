// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for intro screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  const FractionDisplayType = require( 'FRACTIONS_COMMON/common/enum/FractionDisplayType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const MaxNode = require( 'FRACTIONS_COMMON/intro/view/MaxNode' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const mixedNumberString = require( 'string!FRACTIONS_COMMON/mixedNumber' );

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class IntroScreenView extends ContainerSetScreenView {
    /**
     * @param {IntroModel} model
     */
    constructor( model ) {
      super( model );

      // @private {Node}
      const mixedFractionNode = new PropertyFractionNode( model.numeratorProperty, model.denominatorProperty, {
        type: FractionDisplayType.MIXED,
        scale: 2
      } );
      this.addChild( new AlignBox( mixedFractionNode, {
        alignBounds: this.layoutBounds,
        xAlign: 'left',
        margin: MARGIN
      } ) );
      model.showMixedNumbersProperty.linkAttribute( mixedFractionNode, 'visible' );

      const maxPanel = new Panel( new AlignBox( new MaxNode( model.containerCountProperty ), {
        group: this.representationPanel.alignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        xMargin: 16,
        yMargin: 10
      } );
      this.addChild( maxPanel );

      const mixedNumbersCheckbox = new Checkbox( new Text( mixedNumberString, { font: new PhetFont( 26 ) } ), model.showMixedNumbersProperty, {
        boxWidth: 30
      } );
      if ( model.allowMixedNumbers ) {
        this.addChild( mixedNumbersCheckbox );
      }

      // layout
      this.resetAllButton.rightBottom = this.layoutBounds.rightBottom.plusXY( -MARGIN, -MARGIN );
      this.representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( MARGIN + ( model.allowMixedNumbers ? 100 : 0 ), MARGIN );
      maxPanel.rightTop = this.layoutBounds.rightTop.plusXY( -MARGIN, MARGIN );
      this.viewContainer.translation = new Vector2( this.representationPanel.centerX, this.representationPanel.bottom + 60 );
      // TODO: factor out bucket offset?
      this.bucketContainer.translation = new Vector2( this.representationPanel.centerX, this.layoutBounds.bottom - 120 );
      mixedNumbersCheckbox.rightBottom = new Vector2( this.layoutBounds.right - MARGIN, this.resetAllButton.top - 40 );
    }
  }

  return fractionsCommon.register( 'IntroScreenView', IntroScreenView );
} );
