// Copyright 2017, University of Colorado Boulder

/**
 * Colors for the fractions simulations.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
  // tweaks with the top-level files)
  var FractionsCommonColorProfile = new ColorProfile( {
    panelBackground: { default: new Color( 230, 230, 230 ) },
    shapePieceStroke: { default: Color.BLACK },

    labCircleFill: { default: new Color( 233, 69, 69 ) },
    labBarFill: { default: new Color( 87, 182, 221 ) },

    shapeStackFill: { default: Color.WHITE },
    shapeStackStroke: { default: Color.BLACK },
    shapeStackSeparatorStroke: { default: new Color( 170, 170, 170 ) },

    shapeContainerFill: { default: Color.WHITE },
    shapeContainerStroke: { default: Color.BLACK },
    shapeContainerPartition: { default: new Color( 170, 170, 170 ) },

    radioStroke: { default: Color.BLACK },
    radioBase: { default: Color.WHITE },

    yellowRoundArrowButton: { default: new Color( '#fefd53' ) },
    greenRoundArrowButton: { default: new Color( 134, 194, 51 ) },
    redRoundArrowButton: { default: new Color( 195, 71, 26 ) }
  }, [ 'default' ] );

  fractionsCommon.register( 'FractionsCommonColorProfile', FractionsCommonColorProfile );

  return FractionsCommonColorProfile;
} );
