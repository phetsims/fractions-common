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
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );

  // constants
  // TODO: Move to Fraction?
  var FRACTION_ONE = new Fraction( 1, 1 );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Property.<number>} partitionDenominatorProperty
   * @param {Representation} representation
   * @param {Emitter} changedEmitter
   */
  function ShapeContainer( partitionDenominatorProperty, representation, changedEmitter ) {

    // @public {Property.<number>}
    this.partitionDenominatorProperty = partitionDenominatorProperty;

    // @public {Representation}
    this.representation = representation;

    // @public {Emitter}
    this.changedEmitter = changedEmitter;

    // @public {ObservableArray.<ShapePiece>}
    this.shapePieces = new ObservableArray();

    this.shapePieces.addItemAddedListener( changedEmitter.emit.bind( changedEmitter ) );
    this.shapePieces.addItemRemovedListener( changedEmitter.emit.bind( changedEmitter ) );
  }

  fractionsCommon.register( 'ShapeContainer', ShapeContainer );

  return inherit( Object, ShapeContainer, {
    // TODO: doc
    canFitPiece: function( shapePiece ) {
      if ( shapePiece.representation !== this.representation ) {
        return false;
      }

      var potentialTotalFraction = this.getTotalFraction().plus( shapePiece.fraction ).reduce();
      return potentialTotalFraction.isLessThan( FRACTION_ONE ) || potentialTotalFraction.equals( FRACTION_ONE );
    },

    // TODO: doc
    getTotalFraction: function() {
      var fraction = new Fraction( 0, 1 );
      for ( var i = 0; i < this.shapePieces.length; i++ ) {
        fraction.add( this.shapePieces.get( i ).fraction );
      }
      return fraction;
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
  } );
} );
