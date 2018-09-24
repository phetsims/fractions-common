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
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
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
    }
  }

  fractionsCommon.register( 'CakeNode', CakeNode );

  // @public {Dimension2}
  CakeNode.CAKE_IMAGE_SIZE = CAKE_IMAGE_SIZE;
  CakeNode.SCALED_CAKE_IMAGE_SIZE = SCALED_CAKE_IMAGE_SIZE;

  // @public {number}
  CakeNode.CAKE_DEFAULT_SCALE = CAKE_DEFAULT_SCALE;

  // @public {Vector2}
  CakeNode.CAKE_OFFSET = CAKE_OFFSET;

  // @public {Bounds2}
  CakeNode.CAKE_IMAGE_BOUNDS = CAKE_IMAGE_BOUNDS;

  return CakeNode;
} );
