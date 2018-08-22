// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'FRACTIONS_COMMON/common/enum/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  return fractionsCommon.register( 'PartitionType', new Enumeration( [
    'PIE',
    'HORIZONTAL_BARS',
    'VERTICAL_BARS',
    'POLYGON',
    'INTERLEAVED_L',
    'DIAGONAL_L',
    'TETRIS',
    'FLOWER',
    'PLUS_SIGNS',
    'GRID',
    'PYRAMID',
    'HONEYCOMB'
  ] ) );
} );
