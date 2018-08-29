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
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const RectangularPieceNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularPieceNode' );

  class RectangularSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      assert && assert( RectangularOrientation.is( options.rectangularOrientation ) );

      const rectangularOrientation = options.rectangularOrientation;
      const maxContainers = model.containerCountProperty.range.max;

      super( model, _.extend( {
        createContainerNode( container, cellDownCallback ) {
          return new RectangularContainerNode( container, cellDownCallback, {
            rectangularOrientation
          } );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new RectangularPieceNode( piece, finishedAnimatingCallback, droppedCallback, {
            rectangularOrientation
          } );
        },
        createCellNode( denominator, index, options ) {
          return new RectangularNode( denominator, {
            dropShadow: false,
            rectangularOrientation
          } );
        },

        maxContainersPerRow: {
          [ RectangularOrientation.HORIZONTAL ]: {
            false: maxContainers / 2,
            true: 1
          },
          [ RectangularOrientation.VERTICAL ]: {
            false: maxContainers,
            true: 4
          }
        }[ rectangularOrientation ][ model.isCompact ]
      }, options ) );
    }
  }

  return fractionsCommon.register( 'RectangularSceneNode', RectangularSceneNode );
} );
