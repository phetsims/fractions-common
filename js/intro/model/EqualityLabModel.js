// Copyright 2018, University of Colorado Boulder

/**
 * Model for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const ContainerSetModel = require( 'FRACTIONS_COMMON/intro/model/ContainerSetModel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const IntroRepresentation = require( 'FRACTIONS_COMMON/intro/enum/IntroRepresentation' );
  const MultipliedContainer = require( 'FRACTIONS_COMMON/intro/model/MultipliedContainer' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Range = require( 'DOT/Range' );

  class EqualityLabModel extends ContainerSetModel {
    constructor() {
      super( {
        representations: [
          IntroRepresentation.CIRCLE,
          IntroRepresentation.HORIZONTAL_BAR,
          IntroRepresentation.VERTICAL_BAR,
          IntroRepresentation.BEAKER
        ],
        initialContainerCount: 4,
        maxContainers: 4,
        maxDenominator: 6,
        isCompact: true,
        bucketWidth: 310
      } );

      // @public {Property.<boolean>} - Whether the right side should show a number line instead of the normal
      // representation.
      this.showNumberLineProperty = new BooleanProperty( false );

      // @public {Property.<number>} - The multiplier used to construct the "parallel" fraction
      this.multiplierProperty = new NumberProperty( 2, {
        range: new Range( 1, 3 )
      } );

      // @public {ObservableArray.<Container>}
      this.multipliedContainers = this.containers.map( container => new MultipliedContainer( container, this.multiplierProperty ) );
    }

    /**
     * Resets the model.
     * @public
     * @override
     */
    reset() {
      this.showNumberLineProperty.reset();
      this.multiplierProperty.reset();

      super.reset();
    }
  }

  return fractionsCommon.register( 'EqualityLabModel', EqualityLabModel );
} );
