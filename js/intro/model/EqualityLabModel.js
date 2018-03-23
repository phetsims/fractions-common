// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Equality Lab" screen of Fractions: Equality
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var ContainerSetModel = require( 'FRACTIONS_COMMON/intro/model/ContainerSetModel' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );

  /**
   * @constructor
   * @extends {Object}
   */
  function EqualityLabModel() {
    ContainerSetModel.call( this, {
      representations: [ Representation.CIRCLE, Representation.HORIZONTAL_BAR, Representation.VERTICAL_BAR, Representation.BEAKER ],
      initialContainerCount: 4,
      maxContainers: 4
    } );

    // @public {Property.<Representation>} - Representation of the noninteractive fraction display for equivalence.
    this.parallelRepresentationProperty = new Property( Representation.CIRCLE );

    // @public {Property.<number>} - The multiplier used to construct the "parallel" fraction
    this.multiplierProperty = new NumberProperty( 1 );
  }

  fractionsCommon.register( 'EqualityLabModel', EqualityLabModel );

  return inherit( ContainerSetModel, EqualityLabModel, {
    /**
     * Resets the model.
     * @public
     * @override
     */
    reset: function() {
      this.parallelRepresentationProperty.reset();
      this.multiplierProperty.reset();

      ContainerSetModel.prototype.reset.call( this );
    }
  } );
} );
