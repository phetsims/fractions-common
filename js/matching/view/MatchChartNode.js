// Copyright 2018-2019, University of Colorado Boulder

/**
 * Comparison chart for the 'Fraction Matcher'.
 * Contains signs shapes (more, equal, less), scale, indicators.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  // modules
  const Animation = require( 'TWIXT/Animation' );
  const Easing = require( 'TWIXT/Easing' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const symbolFill = '#FFFF00';
  const symbolWidth = 2;
  const symbolStroke = 'black';
  const lineHeight = 140;
  const lineWeight = 70;
  const lineBaseWidth = 2;
  const lineOtherWidth = 1;
  const stroke = '#000';

  class MatchChartNode extends Node {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      super();

      // create less shape
      const lessShape = new Shape().moveTo( -lineWeight / 8, 0 )
        .lineTo( lineWeight / 4, -lineWeight / 8 )
        .lineTo( lineWeight / 4, -lineWeight / 4 )
        .lineTo( -lineWeight / 4, -lineWeight / 16 )
        .lineTo( -lineWeight / 4, lineWeight / 16 )
        .lineTo( lineWeight / 4, lineWeight / 4 )
        .lineTo( lineWeight / 4, lineWeight / 8 ).close();


      // create equal shape
      const eqShape = new Shape().moveTo( -3 * lineWeight / 8, -3 * lineWeight / 16 )
        .lineTo( 3 * lineWeight / 8, -3 * lineWeight / 16 )
        .lineTo( 3 * lineWeight / 8, -lineWeight / 16 )
        .lineTo( -3 * lineWeight / 8, -lineWeight / 16 )
        .lineTo( -3 * lineWeight / 8, -3 * lineWeight / 16 )
        .moveTo( -3 * lineWeight / 8, 3 * lineWeight / 16 )
        .lineTo( 3 * lineWeight / 8, 3 * lineWeight / 16 )
        .lineTo( 3 * lineWeight / 8, lineWeight / 16 )
        .lineTo( -3 * lineWeight / 8, lineWeight / 16 )
        .lineTo( -3 * lineWeight / 8, 3 * lineWeight / 16 );

      // @private {Path}
      this.less = new Path( lessShape, {
        visible: false,
        y: lineWeight / 4 + 10,
        stroke: symbolStroke,
        lineWidth: symbolWidth,
        fill: symbolFill
      } );
      this.eq = new Path( eqShape, {
        visible: false,
        y: lineWeight / 4 + 10,
        stroke: symbolStroke,
        lineWidth: symbolWidth,
        fill: symbolFill
      } );
      this.more = new Node( { visible: false } );

      // create more shape
      this.more.addChild( new Path( lessShape, {
        y: lineWeight / 4 + 10,
        stroke: symbolStroke,
        lineWidth: symbolWidth,
        fill: symbolFill
      } ) );
      this.more.scale( -1, 1 );

      // TODO: cleanup!


      //center vertical line
      this.addChild( new Path( Shape.lineSegment( 0, 0, 0, -lineHeight - 20 ), {
        stroke: stroke,
        lineWidth: lineBaseWidth
      } ) );

      //three horizontal lines  at 0,1,2
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 2, 0, lineWeight / 2, 0 ), {
        stroke: stroke,
        lineWidth: lineBaseWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 2, -lineHeight / 2, lineWeight / 2, -lineHeight / 2 ), {
        stroke: stroke,
        lineWidth: lineBaseWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 2, -lineHeight, lineWeight / 2, -lineHeight ), {
        stroke: stroke,
        lineWidth: lineBaseWidth
      } ) );

      //three bottom ticks, between 0 and 1
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 4, -lineHeight / 8, lineWeight / 4, -lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -3 * lineWeight / 8, -2 * lineHeight / 8, 3 * lineWeight / 8, -2 * lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 4, -3 * lineHeight / 8, lineWeight / 4, -3 * lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );

      //three top ticks, between 1 and 2
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 4, -5 * lineHeight / 8, lineWeight / 4, -5 * lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -3 * lineWeight / 8, -6 * lineHeight / 8, 3 * lineWeight / 8, -6 * lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );
      this.addChild( new Path( Shape.lineSegment( -lineWeight / 4, -7 * lineHeight / 8, lineWeight / 4, -7 * lineHeight / 8 ), {
        stroke: stroke,
        lineWidth: lineOtherWidth
      } ) );

      //labels 0,1,2
      this.addChild( new Text( '0', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: -lineWeight / 2 - 10,
        centerY: 0
      } ) );
      this.addChild( new Text( '0', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: lineWeight / 2 + 10,
        centerY: 0
      } ) );

      this.addChild( new Text( '1', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: -lineWeight / 2 - 10,
        centerY: -lineHeight / 2
      } ) );
      this.addChild( new Text( '1', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: lineWeight / 2 + 10,
        centerY: -lineHeight / 2
      } ) );

      this.addChild( new Text( '2', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: -lineWeight / 2 - 10,
        centerY: -lineHeight
      } ) );
      this.addChild( new Text( '2', {
        font: new PhetFont( { size: 18, weight: 'normal' } ),
        centerX: lineWeight / 2 + 10,
        centerY: -lineHeight
      } ) );

      // @private {Rectangle} compare rectangles
      var widthRect = lineWeight / 4 * 0.6;
      this.rectLeft = new Rectangle( -lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {
        stroke: stroke,
        lineWidth: lineOtherWidth,
        fill: '#F00'
      } );
      this.rectRight = new Rectangle( lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {
        stroke: stroke,
        lineWidth: lineOtherWidth,
        fill: '#0F0'
      } );

      this.addChild( this.rectLeft );
      this.addChild( this.rectRight );
      this.addChild( this.less );
      this.addChild( this.eq );
      this.addChild( this.more );

      // @private {Animation|null}
      this.animation = null;

      this.reset();

      this.mutate( options );
    }

    /**
     * Starts a comparison between two values (with the given fills).
     * @public
     *
     * @param {number} leftValue
     * @param {number} rightValue
     * @param {ColorDef} leftFill
     * @param {ColorDef} rightFill
     */
    compare( leftValue, rightValue, leftFill, rightFill ) {
      this.rectLeft.fill = leftFill;
      this.rectRight.fill = rightFill;

      // Sanity check so we don't have multiple animations running at once.
      this.animation && this.animation.stop();

      this.animation = new Animation( {
        duration: 0.5,
        targets: [
          {
            object: this.rectLeft,
            attribute: 'rectHeight',
            from: 0,
            to: leftValue * lineWeight,
            easing: Easing.CUBIC_IN_OUT
          },
          {
            object: this.rectRight,
            attribute: 'rectHeight',
            from: 0,
            to: rightValue * lineWeight,
            easing: Easing.CUBIC_IN_OUT
          },
          {
            object: this.rectLeft,
            attribute: 'y',
            from: 0,
            to: -leftValue * lineWeight,
            easing: Easing.CUBIC_IN_OUT
          },
          {
            object: this.rectRight,
            attribute: 'y',
            from: 0,
            to: -rightValue * lineWeight,
            easing: Easing.CUBIC_IN_OUT
          }
        ]
      } );
      this.animation.start();

      this.less.visible = leftValue < rightValue;
      this.eq.visible = leftValue === rightValue;
      this.more.visible = leftValue > rightValue;
      this.visible = true;
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.animation && this.animation.step( dt );
    }

    /**
     * Resets the state
     * @public
     */
    reset() {
      this.rectLeft.y = 0;
      this.rectRight.y = 0;
      this.rectLeft.rectHeight = 0;
      this.rectRight.rectHeight = 0;

      this.less.visible = false;
      this.eq.visible = false;
      this.more.visible = false;
      this.visible = false;
    }
  }

  return fractionsCommon.register( 'MatchChartNode', MatchChartNode );
} );
