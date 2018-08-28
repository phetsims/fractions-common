// Copyright 2018, University of Colorado Boulder

/**
 * Container for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class BeakerContainerNode extends Node {
    /**
     * TODO: factor out common things with the other container nodes
     *
     * @param {Container} container
     * @param {function} cellDownCallback TODO doc, function( event )
     */
    constructor( container, cellDownCallback ) {
      super();

      // @private
      this.container = container;

      // @private
      this.cellDownCallback = cellDownCallback;

      // @private {Multilink}
      this.multilink = Property.multilink( [ container.appearsFilledCellCountProperty, container.cells.lengthProperty ], ( numerator, denominator ) => {
        // Sanity, if these get modified out of order (very possible)
        numerator = Math.min( numerator, denominator );

        this.children = [
          new BeakerNode( numerator, denominator )
        ];
      } );

      // @private
      this.cursorListener = this.updateCursor.bind( this );
      container.appearsFilledCellCountProperty.link( this.cursorListener );

      this.addInputListener( {
        down: function( event ) {
          if ( container.appearsFilledCellCountProperty.value > 0 ) {
            cellDownCallback( container.getNextAppearsFilledCell(), event );
          }
        }
      } );
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
     */
    dispose() {
      this.multilink.dispose();

      this.container.appearsFilledCellCountProperty.unlink( this.cursorListener );

      super.dispose();
    }

    /**
     * Return the midpoint offset of this node
     *
     * @param {number} index
     * @returns {Vector2}
     * @public
     */
    getMidpointByIndex( index ) {
      return Vector2.ZERO;
    }
  }

  return fractionsCommon.register( 'BeakerContainerNode', BeakerContainerNode );
} );
