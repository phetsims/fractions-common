// Copyright 2018, University of Colorado Boulder

/**
 * Unit tests for PrimeFactorization
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );
  const Primes = require( 'FRACTIONS_COMMON/common/model/Primes' );
  const Util = require( 'DOT/Util' );

  // constants
  const MAX_NUMBER = 500;

  QUnit.module( 'PrimeFactorization' );

  QUnit.test( `Prime factorizations of everything up to ${MAX_NUMBER}`, assert => {
    for ( let n = 2; n < MAX_NUMBER; n++ ) {
      const factorization = PrimeFactorization.factor( n );
      for ( let factor of factorization.factors ) {
        assert.ok( Primes.isPrime( factor.prime ), `Prime of factorization of ${n} is prime` );
      }
      assert.equal( n, factorization.number, `Prime factorization of ${n} is consistent` );
    }
  } );

  QUnit.test( `Divisors of everything up to ${MAX_NUMBER}`, assert => {
    for ( let n = 2; n < MAX_NUMBER; n++ ) {
      const factorization = PrimeFactorization.factor( n );
      const divisorNumbers = factorization.divisors.map( d => d.number );
      divisorNumbers.sort( ( a, b ) => a - b );

      const referenceDivisorNumbers = [];
      for ( let x = 1; x <= n; x++ ) {
        const isDivisor = ( n / x ) % 1 === 0;
        if ( isDivisor ) {
          referenceDivisorNumbers.push( x );
        }
      }

      assert.ok( _.isEqual( divisorNumbers, referenceDivisorNumbers ), `Divisors for ${n}, actual ${divisorNumbers}, expected ${referenceDivisorNumbers}` );
    }
  } );

  QUnit.test( 'Multiplication tests', assert => {
    for ( let a = 1; a <= 30; a++ ) {
      const aFactorization = PrimeFactorization.factor( a );
      for ( let b = 1; b <= 30; b++ ) {
        const bFactorization = PrimeFactorization.factor( b );

        assert.equal( a * b, aFactorization.times( bFactorization ).number, `Multiplication of ${a} times ${b}` );
      }
    }
  } );

  QUnit.test( 'Division tests', assert => {
    for ( let a = 1; a <= 40; a++ ) {
      const factorization = PrimeFactorization.factor( a );
      const divisors = factorization.divisors;

      for ( let divisor of divisors ) {
        assert.equal( a / divisor.number, factorization.divided( divisor ).number, `Division of ${a} divided by ${divisor.number}` );
      }
    }
  } );

  QUnit.test( 'GCD tests', assert => {
    for ( let a = 1; a <= 30; a++ ) {
      const aFactorization = PrimeFactorization.factor( a );
      for ( let b = 1; b <= 30; b++ ) {
        const bFactorization = PrimeFactorization.factor( b );

        assert.equal( Util.gcd( a, b ), aFactorization.gcd( bFactorization ).number, `GCD of ${a} and ${b}` );
      }
    }
  } );

  QUnit.test( 'LCM tests', assert => {
    for ( let a = 1; a <= 30; a++ ) {
      const aFactorization = PrimeFactorization.factor( a );
      for ( let b = 1; b <= 30; b++ ) {
        const bFactorization = PrimeFactorization.factor( b );

        assert.equal( Util.lcm( a, b ), aFactorization.lcm( bFactorization ).number, `LCM of ${a} and ${b}` );
      }
    }
  } );

  QUnit.test( 'Divides', assert => {
    for ( let a = 1; a <= 30; a++ ) {
      const aFactorization = PrimeFactorization.factor( a );
      for ( let b = 1; b <= 30; b++ ) {
        const bFactorization = PrimeFactorization.factor( b );

        assert.equal( ( b / a ) % 1 === 0, aFactorization.divides( bFactorization ), `If ${a} divides ${b}` );
      }
    }
  } );
} );
