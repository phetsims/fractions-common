// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  var LEVEL_SELECTION_SPACING = 20;

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
                      console.log( 'TODO' );
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

    var showingLeftLevelsProperty = new BooleanProperty( true );

    // @private {SlidingScreen}
    this.slidingLevels = new SlidingScreen( leftLevelSelectionNode, rightLevelSelectionNode, this.visibleBoundsProperty, showingLeftLevelsProperty );

    this.addChild( this.slidingLevels );

    var leftButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: -Math.PI / 2,
      enabledProperty: new DerivedProperty( [ showingLeftLevelsProperty ], function( value ) { return !value; } ),
      listener: function() {
        showingLeftLevelsProperty.value = true;
      }
    } );
    var rightButton = new RoundArrowButton( {
      mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
      radius: 20,
      arrowRotation: Math.PI / 2,
      enabledProperty: showingLeftLevelsProperty,
      listener: function() {
        showingLeftLevelsProperty.value = false;
      }
    } );

    this.addChild( new HBox( {
      children: [
        leftButton,
        rightButton
      ],
      centerX: this.layoutBounds.centerX,
      bottom: this.layoutBounds.bottom - 10, // TODO: center with reset-all and sound button
      spacing: 20
    } ) );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  fractionsCommon.register( 'BuildingGameScreenView', BuildingGameScreenView );

  return inherit( ScreenView, BuildingGameScreenView, {
    step: function( dt ) {
      this.slidingLevels.step( dt );
    }
  } );
} );
