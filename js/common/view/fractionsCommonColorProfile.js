// Copyright 2018-2021, University of Colorado Boulder

/**
 * Colors for the fractions simulations.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Color from '../../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import fractionsCommon from '../../fractionsCommon.js';

// Colors from the Java version
const LIGHT_RED = new Color( 233, 69, 69 );
const LIGHT_BLUE = new Color( 87, 182, 221 );
const LIGHT_GREEN = new Color( 140, 198, 63 );
const LIGHT_ORANGE = Color.ORANGE;
const LIGHT_PINK = new Color( 255, 112, 213 );

// Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
// tweaks with the top-level files)
const fractionsCommonColorProfile = {
  introScreenBackgroundProperty: new ProfileColorProperty( 'introScreenBackground', { default: Color.WHITE } ),
  otherScreenBackgroundProperty: new ProfileColorProperty( 'otherScreenBackground', { default: new Color( 235, 251, 251 ) } ),

  introBucketBackgroundProperty: new ProfileColorProperty( 'introBucketBackground', { default: new Color( '#8eb7f2' ) } ),
  introContainerActiveBorderProperty: new ProfileColorProperty( 'introContainerActiveBorder', { default: new Color( 'black' ) } ),
  introContainerInactiveBorderProperty: new ProfileColorProperty( 'introContainerInactiveBorder', { default: new Color( 'gray' ) } ),
  introContainerBackgroundProperty: new ProfileColorProperty( 'introContainerBackground', { default: Color.WHITE } ),
  introNumberLineHighlightProperty: new ProfileColorProperty( 'introNumberLineHighlight', { default: Color.YELLOW } ),
  introCircleFillProperty: new ProfileColorProperty( 'introCircleFill', { default: new Color( 140, 198, 61 ) } ),
  introHorizontalBarProperty: new ProfileColorProperty( 'introHorizontalBar', { default: new Color( '#ED4344' ) } ),
  introVerticalBarProperty: new ProfileColorProperty( 'introVerticalBar', { default: new Color( '#FFE600' ) } ),
  introShapeShadowProperty: new ProfileColorProperty( 'introShapeShadow', { default: new Color( 0, 0, 0, 0.5 ) } ),
  emptyBeakerProperty: new ProfileColorProperty( 'emptyBeaker', { default: new Color( 150, 150, 150, 0.1 ) } ),
  waterProperty: new ProfileColorProperty( 'water', { default: new Color( 30, 163, 255, 0.8 ) } ),
  beakerShineProperty: new ProfileColorProperty( 'beakerShine', { default: new Color( 255, 255, 255, 0.7 ) } ),

  mixedFractionStrongProperty: new ProfileColorProperty( 'mixedFractionStrong', { default: Color.BLACK } ),
  mixedFractionWeakProperty: new ProfileColorProperty( 'mixedFractionWeak', { default: new Color( 170, 170, 170 ) } ),

  equalityLabColorProperty: new ProfileColorProperty( 'equalityLabColor', { default: new Color( 254, 112, 212 ) } ),
  equalityLabWaterProperty: new ProfileColorProperty( 'equalityLabWater', { default: new Color( 254, 112, 212, 0.8 ) } ),

  introPanelBackgroundProperty: new ProfileColorProperty( 'introPanelBackground', { default: new Color( 237, 237, 237 ) } ),
  shapePieceStrokeProperty: new ProfileColorProperty( 'shapePieceStroke', { default: Color.BLACK } ),

  labPieFillProperty: new ProfileColorProperty( 'labPieFill', { default: LIGHT_RED } ),
  labBarFillProperty: new ProfileColorProperty( 'labBarFill', { default: LIGHT_BLUE } ),
  shapeShadowProperty: new ProfileColorProperty( 'shapeShadow', { default: new Color( 0, 0, 0, 0.5 ) } ),

  shapeStackFillProperty: new ProfileColorProperty( 'shapeStackFill', { default: Color.WHITE } ),
  shapeStackStrokeProperty: new ProfileColorProperty( 'shapeStackStroke', { default: Color.BLACK } ),
  shapeStackSeparatorStrokeProperty: new ProfileColorProperty( 'shapeStackSeparatorStroke', { default: new Color( 170, 170, 170 ) } ),

  shapeContainerFillProperty: new ProfileColorProperty( 'shapeContainerFill', { default: Color.WHITE } ),
  shapeContainerStrokeProperty: new ProfileColorProperty( 'shapeContainerStroke', { default: Color.BLACK } ),
  shapeContainerPartitionProperty: new ProfileColorProperty( 'shapeContainerPartition', { default: new Color( 'rgba(0,0,0,0.5)' ) } ),
  shapeContainerPartitionOffsetProperty: new ProfileColorProperty( 'shapeContainerPartitionOffset', { default: new Color( 'rgba(255,255,255,0.7)' ) } ),

  numberStrokeProperty: new ProfileColorProperty( 'numberStroke', { default: Color.BLACK } ),
  numberFillProperty: new ProfileColorProperty( 'numberFill', { default: Color.WHITE } ),
  numberTextFillProperty: new ProfileColorProperty( 'numberTextFill', { default: Color.BLACK } ),
  numberOutlineProperty: new ProfileColorProperty( 'numberOutline', { default: Color.RED } ),
  numberFractionLineProperty: new ProfileColorProperty( 'numberFractionLine', { default: Color.BLACK } ),
  numberNotAllowedProperty: new ProfileColorProperty( 'numberNotAllowed', { default: Color.RED } ),

  radioStrokeProperty: new ProfileColorProperty( 'radioStroke', { default: Color.BLACK } ),
  radioBaseProperty: new ProfileColorProperty( 'radioBase', { default: Color.WHITE } ),

  yellowRoundArrowButtonProperty: new ProfileColorProperty( 'yellowRoundArrowButton', { default: new Color( '#fefd53' ) } ),
  greenRoundArrowButtonProperty: new ProfileColorProperty( 'greenRoundArrowButton', { default: new Color( 134, 194, 51 ) } ),
  redRoundArrowButtonProperty: new ProfileColorProperty( 'redRoundArrowButton', { default: new Color( 195, 71, 26 ) } ),
  undoButtonProperty: new ProfileColorProperty( 'undoButton', { default: Color.YELLOW } ),

  shapePartitionBackgroundProperty: new ProfileColorProperty( 'shapePartitionBackground', { default: Color.WHITE } ),
  shapePartitionBorderProperty: new ProfileColorProperty( 'shapePartitionBorder', { default: Color.BLACK } ),

  shapeGreenProperty: new ProfileColorProperty( 'shapeGreen', { default: LIGHT_GREEN } ),
  shapeBlueProperty: new ProfileColorProperty( 'shapeBlue', { default: LIGHT_BLUE } ),
  shapeRedProperty: new ProfileColorProperty( 'shapeRed', { default: LIGHT_RED } ),
  shapeOrangeProperty: new ProfileColorProperty( 'shapeOrange', { default: LIGHT_ORANGE } ),
  shapePinkProperty: new ProfileColorProperty( 'shapePink', { default: LIGHT_PINK } ),
  shapeMagentaProperty: new ProfileColorProperty( 'shapeMagenta', { default: new Color( 'magenta' ) } ),
  shapeYellowProperty: new ProfileColorProperty( 'shapeYellow', { default: PhetColorScheme.PHET_LOGO_YELLOW } ),
  shapeLighterPinkProperty: new ProfileColorProperty( 'shapeLighterPink', { default: new Color( 255, 175, 175 ) } ),
  shapeStrongGreenProperty: new ProfileColorProperty( 'shapeStrongGreen', { default: new Color( 0, 2550, 0 ) } ),

  level1Property: new ProfileColorProperty( 'level1', { default: LIGHT_RED } ),
  level2Property: new ProfileColorProperty( 'level2', { default: LIGHT_BLUE } ),
  level3Property: new ProfileColorProperty( 'level3', { default: LIGHT_GREEN } ),
  level4Property: new ProfileColorProperty( 'level4', { default: LIGHT_ORANGE } ),
  level5Property: new ProfileColorProperty( 'level5', { default: Color.MAGENTA } ),
  level6Property: new ProfileColorProperty( 'level6', { default: Color.YELLOW } ),
  level7Property: new ProfileColorProperty( 'level7', { default: Color.CYAN } ),
  level8Property: new ProfileColorProperty( 'level8', { default: new Color( 146, 54, 173 ) } ),
  level9Property: new ProfileColorProperty( 'level9', { default: new Color( 255, 112, 213 ) } ),
  level10Property: new ProfileColorProperty( 'level10', { default: new Color( 45, 165, 59 ) } ),

  collectionBackgroundProperty: new ProfileColorProperty( 'collectionBackground', { default: Color.WHITE } ),
  collectionBorderProperty: new ProfileColorProperty( 'collectionBorder', { default: Color.BLACK } ),

  matchingLevelBackgroundProperty: new ProfileColorProperty( 'matchingLevelBackground', { default: new Color( 242, 242, 242 ) } ),
  matchingHomeIconBackgroundProperty: new ProfileColorProperty( 'matchingHomeIconBackground', { default: Color.WHITE } ),
  matchingNavbarIconBackgroundProperty: new ProfileColorProperty( 'matchingNavbarIconBackground', { default: Color.BLACK } ),
  matchingTargetBackgroundProperty: new ProfileColorProperty( 'matchingTargetBackground', { default: new Color( '#C0C0C0' ) } ),
  matchingSourceBackgroundProperty: new ProfileColorProperty( 'matchingSourceBackground', { default: Color.WHITE } ),
  matchingSourceBorderProperty: new ProfileColorProperty( 'matchingSourceBorder', { default: new Color( '#C0C0C0' ) } ),

  matchingCheckButtonProperty: new ProfileColorProperty( 'matchingCheckButton', { default: new Color( '#FFD63F' ) } ),
  matchingOkButtonProperty: new ProfileColorProperty( 'matchingOkButton', { default: new Color( '#44FF44' ) } ),
  matchingTryAgainButtonProperty: new ProfileColorProperty( 'matchingTryAgainButton', { default: new Color( '#FF7C3B' ) } ),
  matchingShowAnswerButtonProperty: new ProfileColorProperty( 'matchingShowAnswerButton', { default: new Color( '#FF7C3B' ) } )
};

fractionsCommon.register( 'fractionsCommonColorProfile', fractionsCommonColorProfile );

export default fractionsCommonColorProfile;