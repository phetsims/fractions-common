// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for intro screens.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const FractionDisplayType = require( 'FRACTIONS_COMMON/common/enum/FractionDisplayType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const MaxNode = require( 'FRACTIONS_COMMON/intro/view/MaxNode' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const equationString = require( 'string!FRACTIONS_COMMON/equation' );
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
        fill: FractionsCommonColorProfile.introPanelBackgroundProperty,
        xMargin: 16,
        yMargin: 10,
        right: this.layoutBounds.right - MARGIN,
        top: this.layoutBounds.top + MARGIN
      } ) );

      if ( model.allowMixedNumbers ) {

        // Use a "weaker" / grayer color when showing 0/x
        const partialFractionColorProperty = new DerivedProperty( [
          model.numeratorProperty,
          model.denominatorProperty,
          FractionsCommonColorProfile.mixedFractionStrongProperty,
          FractionsCommonColorProfile.mixedFractionWeakProperty
        ], ( numerator, denominator, strongColor, weakColor ) => {
          return numerator % denominator === 0 ? weakColor : strongColor;
        } );

        // Separate options/fraction created since we need to grab the "maximum" bounds to do proper layout. Can't use
        // "starting" bounds, since it's at 0 and would be smaller.
        const fractionNodeOptions = {
          type: FractionDisplayType.MIXED,
          simplify: true,

          maxWhole: model.containerCountProperty.range.max,
          maxNumerator: model.denominatorProperty.range.max - 1,
          maxDenominator: model.denominatorProperty.range.max,

          wholeFill: FractionsCommonColorProfile.mixedFractionStrongProperty,
          numeratorFill: partialFractionColorProperty,
          denominatorFill: partialFractionColorProperty,
          separatorFill: partialFractionColorProperty,

          // Node options
          scale: 2
        };
        const maxMixedFractionNodeBounds = new MixedFractionNode( _.extend( {}, fractionNodeOptions, {
          whole: 0,
          numerator: 0,
          denominator: 0,
          simplify: false
        } ) ).bounds;

        // @private {Node}
        this.mixedFractionNode = new AlignBox( new PropertyFractionNode( model.numeratorProperty, model.denominatorProperty, fractionNodeOptions ), {
          alignBounds: maxMixedFractionNodeBounds,
          xAlign: 'right'
        } );
        this.addChild( this.mixedFractionNode );
        model.showMixedNumbersProperty.linkAttribute( this.mixedFractionNode, 'visible' );

        const label = new Text( mixedNumberString, { font: new PhetFont( 26 ) } );
        this.addChild( new Checkbox( label, model.showMixedNumbersProperty, {
          boxWidth: 30,
          right: this.layoutBounds.right - MARGIN,
          bottom: this.resetAllButton.top - 40
        } ) );

        // Options for the "Equation" accordion box (bottom-left)
        const equationScale = 1.5;
        const equationLeftOptions = {
          type: FractionDisplayType.MIXED,
          simplify: true,
          showZeroImproperFraction: false,

          maxWhole: model.containerCountProperty.range.max,
          maxNumerator: model.denominatorProperty.range.max - 1,
          maxDenominator: model.denominatorProperty.range.max,

          wholeFill: FractionsCommonColorProfile.mixedFractionStrongProperty,
          numeratorFill: FractionsCommonColorProfile.mixedFractionStrongProperty,
          denominatorFill: FractionsCommonColorProfile.mixedFractionStrongProperty,
          separatorFill: FractionsCommonColorProfile.mixedFractionStrongProperty,

          scale: equationScale
        };
        const equationRightOptions = {
          type: FractionDisplayType.IMPROPER,

          maxNumerator: model.denominatorProperty.range.max * model.containerCountProperty.range.max,
          maxDenominator: model.denominatorProperty.range.max,

          scale: equationScale
        };

        const equationBoxContent = new HBox( {
          spacing: 10,
          children: [
            new AlignBox( new PropertyFractionNode( model.numeratorProperty, model.denominatorProperty, equationLeftOptions ), {
              alignBounds: new MixedFractionNode( _.extend( {}, equationLeftOptions, {
                whole: 0,
                numerator: 0,
                denominator: 0,
                simplify: false
              } ) ).bounds,
              xAlign: 'right'
            } ),
            new Text( MathSymbols.EQUAL_TO, { font: new PhetFont( 30 * equationScale ) } ),
            new PropertyFractionNode( model.numeratorProperty, model.denominatorProperty, equationRightOptions )
          ]
        } );

        const equationBox = new AccordionBox( equationBoxContent, {
          titleNode: new Text( equationString, { font: new PhetFont( 20 ) } ),
          showTitleWhenExpanded: false,
          bottom: this.layoutBounds.bottom - MARGIN,
          left: this.layoutBounds.left + 50,
          fill: 'white',
          expandedProperty: model.mixedNumbersBoxExpandedProperty,
          buttonTouchAreaXDilation: 15,
          buttonTouchAreaYDilation: 15
        } );
        this.addChild( equationBox );
        model.showMixedNumbersProperty.linkAttribute( equationBox, 'visible' );
      }

      // layout
      const centerY = this.layoutBounds.centerY - 30;
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
