// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const labelLevelString = require( 'string!VEGAS/label.level' );
  const labelScoreString = require( 'string!VEGAS/label.score' );
  const myMatchesString = require( 'string!FRACTIONS_COMMON/myMatches' );
  const timeNumberSecString = require( 'string!FRACTIONS_COMMON/timeNumberSec' );

  // images
  const scaleImage = require( 'image!FRACTIONS_COMMON/scale.png' );

  // constants
  const PADDING = FractionsCommonConstants.MATCHING_MARGIN;
  const NUM_TARGETS = 6;
  const TARGET_WIDTH = 125;
  const TARGET_HEIGHT = 110;
  const TARGETS_TOP = 385;

  class MatchingChallengeNode extends Node {
    /**
     * @param {MatchingChallenge} challenge
     * @param {Bounds2} layoutBounds
     */
    constructor( challenge, layoutBounds ) {
      super();

      // @private {MatchingChallenge}
      this.challenge = challenge;

      const targetWidth = ( layoutBounds.width - PADDING * ( NUM_TARGETS + 1 ) ) / NUM_TARGETS;
      const targetBackgrounds = _.range( 0, NUM_TARGETS ).map( index => new Rectangle( 0, 0, targetWidth, 100, {
        cornerRadius: 10,
        fill: FractionsCommonColorProfile.matchingTargetBackgroundProperty,
        x: layoutBounds.left + PADDING + ( targetWidth + PADDING ) * index,
        y: layoutBounds.top + PADDING
      } ) );
      targetBackgrounds.forEach( targetBackground => this.addChild( targetBackground ) );

      const scaleNodes = _.range( 0, 2 ).map( index => new Image( scaleImage, {
        centerX: layoutBounds.centerX + ( index - 0.5 ) * 380,
        y: 270,
        scale: 0.4
      } ) );
      scaleNodes.forEach( scaleNode => this.addChild( scaleNode ) );

      const sourceBackgrounds = _.flatten( _.range( 0, NUM_TARGETS ).map( col => _.range( 0, 2 ).map( row => {
        const x = layoutBounds.centerX + TARGET_WIDTH * ( col - NUM_TARGETS / 2 );
        const y = TARGETS_TOP + TARGET_HEIGHT * row;
        return new Rectangle( x, y, TARGET_WIDTH, TARGET_HEIGHT, {
          fill: FractionsCommonColorProfile.matchingSourceBackgroundProperty,
          stroke: FractionsCommonColorProfile.matchingSourceBorderProperty,
          lineWidth: 1.5
        } );
      } ) ) );
      sourceBackgrounds.forEach( sourceBackground => this.addChild( sourceBackground ) );

      this.addChild( new Text( myMatchesString, {
        font: new PhetFont( { size: 18, weight: 'bold' } ),
        left: layoutBounds.left + PADDING,
        top: targetBackgrounds[ 0 ].bottom + 5,
        maxWidth: 300
      } ) );

      const rightTextOptions = {
        font: new PhetFont( { size: 15, weight: 'bold' } ),
        maxWidth: 300
      };

      const levelText = new Text( StringUtils.format( labelLevelString, challenge.levelNumber ), rightTextOptions );
      const scoreText = new Text( '', rightTextOptions );
      const timeText = new Text( '', rightTextOptions );

      this.addChild( new AlignBox( new VBox( {
        spacing: 10,
        align: 'right',
        children: [
          levelText,
          scoreText,
          timeText
        ]
      } ), {
        alignBounds: layoutBounds.withMinY( targetBackgrounds[ 0 ].bottom ),
        xAlign: 'right',
        yAlign: 'top',
        xMargin: PADDING,
        yMargin: 10
      } ) );

      // @private {function}
      this.scoreListener = score => {
        scoreText.text = StringUtils.format( labelScoreString, score );
      };
      this.timeListener = time => {
        timeText.text = StringUtils.format( timeNumberSecString, Util.toFixed( time, 0 ) );
      };
      this.timeVisibleListener = visible => {
        timeText.visible = visible;
      };

      this.challenge.scoreProperty.link( this.scoreListener );
      this.challenge.elapsedTimeProperty.link( this.timeListener );
      this.challenge.timeVisibleProperty.link( this.timeVisibleListener );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.challenge.scoreProperty.unlink( this.scoreListener );
      this.challenge.elapsedTimeProperty.unlink( this.timeListener );
      this.challenge.timeVisibleProperty.unlink( this.timeVisibleListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'MatchingChallengeNode', MatchingChallengeNode );
} );
