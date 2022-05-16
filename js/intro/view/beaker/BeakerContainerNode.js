// Copyright 2018-2022, University of Colorado Boulder

/**
 * Container for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import { DragListener } from '../../../../../scenery/js/imports.js';
import FractionsCommonColors from '../../../common/view/FractionsCommonColors.js';
import fractionsCommon from '../../../fractionsCommon.js';
import ContainerNode from '../ContainerNode.js';
import BeakerNode from '../../../../../scenery-phet/js/BeakerNode.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';

class BeakerContainerNode extends ContainerNode {
  /**
   * @param {Container} container
   * @param {Object} [options]
   */
  constructor( container, options ) {
    super( container, options );

    // @private {Multilink}
    this.multilink = Multilink.multilink( [ container.appearsFilledCellCountProperty, container.cells.lengthProperty ], ( numerator, denominator ) => {
      // Sanity, if these get modified out of order (very possible)
      numerator = Math.min( numerator, denominator );
      const beakerHeight = 150;
      const waterHeightProperty = new NumberProperty( numerator / denominator );
      this.children = [
        new BeakerNode( waterHeightProperty, {
            fill: FractionsCommonColors.waterProperty,
            showTicks: true,
            numTicks: denominator,
            beakerHeight: beakerHeight,
            xRadius: 40,
            yRadius: 12
          }
        )
      ];
    } );

    // @private
    this.cursorListener = this.updateCursor.bind( this );
    container.appearsFilledCellCountProperty.link( this.cursorListener );

    this.addInputListener( DragListener.createForwardingListener( event => {
      if ( container.appearsFilledCellCountProperty.value > 0 ) {
        this.cellDownCallback( container.getNextAppearsFilledCell(), event );
      }
    } ) );

    this.mutate( options );
  }

  /**
   * @private
   */
  updateCursor() {
    this.cursor = this.container.appearsFilledCellCountProperty.value > 0 ? 'pointer' : null;
  }

  /**
   * Releases references.
   * @public
   * @override
   */
  dispose() {
    this.multilink.dispose();

    this.container.appearsFilledCellCountProperty.unlink( this.cursorListener );

    super.dispose();
  }
}

fractionsCommon.register( 'BeakerContainerNode', BeakerContainerNode );
export default BeakerContainerNode;