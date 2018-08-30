// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for container nodes that show and track individual cell nodes (i.e. NOT the beaker container).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const CellEntry = require( 'FRACTIONS_COMMON/intro/view/CellEntry' );
  const ContainerNode = require( 'FRACTIONS_COMMON/intro/view/ContainerNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );

  class CellContainerNode extends ContainerNode {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      super( container, options );

      // @protected {Array.<CellEntry>}
      this.cellEntries = [];

      // @private {function}
      this.rebuildListener = this.rebuild.bind( this );
      this.container.cells.lengthProperty.lazyLink( this.rebuildListener );

      // @private {Property.<Color>}
      this.strokeProperty = new DerivedProperty( [
        container.filledCellCountProperty,
        FractionsCommonColorProfile.introContainerActiveBorderProperty,
        FractionsCommonColorProfile.introContainerInactiveBorderProperty
      ], ( count, activeColor, inactiveColor ) => {
        return count > 0 ? activeColor : inactiveColor;
      } );
    }

    /**
     * Rebuilds the full container (required when the number of cells changes).
     * @protected
     */
    rebuild() {
      this.removeCellNodes();

      // Subtypes will override the main content
    }

    /**
     * Return the midpoint offset of this node.
     * @public
     * @override
     *
     * @param {number} index
     * @returns {Vector2}
     */
    getMidpointByIndex( index ) {
      return this.cellEntries[ index ].node.translation;
    }

    /**
     * Adds in a cell node, setting up listeners
     * @protected
     *
     * @param {Cell} cell
     * @param {Node} node
     */
    addCellNode( cell, node ) {
      this.cellEntries.push( new CellEntry( cell, node ) );
      this.addChild( node );

      node.cursor = 'pointer';
      node.addInputListener( {
        down: event => {
          this.cellDownCallback( cell, event );
        }
      } );
    }

    /**
     * Removes all of the cell nodes, and detaches their listeners.
     * @private
     */
    removeCellNodes() {
      while ( this.cellEntries.length ) {
        const cellEntry = this.cellEntries.pop();
        this.removeChild( cellEntry.node );
        cellEntry.dispose();
      }
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.removeCellNodes();
      this.container.cells.lengthProperty.unlink( this.rebuildListener );
      this.strokeProperty.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'CellContainerNode', CellContainerNode );
} );
