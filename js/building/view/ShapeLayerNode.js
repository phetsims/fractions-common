// Copyright 2018, University of Colorado Boulder

/**
 * Displays a background and foreground strokes for a given representation and denominator, and provides a layer
 * in-between where shapes can be placed.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/model/BuildingRepresentation' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const Util = require( 'DOT/Util' );

  // constants
  const CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;

  class ShapeLayerNode extends Node {
    /**
     * @param {BuildingRepresentation} representation
     * @param {Property.<number>} denominatorProperty
     */
    constructor( representation, denominatorProperty ) {
      super();

      // @private {BuildingRepresentation}
      this.representation = representation;

      // @private {Property.<number>}
      this.denominatorProperty = denominatorProperty;

      // @private {Node}
      this.shapePieceLayer = new Node( {
        pickable: false
      } );

      // @private {Path}
      this.separatorPath = new Path( null, {
        stroke: FractionsCommonColorProfile.shapeContainerPartitionProperty,
        lineDash: [ 5, 5 ],
        pickable: false
      } );
      this.separatorOffsetPath = new Path( null, {
        stroke: FractionsCommonColorProfile.shapeContainerPartitionOffsetProperty,
        lineDash: [ 5, 5 ],
        lineDashOffset: 5,
        pickable: false
      } );

      // @private {function}
      this.separatorListener = this.updateSeparator.bind( this );

      this.denominatorProperty.link( this.separatorListener );

      // Background
      if ( representation === BuildingRepresentation.PIE ) {
        this.addChild( new Circle( CIRCLE_RADIUS, {
          fill: FractionsCommonColorProfile.shapeContainerFillProperty
        } ) );
        this.addChild( this.shapePieceLayer );
        this.addChild( this.separatorPath );
        this.addChild( this.separatorOffsetPath );
        this.addChild( new Circle( CIRCLE_RADIUS, {
          stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty,
          pickable: false
        } ) );
      }
      else if ( representation === BuildingRepresentation.BAR ) {
        this.addChild( Rectangle.bounds( ShapePiece.VERTICAL_BAR_BOUNDS, {
          fill: FractionsCommonColorProfile.shapeContainerFillProperty
        } ) );
        this.addChild( this.shapePieceLayer );
        this.addChild( this.separatorPath );
        this.addChild( this.separatorOffsetPath );
        this.addChild( Rectangle.bounds( ShapePiece.VERTICAL_BAR_BOUNDS, {
          stroke: FractionsCommonColorProfile.shapeContainerStrokeProperty,
          pickable: false
        } ) );
      }
      else {
        throw new Error( `Unsupported representation for ShapeLayerNode: ${representation}` );
      }

      // Use our current bounds as our permanent bounds (for layout), since no content should be able to be outside this
      // (any pieces will be inside the container).
      this.localBounds = this.localBounds;
    }

    /**
     * Updates the shape of the separators above the shape piece layer.
     * @private
     *
     * @param {number} denominator
     */
    updateSeparator( denominator ) {
      if ( this.representation === BuildingRepresentation.PIE ) {
        if ( denominator > 1 ) {
          const separatorShape = new Shape();
          for ( let i = 0; i < denominator; i++ ) {
            const angle = -i * 2 * Math.PI / denominator;
            // Offset for crashes, see https://github.com/phetsims/fractions-common/issues/2 and
            // https://github.com/phetsims/scenery/issues/750
            separatorShape.moveTo(
              1e-5 * Math.cos( angle ),
              1e-5 * Math.sin( angle )
            ).lineTo(
              CIRCLE_RADIUS * Math.cos( angle ),
              CIRCLE_RADIUS * Math.sin( angle )
            );
          }
          this.separatorPath.shape = separatorShape;
          this.separatorOffsetPath.shape = separatorShape;
        }
        else {
          this.separatorPath.shape = null;
          this.separatorOffsetPath.shape = null;
        }
      }
      else {
        const separatorShape = new Shape();
        for ( let i = 1; i < denominator; i++ ) {
          const x = Util.linear( 0, 1, ShapePiece.VERTICAL_BAR_BOUNDS.minX, ShapePiece.VERTICAL_BAR_BOUNDS.maxX, i / denominator );
          separatorShape.moveTo( x, ShapePiece.VERTICAL_BAR_BOUNDS.minY ).lineTo( x, ShapePiece.VERTICAL_BAR_BOUNDS.maxY );
        }
        this.separatorPath.shape = separatorShape;
        this.separatorOffsetPath.shape = separatorShape;
      }
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.denominatorProperty.unlink( this.separatorListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'ShapeLayerNode', ShapeLayerNode );
} );
