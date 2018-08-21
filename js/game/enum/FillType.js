// Copyright 2018, University of Colorado Boulder

/**
 * Enumerates strategies for turning ShapePartition + Fraction => FilledPartition
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  const FillType = {
    SEQUENTIAL: 'SEQUENTIAL',
    MIXED: 'MIXED',
    RANDOM: 'RANDOM'
  };

  fractionsCommon.register( 'FillType', FillType );

  // @public {Array.<FillType>} - All values the enumeration can take.
  FillType.VALUES = [
    FillType.SEQUENTIAL,
    FillType.MIXED, // when number of shapes > 1, first shape will be completely filled and the 2nd shape will be random
    FillType.RANDOM
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( FillType ); }

  return FillType;
} );
