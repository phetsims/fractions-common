// Copyright 2018, University of Colorado Boulder

/**
 * Displays a slice of cake.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const EllipticalArc = require( 'KITE/segments/EllipticalArc' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Line = require( 'KITE/segments/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Ray2 = require( 'DOT/Ray2' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  // images
  const cake_1_1Image = require( 'image!FRACTIONS_COMMON/cake_1_1.png' );
  const cake_2_1Image = require( 'image!FRACTIONS_COMMON/cake_2_1.png' );
  const cake_2_2Image = require( 'image!FRACTIONS_COMMON/cake_2_2.png' );
  const cake_3_1Image = require( 'image!FRACTIONS_COMMON/cake_3_1.png' );
  const cake_3_2Image = require( 'image!FRACTIONS_COMMON/cake_3_2.png' );
  const cake_3_3Image = require( 'image!FRACTIONS_COMMON/cake_3_3.png' );
  const cake_4_1Image = require( 'image!FRACTIONS_COMMON/cake_4_1.png' );
  const cake_4_2Image = require( 'image!FRACTIONS_COMMON/cake_4_2.png' );
  const cake_4_3Image = require( 'image!FRACTIONS_COMMON/cake_4_3.png' );
  const cake_4_4Image = require( 'image!FRACTIONS_COMMON/cake_4_4.png' );
  const cake_5_1Image = require( 'image!FRACTIONS_COMMON/cake_5_1.png' );
  const cake_5_2Image = require( 'image!FRACTIONS_COMMON/cake_5_2.png' );
  const cake_5_3Image = require( 'image!FRACTIONS_COMMON/cake_5_3.png' );
  const cake_5_4Image = require( 'image!FRACTIONS_COMMON/cake_5_4.png' );
  const cake_5_5Image = require( 'image!FRACTIONS_COMMON/cake_5_5.png' );
  const cake_6_1Image = require( 'image!FRACTIONS_COMMON/cake_6_1.png' );
  const cake_6_2Image = require( 'image!FRACTIONS_COMMON/cake_6_2.png' );
  const cake_6_3Image = require( 'image!FRACTIONS_COMMON/cake_6_3.png' );
  const cake_6_4Image = require( 'image!FRACTIONS_COMMON/cake_6_4.png' );
  const cake_6_5Image = require( 'image!FRACTIONS_COMMON/cake_6_5.png' );
  const cake_6_6Image = require( 'image!FRACTIONS_COMMON/cake_6_6.png' );
  const cake_7_1Image = require( 'image!FRACTIONS_COMMON/cake_7_1.png' );
  const cake_7_2Image = require( 'image!FRACTIONS_COMMON/cake_7_2.png' );
  const cake_7_3Image = require( 'image!FRACTIONS_COMMON/cake_7_3.png' );
  const cake_7_4Image = require( 'image!FRACTIONS_COMMON/cake_7_4.png' );
  const cake_7_5Image = require( 'image!FRACTIONS_COMMON/cake_7_5.png' );
  const cake_7_6Image = require( 'image!FRACTIONS_COMMON/cake_7_6.png' );
  const cake_7_7Image = require( 'image!FRACTIONS_COMMON/cake_7_7.png' );
  const cake_8_1Image = require( 'image!FRACTIONS_COMMON/cake_8_1.png' );
  const cake_8_2Image = require( 'image!FRACTIONS_COMMON/cake_8_2.png' );
  const cake_8_3Image = require( 'image!FRACTIONS_COMMON/cake_8_3.png' );
  const cake_8_4Image = require( 'image!FRACTIONS_COMMON/cake_8_4.png' );
  const cake_8_5Image = require( 'image!FRACTIONS_COMMON/cake_8_5.png' );
  const cake_8_6Image = require( 'image!FRACTIONS_COMMON/cake_8_6.png' );
  const cake_8_7Image = require( 'image!FRACTIONS_COMMON/cake_8_7.png' );
  const cake_8_8Image = require( 'image!FRACTIONS_COMMON/cake_8_8.png' );

  // constants
  const cakeImageArray = [
    [ cake_1_1Image ],
    [ cake_2_2Image, cake_2_1Image ],
    [ cake_3_1Image, cake_3_2Image, cake_3_3Image ],
    [ cake_4_1Image, cake_4_2Image, cake_4_3Image, cake_4_4Image ],
    [ cake_5_1Image, cake_5_2Image, cake_5_3Image, cake_5_4Image, cake_5_5Image ],
    [ cake_6_1Image, cake_6_2Image, cake_6_3Image, cake_6_4Image, cake_6_5Image, cake_6_6Image ],
    [ cake_7_1Image, cake_7_2Image, cake_7_3Image, cake_7_4Image, cake_7_5Image, cake_7_6Image, cake_7_7Image ],
    [ cake_8_1Image, cake_8_2Image, cake_8_3Image, cake_8_4Image, cake_8_5Image, cake_8_6Image, cake_8_7Image, cake_8_8Image ]
  ];
  const CAKE_IMAGE_SIZE = new Dimension2( 219, 166 );
  const CAKE_IMAGE_BOUNDS = new Bounds2(  25, 10, 194, 154 );
  const CAKE_DEFAULT_SCALE = 130 / CAKE_IMAGE_SIZE.height;
  const SCALED_CAKE_IMAGE_SIZE = new Dimension2(
    CAKE_DEFAULT_SCALE * CAKE_IMAGE_SIZE.width,
    CAKE_DEFAULT_SCALE * CAKE_IMAGE_SIZE.height
  );
  // The determined center of the cake images (determined empirically)
  const CAKE_OFFSET = new Vector2( 0.5 * SCALED_CAKE_IMAGE_SIZE.width, 0.55 * SCALED_CAKE_IMAGE_SIZE.height );

  const BASE_ELLIPSE_CENTER = new Vector2( CAKE_IMAGE_SIZE.width * 0.501, CAKE_IMAGE_SIZE.height * 0.641 );
  const BASE_ELLIPSE_RADII = new Vector2( CAKE_IMAGE_SIZE.width * 0.364, CAKE_IMAGE_SIZE.height * 0.276 );
  const BASE_ELLIPSE_OFFSET_CENTER = BASE_ELLIPSE_CENTER.plusXY( 0, -0.07 * CAKE_IMAGE_SIZE.height );
  const BASE_ASPECT = 0.565;

  const MID_ELLIPSE_CENTER = new Vector2( CAKE_IMAGE_SIZE.width * 0.501, CAKE_IMAGE_SIZE.height * 0.42 );
  const MID_ELLIPSE_RADII = new Vector2( CAKE_IMAGE_SIZE.width * 0.38, CAKE_IMAGE_SIZE.height * 0.25 );
  const MID_ELLIPSE_OFFSET_CENTER = MID_ELLIPSE_CENTER.plusXY( 0, -0.06 * CAKE_IMAGE_SIZE.height );
  const MID_ASPECT = 0.46;

  const TOP_ELLIPSE_CENTER = new Vector2( CAKE_IMAGE_SIZE.width * 0.501, CAKE_IMAGE_SIZE.height * 0.365 );
  const TOP_ELLIPSE_RADII = new Vector2( CAKE_IMAGE_SIZE.width * 0.355, CAKE_IMAGE_SIZE.height * 0.215 );
  const TOP_ELLIPSE_OFFSET_CENTER = TOP_ELLIPSE_CENTER.plusXY( 0, -0.04 * CAKE_IMAGE_SIZE.height );
  const TOP_ASPECT = 0.42;

  const BASE_ELLIPSE = new EllipticalArc(
    BASE_ELLIPSE_CENTER,
    BASE_ELLIPSE_RADII.x,
    BASE_ELLIPSE_RADII.y,
    0, 0, 2 * Math.PI, false );

  const MID_ELLIPSE = new EllipticalArc(
    MID_ELLIPSE_CENTER,
    MID_ELLIPSE_RADII.x,
    MID_ELLIPSE_RADII.y,
    0, 0, 2 * Math.PI, false );

  const TOP_ELLIPSE = new EllipticalArc(
    TOP_ELLIPSE_CENTER,
    TOP_ELLIPSE_RADII.x,
    TOP_ELLIPSE_RADII.y,
    0, 0, 2 * Math.PI, false );

  class CakeNode extends Node {
    /**
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     */
    constructor( denominator, index, options ) {
      assert && assert( index < denominator );

      super();

      // @private {Image}
      this.imageNode = new Image( cakeImageArray[ denominator - 1 ][ index ], {
        scale: CAKE_DEFAULT_SCALE,
        localBounds: CAKE_IMAGE_BOUNDS
      } );
      this.addChild( this.imageNode );

      // @private {number}
      this.denominator = denominator;

      this.setCakeIndex( index );
      this.mutate( options );
    }

    // TODO: doc
    getOffset() {
      return this.imageNode.translation.negated().minus( CAKE_OFFSET );
    }

    /**
     * Sets the slice cake image based on the index.
     * @public
     *
     * @param {number} index
     */
    setCakeIndex( index ) {
      this.imageNode.setImage( cakeImageArray[ this.denominator - 1 ][ index ] );

      // Center of the cake plate, empirically determined
      const imageCenter = CAKE_OFFSET;

      if ( this.denominator === 1 ) {
        this.imageNode.translation = imageCenter.negated();
      }
      else if ( this.denominator === 2 ) {
        this.imageNode.translation = imageCenter.plus(
          Vector2.createPolar( this.height / 4, -2 * Math.PI * ( 1 - index ) / this.denominator ) ).negated();
      }
      else {
        this.imageNode.translation = imageCenter.plus( Vector2.createPolar(
          this.height / 4,
          -2 * Math.PI * ( index + 1 / 2 ) / this.denominator
        ) ).negated();
      }

      const cakeShape = CakeNode.CAKE_SHAPES[ this.denominator - 1 ][ index ];
      this.imageNode.mouseArea = cakeShape;
      this.imageNode.touchArea = cakeShape;
    }

    // TODO: deduplicate and doc

    static getStartAngle( denominator, index ) {
      return 2 * Math.PI * index / denominator + ( denominator === 2 ? 0.5 * Math.PI : 0 );
    }

    static getEndAngle( denominator, index ) {
      return 2 * Math.PI * ( index + 1 ) / denominator + ( denominator === 2 ? 0.5 * Math.PI : 0 );
    }

    static ellipseIntersect( angle, ellipse, offsetCenter, aspect ) {
      const direction = Vector2.createPolar( 1, angle ).componentTimes( new Vector2( 1, aspect ) ).normalized();
      const intersections = ellipse.intersection( new Ray2( offsetCenter, direction ) );
      return intersections[ 0 ];
    }

    static getBaseIntersection( angle ) {
      return CakeNode.ellipseIntersect( angle, BASE_ELLIPSE, BASE_ELLIPSE_OFFSET_CENTER, BASE_ASPECT );
    }

    static getMidIntersection( angle ) {
      return CakeNode.ellipseIntersect( angle, MID_ELLIPSE, MID_ELLIPSE_OFFSET_CENTER, MID_ASPECT );
    }

    static getTopIntersection( angle ) {
      return CakeNode.ellipseIntersect( angle, TOP_ELLIPSE, TOP_ELLIPSE_OFFSET_CENTER, TOP_ASPECT );
    }
  }

  fractionsCommon.register( 'CakeNode', CakeNode );

  // TODO: can we use these below references directly?

  // @public {Dimension2}
  CakeNode.CAKE_IMAGE_SIZE = CAKE_IMAGE_SIZE;
  CakeNode.SCALED_CAKE_IMAGE_SIZE = SCALED_CAKE_IMAGE_SIZE;

  // @public {number}
  CakeNode.CAKE_DEFAULT_SCALE = CAKE_DEFAULT_SCALE;

  // @public {Vector2}
  CakeNode.CAKE_OFFSET = CAKE_OFFSET;

  // @public {Bounds2}
  CakeNode.CAKE_IMAGE_BOUNDS = CAKE_IMAGE_BOUNDS;

  // @public {Shape}
  CakeNode.BASE_ELLIPSE = BASE_ELLIPSE;
  CakeNode.MID_ELLIPSE = MID_ELLIPSE;
  CakeNode.TOP_ELLIPSE = TOP_ELLIPSE;

  // @public {Vector2}
  CakeNode.BASE_ELLIPSE_OFFSET_CENTER = BASE_ELLIPSE_OFFSET_CENTER;
  CakeNode.MID_ELLIPSE_OFFSET_CENTER = MID_ELLIPSE_OFFSET_CENTER;
  CakeNode.TOP_ELLIPSE_OFFSET_CENTER = TOP_ELLIPSE_OFFSET_CENTER;

  // @public {Array.<Array.<Shape>>} - 2D areas that cover the entire cake (for accurate touch/mouse areas)
  // TODO: consider precomputing these in a SVG string'ed form so we have faster loads.
  CakeNode.CAKE_SHAPES = _.range( 1, 9 ).map( denominator => {
    return _.range( 0, denominator ).map( index => {
      const shapes = []; // We'll union all of these shapes

      // TODO: A bit of docs

      const angleA = -CakeNode.getStartAngle( denominator, index );
      const angleB = -CakeNode.getEndAngle( denominator, index );

      // Adds a pie-shaped wedge (flat) to the list of shapes. We'll do this for all three vertical "layers"
      function addPie( ellipse, offsetCenter, aspect ) {
        const topSegments = [];
        if ( denominator === 1 ) {
          topSegments.push( ellipse );
        }
        else {
          const intersectionA = CakeNode.ellipseIntersect( angleA, ellipse, offsetCenter, aspect );
          const intersectionB = CakeNode.ellipseIntersect( angleB, ellipse, offsetCenter, aspect );

          if ( intersectionA.t > intersectionB.t ) {
            topSegments.push( ellipse.slice( intersectionB.t, intersectionA.t ) );
          }
          else {
            topSegments.push( ellipse.slice( intersectionB.t, 1 ) );
            topSegments.push( ellipse.slice( 0, intersectionA.t ) );
          }
          topSegments.push( new Line( intersectionA.point, offsetCenter ) );
          topSegments.push( new Line( offsetCenter, intersectionB.point ) );
        }
        shapes.push( Shape.segments( topSegments, true ) );
      }
      addPie( TOP_ELLIPSE, TOP_ELLIPSE_OFFSET_CENTER, TOP_ASPECT );
      addPie( MID_ELLIPSE, MID_ELLIPSE_OFFSET_CENTER, MID_ASPECT );
      addPie( BASE_ELLIPSE, BASE_ELLIPSE_OFFSET_CENTER, BASE_ASPECT );

      // Interior
      if ( denominator > 1 ) {
        [ angleA, angleB ].forEach( angle => {
          if ( Math.abs( angle ) !== Math.PI / 2 ) {
            shapes.push( Shape.polygon( [
              BASE_ELLIPSE_OFFSET_CENTER,
              TOP_ELLIPSE_OFFSET_CENTER,
              CakeNode.getTopIntersection( angle ).point,
              ...( Math.sin( angle ) > -0.2 ? [ CakeNode.getMidIntersection( angle ).point ] : [] ),
              CakeNode.getBaseIntersection( angle ).point
            ] ) );
          }
        } );
      }

      if ( angleA > -Math.PI && angleB < -Math.PI ) {
        shapes.push( Shape.polygon( [
          // TODO: Fix KITE CAG, remove 0.99
          BASE_ELLIPSE.positionAt( 0.5 ).timesScalar( 0.99 ),
          MID_ELLIPSE.positionAt( 0.5 ).timesScalar( 0.99 ),
          MID_ELLIPSE_OFFSET_CENTER,
          BASE_ELLIPSE_OFFSET_CENTER
        ] ) );
      }

      if ( denominator === 1 || ( denominator === 2 && index === 1 ) ) {
        shapes.push( Shape.polygon( [
          BASE_ELLIPSE_OFFSET_CENTER,
          MID_ELLIPSE.positionAt( 0 ).timesScalar( 0.99 ),
          BASE_ELLIPSE.positionAt( 0 ).timesScalar( 0.99 )
        ] ) );
      }

      return Shape.union( shapes ).makeImmutable();
    } );
  } );

  return CakeNode;
} );
