// Copyright 2013-2017, University of Colorado Boulder

/**
 * Comparison chart for the 'Fraction Matcher'.
 * Contains signs shapes (more, equal, less), scale, indicators.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  function ComparisonChartNode( gameModel, options ) {
    var self = this;
    var lessShape = new Shape();
    var eqShape = new Shape();

    options = _.extend( {
        symbolFill: '#FFFF00',
        symbolWidth: 2,
        stroke: '#000',
        lineBaseWidth: 2,
        lineOtherWidth: 1,
        lineWeight: 70,
        lineHeight: 140
      },
      options );
    Node.call( self );


    // create less shape
    lessShape.moveTo( -options.lineWeight / 8, 0 )
      .lineTo( options.lineWeight / 4, -options.lineWeight / 8 )
      .lineTo( options.lineWeight / 4, -options.lineWeight / 4 )
      .lineTo( -options.lineWeight / 4, -options.lineWeight / 16 )
      .lineTo( -options.lineWeight / 4, options.lineWeight / 16 )
      .lineTo( options.lineWeight / 4, options.lineWeight / 4 )
      .lineTo( options.lineWeight / 4, options.lineWeight / 8 ).close();


    // create equal shape
    eqShape.moveTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, -options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, -options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .moveTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, 3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 );


    var less = new Path( lessShape, {
      visible: false,
      y: options.lineWeight / 4 + 10,
      stroke: options.stroke,
      lineWidth: options.symbolWidth,
      fill: options.symbolFill
    } );
    var eq = new Path( eqShape, {
      visible: false,
      y: options.lineWeight / 4 + 10,
      stroke: options.stroke,
      lineWidth: options.symbolWidth,
      fill: options.symbolFill
    } );
    var more = new Node( { visible: false } );

    // create more shape
    more.addChild( new Path( lessShape, {
      y: options.lineWeight / 4 + 10,
      stroke: options.stroke,
      lineWidth: options.symbolWidth,
      fill: options.symbolFill
    } ) );
    more.scale( -1, 1 );


    //center vertical line
    self.addChild( new Path( Shape.lineSegment( 0, 0, 0, -options.lineHeight - 20 ), {
      stroke: options.stroke,
      lineWidth: options.lineBaseWidth
    } ) );

    //three horizontal lines  at 0,1,2
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, 0, options.lineWeight / 2, 0 ), {
      stroke: options.stroke,
      lineWidth: options.lineBaseWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, -options.lineHeight / 2, options.lineWeight / 2, -options.lineHeight / 2 ), {
      stroke: options.stroke,
      lineWidth: options.lineBaseWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, -options.lineHeight, options.lineWeight / 2, -options.lineHeight ), {
      stroke: options.stroke,
      lineWidth: options.lineBaseWidth
    } ) );

    //three bottom ticks, between 0 and 1
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -options.lineHeight / 8, options.lineWeight / 4, -options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -3 * options.lineWeight / 8, -2 * options.lineHeight / 8, 3 * options.lineWeight / 8, -2 * options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -3 * options.lineHeight / 8, options.lineWeight / 4, -3 * options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );

    //three top ticks, between 1 and 2
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -5 * options.lineHeight / 8, options.lineWeight / 4, -5 * options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -3 * options.lineWeight / 8, -6 * options.lineHeight / 8, 3 * options.lineWeight / 8, -6 * options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );
    self.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -7 * options.lineHeight / 8, options.lineWeight / 4, -7 * options.lineHeight / 8 ), {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth
    } ) );

    //labels 0,1,2
    self.addChild( new Text( '0', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: -options.lineWeight / 2 - 10,
      centerY: 0
    } ) );
    self.addChild( new Text( '0', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: options.lineWeight / 2 + 10,
      centerY: 0
    } ) );

    self.addChild( new Text( '1', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: -options.lineWeight / 2 - 10,
      centerY: -options.lineHeight / 2
    } ) );
    self.addChild( new Text( '1', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: options.lineWeight / 2 + 10,
      centerY: -options.lineHeight / 2
    } ) );

    self.addChild( new Text( '2', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: -options.lineWeight / 2 - 10,
      centerY: -options.lineHeight
    } ) );
    self.addChild( new Text( '2', {
      font: new PhetFont( { size: 18, weight: 'normal' } ),
      centerX: options.lineWeight / 2 + 10,
      centerY: -options.lineHeight
    } ) );


    //compare rectangles
    var widthRect = options.lineWeight / 4 * 0.6;
    var rectLeft = new Rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth,
      fill: '#F00'
    } );
    var rectRight = new Rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {
      stroke: options.stroke,
      lineWidth: options.lineOtherWidth,
      fill: '#0F0'
    } );


    self.addChild( rectLeft );
    self.addChild( rectRight );
    self.addChild( less );
    self.addChild( eq );
    self.addChild( more );

    // function for comparing shapes on scales
    var rectLeftTween = new TWEEN.Tween( rectLeft ).easing( TWEEN.Easing.Cubic.InOut );
    var rectRightTween = new TWEEN.Tween( rectRight ).easing( TWEEN.Easing.Cubic.InOut );
    this.compare = function( left, right ) {
      // set indicator's height
      rectLeft.fill = left.fill;
      rectRight.fill = right.fill;
      var targetLeftY = left.getValue() * 70;
      var targetRightY = right.getValue() * 70;

      rectLeftTween.to( { y: -targetLeftY }, gameModel.ANIMATION_TIME ).onUpdate( function( step ) {
        rectLeft.setRectHeight( targetLeftY * step );
      } ).start( phet.joist.elapsedTime );
      rectRightTween.to( { y: -targetRightY }, gameModel.ANIMATION_TIME ).onUpdate( function( step ) {
        rectRight.setRectHeight( targetRightY * step );
      } ).start( phet.joist.elapsedTime );

      less.setVisible( left.getValue() < right.getValue() );
      eq.setVisible( left.getValue() === right.getValue() );
      more.setVisible( left.getValue() > right.getValue() );
    };

    // reset all nodes
    this.reset = function() {
      rectLeft.y = 0;
      rectRight.y = 0;
      rectRight.setRectHeight( 0 );
      rectLeft.setRectHeight( 0 );

      less.setVisible( false );
      eq.setVisible( false );
      more.setVisible( false );

      this.setVisible( true );
    };
    // hide all nodes
    this.hide = function() {
      this.setVisible( false );
    };
    this.mutate( options );
  }

  fractionsCommon.register( 'ComparisonChartNode', ComparisonChartNode );

  return inherit( Node, ComparisonChartNode );
} );
