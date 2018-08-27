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

  const cakeImageArray = [
    [ cake_1_1Image ],
    [ cake_2_1Image, cake_2_2Image ],
    [ cake_3_1Image, cake_3_2Image, cake_3_3Image ],
    [ cake_4_1Image, cake_4_2Image, cake_4_3Image, cake_4_4Image ],
    [ cake_5_1Image, cake_5_2Image, cake_5_3Image, cake_5_4Image, cake_5_5Image ],
    [ cake_6_1Image, cake_6_2Image, cake_6_3Image, cake_6_4Image, cake_6_5Image, cake_6_6Image ],
    [ cake_7_1Image, cake_7_2Image, cake_7_3Image, cake_7_4Image, cake_7_5Image, cake_7_6Image, cake_7_7Image ],
    [ cake_8_1Image, cake_8_2Image, cake_8_3Image, cake_8_4Image, cake_8_5Image, cake_8_6Image, cake_8_7Image, cake_8_8Image ]
  ];

  class CakeNode extends Node {
    /**
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     */
    constructor( denominator, index, options ) {

      assert && assert( index < denominator );

      options = _.extend( {
        maxHeight: CakeNode.DEFAULT_CAKE_HEIGHT  // height of the image
      }, options );

      super();

      // @private {Image}
      this.imageNode = new Image( cakeImageArray[ denominator - 1 ][ index ] );
      this.addChild( this.imageNode );

      // @private {number}
      this.denominator = denominator;

      this.setCakeIndex( index );
      this.mutate( options );
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
      const imageCenter = new Vector2( this.imageNode.width / 2, this.imageNode.height * 0.55 );

      if ( this.denominator === 1 ) {
        this.imageNode.translation = imageCenter.negated();
      }
      else if ( this.denominator === 2 ) {
        this.imageNode.translation = imageCenter.plus(
          Vector2.createPolar( this.height / 4, -2 * Math.PI * index / this.denominator ) ).negated();
      }
      else {
        this.imageNode.translation = imageCenter.plus( Vector2.createPolar(
          this.height / 4,
          -2 * Math.PI * ( index + 1 / 2 ) / this.denominator
        ) ).negated();
      }
    }

    /**
     * The normal height of a cake slice.
     * @public
     *
     * @returns {number}
     */
    static get DEFAULT_CAKE_HEIGHT() { return 120; }
  }

  return fractionsCommon.register( 'CakeNode', CakeNode );
} );
