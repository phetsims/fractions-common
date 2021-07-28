// Copyright 2018-2021, University of Colorado Boulder

/**
 * Scene for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import merge from '../../../../../phet-core/js/merge.js';
import FractionsCommonColors from '../../../common/view/FractionsCommonColors.js';
import fractionsCommon from '../../../fractionsCommon.js';
import CellSceneNode from '../CellSceneNode.js';
import BeakerContainerNode from './BeakerContainerNode.js';
import BeakerNode from './BeakerNode.js';
import BeakerPieceNode from './BeakerPieceNode.js';

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
      colorOverride: useEqualityLabColor ? FractionsCommonColors.equalityLabWaterProperty : null
    } );
  }
}

fractionsCommon.register( 'BeakerSceneNode', BeakerSceneNode );
export default BeakerSceneNode;