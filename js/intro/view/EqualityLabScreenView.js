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
  const BeakerContainerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerContainerNode' );
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerSceneNode' );
  const CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularContainerNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularSceneNode' );
  const ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const IntroRadioButtonGroup = require( 'FRACTIONS_COMMON/intro/view/IntroRadioButtonGroup' );
  const IntroRepresentation = require( 'FRACTIONS_COMMON/intro/enum/IntroRepresentation' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineNode' );
  const NumberLineOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/NumberLineOrientation' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineSceneNode' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularContainerNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularSceneNode' );
  const RoundNumberSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundNumberSpinner' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

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
      const circularIcon = CircularSceneNode.getIcon( true );
      const horizontalIcon = RectangularSceneNode.getIcon( RectangularOrientation.HORIZONTAL, true );
      const verticalIcon = RectangularSceneNode.getIcon( RectangularOrientation.VERTICAL, true );
      const beakerIcon = BeakerSceneNode.getIcon( true );
      const variableIcon = new Node( {
        children: [
          circularIcon,
          horizontalIcon,
          verticalIcon,
          beakerIcon
        ]
      } );
      model.representationProperty.link( representation => {
        circularIcon.visible = representation === IntroRepresentation.CIRCLE;
        horizontalIcon.visible = representation === IntroRepresentation.HORIZONTAL_BAR;
        verticalIcon.visible = representation === IntroRepresentation.VERTICAL_BAR;
        beakerIcon.visible = representation === IntroRepresentation.BEAKER;
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
        fill: FractionsCommonColorProfile.introPanelBackgroundProperty,
        // TODO: factor out margins?
        xMargin: 10,
        yMargin: 10
      } );
      this.addChild( showNumberLinePanel );

      const multipliedViewContainer = new Node( {
        pickable: false
      } );
      this.addChild( multipliedViewContainer );

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
      multipliedViewContainer.y = centerY;

      // TODO: vertical alignment
      this.bucketContainer.bottom = this.layoutBounds.bottom - MARGIN;
      this.adjustableFractionNode.bottom = this.layoutBounds.bottom - MARGIN;
      equalsText.centerY = this.adjustableFractionNode.centerY;
      multipliedFractionNode.centerY = this.adjustableFractionNode.centerY;
      multiplierSpinner.centerY = this.adjustableFractionNode.centerY;

      model.representationProperty.link( () => {
        this.viewContainer.right = this.representationPanel.right;
      } );

      let containerNodes = [];
      let lastRepresentation = null;

      function spacedBox( numPerRow, nodes ) {
        return new VBox( {
          center: Vector2.ZERO,
          spacing: FractionsCommonConstants.INTRO_CONTAINER_SPACING,
          children: _.chunk( nodes, numPerRow ).map( rowNodes => new HBox( {
            spacing: FractionsCommonConstants.INTRO_CONTAINER_SPACING,
            children: rowNodes
          } ) )
        } );
      }

      Property.multilink( [ model.representationProperty, model.showNumberLineProperty ], ( representation, showNumberLine ) => {
        representation = showNumberLine ? IntroRepresentation.NUMBER_LINE : representation;
        if ( representation !== lastRepresentation ) {
          containerNodes.forEach( containerNode => containerNode.dispose() );
          containerNodes = [];
          multipliedViewContainer.children.forEach( child => child.dispose() );
          lastRepresentation = representation;

          const containers = model.multipliedContainers.getArray();

          const colorOverride = FractionsCommonColorProfile.equalityLabColorProperty;

          // TODO: some cleanup
          if ( representation === IntroRepresentation.CIRCLE ) {
            containerNodes = containers.map( container => new CircularContainerNode( container, {
              colorOverride
            } ) );
            multipliedViewContainer.addChild( spacedBox( 2, containerNodes ) );
          }
          else if ( representation === IntroRepresentation.HORIZONTAL_BAR ) {
            containerNodes = containers.map( container => new RectangularContainerNode( container, {
              rectangularOrientation: RectangularOrientation.HORIZONTAL,
              colorOverride
            } ) );
            multipliedViewContainer.addChild( spacedBox( 1, containerNodes ) );
          }
          else if ( representation === IntroRepresentation.VERTICAL_BAR ) {
            containerNodes = containers.map( container => new RectangularContainerNode( container, {
              rectangularOrientation: RectangularOrientation.VERTICAL,
              colorOverride
            } ) );
            multipliedViewContainer.addChild( spacedBox( 4, containerNodes ) );
          }
          else if ( representation === IntroRepresentation.BEAKER ) {
            containerNodes = containers.map( container => new BeakerContainerNode( container, {
              colorOverride: FractionsCommonColorProfile.equalityLabWaterProperty
            } ) );
            multipliedViewContainer.addChild( spacedBox( 4, containerNodes ) );
          }
          else if ( representation === IntroRepresentation.NUMBER_LINE ) {
            const multipliedNumberLine = new NumberLineNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty, {
              multiplierProperty: model.multiplierProperty,
              orientation: NumberLineOrientation.VERTICAL,
              unitSize: 60,
              markerFill: colorOverride
            } );
            containerNodes = [ multipliedNumberLine ];
            multipliedViewContainer.addChild( multipliedNumberLine );
          }

          if ( multipliedViewContainer.bounds.isValid() ) {
            multipliedViewContainer.left = multipliedFractionNode.left;
          }
        }
      } );
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
