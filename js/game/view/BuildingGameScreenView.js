// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const AllLevelsCompletedNode = require( 'VEGAS/AllLevelsCompletedNode' );
  const BackButton = require( 'SCENERY_PHET/buttons/BackButton' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Easing = require( 'TWIXT/Easing' );
  const FaceNode = require( 'SCENERY_PHET/FaceNode' );
  const FilledPartition = require( 'FRACTIONS_COMMON/game/model/FilledPartition' );
  const FilledPartitionNode = require( 'FRACTIONS_COMMON/game/view/FilledPartitionNode' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionChallengeNode = require( 'FRACTIONS_COMMON/game/view/FractionChallengeNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const platform = require( 'PHET_CORE/platform' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const RewardNode = require( 'VEGAS/RewardNode' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const ScoreDisplayStars = require( 'VEGAS/ScoreDisplayStars' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  const StarNode = require( 'SCENERY_PHET/StarNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TransitionNode = require( 'TWIXT/TransitionNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  const LEVEL_SELECTION_SPACING = 20;
  const SIDE_MARGIN = 10;
  const select = ( shapePartitions, quantity ) => {
    return _.find( shapePartitions, shapePartition => shapePartition.length === quantity );
  };
  const LEVEL_SHAPE_PARTITIONS = [
    select( ShapePartition.PIES, 1 ),
    select( ShapePartition.VERTICAL_BARS, 2 ),
    select( ShapePartition.POLYGONS, 3 ),
    select( ShapePartition.POLYGONS, 4 ),
    select( ShapePartition.POLYGONS, 5 ),
    ShapePartition.SIX_FLOWER,
    ShapePartition.HEX_RING,
    ShapePartition.NINJA_STAR,
    select( ShapePartition.GRIDS, 9 ),
    ShapePartition.FIVE_POINT
  ];
  const ICON_DESIGN_BOUNDS = new Bounds2( 0, 0, 90, 129 );
  const QUADRATIC_TRANSITION_OPTIONS = {
    duration: 0.4,
    targetOptions: {
      easing: Easing.QUADRATIC_IN_OUT
    }
  };

  class BuildingGameScreenView extends ScreenView {
    /**
     * @param {BuildingGameModel} model
     */
    constructor( model ) {
      super();

      // @private {BuildingGameModel}
      this.model = model;

      // @private {Array.<Node>}
      this.shapeIcons = this.model.shapeLevels.map( level => BuildingGameScreenView.createLevelIcon( level, model.hasMixedNumbers ) );
      this.numberIcons = this.model.numberLevels.map( level => BuildingGameScreenView.createLevelIcon( level, model.hasMixedNumbers ) );

      const leftLevelSelectionNode = this.createLevelSection( 0, 4 );
      const rightLevelSelectionNode = this.createLevelSection( 5, 9 );

      // @private {Property.<boolean>}
      this.leftLevelSelectionProperty = new BooleanProperty( true );

      // @private {Node} - The "left" half of the sliding layer, displayed first
      this.levelSelectionLayer = new Node();

      const challengeBackground = new Node();
      const challengeForeground = new Node();

      // @orivate {TransitionNode}
      this.levelSelectionTransitionNode = new TransitionNode( this.visibleBoundsProperty, {
        content: leftLevelSelectionNode,
        cachedNodes: [ leftLevelSelectionNode, rightLevelSelectionNode ]
      } );
      this.leftLevelSelectionProperty.lazyLink( isLeft => {
        if ( isLeft ) {
          this.levelSelectionTransitionNode.slideRightTo( leftLevelSelectionNode, QUADRATIC_TRANSITION_OPTIONS );
        }
        else {
          this.levelSelectionTransitionNode.slideLeftTo( rightLevelSelectionNode, QUADRATIC_TRANSITION_OPTIONS );
        }
      } );

      // @private {TransitionNode}
      this.mainTransitionNode = new TransitionNode( this.visibleBoundsProperty, {
        content: this.levelSelectionLayer,
        cachedNodes: [ this.levelSelectionLayer ]
      } );

      const leftButtonOptions = {
        touchAreaXDilation: SIDE_MARGIN,
        touchAreaYDilation: SIDE_MARGIN / 2
      };
      const challengeControlBox = new VBox( {
        spacing: SIDE_MARGIN,
        top: this.layoutBounds.top + SIDE_MARGIN,
        left: this.layoutBounds.left + SIDE_MARGIN,
        children: [
          new BackButton( _.extend( {
            listener() {
              model.levelProperty.value = null;
            }
          }, leftButtonOptions ) ),
          new RefreshButton( _.extend( {
            iconScale: 0.7,
            xMargin: 9,
            yMargin: 7,
            listener() {
              model.levelProperty.value && model.levelProperty.value.reset();
            }
          }, leftButtonOptions ) ),
          ...( phet.chipper.queryParameters.showAnswers ? [
            new RectangularPushButton( _.extend( {
              content: new FaceNode( 27 ),
              listener: function() {
                model.challengeProperty.value.cheat();
              }
            }, leftButtonOptions ) )
          ] : [] )
        ]
      } );

      let lastChallengeNode = null;
      model.challengeProperty.lazyLink( ( challenge, oldChallenge ) => {
        const oldChallengeNode = lastChallengeNode;

        if ( oldChallengeNode ) {
          oldChallengeNode.interruptSubtreeInput();
        }

        lastChallengeNode = null;
        let transition;
        if ( challenge ) {
          const nextLevelCallback = challenge.levelNumber < FractionsCommonConstants.NUM_LEVELS ? model.nextLevel.bind( model ) : null;
          const challengeNode = new FractionChallengeNode( challenge, this.layoutBounds, this.gameAudioPlayer, nextLevelCallback );
          lastChallengeNode = challengeNode;
          if ( allLevelsCompletedNode ) {
            allLevelsCompletedNode.center = challengeNode.challengeCenter;
          }

          // Assign each challenge node with a wrapper reference, so we can easily dispose it.
          challengeNode.wrapper = new Node( {
            children: [
              challengeBackground,
              challengeControlBox,
              challengeNode,
              challengeForeground
            ]
          } );
          if ( oldChallenge && oldChallenge.refreshedChallenge === challenge ) {
            transition = this.mainTransitionNode.dissolveTo( challengeNode.wrapper, {
              duration: 0.6,
              targetOptions: {
                easing: Easing.LINEAR
              }
            } );
          }
          else {
            transition = this.mainTransitionNode.slideLeftTo( challengeNode.wrapper, QUADRATIC_TRANSITION_OPTIONS );
          }
        }
        else {
          transition = this.mainTransitionNode.slideRightTo( this.levelSelectionLayer, QUADRATIC_TRANSITION_OPTIONS );
        }
        if ( oldChallengeNode ) {
          transition.endedEmitter.addListener( () => {
            oldChallengeNode.wrapper.dispose();
            oldChallengeNode.dispose();
          } );
        }
      } );

      this.addChild( this.mainTransitionNode );

      // @public {GameAudioPlayer}
      this.gameAudioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

      this.levelSelectionLayer.addChild( this.levelSelectionTransitionNode );

      const levelSelectionButtonSpacing = 20;

      // Buttons to switch between level selection pages
      const leftButton = new RoundArrowButton( {
        baseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
        radius: 20,
        arrowRotation: -Math.PI / 2,
        enabledProperty: new DerivedProperty( [ this.leftLevelSelectionProperty ], value => !value ),
        listener: () => {
          this.leftLevelSelectionProperty.value = true;
        }
      } );
      const rightButton = new RoundArrowButton( {
        baseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
        radius: 20,
        arrowRotation: Math.PI / 2,
        enabledProperty: this.leftLevelSelectionProperty,
        listener: () => {
          this.leftLevelSelectionProperty.value = false;
        }
      } );

      // left-right touch areas
      leftButton.touchArea = leftButton.bounds.dilatedXY( levelSelectionButtonSpacing / 2, 10 );
      rightButton.touchArea = rightButton.bounds.dilatedXY( levelSelectionButtonSpacing / 2, 10 );

      // We'll vertically center the things along the bottom
      const bottomAlignGroup = new AlignGroup( {
        matchHorizontal: false
      } );

      const slidingLevelSelectionNode = new AlignBox( new HBox( {
        children: [
          leftButton,
          rightButton
        ],
        centerX: this.layoutBounds.centerX,
        bottom: this.layoutBounds.bottom - 10,
        spacing: levelSelectionButtonSpacing
      } ), { group: bottomAlignGroup } );
      this.levelSelectionLayer.addChild( slidingLevelSelectionNode );

      const allLevelsCompletedNode = new AllLevelsCompletedNode( () => {
        // Go back to the level selection
        model.levelProperty.value = null;
      }, {
        center: this.layoutBounds.center,
        visible: false
      } );
      challengeForeground.addChild( allLevelsCompletedNode );

      model.allLevelsCompleteEmitter.addListener( () => {
        if ( !platform.mobileSafari ) {
          // @private {RewardNode}
          this.rewardNode = new RewardNode( {
            nodes: RewardNode.createRandomNodes( [
              ..._.times( 7, () => new StarNode() ),
              ..._.times( 7, () => new FaceNode( 40, { headStroke: 'black' } ) ),
              ..._.range( 1, 10 ).map( n => new NumberPieceNode( new NumberPiece( n ) ) ),
              ..._.range( 1, 5 ).map( n => new ShapePieceNode( new ShapePiece( new Fraction( 1, n ), BuildingRepresentation.PIE, FractionsCommonColorProfile.labPieFillProperty ), { rotation: phet.joist.random.nextDouble() * 2 * Math.PI } ) ),
              ..._.range( 1, 5 ).map( n => new ShapePieceNode( new ShapePiece( new Fraction( 1, n ), BuildingRepresentation.BAR, FractionsCommonColorProfile.labBarFillProperty ) ) )
            ], 150 )
          } );
          challengeBackground.addChild( this.rewardNode );
        }
        allLevelsCompletedNode.visible = true;

        const scoreProperty = model.levelProperty.value.scoreProperty;
        let finished = false;
        const doneListener = () => {
          // We need a guard here, since otherwise the doneListener could potentially be called twice from the same
          // event.
          if ( finished ) {
            return;
          }
          finished = true;
          model.levelProperty.unlink( doneListener );
          model.challengeProperty.unlink( doneListener );
          scoreProperty.unlink( doneListener );

          if ( this.rewardNode ) {
            this.rewardNode.dispose();
            this.rewardNode = null;
          }
          allLevelsCompletedNode.visible = false;
        };
        model.challengeProperty.lazyLink( doneListener );
        model.levelProperty.lazyLink( doneListener );
        scoreProperty.lazyLink( doneListener );
      } );

      const soundToggleButton = new AlignBox( new SoundToggleButton( model.soundEnabledProperty, {
        touchAreaXDilation: 10,
        touchAreaYDilation: 10,
        x: 20,
        bottom: this.layoutBounds.height - 20
      } ), { group: bottomAlignGroup } );
      this.levelSelectionLayer.addChild( soundToggleButton );

      const resetAllButton = new AlignBox( new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput();
          model.reset();
          this.reset();
        },
        right: this.layoutBounds.maxX - 10,
        bottom: this.layoutBounds.maxY - 10,
        touchAreaDilation: 10
      } ), { group: bottomAlignGroup } );
      this.levelSelectionLayer.addChild( resetAllButton );

      slidingLevelSelectionNode.bottom = soundToggleButton.bottom = resetAllButton.bottom = this.layoutBounds.bottom - SIDE_MARGIN;
      slidingLevelSelectionNode.centerX = this.layoutBounds.centerX;
      soundToggleButton.left = this.layoutBounds.left + SIDE_MARGIN;
      resetAllButton.right = this.layoutBounds.right - SIDE_MARGIN;

      phet.joist.display.addInputListener( {
        down: () => {
          const screen = phet.joist.sim.currentScreenProperty.value;
          if ( screen && screen.view === this ) {
            // Any event on a shape group should handle it.
            const challenge = model.challengeProperty.value;
            if ( challenge ) {
              challenge.selectedGroupProperty.value = null;
            }
          }
        }
      } );
    }

    /**
     * Steps the view forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.rewardNode && this.rewardNode.visible && this.rewardNode.step( dt );
      this.levelSelectionTransitionNode.step( dt );
      this.mainTransitionNode.step( dt );
    }

    /**
     * Resets the view portion.
     * @public
     */
    reset() {
      this.leftLevelSelectionProperty.reset();

      // "Instantly" complete animations
      this.levelSelectionTransitionNode.step( Number.POSITIVE_INFINITY );
      this.mainTransitionNode.step( Number.POSITIVE_INFINITY );
    }

    /**
     * Creates a row of level selection buttons.
     * @private
     *
     * @param {Array.<FractionLevel>} levels
     * @param {Array.<Node>} icons
     * @returns {Node}
     */
    createLevelRow( levels, icons ) {
      return new HBox( {
        children: levels.map( ( level, index ) => {
          const button = new LevelSelectionButton( icons[ index ], level.scoreProperty, {
            buttonWidth: 110,
            buttonHeight: 200,
            scoreDisplayConstructor: ScoreDisplayStars,
            scoreDisplayOptions: {
              numberOfStars: level.numTargets,
              perfectScore: level.numTargets
            },
            listener: () => {
              this.model.levelProperty.value = level;
            }
          } );
          button.touchArea = button.localBounds.dilated( LEVEL_SELECTION_SPACING / 2 );
          return button;
        } ),
        spacing: LEVEL_SELECTION_SPACING
      } );
    }

    /**
     * Creates a "page" of level selection buttons, with a slice of shape levels on top and a slice of number levels
     * on bottom.
     * @private
     *
     * @param {number} minIndex - The minimum index of levels to include (inclusive)
     * @param {number} maxIndex - The maximum index of levels to include (inclusive)
     * @returns {Node}
     */
    createLevelSection( minIndex, maxIndex ) {
      return new Node( {
        children: [
          new VBox( {
            children: [
              this.createLevelRow( this.model.shapeLevels.slice( minIndex, maxIndex + 1 ), this.shapeIcons.slice( minIndex, maxIndex + 1 ) ),
              this.createLevelRow( this.model.numberLevels.slice( minIndex, maxIndex + 1 ), this.numberIcons.slice( minIndex, maxIndex + 1 ) )
            ],
            spacing: LEVEL_SELECTION_SPACING,
            center: this.layoutBounds.center
          } )
        ]
      } );
    }

    /**
     * Creates the level icon for the given level. This is passed into LevelSelectionButton as the icon, and in our case
     * includes text about what level number it is, in addition to the icon graphic. We need to handle this and provide
     * same-bounds "icons" for every button since LevelSelectionButton still resizes the icon based on its bounds.
     * @private
     *
     * @param {FractionLevel} level
     * @param {boolean} hasMixedNumbers
     * @returns {Node}
     */
    static createLevelIcon( level, hasMixedNumbers ) {
      const label = new Text( StringUtils.fillIn( levelTitlePatternString, {
        number: level.number
      } ), {
        font: new PhetFont( 18 ),
        maxWidth: ICON_DESIGN_BOUNDS.width
      } );

      let icon;
      if ( level.buildingType === BuildingType.NUMBER ) {
        if ( !hasMixedNumbers ) {
          const stack = new NumberStack( level.number, level.number );
          for ( let i = 0; i < level.number; i++ ) {
            stack.numberPieces.push( new NumberPiece( level.number ) );
          }
          icon = new NumberStackNode( stack, {
            scale: 0.75
          } );
        }
        else {
          const hasFraction = level.number > 1;
          icon = new MixedFractionNode( {
            whole: level.number,
            numerator: hasFraction ? 1 : null,
            denominator: hasFraction ? level.number : null,
            scale: 0.9
          } );
        }
      }
      else {
        // unmixed max width ~106, mixed ~217
        let shapePartition = LEVEL_SHAPE_PARTITIONS[ level.number - 1 ];
        // There's a different shape for non-mixed level 10
        if ( level.number === 10 && !hasMixedNumbers ) {
          shapePartition = select( ShapePartition.DIAGONAL_LS, 10 );
        }
        const filledPartitions = [
          new FilledPartition( shapePartition, _.times( level.number, () => true ), level.color ),
          ...( ( hasMixedNumbers && level.number > 1 ) ? [
            new FilledPartition( shapePartition, [ true, ..._.times( level.number - 1, () => false ) ], level.color )
          ] : [] )
        ];
        icon = new HBox( {
          spacing: 5,
          children: filledPartitions.map( filledPartition => new FilledPartitionNode( filledPartition ) ),
          scale: hasMixedNumbers ? 0.4 : 0.8
        } );
      }

      label.centerX = ICON_DESIGN_BOUNDS.centerX;
      label.top = ICON_DESIGN_BOUNDS.top;

      const iconContainer = new Node( {
        children: [ icon ],
        maxWidth: ICON_DESIGN_BOUNDS.width
      } );

      iconContainer.centerX = ICON_DESIGN_BOUNDS.centerX;
      iconContainer.centerY = ( label.bottom + ICON_DESIGN_BOUNDS.bottom ) / 2;

      assert && assert( ICON_DESIGN_BOUNDS.containsBounds( label.bounds ), 'Sanity check for level icon layout' );
      assert && assert( ICON_DESIGN_BOUNDS.containsBounds( iconContainer.bounds ), 'Sanity check for level icon layout' );

      return new Node( {
        children: [ label, iconContainer ],
        localBounds: ICON_DESIGN_BOUNDS
      } );
    }
  }

  return fractionsCommon.register( 'BuildingGameScreenView', BuildingGameScreenView );
} );
