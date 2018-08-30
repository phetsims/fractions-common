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
  const CakeNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeNode' );
  const CakePieceNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakePieceNode' );
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );

  // images
  const cakeImage = require( 'image!FRACTIONS_COMMON/cake_1_1.png' );

  class CakeSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      super( model, _.extend( {
        createContainerNode( container, cellDownCallback ) {
          return new CakeContainerNode( container, cellDownCallback );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new CakePieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new CakeNode( denominator, index, options );
        }
      }, options ) );
    }

    /**
     * Returns the icon node to be used for this representation.
     * @public
     *
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
