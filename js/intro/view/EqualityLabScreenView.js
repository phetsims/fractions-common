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
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class EqualityLabScreenView extends ContainerSetScreenView {
    /**
     * @param {EqualityLabModel} model
     */
    constructor( model ) {
      super( model );

      // layout
      this.bucketContainer.left = this.layoutBounds.left + MARGIN;
      this.adjustableFractionNode.left = this.bucketContainer.right + MARGIN;
      this.representationPanel.right = this.adjustableFractionNode.right;

      this.representationPanel.top = this.layoutBounds.top + MARGIN;

      const centerY = this.layoutBounds.centerY - 40;
      this.viewContainer.y = centerY;

      // TODO: vertical alignment
      this.adjustableFractionNode.bottom = this.layoutBounds.bottom - MARGIN;
      this.bucketContainer.bottom = this.layoutBounds.bottom - MARGIN;

      model.representationProperty.link( () => {
        this.viewContainer.right = this.representationPanel.right;
      } );
      // TODO: Will have other content here in a bit
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
