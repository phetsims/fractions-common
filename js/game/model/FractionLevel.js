// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Property = require( 'AXON/Property' );

  // globals
  let generated1Shapes = false;
  // let generated2Shapes = false;

  class FractionLevel {
    /**
     * @param {number} number
     * @param {number} numTargets
     * @param {BuildingType} buildingType
     * @param {ColorDef} color
     * @param {function} generateChallenge - function({number} levelNumber, {ColorDef} color): {FractionChallenge}
     */
    constructor( number, numTargets, buildingType, color, generateChallenge ) {

      // @public {number}
      this.number = number;

      // @public {number}
      this.numTargets = numTargets;

      // @public {BuildingType}
      this.buildingType = buildingType;

      // @public {ColorDef}
      this.color = color;

      // @private {function}
      this.generateChallenge = generateChallenge;

      // @public {Property.<FractionChallenge>}
      this.challengeProperty = new Property( generateChallenge( this.number, this.color ) );

      // @public {Property.<number>}
      this.scoreProperty = new DynamicProperty( this.challengeProperty, {
        derive: 'scoreProperty'
      } );
    }

    /**
     * Resets the object.
     * @public
     */
    reset() {
      // Note it as a refreshed challenge, so that we'll dissolve to it if needed.
      const nextChallenge = this.generateChallenge( this.number, this.color );
      this.challengeProperty.value.refreshedChallenge = nextChallenge;
      this.challengeProperty.value = nextChallenge;
    }

    /**
     * Returns a random subset of the items (without replacement), in a random order.
     * @public
     *
     * @param {number} quantity
     * @param {Array.<*>} items
     * @returns {Array.<*>}
     */
    static choose( quantity, items ) {
      assert && assert( typeof quantity === 'number' );
      assert && assert( Array.isArray( items ) );
      assert && assert( items.length >= quantity );

      return phet.joist.random.shuffle( items ).slice( 0, quantity );
    }

    static unitFractions( fractions ) {
      return _.flatten( fractions.map( fraction => {
        return _.times( fraction.numerator, () => new Fraction( 1, fraction.denominator ) );
      } ) );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 1.
     * @public
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level1Shapes( levelNumber, color ) {
      const targetFractions = phet.joist.random.shuffle( [
        ...FractionLevel.choose( 1, [
          new Fraction( 1, 1 ),
          new Fraction( 2, 2 ),
          new Fraction( 3, 3 )
        ] ),
        ...FractionLevel.choose( 2, [
          new Fraction( 1, 2 ),
          new Fraction( 1, 3 ),
          new Fraction( 2, 3 )
        ] )
      ] );

      const pieceFractions = [
        ..._.times( 2, new Fraction( 1, 1 ) ),
        ..._.times( 2, new Fraction( 1, 2 ) ),
        ..._.times( 3, new Fraction( 1, 3 ) )
      ];

      // Always choose PIE the first time
      const type = ( !generated1Shapes || phet.joist.random.nextBoolean() ) ? ChallengeType.PIE : ChallengeType.BAR;
      generated1Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, color, type, targetFractions, pieceFractions );
    }
  }

  return fractionsCommon.register( 'FractionLevel', FractionLevel );
} );
