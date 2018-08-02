// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // TODO: check for usage... was in the Java version
  var PartitionType = {
    PIE: 'PIE',
    HORIZONTAL_BARS: 'HORIZONTAL_BARS',
    VERTICAL_BARS: 'VERTICAL_BARS',
    POLYGON: 'POLYGON',
    INTERLEAVED_L: 'INTERLEAVED_L',
    DIAGONAL_L: 'DIAGONAL_L',
    TETRIS: 'TETRIS',
    FLOWER: 'FLOWER',
    PLUS_SIGNS: 'PLUS_SIGNS',
    GRID: 'GRID',
    PYRAMID: 'PYRAMID',
    HONEYCOMB: 'HONEYCOMB'
  };

  fractionsCommon.register( 'PartitionType', PartitionType );

  // @public {Array.<PartitionType>} - All values the enumeration can take.
  PartitionType.VALUES = [
    PartitionType.PIE,
    PartitionType.HORIZONTAL_BARS,
    PartitionType.VERTICAL_BARS,
    PartitionType.POLYGON,
    PartitionType.INTERLEAVED_L,
    PartitionType.DIAGONAL_L,
    PartitionType.TETRIS,
    PartitionType.FLOWER,
    PartitionType.PLUS_SIGNS,
    PartitionType.GRID,
    PartitionType.PYRAMID,
    PartitionType.HONEYCOMB
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( PartitionType ); }

  return PartitionType;
} );
