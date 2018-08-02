// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );

  class FractionLevel {
    /**
     * @param {number} number
     * @param {number} numTargets
     * @param {BuildingType} buildingType
     * @param {function} generateChallenge - function(): {FractionChallenge}
     */
    constructor( number, numTargets, buildingType, generateChallenge ) {

      // @public {number}
      this.number = number;

      // @public {number}
      this.numTargets = numTargets;

      // @public {BuildingType}
      this.buildingType = buildingType;

      // @private {function}
      this.generateChallenge = generateChallenge;

      // @public {Property.<number>}
      this.scoreProperty = new NumberProperty( 0 );

      // @public {Property.<FractionChallenge>}
      this.challengeProperty = new Property( generateChallenge() );
    }

    /**
     * Resets the object.
     * @public
     */
    reset() {
      this.scoreProperty.reset();
      this.challengeProperty.value = this.generateChallenge();
    }
  }

  return fractionsCommon.register( 'FractionLevel', FractionLevel );
} );
