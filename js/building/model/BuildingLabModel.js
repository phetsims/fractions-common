// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
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
  function BuildingLabModel() {
  }

  fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );

  return inherit( Object, BuildingLabModel, {
    reset: function() {

    },

    step: function( dt ) {
      
    }
  } );
} );
