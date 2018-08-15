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
  let generated3Shapes = false;
  let generated4Shapes = false;

  // Convenience functions. TODO: What is the best way to have concise usage in the code?
  const nextBoolean = () => phet.joist.random.nextBoolean();
  const sample = array => phet.joist.random.sample( array );
  const shuffle = array => phet.joist.random.shuffle( array );
  const nextIntBetween = ( a, b ) => phet.joist.random.nextIntBetween( a, b );
  const choose = ( q, i ) => FractionLevel.choose( q, i );
  const inclusive = ( a, b ) => _.range( a, b + 1 );
  const repeat = ( q, i ) => _.times( q, () => i );

  // constants
  const collectionFinder8 = new CollectionFinder( {
    // default denominators to match the Java search
    denominators: inclusive( 1, 8 ).map( PrimeFactorization.factor )
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

      return shuffle( items ).slice( 0, quantity );
    }

    static unitFractions( fractions ) {
      return _.flatten( fractions.map( fraction => {
        return repeat( fraction.numerator, new Fraction( 1, fraction.denominator ) );
      } ) );
    }

    // TODO: note createCardsSameNumberEachType from Java
    static maxNumeratorUnitFractions( fractions ) {
      const maxNumerator = Math.max( ...fractions.map( f => f.numerator ) );
      return _.flatten( fractions.map( f => repeat( maxNumerator, new Fraction( 1, f.denominator ) ) ) );
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

      return sample( collections ).unitFractions;
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
      const targetFractions = shuffle( [
        ...choose( 1, [
          new Fraction( 1, 1 ),
          new Fraction( 2, 2 ),
          new Fraction( 3, 3 )
        ] ),
        ...choose( 2, [
          new Fraction( 1, 2 ),
          new Fraction( 1, 3 ),
          new Fraction( 2, 3 )
        ] )
      ] );

      const pieceFractions = [
        ...repeat( 2, new Fraction( 1, 1 ) ),
        ...repeat( 2, new Fraction( 1, 2 ) ),
        ...repeat( 3, new Fraction( 1, 3 ) )
      ];

      // Always choose PIE the first time
      const type = ( !generated1Shapes || nextBoolean() ) ? ChallengeType.PIE : ChallengeType.BAR;
      generated1Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, type, targetFractions, pieceFractions );
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
      const targetFractions = choose( 3, [
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
        ...FractionLevel.interestingFractions( sample( targetFractions ) )
      ];

      // Always choose BAR the first time
      const type = ( !generated2Shapes || nextBoolean() ) ? ChallengeType.BAR : ChallengeType.PIE;
      generated2Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, type, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 3.
     * @public
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level3Shapes( levelNumber, color ) {
      const targetFractions = choose( 3, _.flatten( inclusive( 1, 6 ).map( d => {
        return inclusive( 1, d ).map( n => new Fraction( n, d ) );
      } ) ) );

      const pieceFractions = FractionLevel.maxNumeratorUnitFractions( targetFractions );

      // Always choose PIE the first time
      const type = ( !generated3Shapes || nextBoolean() ) ? ChallengeType.PIE : ChallengeType.BAR;
      generated3Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, type, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 4.
     * @public
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level4Shapes( levelNumber, color ) {
      let targetFractions;
      let pieceFractions;

      if ( nextBoolean() ) {
        // Java wholesLevel4
        targetFractions = repeat( 3, new Fraction( 1, 1 ) );
        pieceFractions = [
          ...repeat( 3, new Fraction( 1, 2 ) ),
          ...repeat( 3, new Fraction( 1, 3 ) ),
          ...repeat( 3, new Fraction( 1, 4 ) ),
          ...repeat( 3, new Fraction( 1, 6 ) )
        ];
      }
      else {
        // Java halfLevel4
        targetFractions = repeat( 3, new Fraction( 1, 2 ) );
        pieceFractions = [
          new Fraction( 1, 2 ),
          ...repeat( 3, new Fraction( 1, 3 ) ),
          ...repeat( 3, new Fraction( 1, 4 ) ),
          ...repeat( 3, new Fraction( 1, 6 ) )
        ];
      }

      // Always choose BAR the first time
      const type = ( !generated4Shapes || nextBoolean() ) ? ChallengeType.BAR : ChallengeType.PIE;
      generated4Shapes = true;

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, type, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 5.
     * @public
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level5Shapes( levelNumber, color ) {
      const targetFractions = choose( 3, inclusive( 1, 8 ) ).map( denominator => {
        return new Fraction( nextIntBetween( 1, denominator ), denominator );
      } );
      const pieceFractions = [
        ...FractionLevel.unitFractions( targetFractions ),
        ...FractionLevel.interestingFractions( sample( targetFractions ) )
      ];

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, ChallengeType.PIE, targetFractions, pieceFractions );
    }
  }

  return fractionsCommon.register( 'FractionLevel', FractionLevel );
} );
