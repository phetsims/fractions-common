// Copyright 2014-2017, University of Colorado Boulder

/**
 * MixedNumbersHomeScreenIcon - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  var Constants = require( 'FRACTIONS_COMMON/matcher/model/Constants' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumericShape = require( 'FRACTIONS_COMMON/matcher/shapes/NumericShape' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShapeNode = require( 'FRACTIONS_COMMON/matcher/shapes/ShapeNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @constructor
   */
  function MixedNumbersHomeScreenIcon() {
    Rectangle.call( this, 0, 0, 548, 373, { fill: '#e7e9cc' } );

    var shapeNode = ShapeNode.create( {
      x: 0,
      y: 0,
      type: 'FLOWER',
      numerator: 9,
      denominator: 6,
      value: 1.5,
      fill: new Constants().COLORS.LIGHT_RED,
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

    this.addChild( new HBox( {
      spacing: 15,
      children: [
        shapeNode,
        new Text( '=', { fill: 'black', font: new PhetFont( 160 ) } ),
        shapeNode2
      ],
      center: this.center
    } ) );
  }

  fractionsCommon.register( 'MixedNumbersHomeScreenIcon', MixedNumbersHomeScreenIcon );

  return inherit( Rectangle, MixedNumbersHomeScreenIcon );
} );