// Copyright 2018, University of Colorado Boulder

/**
 * Represents and handles generation of the levels for the "building" style fractions sims.
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

  // Convenience functions.
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

    // note createCardsSameNumberEachType from Java
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
     * Java doc:
     * > Make two draws, one target should be from the set  {1/1, 2/2, 3/3} and the second draw for the next two targets
     * > from the set {1/2, 1/3, 2/3}
     *
     * Design doc:
     * > Two "draws", one target should be from the set  {1/1, 2/2, 3/3} and the second draw for the next two targets
     * > from the set {1/2, 1/3, 2/3}
     *
     * We do three "draws", one from the first set, and two from the second set (if that's clear).
     *
     * NOTE: In the Java version, this randomly started as either pie/bar and STAYED for the entire sim duration.
     * This is inconsistent with our general practices now, so now it always STARTS as pie, then is random.
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
     * Java doc:
     * > Choose from a distribution of fractions ranging from 1/2 to 4/5. The numerator could be 1, 2, 3, or 4 and the
     * > denominator could be 2, 3, 4, or 5 with the stipulation that the fraction is always less than 1. No "wholes"
     * > will appear in the shapes pile.
     *
     * Design doc:
     * > Choosing from a distribution of fractions ranging from 1/2 to 4/5.  The numerator can be 1, 2, 3, or 4 and the
     * > denominator could be 2, 3, 4, or 5 with the stipulation that the fraction is always less than 1. No "wholes" in
     * > the shapes piles. 2 possible ways to make at least one of the targets
     *
     * NOTE: In the Java version, this randomly started as either pie/bar and STAYED for the entire sim duration.
     * This is inconsistent with our general practices now, so now it always STARTS as bar, then is random.
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
     * Java and design doc (identical for this level):
     * > Like level 2, but now fractions ranging from 1/1 to 6/6, and with "whole" pieces available.
     * > Number of pieces of each fraction allowing for multiple solutions
     *
     * NOTE: In the Java version, this randomly started as either pie/bar and STAYED for the entire sim duration.
     * This is inconsistent with our general practices now, so now it always STARTS as pie, then is random.
     *
     * TODO: Descriptions do NOT note anything about the "max numerator" selection. It's also conceivable that three
     * of the same numerator could be selected, thus NOT being like level2 (not two ways to make one) since it would
     * have the exact number of needed pieces.
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
     * Java doc:
     * > Goal: build the same targets with constrained pieces.
     * > 2 possible targets, which are {1/2, 1/1}.  For 1/1, constrain one of the targets so they must use two different
     * > sizes.  For instance, only enough halves and quarters so they must do 1 half piece and 2 quarter pieces. Or 2
     * > third pieces and 2 sixth pieces.
     *
     * Design doc:
     * > All 3 targets the same, 2 possible target values {1/2, 1/1}.
     * > No "whole" pieces available
     * > constrain one of the targets so that two different sizes must be used.
     *
     * NOTE: In the Java version, this randomly started as either pie/bar and STAYED for the entire sim duration.
     * This is inconsistent with our general practices now, so now it always STARTS as bar, then is random.
     *
     * TODO: The 3rd statement "constrain one of the targets so that two different sizes must be used" is false for the
     * "half" version - Use 1/2 for one, 2/4 for another and 3/6 for the last.
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
     * Java doc:
     * > Pie shapes for this level
     * > numerator able to range from 1-8, and denominator able to range from 1-8, with the number less than or equal to
     * > 1
     * > all pieces available to fulfill targets in the most straightforward way (so for instance if 3/8 appears there
     * > will 3 1/8 pieces)
     *
     * Design doc:
     * > - numerator able to range from 1-8, and denominator able to range from 1-8, with the number less than or equal
     * >   to 1
     * > - all pieces available to fulfill targets in the most straightforward way (so for instance if 3/8 appears there
     * >   will 3 1/8 pieces)
     *
     * TODO: No note about the addition of the "extra" possibly-nonintuitive pieces in either doc. Should that be
     * removed?
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
