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
  const Container = require( 'FRACTIONS_COMMON/intro/model/Container' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );

  class CircularSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      const maxContainers = model.containerCountProperty.range.max;

      super( model, _.extend( {
        createContainerNode( container, options ) {
          return new CircularContainerNode( container, options );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new CircularPieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new CircularNode( denominator, index, options );
        },
        maxContainersPerRow: model.isCompact ? 2 : maxContainers
      }, options ) );
    }

    /**
     * Returns the icon node to be used for this representation.
     * @public
     *
     * @param {boolean} [useEqualityLabColor]
     * @returns {Node}
     */
    static getIcon( useEqualityLabColor ) {
      const iconContainer = new Container();
      iconContainer.addCells( 1 );
      iconContainer.cells.get( 0 ).fill();

      return new CircularContainerNode( iconContainer, {
        scale: 30 / 63,
        colorOverride: useEqualityLabColor ? FractionsCommonColorProfile.equalityLabColorProperty : null
      } );
    }
  }

  return fractionsCommon.register( 'CircularSceneNode', CircularSceneNode );
} );
