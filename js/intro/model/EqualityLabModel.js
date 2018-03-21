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
  var IntroModel = require( 'FRACTIONS_COMMON/intro/model/IntroModel' );

  /**
   * @constructor
   * @extends {Object}
   */
  function EqualityLabModel() {
    IntroModel.call( this, true, {
      initialContainerCount: 4
    } );
  }

  fractionsCommon.register( 'EqualityLabModel', EqualityLabModel );

  return inherit( IntroModel, EqualityLabModel, {
    // TODO: reset override needed?
  } );
} );
