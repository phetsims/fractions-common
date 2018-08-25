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

  class CakeSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {function} getBucketLocation - function(): Vector2, gives the location of the bucket when called
     * @param {Object} [options]
     */
    constructor( model, getBucketLocation, options ) {
      super( model, getBucketLocation, _.extend( {
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
  }

  return fractionsCommon.register( 'CakeSceneNode', CakeSceneNode );
} );
