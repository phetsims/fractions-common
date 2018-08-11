// Copyright 2018, University of Colorado Boulder

/**
 * Represents a prime factorization of an integer.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PrimeFactor = require( 'FRACTIONS_COMMON/common/model/PrimeFactor' );
  const Primes = require( 'FRACTIONS_COMMON/common/model/Primes' );

  class PrimeFactorization {
    /**
     * @param {Array.<PrimeFactor>} factors
     */
    constructor( factors ) {
      assert && assert( Array.isArray( factors ) );
      assert && factors.forEach( ( factor, index ) => {
        assert( factor instanceof PrimeFactor, 'Should include only prime factors' );
        index > 0 && assert( factors[ index - 1 ].prime < factor.prime, 'Prime factors should be strictly ordered' );
      } );

      // @public {Array.<PrimeFactor>}
      this.factors = factors;
    }

    /**
     * Returns the actual number that this prime factorization represents.
     * @public
     *
     * @returns {number}
     */
    get number() {
      return _.reduce( this.factors.map( f => f.number ), ( a, b ) => a * b, 1 );
    }

    /**
     * Returns the result of multiplying this factorization by another.
     * @public
     *
     * @param {PrimeFactorization} factorization
     * @returns {PrimeFactorization}
     */
    times( factorization ) {
      const factors = _.sortBy( this.factors.concat( factorization.factors ), 'prime' );
      for ( let i = 0; i < factors.length - 1; i++ ) {
        const factorA = factors[ i ];
        const factorB = factors[ i + 1 ];
        if ( factorA.prime === factorB.prime ) {
          factors.splice( i, 2, new PrimeFactor( factorA.prime, factorA.order + factorB.order ) );
        }
      }
      const result = new PrimeFactorization( factors );
      assert && assert( this.number * factorization.number === result.number );
      return result;
    }

    /**
     * Returns the result of dividing this factorization by another.
     * @public
     *
     * @param {PrimeFactorization} factorization
     * @returns {PrimeFactorization}
     */
    divided( factorization ) {
      const factors = _.sortBy( this.factors.concat( factorization.factors ), 'prime' );
      for ( let i = 0; i < factors.length - 1; i++ ) {
        const factorA = factors[ i ];
        const factorB = factors[ i + 1 ];
        if ( factorA.prime === factorB.prime ) {
          const order = factorA.order - factorB.order;
          assert && assert( order >= 0, 'Division of factorizations not defined' );
          if ( order ) {
            factors.splice( i, 2, new PrimeFactor( factorA.prime, order ) );
          }
          else {
            factors.splice( i, 2 );
          }
        }
      }
      const result = new PrimeFactorization( factors );
      assert && assert( this.number / factorization.number === result.number );
      return result;
    }

    /**
     * Returns whether this factorization/number divides another (whether it is a multiple of us).
     * @public
     *
     * @param {PrimeFactorization} factorization
     * @returns {boolean}
     */
    divides( factorization ) {
      for ( let factor of this.factors ) {
        if ( factor.order > factorization.getOrder( factor.prime ) ) {
          return false;
        }
      }
      return true;
    }

    /**
     * Returns the order of a given prime in this factorization.
     * @public
     *
     * @param {number} prime
     * @returns {number}
     */
    getOrder( prime ) {
      assert && assert( Primes.isPrime( prime ) );

      const factor = _.find( this.factors, factor => factor.prime === prime );
      return factor ? factor.order : 0;
    }

    /**
     * Returns the prime factorization of a number.
     * @public
     *
     * @param {number} n
     * @returns {PrimeFactorization}
     */
    static factor( n ) {
      assert && assert( typeof n === 'number' && n % 1 === 0 && n > 1 );

      // Find all primes that we'll check for. If we don't find a prime less than or equal to this, our number itself is
      // prime.
      const maxDivisor = Math.floor( Math.sqrt( n ) );
      Primes.updatePrimesUpTo( maxDivisor );

      const factors = [];

      for ( let prime of Primes.primes ) {
        // A prime that is a divisor (not equal to our number) would be less than the max divisor
        if ( prime > maxDivisor ) { break; }

        let order = 0;
        while ( n % prime === 0 ) {
          order++;
          n /= prime;
        }

        if ( order ) {
          factors.push( new PrimeFactor( prime, order ) );
        }

        if ( n === 1 ) {
          break;
        }
      }

      // If not fully reduced, then it must be a prime
      if ( n !== 1 ) {
        factors.push( new PrimeFactor( n, 1 ) );
      }

      return new PrimeFactorization( factors );
    }
  }

  fractionsCommon.register( 'PrimeFactorization', PrimeFactorization );

  return PrimeFactorization;
} );
