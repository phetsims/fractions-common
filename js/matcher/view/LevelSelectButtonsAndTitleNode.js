// Copyright 2018, University of Colorado Boulder

/**
 * View for a level select buttons in 'Fraction Matcher' sim.
 *
 * @author Vasily Shakhov (Mlearner)
 */

define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HomeScreenView = require( 'JOIST/HomeScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShapeNode = require( 'FRACTIONS_COMMON/matcher/shapes/ShapeNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var fractionsChooseYourLevelString = require( 'string!FRACTIONS_COMMON/fractionsChooseYourLevel' );
  var labelLevelString = require( 'string!VEGAS/label.level' );
  var mixedNumbersChooseYourLevelString = require( 'string!FRACTIONS_COMMON/mixedNumbersChooseYourLevel' );

  // constants
  var NUM_STARS_ON_BUTTON = 3; //number of stars on StartLevelButton
  var BUTTONS_PER_LINE = 4; //number on buttons in a single row
  var FONT = new PhetFont( { size: 14, weight: 'bold' } );

  function LevelSelectButtonsAndTitleNode( model, options ) {
    var hasMixedNumbers = model.hasMixedNumbers;

    var vBoxChildren = [];
    vBoxChildren.push( new Text( hasMixedNumbers ? mixedNumbersChooseYourLevelString : fractionsChooseYourLevelString, {
      font: new PhetFont( {
        size: 28,
        family: HomeScreenView.TITLE_FONT_FAMILY
      } ),
      maxWidth: 618
    } ) );

    var shapes = [
      {
        type: 'PIES',
        color: FractionsCommonColorProfile.shapeRedProperty
      },
      {
        type: 'HORIZONTAL_BARS',
        color: FractionsCommonColorProfile.shapeGreenProperty
      },
      {
        type: 'VERTICAL_BARS',
        color: FractionsCommonColorProfile.shapeBlueProperty
      },
      {
        type: 'LETTER_L_SHAPES',
        color: FractionsCommonColorProfile.shapeOrangeProperty,
        height: 75
      },
      {
        type: 'POLYGON',
        color: FractionsCommonColorProfile.shapeMagentaProperty
      },
      {
        type: 'FLOWER',
        color: FractionsCommonColorProfile.shapeYellowProperty,
        width: 65,
        height: 65
      },
      {
        type: 'RING_OF_HEXAGONS',
        color: FractionsCommonColorProfile.shapeLighterPinkProperty
      },
      {
        type: 'NINJA_STAR',
        color: FractionsCommonColorProfile.shapeStrongGreenProperty
      }
    ];

    //inner button view
    var createButtonContent = function( shape, index ) {
      var iconNode = ShapeNode.create( {
        x: 0,
        y: -5,
        type: shape.type,
        numerator: hasMixedNumbers ? index + 2 : index + 1,
        denominator: index + 1,
        value: index + 1,
        fill: shape.color,
        width: shape.width ? shape.width : 60,
        height: shape.height ? shape.height : 60
      } );
      var textNode = new Text( StringUtils.format( labelLevelString, index + 1 ), {
        maxWidth: iconNode.width,
        font: FONT,
        centerX: 0
      } );
      return new VBox( { children: [ textNode, iconNode ], spacing: 20 } );
    };

    var hBoxChildren = [];
    shapes.forEach( function( shape, index ) {
      hBoxChildren.push(
        new LevelSelectionButton( createButtonContent( shape, index ), model.levels[ index ].highScoreProperty, {
          scoreDisplayOptions: {
            numberOfStars: NUM_STARS_ON_BUTTON,
            perfectScore: model.MAX_POINTS_PER_GAME_LEVEL
          },
          buttonWidth: 90,
          buttonHeight: 150,
          baseColor: 'rgb(242, 242, 242)',
          listener: function() {
            //Switch to the selected level, but only if the user was on the level selection screen, see #66
            if ( model.currentLevelProperty.get() === 0 ) {
              model.currentLevelProperty.set( index + 1 );
            }
          }
        } ) );

      if ( index % BUTTONS_PER_LINE === BUTTONS_PER_LINE - 1 || index === shapes.length - 1 ) { //end of row
        vBoxChildren.push( new HBox( { resize: false, children: hBoxChildren, spacing: 45 } ) );
        hBoxChildren = [];
      }
    } );

    VBox.call( this, _.extend( { resize: false, children: vBoxChildren, spacing: 30 }, options ) );
  }

  fractionsCommon.register( 'LevelSelectButtonsAndTitleNode', LevelSelectButtonsAndTitleNode );

  return inherit( VBox, LevelSelectButtonsAndTitleNode );
} );