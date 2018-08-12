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
  const PrimeFactor = require( 'FRACTIONS_COMMON/common/model/PrimeFactor' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );

  class CollectionFinder {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      const {
        // {number} - The maximum possible quantity for each individual denominator (so e.g. if maxQuantity:4, the
        // finder will never report 5 halves).
        maxQuantity = Number.POSITIVE_INFINITY,

        // {number} - The maximum possible quantity total including all denominators (so e.g. if maxTotalQuantity:4,
        // the finder will never report 2 halves and 3 thirds).
        maxTotalQuantity = Number.POSITIVE_INFINITY,

        // {Array.<PrimeFactorization>} - The available denominators that can be used.
        denominators = _.range( 1, 9 ).map( PrimeFactorization.factor )
      } = options || {};

      assert && assert( typeof maxQuantity === 'number' && maxQuantity >= 1 );
      assert && assert( typeof maxTotalQuantity === 'number' && maxTotalQuantity >= 1 );

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
          entries.push( new Entry( uncomputedDenominator ) );
        }
        for ( let i = 0; i < constraintDivisors.length; i++ ) {
          const divisor = constraintDivisors[ i ];
          const divisorDenominators = constraintDenominators[ i ];
          const uncomputedDenominators = filterUncomputedDenominators( divisorDenominators );
          if ( uncomputedDenominators.length === 0 ) {
            entries[ entries.length - 1 ].constraints.push( new Constraint( divisor, divisorDenominators ) );
          }
        }

        constraintDivisors.splice( constraintIndex, 1 );
        constraintDenominators.splice( constraintIndex, 1 );
      }
      for ( let uncomputedDenominator of filterUncomputedDenominators( denominators ) ) {
        entries.push( new Entry( uncomputedDenominator ) );
      }

      // @public {Array.<Entry>}
      this.entries = entries;
    }
  }

  class Entry {
    constructor( denominator, constraints = [] ) {
      this.denominator = denominator;
      this.constraints = constraints;
    }

    toString() {
      return `${this.denominator}${this.constraints.map( c => `\n  ${c}` )}`;
    }
  }

  class Constraint {
    constructor( divisor, denominators ) {
      this.divisor = divisor;
      this.denominators = denominators;
    }

    toString() {
      return `r = f(${this.denominators.join( ',' )}) (mod ${this.divisor})`;
    }
  }

  return fractionsCommon.register( 'CollectionFinder', CollectionFinder );
} );
