// Copyright 2017, University of Colorado Boulder

/**
 * Full model for the "Intro" simulation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const ContainerSetModel = require( 'FRACTIONS_COMMON/intro/model/ContainerSetModel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class IntroModel extends ContainerSetModel {
    /**
     * @param {boolean} allowMixedNumbers
     * @param {Object} [options]
     */
    constructor( allowMixedNumbers, options ) {
      options = _.extend( {
        maxContainers: allowMixedNumbers ? 4 : 6
      }, options );

      super( options );

      // @public {boolean} - Whether to allow the display of the fraction as a mixed number
      this.allowMixedNumbers = allowMixedNumbers;

      // @public {Property.<boolean>} - Whether to show mixed numbers or not
      this.showMixedNumbersProperty = new BooleanProperty( false );
    }
  }

  return fractionsCommon.register( 'IntroModel', IntroModel );
} );
