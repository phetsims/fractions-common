// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  const scratchVector = new Vector2();

  class ShapeContainer {
    /**
     * @param {ShapeGroup} shapeGroup -- Should we just pass this through in general? Or get rid of the reference and
     *                                   simplify our "find the container" logic? Or provide as null? TODO
     * @param {Property.<number>} partitionDenominatorProperty
     * @param {BuildingRepresentation} representation
     * @param {Emitter} changedEmitter
     * @param {Vector2} offset - Offset from the ShapeGroup's origin
     */
    constructor( shapeGroup, partitionDenominatorProperty, representation, changedEmitter, offset ) {

      // @public {ShapeGroup} shapeGroup
      this.shapeGroup = shapeGroup;

      // @public {Property.<number>}
      this.partitionDenominatorProperty = partitionDenominatorProperty;

      // @public {BuildingRepresentation}
      this.representation = representation;

      // @public {Emitter}
      this.changedEmitter = changedEmitter;

      // @public {Vector2}
      this.offset = offset;

      // @public {ObservableArray.<ShapePiece>}
      this.shapePieces = new ObservableArray();

      // @public {Property.<Fraction>}
      this.totalFractionProperty = new Property( new Fraction( 0, 1 ) );

      // Keep totalFractionProperty up-to-date
      this.shapePieces.addItemAddedListener( shapePiece => {
        this.totalFractionProperty.value = this.totalFractionProperty.value.plus( shapePiece.fraction ).reduced();
        this.changedEmitter.emit();
      } );
      this.shapePieces.addItemRemovedListener( shapePiece => {
        this.totalFractionProperty.value = this.totalFractionProperty.value.minus( shapePiece.fraction ).reduced();
        this.changedEmitter.emit();
      } );
    }

    /**
     * Returns whether the ShapePiece can be placed into this container.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {boolean}
     */
    canFitPiece( shapePiece ) {
      if ( shapePiece.representation !== this.representation ) {
        return false;
      }

      const potentialTotalFraction = this.totalFractionProperty.value.plus( shapePiece.fraction ).reduce();
      return potentialTotalFraction.isLessThan( Fraction.ONE ) || potentialTotalFraction.equals( Fraction.ONE );
    }

    /**
     * Returns the distance of a point from this container.
     * @public
     *
     * @param {Vector2} point
     * @returns {number}
     */
    distanceFromPoint( point ) {
      // Subtract off our local offset
      const localPoint = scratchVector.set( point ).subtract( this.offset );

      if ( this.representation === BuildingRepresentation.PIE ) {
        return Math.max( 0, localPoint.magnitude() - FractionsCommonConstants.SHAPE_SIZE / 2 );
      }
      else if ( this.representation === BuildingRepresentation.BAR ) {
        return Math.sqrt( ShapePiece.VERTICAL_BAR_BOUNDS.minimumDistanceToPointSquared( localPoint ) );
      }
      else {
        throw new Error( 'Unsupported representation for ShapeContainer: ' + this.representation );
      }
    }

    /**
     * Returns the value (from 0 to 1) of where this piece's "start" is.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {number}
     */
    getShapeRatio( shapePiece ) {
      let rotation = 0;
      for ( let i = 0; i < this.shapePieces.length; i++ ) {
        const currentShapePiece = this.shapePieces.get( i );
        if ( currentShapePiece === shapePiece ) {
          return rotation;
        }
        rotation += currentShapePiece.fraction.value;
      }
      throw new Error( 'ShapePiece not found' );
    }

    // TODO: doc
    static getShapeMatrix( startingRatio, fraction, representation ) {
      if ( representation === BuildingRepresentation.PIE ) {
        if ( fraction.equals( Fraction.ONE ) ) {
          return Matrix3.IDENTITY;
        }
        else {
          const centroid = ShapePiece.getSweptCentroid( fraction );
          const angle = -2 * Math.PI * startingRatio;
          return Matrix3.rotation2( angle ).timesMatrix( Matrix3.translationFromVector( centroid ) );
        }
      }
      else if ( representation === BuildingRepresentation.BAR ) {
        const centralValue = startingRatio + fraction.value / 2;
        return Matrix3.translation( Util.linear( 0, 1, ShapePiece.VERTICAL_BAR_BOUNDS.minX, ShapePiece.VERTICAL_BAR_BOUNDS.maxX, centralValue ), 0 );
      }
      else {
        throw new Error( 'Unsupported representation for getShapeMatrix: ' + representation );
      }
    }
  }

  return fractionsCommon.register( 'ShapeContainer', ShapeContainer );
} );
