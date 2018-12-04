// Copyright 2018, University of Colorado Boulder

/**
 * Colors for the fractions simulations.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  // Colors from the Java version
  const LIGHT_RED = new Color( 233, 69, 69 );
  const LIGHT_BLUE = new Color( 87, 182, 221 );
  const LIGHT_GREEN = new Color( 140, 198, 63 );
  const LIGHT_ORANGE = Color.ORANGE;
  const LIGHT_PINK = new Color( 255, 112, 213 );

  // Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
  // tweaks with the top-level files)
  const FractionsCommonColorProfile = new ColorProfile( [ 'default' ], {
    introScreenBackground: { default: Color.WHITE },
    otherScreenBackground: { default: new Color( 235, 251, 251 ) },

    introBucketBackground: { default: new Color( '#8eb7f2' ) },
    introContainerActiveBorder: { default: new Color( 'black' ) },
    introContainerInactiveBorder: { default: new Color( 'gray' ) },
    introContainerBackground: { default: Color.WHITE },
    introNumberLineHighlight: { default: Color.YELLOW },
    introCircleFill: { default: new Color( 140, 198, 61 ) },
    introHorizontalBar: { default: new Color( '#ED4344' ) },
    introVerticalBar: { default: new Color( '#FFE600' ) },
    emptyBeaker: { default: new Color( 150, 150, 150, 0.1 ) },
    water: { default: new Color( 30, 163, 255, 0.8 ) },
    beakerShine: { default: new Color( 255, 255, 255, 0.7 ) },

    mixedFractionStrong: { default: Color.BLACK },
    mixedFractionWeak: { default: new Color( 170, 170, 170 ) },

    equalityLabColor: { default: new Color( 254, 112, 212 ) },
    equalityLabWater: { default: new Color( 254, 112, 212, 0.8 ) },

    introPanelBackground: { default: new Color( 230, 230, 230 ) },
    shapePieceStroke: { default: Color.BLACK },

    labPieFill: { default: LIGHT_RED },
    labBarFill: { default: LIGHT_BLUE },
    shapeShadow: { default: new Color( 0, 0, 0, 0.5 ) },

    shapeStackFill: { default: Color.WHITE },
    shapeStackStroke: { default: Color.BLACK },
    shapeStackSeparatorStroke: { default: new Color( 170, 170, 170 ) },

    shapeContainerFill: { default: Color.WHITE },
    shapeContainerStroke: { default: Color.BLACK },
    shapeContainerPartition: { default: new Color( 170, 170, 170 ) },

    numberStroke: { default: Color.BLACK },
    numberFill: { default: Color.WHITE },
    numberTextFill: { default: Color.BLACK },
    numberOutline: { default: Color.RED },
    numberFractionLine: { default: Color.BLACK },
    numberNotAllowed: { default: Color.RED },

    radioStroke: { default: Color.BLACK },
    radioBase: { default: Color.WHITE },

    yellowRoundArrowButton: { default: new Color( '#fefd53' ) },
    greenRoundArrowButton: { default: new Color( 134, 194, 51 ) },
    redRoundArrowButton: { default: new Color( 195, 71, 26 ) },
    undoButton: { default: Color.YELLOW },

    shapePartitionBackground: { default: Color.WHITE },
    shapePartitionBorder: { default: Color.BLACK },

    shapeGreen: { default: LIGHT_GREEN },
    shapeBlue: { default: LIGHT_BLUE },
    shapeRed: { default: LIGHT_RED },
    shapeOrange: { default: LIGHT_ORANGE },
    shapePink: { default: LIGHT_PINK },
    shapeMagenta: { default: new Color( 'magenta' ) },
    shapeYellow: { default: PhetColorScheme.PHET_LOGO_YELLOW },
    shapeLighterPink: { default: new Color( 255, 175, 175 ) },
    shapeStrongGreen: { default: new Color( 0, 2550, 0 ) },

    level1: { default: LIGHT_RED },
    level2: { default: LIGHT_BLUE },
    level3: { default: LIGHT_GREEN },
    level4: { default: LIGHT_ORANGE },
    level5: { default: Color.MAGENTA },
    level6: { default: Color.YELLOW },
    level7: { default: Color.CYAN },
    level8: { default: new Color( 146, 54, 173 ) },
    level9: { default: new Color( 255, 112, 213 ) },
    level10: { default: new Color( 45, 165, 59 ) },

    collectionBackground: { default: Color.WHITE },
    collectionBorder: { default: Color.BLACK }
  } );

  fractionsCommon.register( 'FractionsCommonColorProfile', FractionsCommonColorProfile );

  return FractionsCommonColorProfile;
} );
