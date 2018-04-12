// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // TODO: Use this more
  var BuildingType = {
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
