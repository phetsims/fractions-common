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
  const Container = require( 'FRACTIONS_COMMON/intro/model/Container' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
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
      assert && assert( RectangularOrientation.includes( options.rectangularOrientation ) );

      const rectangularOrientation = options.rectangularOrientation;
      const maxContainers = model.containerCountProperty.range.max;

      super( model, _.extend( {
        createContainerNode( container, options ) {
          return new RectangularContainerNode( container, _.extend( {
            rectangularOrientation
          }, options ) );
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

    /**
     * Returns the icon node to be used for this representation.
     * @public
     *
     * @param {RectangularOrientation} rectangularOrientation
     * @param {boolean} [useEqualityLabColor]
     * @returns {Node}
     */
    static getIcon( rectangularOrientation, useEqualityLabColor ) {
      const iconContainer = new Container();
      iconContainer.addCells( 1 );
      iconContainer.cells.get( 0 ).fill();

      return new RectangularContainerNode( iconContainer, {
        rectangularOrientation,
        scale: 0.32,
        colorOverride: useEqualityLabColor ? FractionsCommonColorProfile.equalityLabColorProperty : null
      } );
    }
  }

  return fractionsCommon.register( 'RectangularSceneNode', RectangularSceneNode );
} );
