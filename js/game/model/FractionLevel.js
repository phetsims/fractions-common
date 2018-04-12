// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {number} number
   * @param {number} numTargets
   * @param {BuildingType} buildingType
   * @param {function} generateChallenge - function(): {FractionChallenge}
   */
  function FractionLevel( number, numTargets, buildingType, generateChallenge ) {

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

  fractionsCommon.register( 'FractionLevel', FractionLevel );

  return inherit( Object, FractionLevel, {
    /**
     * Resets the object.
     * @public
     */
    reset: function() {
      this.scoreProperty.reset();
      this.challengeProperty.value = this.generateChallenge();
    }
  } );
} );
