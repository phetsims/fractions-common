// Copyright 2018, University of Colorado Boulder

/**
 * Represents and handles generation of the levels for the "building" style fractions sims.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CollectionFinder = require( 'FRACTIONS_COMMON/game/model/CollectionFinder' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const FillType = require( 'FRACTIONS_COMMON/game/enum/FillType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );
  const Property = require( 'AXON/Property' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );
  const ShapeTarget = require( 'FRACTIONS_COMMON/game/model/ShapeTarget' );

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
  const COLORS_3 = [
    FractionsCommonColorProfile.level1Property,
    FractionsCommonColorProfile.level2Property,
    FractionsCommonColorProfile.level3Property
  ];
  const COLORS_4 = [
    ...COLORS_3,
    FractionsCommonColorProfile.level4Property
  ];

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

    static straightforwardFractions( fractions ) {
      return _.flatten( fractions.map( fraction => {
        const whole = Math.floor( fraction.getValue() );
        return [
          ...repeat( whole, new Fraction( 1, 1 ) ),
          ...repeat( fraction.numerator - whole * fraction.denominator, new Fraction( 1, fraction.denominator ) )
        ];
      } ) );
    }

    // TODO: substituteSubdividedCardsExact same as substituteSubdividedCards

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
     * Returns an (optionally) filtered list of fractions from the list of numerators/denominators.
     * @public
     *
     * @param {Array.<number>} numerators
     * @param {Array.<number>} denominators
     * @param {function} [predicate] - function( {Fraction} ): {boolean}
     * @returns {Array.<Fraction>}
     */
    static fractions( numerators, denominators, predicate = _.constant( true ) ) {
      return _.flatten( numerators.map( numerator => {
        return denominators.map( denominator => {
          return new Fraction( numerator, denominator );
        } ).filter( predicate );
      } ) );
    }

    /**
     * Returns a list of numbers required exactly for the given fractions (for number challenges).
     * @public
     *
     * @param {Array.<Fraction>}
     * @returns {Array.<number>}
     */
    static exactNumbers( fractions ) {
      return _.flatten( fractions.map( fraction => [
        fraction.numerator,
        fraction.denominator
      ] ) ).filter( _.identity );
    }

    /**
     * Returns a list of numbers required exactly for the given fractions (for number challenges), but multiplied by
     * a given factor.
     * @public
     *
     * @param {Array.<Fraction>}
     * @returns {Array.<number>}
     */
    static multipliedNumbers( fractions ) {
      return _.flatten( fractions.map( fraction => {
        const multiplier = sample( [ 2, 3 ] );
        return [
          fraction.numerator * multiplier,
          fraction.denominator * multiplier
        ];
      } ) ).filter( _.identity );
    }

    /**
     * Returns a list of numbers required exactly for the given fractions (for number challenges), but with a certain
     * quantity of them multiplied by a random factor.
     * @public
     *
     * @param {Array.<Fraction>}
     * @param {number} quantity
     * @returns {Array.<number>}
     */
    static withMultipliedNumbers( fractions, quantity ) {
      const shuffledFractions = shuffle( fractions );
      return [
        ...FractionLevel.exactNumbers( shuffledFractions.slice( 0, fractions.length - quantity ) ),
        ...FractionLevel.multipliedNumbers( shuffledFractions.slice( fractions.length - quantity, fractions.length ) )
      ];
    }

    /**
     * Returns a list of numbers required exactly for the given fractions (for number challenges).
     * @public
     *
     * @param {Array.<Fraction>}
     * @returns {Array.<number>}
     */
    static exactMixedNumbers( fractions ) {
      return _.flatten( fractions.map( fraction => {
        const whole = Math.floor( fraction.getValue() );
        fraction = fraction.minus( new Fraction( whole, 1 ) );
        return [
          whole,
          fraction.numerator,
          fraction.denominator
        ];
      } ) ).filter( _.identity );
    }

    static targetsFromFractions( shapePartitions, fractions, colors, fillType, allowSubdivision = false ) {
      colors = shuffle( colors );
      return fractions.map( ( fraction, index ) => {
        const potentialPartitions = allowSubdivision
          ? ShapePartition.supportsDivisibleDenominator( shapePartitions, fraction.denominator )
          : ShapePartition.supportsDenominator( shapePartitions, fraction.denominator );

        return ShapeTarget.fill( sample( potentialPartitions ), fraction, colors[ index ], fillType );
      } );
    }

    static targetsFromPartitions( shapePartitions, colors, denominatorToNumerator, fillType ) {
      colors = shuffle( colors );
      return shapePartitions.map( ( shapePartition, index ) => {
        const denominator = shapePartition.length;
        return ShapeTarget.fill( shapePartition, new Fraction( denominatorToNumerator( denominator ), denominator ), colors[ index ], fillType );
      } );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 1.
     * @public
     *
     * Design doc:
     * > Two "draws", one target should be from the set  {1/1, 2/2, 3/3} and the second draw for the next two targets
     * > from the set {1/2, 1/3, 2/3}
     *
     * We do three "draws", one from the first set, and two from the second set (if that's clear).
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

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 2.
     * @public
     *
     * Design doc:
     * > Choosing from a distribution of fractions ranging from 1/2 to 4/5.  The numerator can be 1, 2, 3, or 4 and the
     * > denominator could be 2, 3, 4, or 5 with the stipulation that the fraction is always less than 1. No "wholes" in
     * > the shapes piles. 2 possible ways to make at least one of the targets
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

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 3.
     * @public
     *
     * Design doc:
     * > Like level 2, but now fractions ranging from 1/1 to 6/6, and with "whole" pieces available.
     * > Number of pieces of each fraction allowing for multiple solutions
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

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
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

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
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

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 6.
     * @public
     *
     * Java doc:
     * > --all targets are made from only 2 stacks of the same size pieces
     * > --So for instance we give a stack of thirds and a stack of halves, and {2/3, 2/4, 5/6, 1/1} are the target
     * >   fractions, but we constrain the pieces so that some fractions must be made in "interesting" ways.  2/3 could
     * >   just be made with 2 third pieces, but 5/6 would need to be made of a 1/2 and a 1/3.
     * > --It seems the sets that would work well for pieces would be, {1/2, 1/3}, {1/2, 1/4}, {1/3, 1/4}, {1/2, 1/6},
     * >   {1/3, 1/6}, {1/4, 1/8}, {1/2, 1/8}
     * > --the constraint should be such that only enough pieces exist to complete the targets.
     * > Keep the values less than 1 by trial and error.
     *
     * Design doc:
     * > -- switch to 4 targets for this level
     * > -- all targets are made from only 2 stacks of pieces
     * > -- So for instance we give a stack of thirds and a stack of halves, and {2/3, 2/4, 5/6, 1/1} are the target
     * >    fractions, but we constrain the pieces so that some fractions must be made in "interesting" ways.  2/3
     * >    could just be made with 2 third pieces, but 5/6 would need to be made of a 1/2 and a 1/3.
     * > -- It seems the sets that would work well for pieces would be, {1/2, 1/3}, {1/2, 1/4}, {1/3, 1/4}, {1/2, 1/6},
     *      {1/3, 1/6}, {1/4, 1/8}, {1/2, 1/8}
     * > -- the constraint should be such that only enough pieces exist to complete the targets
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level6Shapes( levelNumber, color ) {
      while ( true ) { // eslint-disable-line no-constant-condition

        // Java doc:
        //let's implement this my making each solution as na + mb, where a and b are the fractions from pairs above

        const cardSizes = sample( [ [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 2, 6 ], [ 3, 6 ], [ 4, 8 ], [ 2, 8 ] ] );
        const selectedCoefficients = choose( 4, [ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 1 ], [ 2, 2 ], [ 3, 1 ], [ 1, 3 ] ] );

        const targetFractions = selectedCoefficients.map( ( [ n, m ] ) => {
          return new Fraction( n, cardSizes[ 0 ] ).plus( new Fraction( m, cardSizes[ 1 ] ) ).reduced();
        } );
        if ( _.some( targetFractions, f => Fraction.ONE.isLessThan( f ) ) ) {
          continue;
        }

        const pieceFractions = _.flatten( selectedCoefficients.map( ( [ n, m ] ) => {
          return [
            ...repeat( n, new Fraction( 1, cardSizes[ 0 ] ) ),
            ...repeat( m, new Fraction( 1, cardSizes[ 1 ] ) )
          ];
        } ) );

        return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
      }
    }

    /**
     * Creates a challenge for (unmixed) shapes level 7.
     * @public
     *
     * Java doc:
     * > --Top two targets, and bottom 2 targets are equivalent but still numbers less than 1
     * > -- A built in check to draw a different fraction for the top 2 and the bottom 2
     * > -- Possible fractions sets from which to draw 2 each {1/2, 1/3, 2/3, 1/4, 3/4, 5/6, 3/8, 5/8}
     * > -- Shape pieces constrained so that for instance if 1/2 and 1/2 appears for the top targets, a 1/2 piece might
     * >    be available but the other one will need to be made with a 1/4 and 1/4, or a 1/3 and a 1/6 or such.
     * > -- If 3/8 or 5/8 are drawn circles should be used, if not circles or tiles will work fine
     *
     * Design doc:
     * > --Top two targets, and bottom 2 targets are equivalent but still numbers less than 1
     * > -- A built in check to draw a different fraction for the top 2 and the bottom 2
     * > -- Possible fractions sets from which to draw 2 each {1/2, 1/3, 2/3, 1/4, 3/4, 5/6, 3/8, 5/8}
     * > -- Shape pieces constrained so that for instance if 1/2 and 1/2 appears for the top targets, a 1/2 piece might
     * >    be available but the other one will need to be made with a 1/4 and 1/4, or a 1/3 and a 1/6 or such.
     *
     * TODO: I see no explicit guarantee of the "having to make things using other shapes", it may work out to be
     * easier than expected.
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level7Shapes( levelNumber, color ) {
      const selected = choose( 2, [
        new Fraction( 1, 2 ),
        new Fraction( 1, 3 ),
        new Fraction( 2, 3 ),
        new Fraction( 1, 4 ),
        new Fraction( 3, 4 ),
        new Fraction( 5, 6 ),
        new Fraction( 3, 8 ),
        new Fraction( 5, 8 )
      ] );

      const targetFractions = [
        selected[ 0 ],
        selected[ 0 ],
        selected[ 1 ],
        selected[ 1 ]
      ];

      const pieceFractions = _.flatten( _.flatten( [
        choose( 2, collectionFinder8.search( selected[ 0 ], {
          maxQuantity: 8
        } ) ),
        choose( 2, collectionFinder8.search( selected[ 1 ], {
          maxQuantity: 8
        } ) )
      ] ).map( collection => collection.unitFractions ) );

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 8.
     * @public
     *
     * Java doc:
     * > -- Introduce numbers larger than 1 at this level
     * > -- On this level lets have at least 2 numbers larger than 1 as targets
     * > -- Enough pieces available to match targets in "obvious ways"...so if 5/4 is a target a whole piece is
     * >    available and a 1/4 piece available
     * > -- Students are first introduced to numbers greater than 1 only with 1/2's and 1/4's.  So if the number is
     * >    greater than 1 on level 8, it should be something like 3/2 or 4/2 or 7/4, since 1/2's and 1/4's are more
     * >    familiar to students (rather than 1/3's and such).
     *
     * Design doc:
     * > -- Introduce numbers larger than 1 at this level
     * > -- On this level  at least 2 numbers larger than 1 as targets
     * > -- Enough pieces available to match targets in "obvious ways"...so if 5/4 is a target a whole piece is
     * >    available and a 1/4 piece available for numbers larger than 1, uses only 1/2's or 1/4's on this level
     *
     * TODO: The "obvious" way may not exist for here, since we use "interesting" fractions.
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level8Shapes( levelNumber, color ) {
      const targetFractions = shuffle( [
        ...choose( 2, [ new Fraction( 3, 2 ), new Fraction( 4, 2 ), new Fraction( 5, 4 ), new Fraction( 7, 4 ) ] ),
        ...choose( 2, [ new Fraction( 2, 3 ), new Fraction( 3, 4 ), new Fraction( 2, 5 ), new Fraction( 3, 5 ), new Fraction( 4, 5 ) ] )
      ] );

      const pieceFractions = _.flatten( targetFractions.map( f => FractionLevel.interestingFractions( f ) ) );

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 9.
     * @public
     *
     * Java doc:
     * > --Same as level 8 but now some targets only allow "non-obvious" matches with pieces.  For instance, if the
     * >   target is greater than one, no "wholes" should be available.  So if 5/4 is a target it would need to be
     * >   built from something like 2 half pieces and a quarter piece
     *
     * Design doc:
     * > --Same as level 8 but now some targets only allow "non-obvious" matches with pieces.  For instance, if the
     * >   target is greater than one, no "wholes" should be available.  So if 5/4 is a target it would need to be
     * >   built from something like 2 half pieces and a quarter piece
     *
     * TODO: This is literally the same implementation as level 8
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level9Shapes( levelNumber, color ) {
      const targetFractions = shuffle( [
        ...choose( 2, [ new Fraction( 3, 2 ), new Fraction( 4, 2 ), new Fraction( 5, 4 ), new Fraction( 7, 4 ) ] ),
        ...choose( 2, [ new Fraction( 2, 3 ), new Fraction( 3, 4 ), new Fraction( 2, 5 ), new Fraction( 3, 5 ), new Fraction( 4, 5 ) ] )
      ] );

      const pieceFractions = _.flatten( targetFractions.map( f => FractionLevel.interestingFractions( f ) ) );

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) shapes level 10.
     * @public
     *
     * Java doc:
     * > --Same as level 7 but now all targets are greater than one.
     * > --Still top two targets same, and bottom two targets the same
     * > --No whole pieces available, and targets must be built in interesting ways.  E.g., the target must be built
     * >   from 3 or more pieces as a way to constrain the pieces given. So for instance something like 4/3 would have
     * >   to be built by something like 1(half) + 2(quarters) + (1/3)
     *
     * Design doc:
     * > --Same as level 7 but now all targets are greater than one.
     * > --Still top two targets same, and bottom two targets the same
     * > --No whole pieces available, and targets must be built in interesting ways.  We could say something like the
     * >   target must be built from 3 or more pieces as a way to constrain the pieces given. So for instance something
     * >   like 4/3 would have to be built by something like 1(half) + 2(quarters) + (1/3)
     *
     * TODO: Technically whole pieces COULD be available? Would need to generate some. Also, there is no guarantee that
     * shapes are "fully" interesting?
     *
     * @param {number} levelNumber
     * @param {ColorDef} color
     * @returns {FractionChallenge}
     */
    static level10Shapes( levelNumber, color ) {
      const fractions = choose( 2, [
        new Fraction( 3, 2 ),
        new Fraction( 4, 3 ), new Fraction( 5, 3 ),
        new Fraction( 5, 4 ), new Fraction( 7, 4 ),
        new Fraction( 6, 5 ), new Fraction( 7, 5 ), new Fraction( 8, 5 ), new Fraction( 9, 5 ),
        new Fraction( 7, 6 )
      ] );
      const targetFractions = [ fractions[ 0 ], fractions[ 0 ], fractions[ 1 ], fractions[ 1 ] ];

      const pieceFractions = _.flatten( targetFractions.map( f => FractionLevel.interestingFractions( f ) ) );

      return FractionChallenge.createShapeChallenge( levelNumber, false, color, targetFractions, pieceFractions );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 1.
     * @public
     *
     * Design doc:
     * > -- fractions are {1/2, ⅓, ⅔}
     * > -- if refresh button is pressed, colors and numbers are shuffled
     * > -- always circles
     * > -- just enough cards to complete targets
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level1Numbers( levelNumber ) {
      const targetFractions = shuffle( [
        new Fraction( 1, 2 ),
        new Fraction( 1, 3 ),
        new Fraction( 2, 3 )
      ] );
      const pieceNumbers = FractionLevel.exactNumbers( targetFractions );
      const shapeTargets = FractionLevel.targetsFromFractions( ShapePartition.PIES, targetFractions, COLORS_3, FillType.SEQUENTIAL );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 2.
     * @public
     *
     * Design doc:
     * > --Distribution of fractions ranging from 1/2 to 4/5.  As in the numerator could be 1, 2, 3, or 4 and the
     * >   denominator could be 2, 3, 4, or 5 with the stipulation that the fraction is always less than 1.
     * > -- circles or rectangles, but all targets one shape
     * > --just enough cards to complete targets
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level2Numbers( levelNumber ) {
      const shapePartitions = sample( [
        ShapePartition.PIES,
        ShapePartition.HORIZONTAL_BARS,
        ShapePartition.VERTICAL_BARS
      ] );

      const targetFractions = choose( 3, FractionLevel.fractions( inclusive( 1, 4 ), inclusive( 2, 5 ), f => f.isLessThan( Fraction.ONE ) ) );
      const pieceNumbers = FractionLevel.exactNumbers( targetFractions );
      const shapeTargets = FractionLevel.targetsFromFractions( shapePartitions, targetFractions, COLORS_3, FillType.SEQUENTIAL );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 3.
     * @public
     *
     * Design doc:
     * -- All targets “six flowers”
     * -- Range ⅙ to ⅚
     * -- cards available to allow multiple solutions.  For instance, 2/6, could be represented as ⅓
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level3Numbers( levelNumber ) {
      const shapePartitions = [
        ShapePartition.SIX_FLOWER
      ];

      const numerators = choose( 3, inclusive( 1, 5 ) );
      const targetFractions = numerators.map( n => new Fraction( n, 6 ) );
      const pieceNumbers = [
        ...FractionLevel.exactNumbers( targetFractions ),
        ...FractionLevel.multipliedNumbers( choose( 2, targetFractions ) )
      ];
      const shapeTargets = FractionLevel.targetsFromFractions( shapePartitions, targetFractions, COLORS_3, FillType.SEQUENTIAL );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 4.
     * @public
     *
     * Design doc:
     * -- All triangles seems good,
     * -- numerator and denominator able to range from 1-9
     * -- just enough cards to complete targets
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level4Numbers( levelNumber ) {
      const shapePartitions = ShapePartition.PYRAMIDS;
      const targetFractions = [
        new Fraction( 1, 1 ),
        new Fraction( sample( inclusive( 1, 4 ) ), 4 ),
        new Fraction( sample( inclusive( 1, 9 ) ), 9 )
      ];
      const pieceNumbers = FractionLevel.exactNumbers( targetFractions );
      const shapeTargets = FractionLevel.targetsFromFractions( shapePartitions, targetFractions, COLORS_3, FillType.SEQUENTIAL );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 5.
     * @public
     *
     * Design doc:
     * - numerator able to range from 1-9, and denominator able to range from 1-9, with the number less than 1
     * - all representations possible (circle, "9 and 4 square", bars, triangles, 6 flower, perhaps regular polygons), I
     * - all cards available to fulfill challenges in the most straightforward way, for instance a 4/5 representation
     *   has a 4 and a 5 available.
     * --just enough cards to complete targets
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level5Numbers( levelNumber ) {
      const shapeTargets = FractionLevel.targetsFromPartitions( choose( 3, ShapePartition.GAME_PARTITIONS ), COLORS_3, d => sample( inclusive( 1, d ) ), FillType.SEQUENTIAL );
      const pieceNumbers = FractionLevel.exactNumbers( shapeTargets.map( target => target.fraction ) );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }

    /**
     * Creates a challenge for (unmixed) numbers level 6.
     * @public
     *
     * Design doc:
     * -- 4 targets from this level forward
     * -- Same as level 5, but now random fill is possible
     * -- card constraints at this point, so at least one of the representations only has cards available to match it
     *    with a "nonobvious fraction".  For instance if 3/9 appears, and 5/9 appears, we have 1(5) and 1(9), but not
     *    2(9), so that 1/3 would need to be used to match.
     *
     * @param {number} levelNumber
     * @returns {FractionChallenge}
     */
    static level6Numbers( levelNumber ) {
      // TODO: allow random fills
      const shapeTargets = FractionLevel.targetsFromPartitions( choose( 4, ShapePartition.GAME_PARTITIONS ), COLORS_4, d => sample( inclusive( 1, d ) ), FillType.SEQUENTIAL );
      const pieceNumbers = FractionLevel.withMultipliedNumbers( shapeTargets.map( target => target.fraction ), 1 );

      return FractionChallenge.createNumberChallenge( levelNumber, false, shapeTargets, pieceNumbers );
    }
  }

  return fractionsCommon.register( 'FractionLevel', FractionLevel );
} );
