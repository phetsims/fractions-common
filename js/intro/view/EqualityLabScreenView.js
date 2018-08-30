// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerSceneNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularSceneNode' );
  const ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const IntroRadioButtonGroup = require( 'FRACTIONS_COMMON/intro/view/IntroRadioButtonGroup' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineSceneNode' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularSceneNode' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const RoundNumberSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundNumberSpinner' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class EqualityLabScreenView extends ContainerSetScreenView {
    /**
     * @param {EqualityLabModel} model
     */
    constructor( model ) {
      super( model, {
        spinnersOnRight: false
      } );

      const equalsText = new Text( MathSymbols.EQUAL_TO, { font: new PhetFont( 90 ) } );
      this.addChild( equalsText );

      const multipliedNumeratorProperty = new DerivedProperty( [ model.numeratorProperty, model.multiplierProperty ], ( numerator, multiplier ) => {
        return numerator * multiplier;
      } );
      const multipliedDenominatorProperty = new DerivedProperty( [ model.denominatorProperty, model.multiplierProperty ], ( denominator, multiplier ) => {
        return denominator * multiplier;
      } );

      const multipliedFractionNode = new PropertyFractionNode( multipliedNumeratorProperty, multipliedDenominatorProperty, {
        // TODO: share scale
        scale: 3,

        maxNumerator: model.numeratorProperty.range.max * model.multiplierProperty.range.max,
        maxDenominator: model.denominatorProperty.range.max * model.multiplierProperty.range.max
      } );
      this.addChild( multipliedFractionNode );

      const multiplierSpinner = new RoundNumberSpinner(
        model.multiplierProperty,
        new DerivedProperty( [ model.multiplierProperty ], multiplier => multiplier < model.multiplierProperty.range.max ),
        new DerivedProperty( [ model.multiplierProperty ], multiplier => multiplier > model.multiplierProperty.range.min ), {
        baseColor: FractionsCommonColorProfile.greenRoundArrowButtonProperty,
        rotation: Math.PI / 2
      } );
      this.addChild( multiplierSpinner );

      // TODO: alternates!
      const circularIcon = CircularSceneNode.getIcon();
      const horizontalIcon = RectangularSceneNode.getIcon( RectangularOrientation.HORIZONTAL );
      const verticalIcon = RectangularSceneNode.getIcon( RectangularOrientation.VERTICAL );
      const beakerIcon = BeakerSceneNode.getIcon();
      const variableIcon = new Node( {
        children: [
          circularIcon,
          horizontalIcon,
          verticalIcon,
          beakerIcon
        ]
      } );
      model.representationProperty.link( representation => {
        circularIcon.visible = representation === Representation.CIRCLE;
        horizontalIcon.visible = representation === Representation.HORIZONTAL_BAR;
        verticalIcon.visible = representation === Representation.VERTICAL_BAR;
        beakerIcon.visible = representation === Representation.BEAKER;
      } );

      const showNumberLineNode = new IntroRadioButtonGroup( model.showNumberLineProperty, [
        {
          value: false,
          node: variableIcon
        },
        {
          value: true,
          node: NumberLineSceneNode.getIcon()
        }
      ] );

      const showNumberLinePanel = new Panel( new AlignBox( showNumberLineNode, {
        group: this.topAlignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        // TODO: factor out margins?
        xMargin: 10,
        yMargin: 10
      } );
      this.addChild( showNumberLinePanel );

      // layout
      this.bucketContainer.left = this.layoutBounds.left + MARGIN;
      this.adjustableFractionNode.left = this.bucketContainer.right + MARGIN;
      equalsText.left = this.adjustableFractionNode.right + MARGIN;
      multipliedFractionNode.left = equalsText.right + MARGIN;
      multiplierSpinner.left = multipliedFractionNode.right + MARGIN;

      this.representationPanel.right = this.adjustableFractionNode.right;
      this.representationPanel.top = this.layoutBounds.top + MARGIN;
      showNumberLinePanel.left = multipliedFractionNode.left;
      showNumberLinePanel.top = this.layoutBounds.top + MARGIN;

      const centerY = this.layoutBounds.centerY - 40;
      this.viewContainer.y = centerY;

      // TODO: vertical alignment
      this.bucketContainer.bottom = this.layoutBounds.bottom - MARGIN;
      this.adjustableFractionNode.bottom = this.layoutBounds.bottom - MARGIN;
      equalsText.centerY = this.adjustableFractionNode.centerY;
      multipliedFractionNode.centerY = this.adjustableFractionNode.centerY;
      multiplierSpinner.centerY = this.adjustableFractionNode.centerY;

      model.representationProperty.link( () => {
        this.viewContainer.right = this.representationPanel.right;
      } );
      // TODO: Will have other content here in a bit
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
