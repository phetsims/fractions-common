// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var ShapeStackNode = require( 'FRACTIONS_COMMON/building/view/ShapeStackNode' );

  // constants
  var PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {BuildingLabModel} model
   */
  function BuildingLabScreenView( model ) {
    ScreenView.call( this );

    // TODO: Move to the model
    var circleStacks = _.range( 1, 9 ).map( function( denominator ) {
      var circleStack = new ShapeStack( new Fraction( 1, denominator ), Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty );
      circleStack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty ) );
      circleStack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), Representation.CIRCLE, FractionsCommonColorProfile.labCircleFillProperty ) );
      return circleStack;
    } );
    var barStacks = _.range( 1, 9 ).map( function( denominator ) {
      var barStack = new ShapeStack( new Fraction( 1, denominator ), Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty );
      barStack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty ) );
      barStack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), Representation.VERTICAL_BAR, FractionsCommonColorProfile.labBarFillProperty ) );
      return barStack;
    } );

    var circleStackNodes = circleStacks.map( function( circleStack ) {
      return new ShapeStackNode( circleStack );
    } );

    var barStackNodes = barStacks.map( function( barStack ) {
      return new ShapeStackNode( barStack );
    } );

    var shapeBox = new HBox( {
      children: window ? circleStackNodes : barStackNodes,
      spacing: 10
    } );
    // TODO: background color customizable
    var shapePanel = new Panel( shapeBox );
    shapePanel.leftTop = this.layoutBounds.leftTop.plusXY( PANEL_MARGIN, PANEL_MARGIN );
    this.addChild( shapePanel );

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

  fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );

  return inherit( ScreenView, BuildingLabScreenView, {
    step: function( dt ) {

    }
  } );
} );
