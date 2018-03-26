// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  // TODO: Move to Fraction?
  var FRACTION_ONE = new Fraction( 1, 1 );

  var scratchVector = new Vector2();

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Property.<number>} partitionDenominatorProperty
   * @param {Representation} representation
   * @param {Emitter} changedEmitter
   * @param {Vector2} offset - Offset from the ShapeGroup's origin
   */
  function ShapeContainer( partitionDenominatorProperty, representation, changedEmitter, offset ) {

    var self = this;

    // @public {Property.<number>}
    this.partitionDenominatorProperty = partitionDenominatorProperty;

    // @public {Representation}
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
    this.shapePieces.addItemAddedListener( function( shapePiece ) {
      self.totalFractionProperty.value = self.totalFractionProperty.value.plus( shapePiece.fraction ).reduced();
    } );
    this.shapePieces.addItemRemovedListener( function( shapePiece ) {
      self.totalFractionProperty.value = self.totalFractionProperty.value.minus( shapePiece.fraction ).reduced();
    } );

    this.shapePieces.addItemAddedListener( changedEmitter.emit.bind( changedEmitter ) );
    this.shapePieces.addItemRemovedListener( changedEmitter.emit.bind( changedEmitter ) );
  }

  fractionsCommon.register( 'ShapeContainer', ShapeContainer );

  return inherit( Object, ShapeContainer, {
    /**
     * Returns whether the ShapePiece can be placed into this container.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {boolean}
     */
    canFitPiece: function( shapePiece ) {
      if ( shapePiece.representation !== this.representation ) {
        return false;
      }

      var potentialTotalFraction = this.totalFractionProperty.value.plus( shapePiece.fraction ).reduce();
      return potentialTotalFraction.isLessThan( FRACTION_ONE ) || potentialTotalFraction.equals( FRACTION_ONE );
    },

    /**
     * Returns the distance of a point from this container.
     * @public
     *
     * @param {Vector2} point
     * @returns {number}
     */
    distanceFromPoint: function( point ) {
      // Subtract off our local offset
      var localPoint = scratchVector.set( point ).subtract( this.offset );

      if ( this.representation === Representation.CIRCLE ) {
        return Math.max( 0, localPoint.magnitude() - FractionsCommonConstants.SHAPE_SIZE / 2 );
      }
      else if ( this.representation === Representation.VERTICAL_BAR ) {
        return Math.sqrt( ShapePiece.VERTICAL_BAR_BOUNDS.minimumDistanceToPointSquared( localPoint ) );
      }
      else {
        throw new Error( 'Unsupported representation for ShapeContainer: ' + this.representation );
      }
    },

    /**
     * Returns the value (from 0 to 1) of where this piece's "start" is.
     * @public
     *
     * @param {ShapePiece} shapePiece
     * @returns {number}
     */
    getShapeRatio: function( shapePiece ) {
      var rotation = 0;
      for ( var i = 0; i < this.shapePieces.length; i++ ) {
        var currentShapePiece = this.shapePieces.get( i );
        if ( currentShapePiece === shapePiece ) {
          return rotation;
        }
        rotation += currentShapePiece.fraction.getValue();
      }
      throw new Error( 'ShapePiece not found' );
    }
  }, {
    // TODO: doc
    getShapeMatrix: function( startingRatio, fraction, representation ) {
      if ( representation === Representation.CIRCLE ) {
        if ( fraction.equals( FRACTION_ONE ) ) {
          return Matrix3.IDENTITY;
        }
        else {
          var centroid = ShapePiece.getSweptCentroid( fraction );
          var angle = -2 * Math.PI * startingRatio;
          return Matrix3.rotation2( angle ).timesMatrix( Matrix3.translationFromVector( centroid ) );
        }
      }
      else if ( representation === Representation.VERTICAL_BAR ) {
        var centralValue = startingRatio + fraction.getValue() / 2;
        return Matrix3.translation( Util.linear( 0, 1, ShapePiece.VERTICAL_BAR_BOUNDS.minX, ShapePiece.VERTICAL_BAR_BOUNDS.maxX, centralValue ), 0 );
      }
      else {
        throw new Error( 'Unsupported representation for getShapeMatrix: ' + representation );
      }
    }
  } );
} );
