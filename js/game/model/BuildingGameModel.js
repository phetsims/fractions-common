// Copyright 2017, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {Object}
   */
  function BuildingGameModel() {
  }

  fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );

  return inherit( Object, BuildingGameModel, {
    reset: function() {

    },

    step: function( dt ) {
      
    }
  } );
} );
