// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the rectangular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CellSceneNode = require( 'FRACTIONS_COMMON/intro/view/CellSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularContainerNode' );
  const RectangularNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularNode' );
  const RectangularPieceNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularPieceNode' );

  class RectangularSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      assert && assert( options.rectangleOrientation );

      const rectangleOrientation = options.rectangleOrientation;

      super( model, _.extend( {
        createContainerNode( container, cellDownCallback ) {
          return new RectangularContainerNode( container, cellDownCallback, {
            rectangleOrientation
          } );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new RectangularPieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new RectangularNode( denominator, {
            dropShadow: false,
            rectangleOrientation
          } );
        }
      }, options ) );
    }
  }

  return fractionsCommon.register( 'RectangularSceneNode', RectangularSceneNode );
} );
