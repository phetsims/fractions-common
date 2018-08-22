// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const ContainerSetModel = require( 'FRACTIONS_COMMON/intro/model/ContainerSetModel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );

  class EqualityLabModel extends ContainerSetModel {
    constructor() {
      super( {
        representations: [ Representation.CIRCLE, Representation.HORIZONTAL_BAR, Representation.VERTICAL_BAR, Representation.BEAKER ],
        initialContainerCount: 4,
        maxContainers: 4
      } );

      // @public {Property.<Representation>} - Representation of the noninteractive fraction display for equivalence.
      this.parallelRepresentationProperty = new Property( Representation.CIRCLE );

      // @public {Property.<number>} - The multiplier used to construct the "parallel" fraction
      this.multiplierProperty = new NumberProperty( 1 );
    }

    /**
     * Resets the model.
     * @public
     * @override
     */
    reset() {
      this.parallelRepresentationProperty.reset();
      this.multiplierProperty.reset();

      ContainerSetModel.prototype.reset.call( this );
    }
  }

  return fractionsCommon.register( 'EqualityLabModel', EqualityLabModel );
} );
