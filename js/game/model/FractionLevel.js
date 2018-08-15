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
  const CollectionFinder = require( 'FRACTIONS_COMMON/game/model/CollectionFinder' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );
  const Property = require( 'AXON/Property' );

  // globals
  let generated1Shapes = false;
  let generated2Shapes = false;

  // constants
  const collectionFinder8 = new CollectionFinder( {
    // default denominators to match the Java search
    denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
  } );

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

    static interestingFractions( fraction, quantity = 5 ) {
      let collections = collectionFinder8.search( fraction );
      assert && assert( collections.length );

      // Java comment:
      //In order to remove the tedium but still require creation of interesting shapes, sort by the number of pieces
      //required to create the fraction
      //and choose one of the solutions with a small number of cards.
      _.sortBy( collections, collection => collection.totalQuantities );
      const filteredCollections = collections.filter( collection => collection.fractions.length > 1 );
      // The Java code used collections with more than one denominator whenever possible
      if ( filteredCollections.length ) {
        collections = filteredCollections;
      }
      collections = collections.slice( 0, quantity );

      return phet.joist.random.sample( collections ).unitFractions;
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
        ..._.times( 2, () => new Fraction( 1, 1 ) ),
        ..._.times( 2, () => new Fraction( 1, 2 ) ),
        ..._.times( 3, () => new Fraction( 1, 3 ) )
      ];

      // Always choose PIE the first time
      const type = ( !generated1Shapes || phet.joist.random.nextBoolean() ) ? ChallengeType.PIE : ChallengeType.BAR;
      generated1Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, color, type, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 2.
     * @public
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level2Shapes( levelNumber, color ) {
      const targetFractions = FractionLevel.choose( 3, [
        new Fraction( 1, 2 ),
        new Fraction( 1, 3 ),
        new Fraction( 1, 4 ),
        new Fraction( 1, 5 ),
        new Fraction( 2, 3 ),
        new Fraction( 2, 4 ),
        new Fraction( 2, 5 ),
        new Fraction( 3, 4 ),
        new Fraction( 3, 5 ),
        new Fraction( 4, 5 )
      ] );

      const pieceFractions = [
        ...FractionLevel.unitFractions( targetFractions ),
        ...FractionLevel.interestingFractions( phet.joist.random.sample( targetFractions ) )
      ];

      // Always choose BAR the first time
      const type = ( !generated2Shapes || phet.joist.random.nextBoolean() ) ? ChallengeType.BAR : ChallengeType.PIE;
      generated2Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, color, type, targetFractions, pieceFractions );
    }
  }

  return fractionsCommon.register( 'FractionLevel', FractionLevel );
} );
