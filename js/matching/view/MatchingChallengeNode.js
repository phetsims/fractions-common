// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var labelLevelString = require( 'string!VEGAS/label.level' );
  var labelScoreString = require( 'string!VEGAS/label.score' );
  var myMatchesString = require( 'string!FRACTIONS_COMMON/myMatches' );
  var timeNumberSecString = require( 'string!FRACTIONS_COMMON/timeNumberSec' );

  // constants
  const PADDING = FractionsCommonConstants.MATCHING_MARGIN;
  const NUM_TARGETS = 6;

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
