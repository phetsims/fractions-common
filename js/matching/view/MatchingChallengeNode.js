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
  const Emitter = require( 'AXON/Emitter' );
  const FaceNode = require( 'SCENERY_PHET/FaceNode' );
  const FaceWithPointsNode = require( 'SCENERY_PHET/FaceWithPointsNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Image = require( 'SCENERY/nodes/Image' );
  const LevelCompletedNode = require( 'VEGAS/LevelCompletedNode' );
  const MatchingChallenge = require( 'FRACTIONS_COMMON/matching/model/MatchingChallenge' );
  const MatchPieceNode = require( 'FRACTIONS_COMMON/matching/view/MatchPieceNode' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RewardNode = require( 'VEGAS/RewardNode' );
  const Sound = require( 'VIBE/Sound' );
  const StarNode = require( 'SCENERY_PHET/StarNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TextPushButton = require( 'SUN/buttons/TextPushButton' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const checkString = require( 'string!VEGAS/check' );
  const labelLevelString = require( 'string!VEGAS/label.level' );
  const labelScoreString = require( 'string!VEGAS/label.score' );
  const myMatchesString = require( 'string!FRACTIONS_COMMON/myMatches' );
  const okString = require( 'string!FRACTIONS_COMMON/ok' );
  const showAnswerString = require( 'string!VEGAS/showAnswer' );
  const timeNumberSecString = require( 'string!FRACTIONS_COMMON/timeNumberSec' );
  const tryAgainString = require( 'string!VEGAS/tryAgain' );

  // images
  const scaleImage = require( 'image!FRACTIONS_COMMON/scale.png' );

  // sounds
  const cheerAudio = require( 'sound!VEGAS/cheer.mp3' );

  // constants
  const PADDING = FractionsCommonConstants.MATCHING_MARGIN;
  const NUM_TARGETS = 6;
  const TARGET_WIDTH = MatchPieceNode.DIMENSION.width;
  const TARGET_HEIGHT = MatchPieceNode.DIMENSION.height;
  const TARGETS_TOP = 365;
  const cheerSound = new Sound( cheerAudio );

  class MatchingChallengeNode extends Node {
    /**
     * @param {MatchingChallenge} challenge
     * @param {Bounds2} layoutBounds
     * @param {Object} [options]
     */
    constructor( challenge, layoutBounds, options ) {
      super();

      options = _.extend( {
        // {function} - Called when the "continue" button is pressed on the level-complete node
        onContinue: () => {}
      }, options );

      // @private {MatchingChallenge}
      this.challenge = challenge;

      // @private {Emitter}
      this.disposeEmitter = new Emitter(); // TODO: un-property things

      // @private {RewardNode|null}
      this.rewardNode = null;

      const targetWidth = ( layoutBounds.width - PADDING * ( NUM_TARGETS + 1 ) ) / NUM_TARGETS;
      let targetBottom;

      // Targets
      challenge.targets.forEach( ( target, index ) => {
        const targetBackground = new Rectangle( 0, 0, targetWidth, 100, {
          cornerRadius: 10,
          fill: FractionsCommonColorProfile.matchingTargetBackgroundProperty,
          x: layoutBounds.left + PADDING + ( targetWidth + PADDING ) * index,
          y: layoutBounds.top + PADDING
        } );
        this.addChild( targetBackground );

        // TODO: better "centering" of equals signs?
        const equalsSign = new Text( MathSymbols.EQUAL_TO, {
          font: new PhetFont( { size: 26 } ),
          center: targetBackground.center
        } );
        this.addChild( equalsSign );
        const targetListener = filled => {
          equalsSign.visible = filled;
        };
        target.isFilledProperty.link( targetListener );
        this.disposeEmitter.addListener( () => {
          target.isFilledProperty.unlink( targetListener );
        } );

        const CENTER_WEIGHT = 0.5;

        const y = targetBackground.centerY;
        target.spots[ 0 ].positionProperty.value = new Vector2( ( 1 - CENTER_WEIGHT ) * targetBackground.left + CENTER_WEIGHT * targetBackground.centerX, y );
        target.spots[ 1 ].positionProperty.value = new Vector2( ( 1 - CENTER_WEIGHT ) * targetBackground.right + CENTER_WEIGHT * targetBackground.centerX, y );
        targetBottom = targetBackground.bottom;
      } );

      // Scales
      _.range( 0, 2 ).forEach( index => {
        const scaleNode = new Image( scaleImage, {
          centerX: layoutBounds.centerX + ( index - 0.5 ) * 380,
          y: 270,
          scale: 0.4
        } );
        this.addChild( scaleNode );

        challenge.scaleSpots[ index ].positionProperty.value = scaleNode.centerTop.plusXY( 0, -20 );
      } );

      // Sources
      _.range( 0, NUM_TARGETS ).forEach( col => _.range( 0, 2 ).forEach( row => {
        const x = layoutBounds.centerX + TARGET_WIDTH * ( col - NUM_TARGETS / 2 );
        const y = TARGETS_TOP + TARGET_HEIGHT * row;
        const sourceNode = new Rectangle( x, y, TARGET_WIDTH, TARGET_HEIGHT, {
          fill: FractionsCommonColorProfile.matchingSourceBackgroundProperty,
          stroke: FractionsCommonColorProfile.matchingSourceBorderProperty,
          lineWidth: 1.5
        } );
        this.addChild( sourceNode );

        challenge.sourceSpots[ col + row * NUM_TARGETS ].positionProperty.value = sourceNode.center;
      } ) );

      this.addChild( new Text( myMatchesString, {
        font: new PhetFont( { size: 18, weight: 'bold' } ),
        left: layoutBounds.left + PADDING,
        top: targetBottom + 5,
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
        alignBounds: layoutBounds.withMinY( targetBottom ),
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
      this.disposeEmitter.addListener( () => {
        this.challenge.scoreProperty.unlink( this.scoreListener );
        this.challenge.elapsedTimeProperty.unlink( this.timeListener );
        this.challenge.timeVisibleProperty.unlink( this.timeVisibleListener );
      } );

      const faceNode = new FaceWithPointsNode( {
        spacing: 8,
        pointsAlignment: 'rightCenter',
        faceDiameter: 120,
        pointsFont: new PhetFont( { size: 26, weight: 'bold' } ),
        centerX: layoutBounds.right - 150,
        centerY: 250
      } );
      this.addChild( faceNode );

      const buttonOptions = {
        font: new PhetFont( { size: 22, weight: 'bold' } ),
        centerX: faceNode.centerX,
        centerY: faceNode.bottom + 30,
        maxTextWidth: 150
      };

      const checkButton = new TextPushButton( checkString, _.extend( {
        baseColor: FractionsCommonColorProfile.matchingCheckButtonProperty,
        listener: () => challenge.compare()
      }, buttonOptions ) );
      this.addChild( checkButton );

      const okButton = new TextPushButton( okString, _.extend( {
        baseColor: FractionsCommonColorProfile.matchingOkButtonProperty,
        listener: () => challenge.collect()
      }, buttonOptions ) );
      this.addChild( okButton );

      const tryAgainButton = new TextPushButton( tryAgainString, _.extend( {
        baseColor: FractionsCommonColorProfile.matchingTryAgainButtonProperty,
        listener: () => challenge.tryAgain()
      }, buttonOptions ) );
      this.addChild( tryAgainButton );

      const showAnswerButton = new TextPushButton( showAnswerString, _.extend( {
        baseColor: FractionsCommonColorProfile.matchingShowAnswerButtonProperty,
        listener: () => challenge.showAnswer()
      }, buttonOptions ) );
      this.addChild( showAnswerButton );

      // @private {Node}
      this.pieceLayer = new Node();
      this.addChild( this.pieceLayer );

      // @private {function}
      this.stateListener = state => {
        checkButton.visible = state === MatchingChallenge.State.COMPARISON;
        okButton.visible = state === MatchingChallenge.State.MATCHED;
        tryAgainButton.visible = state === MatchingChallenge.State.TRY_AGAIN;
        showAnswerButton.visible = state === MatchingChallenge.State.SHOW_ANSWER;

        faceNode.visible = state === MatchingChallenge.State.MATCHED;

        this.pieceLayer.pickable = ( state === MatchingChallenge.State.SHOW_ANSWER || state === MatchingChallenge.State.MATCHED ) ? false : null;
      };
      this.challenge.stateProperty.link( this.stateListener );
      this.disposeEmitter.addListener( () => {
        this.challenge.stateProperty.unlink( this.stateListener );
      } );

      // @private {function}
      this.lastScoreGainListener = lastScoreGain => {
        faceNode.setPoints( lastScoreGain );
      };
      this.challenge.lastScoreGainProperty.link( this.lastScoreGainListener );

      challenge.pieces.forEach( piece => {
        this.pieceLayer.addChild( new MatchPieceNode( piece ) );
      } );
      this.disposeEmitter.addListener( () => {
        this.pieceLayer.children.forEach( pieceNode => pieceNode.dispose() );
      } );

      const completedListener = () => {
        if ( challenge.scoreProperty.value === 12 ) {
          cheerSound.play();

          this.rewardNode = new RewardNode( {
            pickable: false,
            nodes: [
              ..._.times( 8, () => new StarNode() ),
              ..._.times( 8, () => new FaceNode( 40, { headStroke: 'black', headLineWidth: 1.5 } ) ),
              ...RewardNode.createRandomNodes( challenge.pieces.map( piece => {
                return new MatchPieceNode( piece.copy() );
              } ), 100 )
            ]
          } );
          this.addChild( this.rewardNode );
        }

        const time = Util.toFixed( challenge.elapsedTimeProperty.value, 0 );
        const lastBestTime = Util.toFixed( challenge.bestElapsedTimeProperty.value, 0 );
        const levelCompletedNode = new LevelCompletedNode(
          challenge.levelNumber,
          challenge.scoreProperty.value,
          12,
          3,
          challenge.timeVisibleProperty.value,
          time,
          lastBestTime,
          time < lastBestTime,
          options.onContinue, {
            center: layoutBounds.center,
            contentMaxWidth: 600
          } );
        this.addChild( levelCompletedNode );
        this.disposeEmitter.addListener( () => {
          levelCompletedNode.dispose();
        } );
      };

      this.challenge.completedEmitter.addListener( completedListener );
      this.disposeEmitter.addListener( () => {
        this.challenge.completedEmitter.removeListener( completedListener );
      } );
    }

    /**
     * Steps the view forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.rewardNode && this.rewardNode.step( dt );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.disposeEmitter.emit();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'MatchingChallengeNode', MatchingChallengeNode );
} );
