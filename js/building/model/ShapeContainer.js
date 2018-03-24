// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Property.<number>} partitionDenominatorProperty
   * @param {Representation} representation
   */
  function ShapeContainer( partitionDenominatorProperty, representation ) {

    // @public {Property.<number>}
    this.partitionDenominatorProperty = partitionDenominatorProperty;

    // @public {Representation}
    this.representation = representation;

    // @public {ObservableArray.<ShapePiece>}
    this.shapePieces = new ObservableArray();
  }

  fractionsCommon.register( 'ShapeContainer', ShapeContainer );

  return inherit( Object, ShapeContainer, {
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
