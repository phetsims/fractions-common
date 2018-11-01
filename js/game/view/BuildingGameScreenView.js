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
  const inherit = require( 'PHET_CORE/inherit' );
  const LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const platform = require( 'PHET_CORE/platform' );
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
  var levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  var LEVEL_SELECTION_SPACING = 20;
  var SIDE_MARGIN = 10;

  function select( shapePartitions, quantity ) {
    return _.find( shapePartitions, shapePartition => shapePartition.length === quantity );
  }
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

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {BuildingGameModel} model
   */
  function BuildingGameScreenView( model ) {
    var self = this;

    ScreenView.call( this );

    function createLevelIcon( level ) {
      var label = new Text( StringUtils.fillIn( levelTitlePatternString, {
        number: level.number
      } ), {
        font: new PhetFont( 18 ),
        maxWidth: ICON_DESIGN_BOUNDS.width
      } );

      var icon;
      if ( level.buildingType === BuildingType.NUMBER ) {
        if ( !model.hasMixedNumbers ) {
          var stack = new NumberStack( level.number, level.number );
          for ( var i = 0; i < level.number; i++ ) {
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
        if ( level.number === 10 && !model.hasMixedNumbers ) {
          shapePartition = select( ShapePartition.DIAGONAL_LS, 10 );
        }
        const filledPartitions = [
          new FilledPartition( shapePartition, _.times( level.number, () => true ), level.color ),
          ...( ( model.hasMixedNumbers && level.number > 1 ) ? [
            new FilledPartition( shapePartition, [ true, ..._.times( level.number - 1, () => false ) ], level.color )
          ] : [] )
        ];
        icon = new HBox( {
          spacing: 5,
          children: filledPartitions.map( filledPartition => new FilledPartitionNode( filledPartition ) ),
          scale: model.hasMixedNumbers ? 0.4 : 0.8
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

    var shapeIcons = model.shapeLevels.map( createLevelIcon );
    var numberIcons = model.numberLevels.map( createLevelIcon );

    function createLevelRow( levels, icons ) {
      return new HBox( {
        children: levels.map( function( level, index ) {
          return new LevelSelectionButton( icons[ index ], level.scoreProperty, {
            buttonWidth: 110,
            buttonHeight: 200,
            scoreDisplayConstructor: ScoreDisplayStars,
            scoreDisplayOptions: {
              numberOfStars: level.numTargets,
              perfectScore: level.numTargets
            },
            listener: function() {
              model.levelProperty.value = level;
            }
          } );
        } ),
        spacing: LEVEL_SELECTION_SPACING
      } );
    }

    function createLevelSection( minIndex, maxIndex ) {
      return new Node( {
        children: [
          new VBox( {
            children: [
              createLevelRow( model.shapeLevels.slice( minIndex, maxIndex + 1 ), shapeIcons.slice( minIndex, maxIndex + 1 ) ),
              createLevelRow( model.numberLevels.slice( minIndex, maxIndex + 1 ), numberIcons.slice( minIndex, maxIndex + 1 ) )
            ],
            spacing: LEVEL_SELECTION_SPACING,
            center: self.layoutBounds.center
          } )
        ]
      } );
    }

    var leftLevelSelectionNode = createLevelSection( 0, 4 );
    var rightLevelSelectionNode = createLevelSection( 5, 9 );

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
        this.levelSelectionTransitionNode.slideRightTo( leftLevelSelectionNode, {
          duration: 0.4,
          targetOptions: {
            easing: Easing.QUADRATIC_IN_OUT
          }
        } );
      }
      else {
        this.levelSelectionTransitionNode.slideLeftTo( rightLevelSelectionNode, {
          duration: 0.4,
          targetOptions: {
            easing: Easing.QUADRATIC_IN_OUT
          }
        } );
      }
    } );

    // @private {TransitionNode}
    this.mainTransitionNode = new TransitionNode( this.visibleBoundsProperty, {
      content: this.levelSelectionLayer,
      cachedNodes: [ this.levelSelectionLayer ]
    } );
    let lastChallengeNode = null;
    model.challengeProperty.lazyLink( ( challenge, oldChallenge ) => {
      const oldChallengeNode = lastChallengeNode;
      lastChallengeNode = null;
      let transition;
      if ( challenge ) {
        const nextLevelCallback = challenge.levelNumber < FractionsCommonConstants.NUM_LEVELS ? model.nextLevel.bind( model ) : null;
        const challengeNode = new FractionChallengeNode( challenge, this.layoutBounds, this.gameAudioPlayer, nextLevelCallback );
        lastChallengeNode = challengeNode;
        if ( allLevelsCompletedNode ) {
          allLevelsCompletedNode.center = challengeNode.challengeCenter;
        }

        // Reparent these, since we don't want to leak memory
        challengeBackground.detach();
        challengeForeground.detach();

        // TODO: don't need wrapper, include somehow? (maybe put the things in the challenge node?)
        // TODO: Or have a transition between a challenge OR the two level select screens!!!!!!!!!
        const wrapper = new Node( {
          children: [
            challengeBackground,
            new VBox( {
              spacing: SIDE_MARGIN,
              top: this.layoutBounds.top + SIDE_MARGIN,
              left: this.layoutBounds.left + SIDE_MARGIN,
              children: [
                new BackButton( {
                  listener() {
                    model.levelProperty.value = null;
                  }
                } ),
                new RefreshButton( {
                  // TODO: hmm, these 3 are copied from expression-exchange, and make the button the same width...
                  iconScale: 0.7,
                  xMargin: 9,
                  yMargin: 7,
                  listener() {
                    model.levelProperty.value && model.levelProperty.value.reset();
                  }
                } )
              ]
            } ),
            challengeNode,
            challengeForeground
          ]
        } );
        if ( oldChallenge && oldChallenge.refreshedChallenge === challenge ) {
          transition = this.mainTransitionNode.dissolveTo( wrapper, {
            duration: 0.6,
            targetOptions: {
              easing: Easing.LINEAR
            }
          } );
        }
        else {
          transition = this.mainTransitionNode.slideLeftTo( wrapper, {
            duration: 0.4,
            targetOptions: {
              easing: Easing.QUADRATIC_IN_OUT
            }
          } );
        }
      }
      else {
        transition = this.mainTransitionNode.slideRightTo( this.levelSelectionLayer, {
          duration: 0.4,
          targetOptions: {
            easing: Easing.QUADRATIC_IN_OUT
          }
        } );
      }
      if ( oldChallengeNode ) {
        transition.endedEmitter.addListener( () => oldChallengeNode.dispose() );
      }
    } );

    this.addChild( this.mainTransitionNode );

    // @public {GameAudioPlayer}
    this.gameAudioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

    this.levelSelectionLayer.addChild( this.levelSelectionTransitionNode );

    var leftButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: -Math.PI / 2,
      enabledProperty: new DerivedProperty( [ this.leftLevelSelectionProperty ], function( value ) { return !value; } ),
      listener: function() {
        self.leftLevelSelectionProperty.value = true;
      }
    } );
    var rightButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: Math.PI / 2,
      enabledProperty: this.leftLevelSelectionProperty,
      listener: function() {
        self.leftLevelSelectionProperty.value = false;
      }
    } );

    // We'll vertically center the things along the bottom
    var bottomAlignGroup = new AlignGroup( {
      matchHorizontal: false
    } );

    var slidingLevelSelectionNode = new AlignBox( new HBox( {
      children: [
        leftButton,
        rightButton
      ],
      centerX: this.layoutBounds.centerX,
      bottom: this.layoutBounds.bottom - 10, // TODO: center with reset-all and sound button
      spacing: 20
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
            ..._.range( 1, 5 ).map( n => new ShapePieceNode( new ShapePiece( new Fraction( 1, n ), BuildingRepresentation.PIE, FractionsCommonColorProfile.labCircleFillProperty ), { rotation: phet.joist.random.nextDouble() * 2 * Math.PI } ) ),
            ..._.range( 1, 5 ).map( n => new ShapePieceNode( new ShapePiece( new Fraction( 1, n ), BuildingRepresentation.BAR, FractionsCommonColorProfile.labBarFillProperty ) ) )
          ], 150 )
        } );
        challengeBackground.addChild( this.rewardNode );
      }
      allLevelsCompletedNode.visible = true;

      const doneListener = () => {
        model.levelProperty.unlink( doneListener );

        if ( this.rewardNode ) {
          this.rewardNode.dispose();
          this.rewardNode = null;
        }
        allLevelsCompletedNode.visible = false;
      };
      model.levelProperty.lazyLink( doneListener );
    } );

    var soundToggleButton = new AlignBox( new SoundToggleButton( model.soundEnabledProperty, {
      touchAreaXDilation: 10,
      touchAreaYDilation: 10,
      x: 20,
      bottom: this.layoutBounds.height - 20
    } ), { group: bottomAlignGroup } );
    this.levelSelectionLayer.addChild( soundToggleButton );

    var resetAllButton = new AlignBox( new ResetAllButton( {
      listener: function() {
        model.reset();
        self.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } ), { group: bottomAlignGroup } );
    this.levelSelectionLayer.addChild( resetAllButton );

    // TODO: cleanup layout
    slidingLevelSelectionNode.bottom = soundToggleButton.bottom = resetAllButton.bottom = this.layoutBounds.bottom - SIDE_MARGIN;
    slidingLevelSelectionNode.centerX = this.layoutBounds.centerX;
    soundToggleButton.left = this.layoutBounds.left + SIDE_MARGIN;
    resetAllButton.right = this.layoutBounds.right - SIDE_MARGIN;
  }

  fractionsCommon.register( 'BuildingGameScreenView', BuildingGameScreenView );

  return inherit( ScreenView, BuildingGameScreenView, {
    /**
     * Steps the view forward in time.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
      this.rewardNode && this.rewardNode.visible && this.rewardNode.step( dt );
      this.levelSelectionTransitionNode.step( dt );
      this.mainTransitionNode.step( dt );
    },

    /**
     * Resets the view portion.
     * @public
     */
    reset: function() {
      this.leftLevelSelectionProperty.reset();

      // TODO: better way of saying "animate instantly"
      this.levelSelectionTransitionNode.step( Number.POSITIVE_INFINITY );
      this.mainTransitionNode.step( Number.POSITIVE_INFINITY );
    }
  } );
} );
