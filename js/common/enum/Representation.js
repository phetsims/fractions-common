// Copyright 2017, University of Colorado Boulder

/**
 * What type of representation is being shown.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  var Representation = {
    CIRCLE: 'CIRCLE',
    HORIZONTAL_BAR: 'HORIZONTAL_BAR',
    VERTICAL_BAR: 'VERTICAL_BAR',
    BEAKER: 'BEAKER',
    CAKE: 'CAKE',
    NUMBER_LINE: 'NUMBER_LINE'
  };

  fractionsCommon.register( 'Representation', Representation );

  // @public {Array.<Representation>} - All values the enumeration can take.
  Representation.VALUES = [
    Representation.CIRCLE,
    Representation.HORIZONTAL_BAR,
    Representation.VERTICAL_BAR,
    Representation.BEAKER,
    Representation.CAKE,
    Representation.NUMBER_LINE
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( Representation ); }

  return Representation;
} );