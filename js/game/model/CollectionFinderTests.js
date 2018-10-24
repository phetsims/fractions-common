// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CollectionFinder = require( 'FRACTIONS_COMMON/game/model/CollectionFinder' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );

  function compareFractionResults( assert, fraction, finderOptions, searchOptions ) {
    const finder = new CollectionFinder( finderOptions );

    const fastResults = finder.search( fraction, searchOptions );
    const bruteResults = finder.bruteForceSearch( fraction, searchOptions );

    fastResults.sort( ( a, b ) => a.compare( b ) );
    bruteResults.sort( ( a, b ) => a.compare( b ) );

    assert.ok( fastResults.length === bruteResults.length, `Both result searches should find the same result for ${fraction}` );

    for ( let i = 0; i < fastResults.length; i++ ) {
      assert.ok( fastResults[ i ].equals( bruteResults[ i ] ), `Entry ${i} for both searches should have the same result` );
    }
  }

  QUnit.module( 'CollectionFinder' );

  QUnit.test( 'Fractions adding to 1', assert => {
    compareFractionResults( assert, new Fraction( 1, 1 ), {
      denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
    }, {} );
  } );

  QUnit.test( 'Fractions adding to 2', assert => {
    compareFractionResults( assert, new Fraction( 2, 1 ), {
      denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
    }, {} );
  } );

  QUnit.test( 'Fractions adding to 4', assert => {
    compareFractionResults( assert, new Fraction( 4, 1 ), {
      denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
    }, {} );
  } );

  QUnit.test( 'Fractions adding to 7/3', assert => {
    compareFractionResults( assert, new Fraction( 7, 3 ), {
      denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
    }, {} );
  } );

  QUnit.test( 'Fractions adding to 11/7', assert => {
    compareFractionResults( assert, new Fraction( 11, 7 ), {
      denominators: _.range( 1, 9 ).map( PrimeFactorization.factor )
    }, {} );
  } );

  QUnit.test( 'Fractions adding to 4/1 with 1..12 denominators with no more than 8 each (max total 15)', assert => {
    compareFractionResults( assert, new Fraction( 2, 1 ), {
      denominators: _.range( 1, 13 ).map( PrimeFactorization.factor )
    }, {
      maxQuantity: 8,
      maxTotalQuantity: 15
    } );
  } );
} );
