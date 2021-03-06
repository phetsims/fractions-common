// Copyright 2018-2020, University of Colorado Boulder

/**
 * Container for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '../../../../../axon/js/Property.js';
import DragListener from '../../../../../scenery/js/listeners/DragListener.js';
import fractionsCommon from '../../../fractionsCommon.js';
import ContainerNode from '../ContainerNode.js';
import BeakerNode from './BeakerNode.js';

class BeakerContainerNode extends ContainerNode {
  /**
   * @param {Container} container
   * @param {Object} [options]
   */
  constructor( container, options ) {
    super( container, options );

    // @private {Multilink}
    this.multilink = Property.multilink( [ container.appearsFilledCellCountProperty, container.cells.lengthProperty ], ( numerator, denominator ) => {
      // Sanity, if these get modified out of order (very possible)
      numerator = Math.min( numerator, denominator );

      this.children = [
        new BeakerNode( numerator, denominator, {
          colorOverride: this.colorOverride
        } )
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