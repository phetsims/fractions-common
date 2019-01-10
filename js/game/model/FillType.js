// Copyright 2018, University of Colorado Boulder

/**
 * Enumerates strategies for turning ShapePartition + Fraction => FilledPartition
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'FillType', new Enumeration( [
    'SEQUENTIAL',
    'MIXED', // when number of shapes > 1, first shape will be completely filled and the 2nd shape will be random
    'RANDOM'
  ] ) );
} );
