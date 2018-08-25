// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the circular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularContainerNode' );
  const CircularNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularNode' );
  const CircularPieceNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularPieceNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class CircularSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {function} getBucketLocation - function(): Vector2, gives the location of the bucket when called
     * @param {Object} [options]
     */
    constructor( model, getBucketLocation, options ) {
      super( model, getBucketLocation, _.extend( {
        createContainerNode( container, cellDownCallback ) {
          return new CircularContainerNode( container, cellDownCallback );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new CircularPieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new CircularNode( denominator, index, options );
        }
      }, options ) );
    }
  }

  return fractionsCommon.register( 'CircularSceneNode', CircularSceneNode );
} );
