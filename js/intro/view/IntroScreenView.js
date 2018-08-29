// Copyright 2018, University of Colorado Boulder

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

      // "Max" panel
      this.addChild( new Panel( new AlignBox( new MaxNode( model.containerCountProperty ), {
        group: this.topAlignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        xMargin: 16,
        yMargin: 10,
        right: this.layoutBounds.right - MARGIN,
        top: this.layoutBounds.top + MARGIN
      } ) );

      if ( model.allowMixedNumbers ) {
        // @private {Node}
        this.mixedFractionNode = new PropertyFractionNode( model.numeratorProperty, model.denominatorProperty, {
          type: FractionDisplayType.MIXED,
          scale: 2,

          maxWhole: model.containerCountProperty.range.max,
          maxNumerator: model.denominatorProperty.range.max - 1,
          maxDenominator: model.denominatorProperty.range.max
        } );
        this.addChild( this.mixedFractionNode );
        model.showMixedNumbersProperty.linkAttribute( this.mixedFractionNode, 'visible' );

        const label = new Text( mixedNumberString, { font: new PhetFont( 26 ) } );
        this.addChild( new Checkbox( label, model.showMixedNumbersProperty, {
          boxWidth: 30,
          right: this.layoutBounds.right - MARGIN,
          bottom: this.resetAllButton.top - 40
        } ) );
      }

      // layout
      const centerY = this.layoutBounds.centerY;
      this.adjustableFractionNode.right = this.layoutBounds.right - MARGIN;
      this.adjustableFractionNode.centerY = centerY;
      if ( this.mixedFractionNode ) {
        this.mixedFractionNode.left = this.layoutBounds.left + MARGIN;
        this.mixedFractionNode.centerY = centerY;
      }

      this.representationPanel.top = this.layoutBounds.top + MARGIN;
      const left = this.model.allowMixedNumbers ? this.mixedFractionNode.right : this.layoutBounds.left;
      const right = this.adjustableFractionNode.left;
      const centerX = ( left + right ) / 2;
      this.representationPanel.centerX = centerX;
      this.viewContainer.x = centerX;
      this.viewContainer.y = centerY;
      this.bucketContainer.centerX = centerX;
      this.bucketContainer.bottom = this.layoutBounds.bottom - MARGIN;
    }
  }

  return fractionsCommon.register( 'IntroScreenView', IntroScreenView );
} );
