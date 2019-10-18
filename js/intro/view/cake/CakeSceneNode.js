// Copyright 2018-2019, University of Colorado Boulder

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
  const merge = require( 'PHET_CORE/merge' );

  // images
  const cakeImage = require( 'image!FRACTIONS_COMMON/cake_1_1.png' );

  class CakeSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      super( model, merge( {
        createContainerNode( container, options ) {
          return new CakeContainerNode( container, options );
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
