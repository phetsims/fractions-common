// Copyright 2018, University of Colorado Boulder

/**
 * Constants for the fractions sims
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var WHOLE_FRACTIONAL_SIZE_RATIO = 2;
  var SHAPE_RADIUS = 50;

  var FractionsCommonConstants = {
    // {number}
    PANEL_MARGIN: 10,

    // {number} - The diameter of circle shapes, and the width of vertical-bar shapes.
    SHAPE_SIZE: SHAPE_RADIUS * 2,

    // {number} - The height of the vertical-bar representation shape (smaller, so that it is rectangular)
    SHAPE_VERTICAL_BAR_HEIGHT: Math.PI * SHAPE_RADIUS / 2,

    // {number} - The amount of space between shape containers
    SHAPE_CONTAINER_PADDING: 8,

    // {number}
    NUMBER_HEIGHT: 75,

    // {number}
    NUMBER_SINGLE_DIGIT_WIDTH: 54,

    // {number}
    NUMBER_DOUBLE_DIGIT_WIDTH: 80,

    // TODO: cleanup
    NUMBER_FRACTIONAL_FONT: new PhetFont( { size: 60, weight: 'bold' } ),
    NUMBER_WHOLE_FONT: new PhetFont( { size: 60 * WHOLE_FRACTIONAL_SIZE_RATIO, weight: 'bold' } ),

    WHOLE_FRACTIONAL_SIZE_RATIO: WHOLE_FRACTIONAL_SIZE_RATIO,

    NUMBER_CORNER_RADIUS: 5,

    ROUND_BUTTON_RADIUS: 15,

    MAX_SHAPE_CONTAINERS: 4,

    SHAPE_BUILD_SCALE: 0.6,
    NUMBER_BUILD_SCALE: 0.8,

    SHAPE_COLLECTION_SCALE: 0.6,
    NUMBER_COLLECTION_SCALE: 0.7,

    // {number}
    INTRO_DROP_SHADOW_OFFSET: 5,
    INTRO_CONTAINER_LINE_WIDTH: 2,
    INTRO_CONTAINER_SPACING: 10,

    NUM_LEVELS: 10
  };

  fractionsCommon.register( 'FractionsCommonConstants', FractionsCommonConstants );

  return FractionsCommonConstants;
} );
