// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the number-line representation
 *
 * TODO: clean up docs
 * The number line with adjustable ticks
 * In a horizontal orientation, the number line goes from left to right, whereas it is
 * go from bottom to up in vertical orientation.
 *
 * @author Vincent Davis (Berea College)
 * @author Dusty Cole (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const SceneNode = require( 'FRACTIONS_COMMON/intro/view/SceneNode' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // TODO: Get rid of SimpleDragHandler usage

  // constants
  const HIGHLIGHTER_PADDING_HEIGHT = 5;
  const MARKER_CIRCLE_RADIUS = 12;
  const ARROW_LENGTH = 30;
  const ARROW_VERTICAL_OFFSET = 10;
  const NUMBER_LINE_WIDTH = 975;
  const MAJOR_TICK_LENGTH = 80;
  const MINOR_TICK_LENGTH = 40;

  class NumberLineSceneNode extends SceneNode {
    /**
     * @param {ContainerSetModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      // TODO: cleanup

      // TODO: Move the main "number line" code out to its own display type

      // plan to use the vertical option in the equality tab TODO: clean this up
      options = _.extend( {
        rotation: 0,  // horizontal -> 0, vertical -> -Math.PI/2

        // this gives the user option to add an arrow to the numberLine if set to true or use number line
        displayArrow: false,

        // is the marker circle draggable
        isDraggable: true
      }, options );

      const numeratorProperty = model.numeratorProperty;
      const denominatorProperty = model.denominatorProperty;
      const containerCountProperty = model.containerCountProperty;

      // ratio of the tick on the upper and lower side of the number line in order to increase  number of tick on the
      // bottom of the number line to use in the equality tab.
      const multiplicationFactorProperty = new NumberProperty( 1 );

      // main Number line
      // the point (0,0) is set as the origin of the number line
      var mainNumberLine = new Line( 0, 0, NUMBER_LINE_WIDTH, 0, {
        stroke: 'black',
        lineWidth: 3,
        strokePickable: true,
        cursor: 'pointer'
      } );

      // for even major ticks, the lineWidth is slightly thicker than for odd Major Ticks
      var evenMajorTicksPath = new Path( null, { stroke: 'black', lineWidth: 5 } );

      // odd Major Ticks
      var oddMajorTicksPath = new Path( null, { stroke: 'black', lineWidth: 3 } );

      // Minor Ticks
      var minorTicksPath = new Path( null, { stroke: 'black' } );

      // node for number text label under major ticks
      var numbersNode = new Node();

      // distance between 0 and 1 on the number Line
      var segmentLength = NUMBER_LINE_WIDTH / containerCountProperty.range.max;

      // Updates the minor and major ticks as well as the main number line
      var updateTicksMultilink = Property.multilink( [ containerCountProperty, denominatorProperty ], function( max, denominator ) {

        // sets the length of the main number line
        mainNumberLine.x2 = segmentLength * max;

        // expand the mouse and touch area of number line to make it easier to pick
        mainNumberLine.mouseArea = mainNumberLine.bounds.dilated( 15 );
        mainNumberLine.touchArea = mainNumberLine.bounds.dilated( 15 );

        // create major ticks shape
        var evenMajorTicksShape = new Shape();
        var oddMajorTicksShape = new Shape();

        // Remove number nodes, number node will be added later on
        numbersNode.removeAllChildren();

        for ( var i = 0; i <= max; i++ ) {

          // major tick line width varies for even and odd number of units
          var shape = i % 2 === 0 ? evenMajorTicksShape : oddMajorTicksShape;
          shape.moveTo( i * segmentLength, -MAJOR_TICK_LENGTH / 2 )
            .verticalLineTo( MAJOR_TICK_LENGTH / 2 );

          numbersNode.addChild( new Text( i, {
            font: new PhetFont( 40 ),
            centerX: i * segmentLength,
            top: MAJOR_TICK_LENGTH / 2,
            rotation: -options.rotation // rotate the opposite way than this node so that the text is right side up.
          } ) );
        }
        evenMajorTicksPath.setShape( evenMajorTicksShape );
        oddMajorTicksPath.setShape( oddMajorTicksShape );

        // lays out the minor ticks
        var minorTicksShape = new Shape();
        var multiplicationFactor = multiplicationFactorProperty.value;

        // the smallest distance between two adjacent ticks
        var minorTickSeparation = segmentLength / (denominator * multiplicationFactor);
        var numberOfTicks = max * denominator * multiplicationFactor;
        for ( var j = 0; j <= numberOfTicks; j++ ) {

          // skips major tick lines
          if ( j % (denominator * multiplicationFactor) !== 0 ) {

            // if true make a symmetric tick if false make half of a tick in the direction of choosing
            // determine if the tick need to be on one side or both side
            var isSymmetric = ( j % multiplicationFactor === 0 );
            minorTicksShape.moveTo( j * minorTickSeparation, isSymmetric ? -MINOR_TICK_LENGTH / 2 : 0 )
              .verticalLineTo( MINOR_TICK_LENGTH / 2 );
          }
        }
        minorTicksPath.setShape( minorTicksShape );
      } );

      // initializes a unique markerCircle if displayArrow = false
      var markerCircle = new Circle( MARKER_CIRCLE_RADIUS, {
        fill: 'green',
        lineWidth: 3,
        stroke: 'black',
        pickable: true,
        cursor: 'pointer'
      } );

      if ( options.displayArrow ) {
        markerCircle.setOpacity( 0.7 );
        markerCircle.fill = '#ff5eaf';
      }

      // marker Arrow indicating the fraction and marker circle
      var markerArrow = new ArrowNode( 0, -ARROW_LENGTH, 0, 0, {
        fill: '#ff5eaf',
        opacity: 0.7,
        visible: options.displayArrow
      } );

      // highlighter region for the marker
      var highlighterRectangle = new Rectangle( {
        rectWidth: MARKER_CIRCLE_RADIUS * 2,
        rectHeight: MAJOR_TICK_LENGTH + HIGHLIGHTER_PADDING_HEIGHT,
        fill: 'yellow',
        center: Vector2.ZERO
      } );

      // update position of the circle marker and the highlighter region based on the values of the numerator
      // denominator
      var updateMarkerMultilink = Property.multilink( [ numeratorProperty, denominatorProperty ], function( numerator, denominator ) {
        markerCircle.centerX = segmentLength * numerator / denominator;

        var tickLength = ( numerator / denominator % 1 === 0 ) ?
                         MAJOR_TICK_LENGTH : MINOR_TICK_LENGTH;

        // Enables or Disables the ArrowNode
        if ( options.displayArrow ) {

          // Centers the marker arrow with respect to the number line
          markerArrow.centerX = markerCircle.centerX;

          // markerArrow moves vertically depending on the position of the tick marks
          markerArrow.bottom = -tickLength / 2 - ARROW_VERTICAL_OFFSET;
        }

        // highlighted region scales differently depending on the position of the tick marks
        highlighterRectangle.setRectHeight( tickLength + HIGHLIGHTER_PADDING_HEIGHT );

        highlighterRectangle.center = markerCircle.center;
      } );

      if ( options.isDraggable ) {

        var handleEvent = function( node, event ) {
          var x = node.globalToParentPoint( event.pointer.point ).x;
          var tickMarkSeparation = segmentLength / denominatorProperty.value;

          // update the value of the numerator ensuring that it is always an integer
          // recall the x=0, y=0 is conveniently set at the zero of the number line
          // no need to update the position of any view elements since the numeratorProperty has callbacks to them
          numeratorProperty.value = Util.clamp( Util.roundSymmetric( x / tickMarkSeparation ),
            0, denominatorProperty.value * containerCountProperty.value );
        };

        // add a drag handler to the main number line
        mainNumberLine.addInputListener( new SimpleDragHandler( {
          allowTouchSnag: true,
          start: function( event ) {
            handleEvent( mainNumberLine, event );
          }
        } ) );

        // add a drag handler to the circle on the number line
        markerCircle.addInputListener( new SimpleDragHandler( {
          allowTouchSnag: true,
          drag: function( event ) {
            handleEvent( markerCircle, event );
          }
        } ) );

        markerCircle.mouseArea = markerCircle.localBounds.dilated( 15 );
        markerCircle.touchArea = markerCircle.localBounds.dilated( 15 );
      }

      // Specify the children to be rendered with this node
      options.children = [
        highlighterRectangle,
        mainNumberLine,
        evenMajorTicksPath,
        oddMajorTicksPath,
        minorTicksPath,
        numbersNode,
        markerArrow,
        markerCircle ];

      super( options );

      // @private called by dispose TODO: yikes, clean up
      this.disposeNumberLineSceneNode = function() {
        Property.unmultilink( updateTicksMultilink );
        Property.unmultilink( updateMarkerMultilink );
      };
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.disposeNumberLineSceneNode();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'NumberLineSceneNode', NumberLineSceneNode );
} );