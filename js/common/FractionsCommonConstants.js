// Copyright 2017, University of Colorado Boulder

/**
 * Constants for the fractions sims
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  var FractionsCommonConstants = {
    PANEL_MARGIN: 10,

    // {number} - The diameter of circle shapes, and the width of vertical-bar shapes.
    SHAPE_SIZE: 100,

    // {number} - The height of the vertical-bar representation shape (smaller, so that it is rectangular)
    SHAPE_VERTICAL_BAR_HEIGHT: 75,

    // {number} - The amount of space between shape containers
    SHAPE_CONTAINER_PADDING: 8,


    ROUND_BUTTON_RADIUS: 15,

    MAX_SHAPE_CONTAINERS: 4,
    SHAPE_BUILD_SCALE: 0.6
  };

  fractionsCommon.register( 'FractionsCommonConstants', FractionsCommonConstants );

  return FractionsCommonConstants;
} );
