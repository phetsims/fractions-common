// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the cake representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CakeContainerNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeContainerNode' );
  const CakePieceNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakePieceNode' );
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );

  // images
  const cakeImage = require( 'mipmap!FRACTIONS_COMMON/cake_1_1.png' );
  const cakeBucket1 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_1.png' );
  const cakeBucket2 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_2.png' );
  const cakeBucket3 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_3.png' );
  const cakeBucket4 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_4.png' );
  const cakeBucket5 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_5.png' );
  const cakeBucket6 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_6.png' );
  const cakeBucket7 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_7.png' );
  const cakeBucket8 = require( 'mipmap!FRACTIONS_COMMON/cake_bucket_1_8.png' );

  // constants
  const CAKE_BUCKET_IMAGE_MAP = {
    1: cakeBucket1,
    2: cakeBucket2,
    3: cakeBucket3,
    4: cakeBucket4,
    5: cakeBucket5,
    6: cakeBucket6,
    7: cakeBucket7,
    8: cakeBucket8
  };

  class CakeSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      super( model, _.extend( {
        createContainerNode( container, options ) {
          return new CakeContainerNode( container, options );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new CakePieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new Image( CAKE_BUCKET_IMAGE_MAP[ denominator ], _.extend( {
            scale: 0.4
          }, options ) );
        }
      }, options ) );
    }

    /**
     * Returns the icon node to be used for this representation.
     * @public
     *
     * @param {boolean} useEqualityLabColor
     * @returns {Node}
     */
    static getIcon() {
      return new Image( cakeImage, {
        maxHeight: 75
      } );
    }
  }

  return fractionsCommon.register( 'CakeSceneNode', CakeSceneNode );
} );
