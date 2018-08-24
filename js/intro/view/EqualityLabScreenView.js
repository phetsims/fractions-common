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

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class EqualityLabScreenView extends ContainerSetScreenView {
    /**
     * @param {EqualityLabModel} model
     */
    constructor( model ) {
      super( model );

      // TODO: Will have other content here in a bit
    }

    /**
     * Subclasses should position the representation panel properly.
     * @protected
     * @override
     *
     * @param {Node} representationPanel
     */
    layoutRepresentationPanel( representationPanel ) {
      representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( MARGIN, MARGIN );
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
      viewContainer.translation = new Vector2( representationPanel.centerX, representationPanel.bottom + 20 );
    }
  }

  return fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );
} );
