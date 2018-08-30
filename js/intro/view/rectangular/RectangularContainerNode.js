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
  const ContainerNode = require( 'FRACTIONS_COMMON/intro/view/ContainerNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const Shape = require( 'KITE/Shape' );

  class RectangularContainerNode extends ContainerNode {
    /**
     * @param {Container} container
     * @param {Object} [options]
     */
    constructor( container, options ) {
      assert && assert( RectangularOrientation.is( options.rectangularOrientation ) );

      super( container, options );

      // @private {RectangularOrientation}
      this.rectangularOrientation = options.rectangularOrientation;

      // @private {Property.<string>}
      this.strokeProperty = new DerivedProperty( [
        container.filledCellCountProperty,
        FractionsCommonColorProfile.introContainerActiveBorderProperty,
        FractionsCommonColorProfile.introContainerInactiveBorderProperty
      ], ( count, activeColor, inactiveColor ) => {
        return count > 0 ? activeColor : inactiveColor;
      } );

      // determine to the height and width to use when drawing the vertical or horizontal representation.
      // TODO: omg WROST NAMMM. dimension? Doc it
      // TODO: AND WTF do an enumeration
      this.rectangle = RectangularNode.getSize( options.rectangularOrientation );

      const rectBounds = Bounds2.point( 0, 0 ).dilatedXY( this.rectangle.width / 2, this.rectangle.height / 2 );

      // @private {Rectangle}
      this.backgroundRectangle = new Rectangle( {
        fill: FractionsCommonColorProfile.introContainerBackgroundProperty,
        rectBounds
      } );
      this.addChild( this.backgroundRectangle );

      // @private {Path} creates the path for the dividing lines between cells
      this.cellDividersPath = new Path( null, { stroke: this.strokeProperty } );
      this.addChild( this.cellDividersPath );

      // @private {Rectangle}
      this.borderRectangle = new Rectangle( {
        lineWidth: FractionsCommonConstants.INTRO_CONTAINER_LINE_WIDTH,
        stroke: this.strokeProperty,
        rectBounds: rectBounds.dilated( 0.5 ) // Extend by 0.5 so that our cell fills don't overlap our border
      } );
      this.addChild( this.borderRectangle );

      // @private {function}
      this.rebuildListener = this.rebuild.bind( this );

      // @private {Array.<RectangularNode>}
      this.cellNodes = [];

      container.cells.lengthProperty.link( this.rebuildListener );

      this.mutate( options );
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
        const cellNode = new RectangularNode( denominator, {
          rectangularOrientation: this.rectangularOrientation,
          colorOverride: this.colorOverride
        } );
        this.cellNodes.push( cellNode );
        this.addChild( cellNode );
        cellNode.cursor = 'pointer';
        cellNode.addInputListener( {
          down: event => {
            this.cellDownCallback( cell, event );
          }
        } );
        if ( this.rectangularOrientation === RectangularOrientation.HORIZONTAL ) {
          cellNode.x = mapCellX( i );
        }
        else {
          cellNode.y = mapCellY( i );
        }

        // TODO: don't do it this way
        cellNode.cell = cell;
        cellNode.visibilityListener = cell.appearsFilledProperty.linkAttribute( cellNode, 'visible' );
      }

      if ( this.rectangularOrientation === RectangularOrientation.VERTICAL ) {

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
     * Releases references.
     * @public
     */
    dispose() {
      this.removeCellNodes();
      this.container.cells.lengthProperty.unlink( this.rebuildListener );
      this.strokeProperty.dispose();

      Rectangle.prototype.dispose.call( this );
    }
  }

  return fractionsCommon.register( 'RectangularContainerNode', RectangularContainerNode );
} );
