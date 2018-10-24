// Copyright 2014-2017, University of Colorado Boulder

/**
 * MixedNumbersNavigationBarIcon - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  var Constants = require( 'FRACTIONS_COMMON/matcher/model/Constants' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShapeNode = require( 'FRACTIONS_COMMON/matcher/shapes/ShapeNode' );

  /**
   * @constructor
   */
  function MixedNumbersNavigationBarIcon() {
    Rectangle.call( this, 0, 0, 548, 373, { fill: 'black' } );

    var shapeNode = ShapeNode.create( {
      x: 0,
      y: 0,
      type: 'FLOWER',
      numerator: 9,
      denominator: 6,
      value: 1.5,
      fill: new Constants().COLORS.LIGHT_RED,
      width: 180,
      height: 180
    } );
    this.addChild( shapeNode.mutate( { scale: 2.9, center: this.center } ) );
  }

  fractionsCommon.register( 'MixedNumbersNavigationBarIcon', MixedNumbersNavigationBarIcon );

  return inherit( Rectangle, MixedNumbersNavigationBarIcon );
} );