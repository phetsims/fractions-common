// Copyright 2018, University of Colorado Boulder

/**
 * Container for the circular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const CircularNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  class CircularContainerNode extends Circle {
    /**
     * TODO: factor out common things with RectangularContainerNode
     *
     * TODO: Don't inherit Circle :/
     *
     * @param {Container} container
     * @param {function} cellDownCallback TODO doc, function( event )
     * @param {Object} [options]
     */
    constructor( container, cellDownCallback, options ) {

      options = _.extend( {
        isIcon: false
      }, options );

      const circleRadius = options.isIcon ? CircularNode.DEFAULT_RADIUS / 4 : CircularNode.DEFAULT_RADIUS;

      super( circleRadius, {
        lineWidth: options.isIcon ? 2 : 3
      } );

      // @public
      // TODO: Don't do this! And don't pass in to children!
      this.options = options;

      // @public
      this.circleRadius = circleRadius;

      // @private
      this.container = container;

      // @private
      this.cellDownCallback = cellDownCallback;

      // TODO: fix disposal?
      // @private {Property.<string>} TODO factor out?
      this.strokeProperty = new DerivedProperty( [ container.filledCellCountProperty ], function( count ) {
        return count > 0 ? 'black' : 'gray';
      } );

      this.stroke = this.strokeProperty;

      // @private {Path} creates the path for the dividing lines between cells
      this.cellDividersPath = new Path( null, { stroke: this.strokeProperty } );
      this.addChild( this.cellDividersPath );

      // @private {function}
      this.rebuildListener = this.rebuild.bind( this );

      // @private {Array.<CircularNode>}
      this.cellNodes = [];

      container.cells.lengthProperty.link( this.rebuildListener );
    }

    /**
     * Returns the midpoint offset for the given child node at the specified index.
     * @public
     *
     * @param {number} index
     * @returns {Vector2}
     */
    getMidpointByIndex( index ) {
      return this.cellNodes[ index ].translation;
    }

    /**
     * redraw all the container on the screen
     * @private
     */
    rebuild() {
      this.removeCellNodes();

      var cellDividersShape = new Shape();

      var denominator = this.container.cells.length;

      // disregard segment for denominator equal to 1
      var cellDividersLength = ( denominator > 1 ) ? this.circleRadius : 0;

      // creates an angle between the cells of a circle node that corresponds to the denominator value
      var cellDividersAngle = ( Math.PI * 2 ) / (denominator);

      for ( let i = 0; i < denominator; i++ ) {
        var cell = this.container.cells.get( i );

        var cellNode = new CircularNode( denominator, i, this.options );
        this.cellNodes.push( cellNode );
        this.addChild( cellNode );
        cellNode.cursor = 'pointer';
        cellNode.addInputListener( {
          down: event => {
            this.cellDownCallback( cell, event );
          }
        } );

        // TODO: don't do it this way
        cellNode.cell = cell;
        cellNode.visibilityListener = cell.appearsFilledProperty.linkAttribute( cellNode, 'visible' );

        // positions and draws the polar coordinate of the dividing line between cells
        var edgePosition = Vector2.createPolar( cellDividersLength, i * cellDividersAngle );
        if ( cellDividersLength ) {
          // Workaround for https://github.com/phetsims/scenery/issues/750
          cellDividersShape.moveToPoint( edgePosition ).lineToPoint( edgePosition.normalized().timesScalar( 0.01 ) );
        }
      }
      this.cellDividersPath.setShape( cellDividersShape );
    }

    /**
     * Remove all the cells in the array and detach their listeners
     * @private
     */
    removeCellNodes() {
      while ( this.cellNodes.length ) {
        var cellNode = this.cellNodes.pop();
        cellNode.cell.appearsFilledProperty.unlink( cellNode.visibilityListener );
        this.removeChild( cellNode );
      }
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.removeCellNodes();
      this.container.cells.lengthProperty.unlink( this.rebuildListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'CircularContainerNode', CircularContainerNode );
} );