// Copyright 2018, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const LevelsContainerNode = require( 'FRACTIONS_COMMON/matcher/view/LevelsContainerNode' );
  const LevelSelectButtonsAndTitleNode = require( 'FRACTIONS_COMMON/matcher/view/LevelSelectButtonsAndTitleNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumericShape = require( 'FRACTIONS_COMMON/matcher/shapes/NumericShape' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ShapeNode = require( 'FRACTIONS_COMMON/matcher/shapes/ShapeNode' );
  const Sound = require( 'VIBE/Sound' );
  const SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );

  // constants
  // TODO: Use the defaults
  const LAYOUT_BOUNDS = new Bounds2( 0, 0, 768, 504 );

  class FractionMatcherView extends ScreenView {
    /**
     * @param {FractionMatcherModel} model
     */
    constructor( model ) {
      super( {
        layoutBounds: LAYOUT_BOUNDS
      } );

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

      // TODO: drop TWEEN
      var startGameButtonsTween = new TWEEN.Tween( levelSelectionScreen ).easing( TWEEN.Easing.Cubic.InOut ).onComplete( function() {
        levelSelectionScreen.visible = ( levelSelectionScreen.x === 0 );
      } );

      var fromLevelNumber; //level from which we return to main screen. keep this to remove corresponding Node from the scene graph
      var levelsTween = new TWEEN.Tween( levelsContainerNode ).easing( TWEEN.Easing.Cubic.InOut ).onComplete( function() {
        levelsContainerNode.visible = ( levelsContainerNode.x === 0 );

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

    /**
     * The home-screen icon for the main (non-mixed) screen.
     * @public
     *
     * @returns {Node}
     */
    static createIntroHomeIcon() {
      const rectangle = new Rectangle( 0, 0, 548, 373, { fill: '#e7e9cc' } );

      var shapeNode = ShapeNode.create( {
        x: 0,
        y: 0,
        type: 'PIES',
        numerator: 1,
        denominator: 2,
        value: 0.5,
        fill: FractionsCommonColorProfile.shapeBlueProperty,
        width: 180,
        height: 180
      } );

      var shapeNode2 = new NumericShape( {
        x: 0,
        y: 0,
        type: 'NUMERIC',
        numerator: 1,
        denominator: 2,
        scaleFactor: 1,
        value: 0.5,
        toSimplify: true,
        width: 180,
        height: 180
      } ).mutate( { scale: 2.8 } );

      rectangle.addChild( new HBox( {
        spacing: 20,
        children: [
          shapeNode,
          new Text( '=', { fill: 'black', font: new PhetFont( 160 ) } ),
          shapeNode2
        ],
        center: rectangle.center
      } ) );

      return rectangle;
    }

    /**
     * The navbar icon for the main (non-mixed) screen.
     * @public
     *
     * @returns {Node}
     */
    static createIntroNavbarIcon() {
      const rectangle = new Rectangle( 0, 0, 548, 373, { fill: 'black' } );

      const shapeNode = ShapeNode.create( {
        x: 0,
        y: 0,
        type: 'PIES',
        numerator: 1,
        denominator: 2,
        value: 0.5,
        fill: FractionsCommonColorProfile.shapeBlueProperty,
        width: 180,
        height: 180
      } );

      rectangle.addChild( shapeNode.mutate( { scale: 1.6, center: rectangle.center } ) );

      return rectangle;
    }

    /**
     * The home-screen icon for the mixed screen.
     * @public
     *
     * @returns {Node}
     */
    static createMixedHomeIcon() {
      const rectangle = new Rectangle( 0, 0, 548, 373, { fill: '#e7e9cc' } );

      var shapeNode = ShapeNode.create( {
        x: 0,
        y: 0,
        type: 'FLOWER',
        numerator: 9,
        denominator: 6,
        value: 1.5,
        fill: FractionsCommonColorProfile.shapeRedProperty,
        width: 200,
        height: 200
      } );

      var shapeNode2 = new NumericShape( {
        x: 0,
        y: 0,
        type: 'NUMERIC',
        numerator: 3,
        denominator: 2,
        scaleFactor: 1,
        value: 1.5,
        toSimplify: true,
        width: 180,
        height: 180
      } ).mutate( { scale: 2.4 } );

      rectangle.addChild( new HBox( {
        spacing: 15,
        children: [
          shapeNode,
          new Text( '=', { fill: 'black', font: new PhetFont( 160 ) } ),
          shapeNode2
        ],
        center: rectangle.center
      } ) );

      return rectangle;
    }

    /**
     * The navbar icon for the mixed screen.
     * @public
     *
     * @returns {Node}
     */
    static createMixedNavbarIcon() {
      const rectangle = new Rectangle( 0, 0, 548, 373, { fill: 'black' } );

      var shapeNode = ShapeNode.create( {
        x: 0,
        y: 0,
        type: 'FLOWER',
        numerator: 9,
        denominator: 6,
        value: 1.5,
        fill: FractionsCommonColorProfile.shapeRedProperty,
        width: 180,
        height: 180
      } );
      rectangle.addChild( shapeNode.mutate( { scale: 2.9, center: rectangle.center } ) );

      return rectangle;
    }
  }

  // @public {Bounds2}
  FractionMatcherView.LAYOUT_BOUNDS = LAYOUT_BOUNDS;

  return fractionsCommon.register( 'FractionMatcherView', FractionMatcherView );
} );
