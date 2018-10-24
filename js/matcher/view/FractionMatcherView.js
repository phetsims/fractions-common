// Copyright 2013-2017, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( require => {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelsContainerNode = require( 'FRACTIONS_COMMON/matcher/view/LevelsContainerNode' );
  var LevelSelectButtonsAndTitleNode = require( 'FRACTIONS_COMMON/matcher/view/LevelSelectButtonsAndTitleNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Sound = require( 'VIBE/Sound' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );

  // constants
  var LAYOUT_BOUNDS = new Bounds2( 0, 0, 768, 504 );

  function FractionMatcherView( model ) {
    ScreenView.call( this, { layoutBounds: LAYOUT_BOUNDS } );

    var levelsContainerNode = new LevelsContainerNode( model, this.layoutBounds );
    levelsContainerNode.visible = false;
    levelsContainerNode.x = model.width;

    var levelSelectButtonsAndTitleNode = new LevelSelectButtonsAndTitleNode( model ).mutate( {
      centerX: model.width / 2,
      y: 20
    } );
    var levelSelectionScreen = new Node( {
      children: [
        levelSelectButtonsAndTitleNode,
        new ResetAllButton( {
          listener: function() {
            model.reset();
          },
          x: model.width - 40,
          y: model.height - 40
        } ),
        new HBox( {
          children: [
            new TimerToggleButton( model.isTimerProperty ),
            new SoundToggleButton( Sound.audioEnabledProperty )
          ],
          spacing: 10,
          x: 20,
          bottom: model.height - 20
        } )
      ]
    } );

    this.addChild( levelsContainerNode );
    this.addChild( levelSelectionScreen );

    var startGameButtonsTween = new TWEEN.Tween( levelSelectionScreen ).easing( TWEEN.Easing.Cubic.InOut ).onComplete( function() {
      levelSelectionScreen.visible = (levelSelectionScreen.x === 0);
    } );

    var fromLevelNumber; //level from which we return to main screen. keep this to remove corresponding Node from the scene graph
    var levelsTween = new TWEEN.Tween( levelsContainerNode ).easing( TWEEN.Easing.Cubic.InOut ).onComplete( function() {
      levelsContainerNode.visible = (levelsContainerNode.x === 0);

      //remove LevelNode from scene graph to keep it simple and fast
      if ( fromLevelNumber && fromLevelNumber !== model.currentLevelProperty.get() ) {
        var parentNode = levelsContainerNode.levelNodes[ fromLevelNumber - 1 ].getParent();
        if ( parentNode ) {
          levelsContainerNode.levelNodes[ fromLevelNumber - 1 ].getParent().removeChild( levelsContainerNode.levelNodes[ fromLevelNumber - 1 ] );
        }
      }
    } );

    var animateToLevels = function() {
      startGameButtonsTween.stop().to( { x: -model.width }, model.ANIMATION_TIME ).start( phet.joist.elapsedTime );

      levelsContainerNode.visible = true;
      levelsTween.stop().to( { x: 0 }, model.ANIMATION_TIME ).start( phet.joist.elapsedTime );

    };

    var animateFromLevels = function() {
      levelsTween.stop().to( { x: model.width }, model.ANIMATION_TIME ).start( phet.joist.elapsedTime );

      levelSelectionScreen.visible = true;
      startGameButtonsTween.stop().to( { x: 0 }, model.ANIMATION_TIME ).start( phet.joist.elapsedTime );
    };


    model.currentLevelProperty.lazyLink( function( newLevel, oldLevel ) {
      if ( newLevel > 0 ) {
        animateToLevels();
      }
      else {
        fromLevelNumber = oldLevel;
        animateFromLevels();
      }
    } );
  }

  fractionsCommon.register( 'FractionMatcherView', FractionMatcherView );

  return inherit( ScreenView, FractionMatcherView, {}, {
    LAYOUT_BOUNDS: LAYOUT_BOUNDS
  } );
} );
