// Copyright 2017, University of Colorado Boulder

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
  const Vector2 = require( 'DOT/Vector2' );

  class EqualityLabScreenView extends ContainerSetScreenView {
    /**
     * @param {EqualityLabModel} model
     */
    constructor( model ) {
      super( model );

      // layout
      const margin = FractionsCommonConstants.PANEL_MARGIN;
      this.resetAllButton.rightBottom = this.layoutBounds.rightBottom.plusXY( -margin, -margin );
      this.representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( margin, margin );
      this.viewContainer.translation = new Vector2( this.representationPanel.centerX, this.representationPanel.bottom + 20 );
      // TODO: factor out bucket offset?
      this.bucketContainer.translation = new Vector2( this.representationPanel.centerX, this.layoutBounds.bottom - 120 );
      this.fractionWithSpinners.rightCenter = this.layoutBounds.rightCenter.plusXY( -margin, 0 );
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
