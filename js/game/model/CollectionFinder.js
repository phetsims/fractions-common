// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PrimeFactor = require( 'FRACTIONS_COMMON/common/model/PrimeFactor' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );
  const UnitCollection = require( 'FRACTIONS_COMMON/game/model/UnitCollection' );

  class CollectionFinder {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      const {
        // {Array.<PrimeFactorization>} - The available denominators that can be used.
        denominators = _.range( 1, 9 ).map( PrimeFactorization.factor )
      } = options || {};

      const lcm = _.reduce( denominators, ( a, b ) => a.lcm( b ), PrimeFactorization.ONE );
      const inverses = denominators.map( f => lcm.divided( f ) );

      // {Array.<PrimeFactorization>}
      const constraintDivisors = _.flatten( lcm.factors.map( factor => {
        return _.range( 1, factor.order + 1 ).map( order => {
          return new PrimeFactorization( [ new PrimeFactor( factor.prime, order ) ] );
        } );
      } ) );

      // {Array.<Array.<PrimeFactorization>>} - constraint index => list of denominators included
      const constraintDenominators = constraintDivisors.map( divisor => denominators.filter( ( denominator, index ) => {
        return !divisor.divides( inverses[ index ] );
      } ) );

      // {Array.<Entry>}
      const entries = [];

      function filterUncomputedDenominators( divisorDenominators ) {
        return divisorDenominators.filter( denominator => !_.some( entries, entry => entry.denominator === denominator ) );
      }

      function findMinConstraintIndex() {
        let bestIndex = -1;
        let bestDivisor = null;
        let bestNumUncomputedDenominators = Number.POSITIVE_INFINITY;
        for ( let i = 0; i < constraintDivisors.length; i++ ) {
          const divisor = constraintDivisors[ i ];
          const divisorDenominators = constraintDenominators[ i ];
          const uncomputedDenominators = filterUncomputedDenominators( divisorDenominators );
          if ( uncomputedDenominators.length < bestNumUncomputedDenominators ||
               ( uncomputedDenominators.length === bestNumUncomputedDenominators && divisor.number > bestDivisor.number ) ) {
            bestIndex = i;
            bestDivisor = divisor;
            bestNumUncomputedDenominators = uncomputedDenominators.length;
          }
        }
        return bestIndex;
      }

      while ( constraintDivisors.length ) {
        const constraintIndex = findMinConstraintIndex();
        const divisorDenominators = constraintDenominators[ constraintIndex ];

        for ( let uncomputedDenominator of filterUncomputedDenominators( divisorDenominators ) ) {
          entries.push( new Entry( uncomputedDenominator, lcm.divided( uncomputedDenominator ) ) );
        }
        for ( let i = 0; i < constraintDivisors.length; i++ ) {
          const divisor = constraintDivisors[ i ];
          const divisorDenominators = constraintDenominators[ i ];
          const uncomputedDenominators = filterUncomputedDenominators( divisorDenominators );
          if ( uncomputedDenominators.length === 0 ) {
            const denominatorIndices = divisorDenominators.map( d => _.findIndex( entries, entry => entry.denominator === d ) );
            const constraint = new Constraint( divisor, divisorDenominators, lcm, denominatorIndices );
            entries[ entries.length - 1 ].constraints.push( constraint );
          }
        }

        constraintDivisors.splice( constraintIndex, 1 );
        constraintDenominators.splice( constraintIndex, 1 );
      }
      for ( let uncomputedDenominator of filterUncomputedDenominators( denominators ) ) {
        entries.push( new Entry( uncomputedDenominator, lcm.divided( uncomputedDenominator ) ) );
      }

      // @private {Array.<Entry>}
      this.entries = entries;

      // @private {PrimeFactorization}
      this.lcm = lcm;

      // @private {number}
      this.maxDenominatorNumber = Math.max( ...denominators.map( d => d.number ) );

      // @private {Array.<number>} - Maps "internal index" (based on entries) into the UnitCollection array index.
      this.collectionIndexMap = this.entries.map( entry => entry.denominator.number - 1 );
    }

    /**
     * Returns an array of all UnitCollections that match the given parameters (using this finder's denominators).
     * This is basically a list of all ways a given fraction (the input) can be partitioned into different sums of
     * fractions (with this finder's denominators) with numerators matching the option constraints.
     * @public
     *
     * @param {Fraction} fraction
     * @param {Object} [options]
     * @returns {Array.<UnitCollection>}
     */
    search( fraction, options ) {
      const {
        // {number} - The maximum possible quantity for each individual denominator (so e.g. if maxQuantity:4, the
        // finder will never report 5 halves).
        maxQuantity = Number.POSITIVE_INFINITY,

        // {number} - The maximum possible quantity total including all denominators (so e.g. if maxTotalQuantity:4,
        // the finder will never report 2 halves and 3 thirds).
        maxTotalQuantity = Number.POSITIVE_INFINITY
      } = options || {};

      const self = this;

      assert && assert( typeof maxQuantity === 'number' && maxQuantity >= 1 );
      assert && assert( typeof maxTotalQuantity === 'number' && maxTotalQuantity >= 1 );

      const r = fraction.numerator * this.lcm.number / fraction.denominator;

      const entries = this.entries;
      const coefficients = [];
      const results = [];

      // If our lcm is not a multiple of the fraction's denominator, we will have no possible solutions.
      if ( r % 1 !== 0 ) {
        return results;
      }

      ( function recur( index, remainder, totalCount ) {
        // TODO: handle last index differently, since we don't need to search/iterate
        const entry = entries[ index ];
        const maxCoefficient = Math.min( maxQuantity, Math.floor( remainder / entry.inverseNumber ), maxTotalQuantity - totalCount );
        if ( index === entries.length - 1 ) {
          // If we have an exact solution, then maxCoefficient should be our sole solution due to the division
          const coefficient = maxCoefficient;
          const subRemainder = remainder - coefficient * entry.inverseNumber;
          if ( subRemainder === 0 ) {
            // We have a solution!

            coefficients.push( coefficient );
            const collection = self.unitCollectionFromCoefficients( coefficients );
            coefficients.pop();

            assert && assert( collection.totalFraction.equals( fraction ) );
            assert && collection.quantities.forEach( quantity => assert( quantity <= maxQuantity ) );
            assert && assert( _.sum( collection.quantities ) <= maxTotalQuantity );

            results.push( collection );
          }
        }
        else {
          for ( let coefficient = 0; coefficient <= maxCoefficient; coefficient++ ) {
            const subRemainder = remainder - coefficient * entry.inverseNumber;
            assert && assert( subRemainder >= 0 );

            coefficients.push( coefficient );

            let constraintsSatisfied = true;
            for ( let constraint of entry.constraints ) {
              if ( !constraint.satisfies( r, coefficients ) ) {
                constraintsSatisfied = false;
                break;
              }
            }

            if ( constraintsSatisfied ) {
              recur( index + 1, subRemainder, totalCount + coefficient );
            }

            coefficients.pop();
          }
        }
      } )( 0, r, 0 );

      return results;
    }

    /**
     * Like search() above, but with "simple" logic (and slower) for unit test verification.
     * @public
     *
     * @param {Fraction} fraction
     * @param {Object} [options]
     * @returns {Array.<UnitCollection>}
     */
    bruteForceSearch( fraction, options ) {
      const {
        // {number} - The maximum possible quantity for each individual denominator (so e.g. if maxQuantity:4, the
        // finder will never report 5 halves).
        maxQuantity = Number.POSITIVE_INFINITY,

        // {number} - The maximum possible quantity total including all denominators (so e.g. if maxTotalQuantity:4,
        // the finder will never report 2 halves and 3 thirds).
        maxTotalQuantity = Number.POSITIVE_INFINITY
      } = options || {};

      const self = this;

      assert && assert( typeof maxQuantity === 'number' && maxQuantity >= 1 );
      assert && assert( typeof maxTotalQuantity === 'number' && maxTotalQuantity >= 1 );

      const entries = this.entries;
      const results = [];
      const coefficients = [];

      /**
       * @param {number} index - Index into our denominators
       * @param {Fraction} remainder
       * @param {number} totalCount
       */
      ( function recur( index, remainder, totalCount ) {
        const denominator = entries[ index ].denominatorNumber;

        for ( let coefficient = 0; coefficient <= maxQuantity; coefficient++ ) {
          const subRemainder = remainder.minus( new Fraction( coefficient, denominator ) );
          if ( subRemainder.getValue() < 0 || coefficient + totalCount > maxTotalQuantity ) {
            break;
          }

          coefficients.push( coefficient );
          if ( index === entries.length - 1 ) {
            if ( subRemainder.numerator === 0 ) {
              // We have a solution!
              const collection = self.unitCollectionFromCoefficients( coefficients );

              assert && assert( collection.totalFraction.equals( fraction ) );
              assert && collection.quantities.forEach( quantity => assert( quantity <= maxQuantity ) );
              assert && assert( _.sum( collection.quantities ) <= maxTotalQuantity );

              results.push( collection );
            }
          }
          else {
            recur( index + 1, subRemainder, totalCount + coefficient );
          }
          coefficients.pop();
        }
      } )( 0, fraction, 0 );

      return results;
    }

    /**
     * Permutes and pads coefficients to create a UnitCollection.
     * @private
     *
     * @param {Array.<number>} coefficients - In the same order as our entries, e.g. coefficients[ i ] is the
     *                                        coefficient for entries[ i ].
     * @returns {UnitCollection}
     */
    unitCollectionFromCoefficients( coefficients ) {
      // {Array.<number>} - Construct some permuted coefficients in the "correct" order
      const permutedCoefficients = [];

      // Zero-pad, since we may have some denominators "missing"
      while ( permutedCoefficients.length < this.maxDenominatorNumber ) {
        permutedCoefficients.push( 0 );
      }

      // Fill in the coefficients we do have.
      for ( let i = 0; i < coefficients.length; i++ ) {
        permutedCoefficients[ this.collectionIndexMap[ i ] ] = coefficients[ i ];
      }

      return new UnitCollection( permutedCoefficients );
    }
  }

  class Entry {
    /**
     * @param {PrimeFactorization} denominator
     * @param {PrimeFactorization} inverse
     * @param {Array.<Constraint>} constraints
     */
    constructor( denominator, inverse, constraints = [] ) {

      // @public {PrimeFactorization}
      this.denominator = denominator;

      // @public {PrimeFactorization}
      this.inverse = inverse;

      // @public {Array.<Constraint>}
      this.constraints = constraints;

      // @public {number}
      this.denominatorNumber = denominator.number;

      // @public {number}
      this.inverseNumber = inverse.number;
    }

    /**
     * Returns a string form of the entry, for debugging.
     * @public
     *
     * @returns {string}
     */
    toString() {
      return `${this.denominator}${this.constraints.map( c => `\n  ${c}` )}`;
    }
  }

  class Constraint {
    /**
     * @param {PrimeFactorization} divisor
     * @param {Array.<PrimeFactorization>} denominators
     * @param {PrimeFactorization} lcm
     * @param {Array.<number>} denominatorIndices
     */
    constructor( divisor, denominators, lcm, denominatorIndices ) {
      assert && assert( divisor instanceof PrimeFactorization );
      assert && assert( Array.isArray( denominators ) );
      assert && denominators.forEach( d => assert( d instanceof PrimeFactorization ) );
      assert && assert( lcm instanceof PrimeFactorization );
      assert && assert( Array.isArray( denominatorIndices ) );
      assert && denominatorIndices.forEach( i => assert( typeof i === 'number' ) );
      assert && assert( denominators.length === denominatorIndices.length );

      // @public {PrimeFactorization}
      this.divisor = divisor;

      // @public {Array.<PrimeFactorization>}
      this.denominators = denominators;

      // @private {PrimeFactorization}
      this.lcm = lcm;

      // @private {Array.<number>}
      this.denominatorIndices = denominatorIndices;

      // @private {number}
      this.divisorNumber = divisor.number;

      // @private {Array.<number>}
      this.denominatorCoefficients = denominators.map( d => lcm.divided( d ).number );
    }

    /**
     * Returns whether this constraint is satisfied by the given total (r = lcm * fraction) and the coefficients.
     * @public
     *
     * @param {number} r
     * @param {Array.<number>} coefficients
     * @returns {boolean}
     */
    satisfies( r, coefficients ) {
      assert && assert( typeof r === 'number' );
      assert && assert( Array.isArray( coefficients ) );

      let sum = 0;
      for ( let i = 0; i < this.denominatorCoefficients.length; i++ ) {
        sum += coefficients[ this.denominatorIndices[ i ] ] * this.denominatorCoefficients[ i ];
      }
      return ( r % this.divisorNumber ) === ( sum % this.divisorNumber );
    }

    /**
     * Returns a string form of the entry, for debugging.
     * @public
     *
     * @returns {string}
     */
    toString() {
      return `r = f(${this.denominators.join( ',' )}) (mod ${this.divisor})`;
    }
  }

  return fractionsCommon.register( 'CollectionFinder', CollectionFinder );
} );
