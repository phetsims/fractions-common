// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {EqualityLabModel} model
   */
  function EqualityLabScreenView( model ) {
    ScreenView.call( this );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  fractionsCommon.register( 'EqualityLabScreenView', EqualityLabScreenView );

  return inherit( ScreenView, EqualityLabScreenView, {
    step: function( dt ) {

    }
  } );
} );
