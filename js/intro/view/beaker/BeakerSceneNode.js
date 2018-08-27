// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerContainerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerContainerNode' );
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const BeakerPieceNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerPieceNode' );
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class BeakerSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      super( model, _.extend( {
        createContainerNode( container, cellDownCallback ) {
          return new BeakerContainerNode( container, cellDownCallback );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new BeakerPieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new BeakerNode( 1, denominator, options );
        }
      }, options ) );
    }
  }

  return fractionsCommon.register( 'BeakerSceneNode', BeakerSceneNode );
} );
