// Copyright 2018-2019, University of Colorado Boulder

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
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const merge = require( 'PHET_CORE/merge' );

  class BeakerSceneNode extends CellSceneNode {
    /**
     * @param {ContainerSetScreenView} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      super( model, merge( {
        createContainerNode( container, options ) {
          return new BeakerContainerNode( container, options );
        },
        createPieceNode( piece, finishedAnimatingCallback, droppedCallback ) {
          return new BeakerPieceNode( piece, finishedAnimatingCallback, droppedCallback );
        },
        createCellNode( denominator, index, options ) {
          return new BeakerNode( 1, denominator, options );
        }
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
      return new BeakerNode( 1, 1, {
        yRadius: 4.5,
        xRadius: 15,
        fullHeight: 55,
        colorOverride: useEqualityLabColor ? FractionsCommonColorProfile.equalityLabWaterProperty : null
      } );
    }
  }

  return fractionsCommon.register( 'BeakerSceneNode', BeakerSceneNode );
} );
