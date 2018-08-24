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

      // "Max" panel
      this.addChild( new Panel( new AlignBox( new MaxNode( model.containerCountProperty ), {
        group: this.representationPanel.alignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        xMargin: 16,
        yMargin: 10,
        right: this.layoutBounds.right - MARGIN,
        top: this.layoutBounds.top + MARGIN
      } ) );

      if ( model.allowMixedNumbers ) {
        const label = new Text( mixedNumberString, { font: new PhetFont( 26 ) } );
        this.addChild( new Checkbox( label, model.showMixedNumbersProperty, {
          boxWidth: 30,
          right: this.layoutBounds.right - MARGIN,
          bottom: this.resetAllButton.top - 40
        } ) );
      }
    }

    /**
     * Subclasses should position the representation panel properly.
     * @protected
     * @override
     *
     * @param {Node} representationPanel
     */
    layoutRepresentationPanel( representationPanel ) {
      representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( MARGIN + ( this.model.allowMixedNumbers ? 100 : 0 ), MARGIN );
    }

    /**
     * Subclasses should position the view container properly.
     * @protected
     * @override
     *
     * @param {Node} viewContainer
     * @param {Node} representationPanel
     */
    layoutViewContainer( viewContainer, representationPanel ) {
      viewContainer.translation = new Vector2( representationPanel.centerX, representationPanel.bottom + 60 );
    }
  }

  return fractionsCommon.register( 'IntroScreenView', IntroScreenView );
} );
