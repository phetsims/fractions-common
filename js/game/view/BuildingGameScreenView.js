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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
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

    function createLevelSection( shapeLevels, numberLevels ) {
      return new Node( {
        children: [
          new VBox( {
            children: [ shapeLevels, numberLevels ].map( function( levels ) {
              return new HBox( {
                children: levels.map( function( level ) {

                  var label = new Text( StringUtils.fillIn( levelTitlePatternString, {
                    number: level.number
                  } ), {
                    font: new PhetFont( 20 )
                  } );

                  var icon = new Rectangle( 0, 0, 40, 40, { fill: 'red' } );

                  return new LevelSelectionButton.ScoreDisplayCreator( new VBox( {
                    children: [
                      label,
                      icon
                    ],
                    spacing: 10
                  } ), level.scoreProperty, {
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
            } ),
            spacing: LEVEL_SELECTION_SPACING,
            center: self.layoutBounds.center
          } )
        ]
      } );
    }

    var leftLevelSelectionNode = createLevelSection( model.shapeLevels.slice( 0, 5 ), model.numberLevels.slice( 0, 5 ) );
    var rightLevelSelectionNode = createLevelSection( model.shapeLevels.slice( 5, 10 ), model.numberLevels.slice( 5, 10 ) );

    var leftLevelSelectionProperty = new BooleanProperty( true );

    // TODO: better name
    var leftChallengeProperty = new DerivedProperty( [ model.levelProperty ], function( level ) {
      return level === null;
    } );

    // @private {Node} - The "left" half of the sliding layer, displayed first
    this.levelSelectionLayer = new Node();

    // @private {Node} - The "right" half of the sliding layer, will slide into view when the user selects a level
    this.challengeLayer = new Node();

    // @private {SlidingScreen}
    this.levelSelectionSlidingScreen = new SlidingScreen( leftLevelSelectionNode, rightLevelSelectionNode, this.visibleBoundsProperty, leftLevelSelectionProperty );
    this.challengeSlidingScreen = new SlidingScreen( this.levelSelectionLayer, this.challengeLayer, this.visibleBoundsProperty, leftChallengeProperty );

    this.addChild( this.challengeSlidingScreen );

    this.levelSelectionLayer.addChild( this.levelSelectionSlidingScreen );

    var leftButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: -Math.PI / 2,
      enabledProperty: new DerivedProperty( [ leftLevelSelectionProperty ], function( value ) { return !value; } ),
      listener: function() {
        leftLevelSelectionProperty.value = true;
      }
    } );
    var rightButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: Math.PI / 2,
      enabledProperty: leftLevelSelectionProperty,
      listener: function() {
        leftLevelSelectionProperty.value = false;
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
    }
  } );
} );
