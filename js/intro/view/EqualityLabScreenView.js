// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var ContainerSetScreenView = require( 'FRACTIONS_COMMON/intro/view/ContainerSetScreenView' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {ContainerSetScreenView}
   *
   * @param {IntroModel} model
   */
  function EqualityLabScreenView( model ) {
    ContainerSetScreenView.call( this, model );

    // layout
    var margin = FractionsCommonConstants.PANEL_MARGIN;
    this.resetAllButton.rightBottom = this.layoutBounds.rightBottom.plusXY( -margin, -margin );
    this.representationPanel.leftTop = this.layoutBounds.leftTop.plusXY( margin, margin );
    this.viewContainer.translation = new Vector2( this.representationPanel.centerX, this.representationPanel.bottom + 20 );
    this.fractionWithSpinners.rightCenter = this.layoutBounds.rightCenter.plusXY( -margin, 0 );
  }

  fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );

  return inherit( ContainerSetScreenView, EqualityLabScreenView );
} );
