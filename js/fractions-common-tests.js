// Copyright 2018-2019, University of Colorado Boulder

/**
 * Unit tests. Please run once in phet brand.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  require( 'FRACTIONS_COMMON/game/model/CollectionFinderTests' );
  require( 'FRACTIONS_COMMON/common/model/PrimeFactorizationTests' );
  require( 'FRACTIONS_COMMON/common/model/PrimesTests' );

  // Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
  QUnit.start();
} );