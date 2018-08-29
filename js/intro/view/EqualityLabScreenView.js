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
      const centerY = this.layoutBounds.centerY;
      this.adjustableFractionNode.right = this.layoutBounds.right - MARGIN;
      this.adjustableFractionNode.centerY = centerY;
      this.representationPanel.top = this.layoutBounds.top + MARGIN;
      this.representationPanel.left = MARGIN; // TODO: Will be different
      this.viewContainer.x = this.representationPanel.centerX;
      this.viewContainer.y = this.representationPanel.bottom + 20; // TODO????
      this.bucketContainer.centerX = this.representationPanel.centerX;
      this.bucketContainer.bottom = this.layoutBounds.bottom - MARGIN;

      // TODO: Will have other content here in a bit
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
