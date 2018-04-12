// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var BackButton = require( 'SCENERY_PHET/buttons/BackButton' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  var ScoreDisplayDiscreteStars = require( 'VEGAS/ScoreDisplayDiscreteStars' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SlidingScreen = require( 'SUN/SlidingScreen' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  var LEVEL_SELECTION_SPACING = 20;
  var SIDE_MARGIN = 10;

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
        icon = new Rectangle( 0, 0, 40, 40, { fill: 'red' } );
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
          return new LevelSelectionButton.ScoreDisplayCreator( icons[ index ], level.scoreProperty, {
            buttonWidth: 110,
            buttonHeight: 200,
            scoreDisplayConstructor: ScoreDisplayDiscreteStars,
            scoreDisplayOptions: {
              numStars: level.numTargets,
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

    var backButton = new BackButton( {
      left: this.layoutBounds.left + SIDE_MARGIN,
      top: this.layoutBounds.top + SIDE_MARGIN,
      listener: function() {
        model.levelProperty.value = null;
      }
    } );

    this.challengeLayer.addChild( backButton );
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
