// Copyright 2018, University of Colorado Boulder

/**
 * Main view for FractionChallenges
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const FaceNode = require( 'SCENERY_PHET/FaceNode' );
  const FractionChallengePanel = require( 'FRACTIONS_COMMON/game/view/FractionChallengePanel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const GameLayerNode = require( 'FRACTIONS_COMMON/game/view/GameLayerNode' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const TargetNode = require( 'FRACTIONS_COMMON/game/view/TargetNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TextPushButton = require( 'SUN/buttons/TextPushButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );
  const nextString = require( 'string!VEGAS/next' );

  // constants
  const PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class FractionChallengeNode extends Node {
    /**
     * @param {FractionChallenge} challenge
     * @param {Bounds2} layoutBounds
     * @param {GameAudioPlayer} gameAudioPlayer
     * @param {function|null} nextLevelCallback - Called with no arguments, forwards to the next level (if there is one)
     */
    constructor( challenge, layoutBounds, gameAudioPlayer, nextLevelCallback ) {
      super();

      // @private {FractionChallenge}
      this.challenge = challenge;

      // @private {GameAudioPlayer}
      this.gameAudioPlayer = gameAudioPlayer;

      // @private {Property.<Bounds2>}
      this.shapeDragBoundsProperty = new Property( layoutBounds );
      this.numberDragBoundsProperty = new Property( layoutBounds );

      // @private {Node}
      this.panel = new FractionChallengePanel( challenge, ( event, stack ) => {
        if ( !stack.array.length ) { return; }
        const modelPoint = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
        if ( stack instanceof ShapeStack ) {
          const shapePiece = challenge.pullShapePieceFromStack( stack, modelPoint );
          const shapePieceNode = this.layerNode.getShapePieceNode( shapePiece );
          shapePieceNode.dragListener.press( event, shapePieceNode );
        }
        else if ( stack instanceof NumberStack ) {
          const numberPiece = challenge.pullNumberPieceFromStack( stack, modelPoint );
          const numberPieceNode = this.layerNode.getNumberPieceNode( numberPiece );
          numberPieceNode.dragListener.press( event, numberPieceNode );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          const shapeGroup = challenge.pullGroupFromStack( stack, modelPoint );
          const shapeGroupNode = this.layerNode.getShapeGroupNode( shapeGroup );
          shapeGroupNode.dragListener.press( event, shapeGroupNode );
          event.handle(); // for our selection (so we don't immediately clear it)
        }
        else if ( stack instanceof NumberGroupStack ) {
          const numberGroup = challenge.pullGroupFromStack( stack, modelPoint );
          const numberGroupNode = this.layerNode.getNumberGroupNode( numberGroup );
          numberGroupNode.dragListener.press( event, numberGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      // @private {Array.<Node>}
      this.targetNodes = challenge.targets.map( target => new TargetNode( target, challenge ) );

      // @private {Node}
      this.targetsContainer = new VBox( {
        spacing: 0,
        align: 'left',
        children: this.targetNodes
      } );

      // @private {Node}
      this.levelText = new Text( StringUtils.fillIn( levelTitlePatternString, { number: challenge.levelNumber } ), {
        font: new PhetFont( { size: 30, weight: 'bold' } ),
        maxWidth: 400
      } );

      // @private {TextPushButton}
      this.nextLevelButton = new TextPushButton( nextString, {
        listener: nextLevelCallback,
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        font: new PhetFont( 24 ),
        maxTextWidth: 150
      } );

      // @private {Node}
      this.levelCompleteNode = new VBox( {
        spacing: 10,
        children: [
          new FaceNode( 180 ),
          ...( nextLevelCallback ? [ this.nextLevelButton ] : [] )
        ]
      } );

      // @private {function}
      this.levelCompleteListener = score => {
        this.levelCompleteNode.visible = score === this.challenge.targets.length;
      };

      // REVIEW: Does this listener need an unlink?
      this.challenge.scoreProperty.link( this.levelCompleteListener );

      // layout
      this.panel.bottom = layoutBounds.bottom - PANEL_MARGIN;
      this.targetsContainer.right = layoutBounds.right - PANEL_MARGIN;
      const horizontalCenter = ( layoutBounds.left + this.targetsContainer.left ) / 2;
      this.targetsContainer.centerY = ( layoutBounds.top + this.panel.top ) / 2;
      this.panel.centerX = horizontalCenter;
      if ( this.panel.left < PANEL_MARGIN ) {
        this.panel.left = PANEL_MARGIN;
      }
      this.levelText.centerX = horizontalCenter;
      this.levelText.top = layoutBounds.top + PANEL_MARGIN;
      const verticalCenter = ( this.levelText.bottom + this.panel.top ) / 2;
      const center = new Vector2( horizontalCenter, verticalCenter );
      // @public {Vector2}
      this.challengeCenter = center;
      this.levelCompleteNode.center = center;

      // @public {ModelViewTransform2}
      this.modelViewTransform = new ModelViewTransform2( Matrix3.translationFromVector( center ) );

      this.panel.updateModelLocations( this.modelViewTransform );
      this.targetNodes.forEach( targetNode => targetNode.updateModelLocations( this.modelViewTransform, this.targetsContainer ) );

      this.shapeDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( layoutBounds );
      this.numberDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( layoutBounds );

      // @private {GameLayerNode}
      this.layerNode = new GameLayerNode( challenge, this.modelViewTransform, this.shapeDragBoundsProperty, this.numberDragBoundsProperty, this.targetsContainer, this.panel, this.playCollectedSound.bind( this ) );

      this.children = [
        this.panel,
        this.targetsContainer,
        this.levelText,
        this.layerNode,
        this.levelCompleteNode
      ];
    }

    /**
     * Plays the "collection" sound.
     * @private
     */
    playCollectedSound() {
      if ( _.some( this.challenge.targets, target => target.groupProperty.value === null ) ) {
        this.gameAudioPlayer.correctAnswer();
      }
      else {
        this.gameAudioPlayer.gameOverPerfectScore();
      }
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.layerNode.dispose();
      this.challenge.scoreProperty.unlink( this.levelCompleteListener );
      this.nextLevelButton.dispose();
      this.targetNodes.forEach( targetNode => targetNode.dispose() );
      this.panel.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'FractionChallengeNode', FractionChallengeNode );
} );
