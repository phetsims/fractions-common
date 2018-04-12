// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScoreDisplayDiscreteStars = require( 'VEGAS/ScoreDisplayDiscreteStars' );
  var ScreenView = require( 'JOIST/ScreenView' );
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
            spacing: LEVEL_SELECTION_SPACING
          } )
        ],
        center: self.layoutBounds.center
      } );
    }

    var leftLevelSelectionNode = createLevelSection( model.shapeLevels.slice( 0, 5 ), model.numberLevels.slice( 0, 5 ) );
    var rightLevelSelectionNode = createLevelSection( model.shapeLevels.slice( 6, 10 ), model.numberLevels.slice( 6, 10 ) );

    this.addChild( leftLevelSelectionNode );

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

    }
  } );
} );
