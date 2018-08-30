// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
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

      // layout
      this.bucketContainer.left = this.layoutBounds.left + MARGIN;
      this.adjustableFractionNode.left = this.bucketContainer.right + MARGIN;
      equalsText.left = this.adjustableFractionNode.right + MARGIN;
      multipliedFractionNode.left = equalsText.right + MARGIN;
      multiplierSpinner.left = multipliedFractionNode.right + MARGIN;

      this.representationPanel.right = this.adjustableFractionNode.right;
      this.representationPanel.top = this.layoutBounds.top + MARGIN;

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
