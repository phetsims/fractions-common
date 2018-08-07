// Copyright 2017, University of Colorado Boulder

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
  const BackButton = require( 'SCENERY_PHET/buttons/BackButton' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const FilledPartition = require( 'FRACTIONS_COMMON/game/model/FilledPartition' );
  const FilledPartitionNode = require( 'FRACTIONS_COMMON/game/view/FilledPartitionNode' );
  const FractionChallengeNode = require( 'FRACTIONS_COMMON/game/view/FractionChallengeNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const ScoreDisplayStars = require( 'VEGAS/ScoreDisplayStars' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );
  const SlidingScreen = require( 'TWIXT/SlidingScreen' );
  const SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  var LEVEL_SELECTION_SPACING = 20;
  var SIDE_MARGIN = 10;

  function select( shapePartitions, quantity ) {
    return _.find( shapePartitions, shapePartition => shapePartition.shapes.length === quantity );
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

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {BuildingGameModel} model
   */
  function BuildingGameScreenView( model ) {
    var self = this;

    ScreenView.call( this );

    var textAlignGroup = new AlignGroup();
    var iconAlignGroup = new AlignGroup();

    function createLevelIcon( level ) {
      var label = new Text( StringUtils.fillIn( levelTitlePatternString, {
        number: level.number
      } ), {
        font: new PhetFont( 20 )
      } );

      var icon;
      if ( !model.hasMixedNumbers && level.buildingType === BuildingType.NUMBER ) {
        var stack = new NumberStack( level.number );
        for ( var i = 0; i < level.number; i++ ) {
          stack.numberPieces.push( new NumberPiece( level.number ) );
        }
        icon = new NumberStackNode( stack, {

        } );
      }
      else {
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
          children: filledPartitions.map( filledPartition => new FilledPartitionNode( filledPartition ) )
        } );
      }

      return new VBox( {
        children: [
          new AlignBox( label, { group: textAlignGroup } ),
          new AlignBox( icon, { group: iconAlignGroup, bottomMargin: 10 } )
        ],
        spacing: 20
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

    // TODO: better name
    var leftChallengeProperty = new DerivedProperty( [ model.levelProperty ], function( level ) {
      return level === null;
    } );

    // @private {Node} - The "left" half of the sliding layer, displayed first
    this.levelSelectionLayer = new Node();

    // @private {Node} - The "right" half of the sliding layer, will slide into view when the user selects a level
    this.challengeLayer = new Node();

    // @private {SlidingScreen}
    this.levelSelectionSlidingScreen = new SlidingScreen( leftLevelSelectionNode, rightLevelSelectionNode, this.visibleBoundsProperty, this.leftLevelSelectionProperty );
    this.challengeSlidingScreen = new SlidingScreen( this.levelSelectionLayer, this.challengeLayer, this.visibleBoundsProperty, leftChallengeProperty );

    this.addChild( this.challengeSlidingScreen );

    // @private {FractionChallengeNode}
    this.challengeNode = null;
    model.challengeProperty.link( challenge => {
      this.challengeNode && this.challengeNode.dispose();
      this.challengeNode = new FractionChallengeNode( challenge, this.layoutBounds );
      this.challengeLayer.addChild( this.challengeNode );
    } );

    this.levelSelectionLayer.addChild( this.levelSelectionSlidingScreen );

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

    this.challengeLayer.addChild( new VBox( {
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
    } ) );
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
      this.levelSelectionSlidingScreen.step( dt );
      this.challengeSlidingScreen.step( dt );
    },

    /**
     * Resets the view portion.
     * @public
     */
    reset: function() {
      this.leftLevelSelectionProperty.reset();

      // TODO: better way of saying "animate instantly"
      this.levelSelectionSlidingScreen.step( Number.POSITIVE_INFINITY );
      this.challengeSlidingScreen.step( Number.POSITIVE_INFINITY );
    }
  } );
} );
