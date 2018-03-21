// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Equality Lab" screen of Fractions: Equality
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
  function EqualityLabModel() {
  }

  fractionsCommon.register( 'EqualityLabModel', EqualityLabModel );

  return inherit( Object, EqualityLabModel, {
    reset: function() {

    },

    step: function( dt ) {
      
    }
  } );
} );
