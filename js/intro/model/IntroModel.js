// Copyright 2017, University of Colorado Boulder

/**
 * Full model for the "Intro" simulation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var ContainerSetModel = require( 'FRACTIONS_COMMON/intro/model/ContainerSetModel' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} allowMixedNumbers
   * @param {Object} [options]
   */
  function IntroModel( allowMixedNumbers, options ) {
    ContainerSetModel.call( this, options );

    // @public {boolean} - Whether to allow the display of the fraction as a mixed number
    this.allowMixedNumbers = allowMixedNumbers;
  }

  fractionsCommon.register( 'IntroModel', IntroModel );

  return inherit( ContainerSetModel, IntroModel );
} );
