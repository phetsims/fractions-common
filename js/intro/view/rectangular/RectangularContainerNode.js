// Copyright 2018, University of Colorado Boulder

/**
 * Container for the rectangular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularNode' );
  const Shape = require( 'KITE/Shape' );

  // TODO: OMFG don't extent rectangle :/
  class RectangularContainerNode extends Node {
    /**
     * @param {Container} container
     * @param {function} cellDownCallback TODO doc, function( event )
     * @param {Object} [options]
     */
    constructor( container, cellDownCallback, options ) {

      options = _.extend( {
        isIcon: false
      }, options );

      assert && assert( options.rectangleOrientation === 'horizontal' || options.rectangleOrientation === 'vertical' );

      super();

      // @private
      this.container = container;

      // @private
      this.cellDownCallback = cellDownCallback;

      // @private {Property.<string>}
      // TODO: FFS, dispose it
      this.strokeProperty = new DerivedProperty( [ container.filledCellCountProperty ], function( count ) {
        return count > 0 ? 'black' : 'gray';
      } );

      // TODO: Don't do this! And don't pass in to children!
      this.options = options;

      // determine to the height and width to use when drawing the vertical or horizontal representation.
      // TODO: omg WROST NAMMM. dimension? Doc it
      // TODO: AND WTF do an enumeration
      this.rectangle = options.rectangleOrientation === 'horizontal'
        ? RectangularNode.HORIZONTAL_RECTANGULAR_SIZE
        : RectangularNode.VERTICAL_RECTANGULAR_SIZE;
      if ( options.isIcon ) {
        this.rectangle = new Dimension2( this.rectangle.width / 4, this.rectangle.height / 4 );
      }

      // @private {Path} creates the path for the dividing lines between cells
      this.cellDividersPath = new Path( null, { stroke: this.strokeProperty } );
      this.addChild( this.cellDividersPath );

      // @private {Rectangle}
      this.backgroundRectangle = new Rectangle( {
        lineWidth: options.isIcon ? 2 : 3,
        stroke: this.strokeProperty,
        rectBounds: Bounds2.point( 0, 0 ).dilatedXY( this.rectangle.width / 2, this.rectangle.height / 2 )
      } );
      this.addChild( this.backgroundRectangle );

      // @private {function}
      this.rebuildListener = this.rebuild.bind( this );

      // @private {Array.<RectangularNode>}
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
      return this.cellNodes[ index ].translation; // TODO: This can be factored out?
    }

    /**
     * Redraws Rectangular Containers on screen view when the denominator is changed
     * @private
     */
    rebuild() {
      this.removeCellNodes();
      const denominator = this.container.cells.length;
      const cellWidth = this.rectangle.width / denominator;
      const cellHeight = this.rectangle.height / denominator;

      const mapCellX = index => ( index - ( denominator - 1 ) / 2 ) * cellWidth;
      const mapCellY = index => ( ( denominator - 1 ) / 2 - index ) * cellHeight;

      for ( let i = 0; i < denominator; i++ ) {
        const cell = this.container.cells.get( i );
        const cellNode = new RectangularNode( denominator, this.options );
        this.cellNodes.push( cellNode );
        this.addChild( cellNode );
        cellNode.cursor = 'pointer';
        cellNode.addInputListener( {
          down: event => {
            this.cellDownCallback( cell, event );
          }
        } );
        if ( this.options.rectangleOrientation === 'horizontal' ) {
          cellNode.x = mapCellX( i );
        }
        else {
          cellNode.y = mapCellY( i );
        }

        // TODO: don't do it this way
        cellNode.cell = cell;
        cellNode.visibilityListener = cell.appearsFilledProperty.linkAttribute( cellNode, 'visible' );
      }

      if ( this.options.rectangleOrientation === 'vertical' ) {

        // sets the shape of the dividing lines between cells
        const cellDividersShape = new Shape();
        for ( let i = 0; i < denominator; i++ ) {
          cellDividersShape.moveTo( -this.rectangle.width / 2, mapCellY( i + 0.5 ) ).horizontalLineToRelative( this.rectangle.width );
        }
        this.cellDividersPath.setShape( cellDividersShape );
      }
      else {
        // sets the shape of the dividing lines between cells
        const cellDividersShape = new Shape();
        for ( let i = 0; i < denominator; i++ ) {
          cellDividersShape.moveTo( mapCellX( i + 0.5 ), -this.rectangle.height / 2 ).verticalLineToRelative( this.rectangle.height );
        }
        this.cellDividersPath.setShape( cellDividersShape );
      }
    }

    /**
     * Empties cellsNode array, removes all cell from the scene and unlinks them from visibility listeners
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
     * creates Rectangular Node with one fill cell
     * @public
     */
    isIcon() {
      this.container.cells.fill();
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.removeCellNodes();
      this.container.cells.lengthProperty.unlink( this.rebuildListener );

      Rectangle.prototype.dispose.call( this );
    }
  }

  return fractionsCommon.register( 'RectangularContainerNode', RectangularContainerNode );
} );
