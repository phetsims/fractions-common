// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // TODO: Use this more
  const BuildingType = {
    SHAPE: 'SHAPE',
    NUMBER: 'NUMBER'
  };

  fractionsCommon.register( 'BuildingType', BuildingType );

  // @public {Array.<BuildingType>} - All values the enumeration can take.
  BuildingType.VALUES = [
    BuildingType.SHAPE,
    BuildingType.NUMBER
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( BuildingType ); }

  return BuildingType;
} );
