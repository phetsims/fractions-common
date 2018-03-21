// Copyright 2017, University of Colorado Boulder

/**
 * Constants in use across fraction intro sim
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );

  return fractionsCommon.register( 'IntroConstants', {

    // Constants for number line
    NUMBER_LINE_WIDTH: 975, // Width used for number line.
    MAJOR_TICK_LENGTH: 80, // length of major tick line
    MINOR_TICK_LENGTH: 40, // length of minor tick line
    NUMBER_LINE_FONT: new PhetFont( 40 ),

    // Constants for beaker
    BEAKER_HEIGHT: 150,

    // constants for Cake
    CAKE_HEIGHT: 120,

    // @public {Range}
    DENOMINATOR_RANGE: new Range( 1, 8 ),

    // @public {Dimension2}
    VERTICAL_RECTANGULAR_SIZE: new Dimension2( 130, 185 ),
    HORIZONTAL_RECTANGULAR_SIZE: new Dimension2( 300, 50 ),

    // @public {number}
    CIRCULAR_RADIUS: 75,
    
    // Constants for fraction node and fraction with spinner
    TEXT_SIZE: new PhetFont( 110 ),
    DIVIDING_LINE_LENGTH: 150,
    DIVIDING_LINE_WIDTH: 10
  } );
} );
