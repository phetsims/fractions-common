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
  var Matrix3 = require( 'DOT/Matrix3' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  var Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  /**
   * @constructor
   * @extends {Stack}
   *
   * @param {Fraction} fraction
   * @param {Representation} representation
   * @param {Property.<Color>} colorProperty
   */
  function ShapeStack( fraction, representation, colorProperty ) {

    Stack.call( this );

    // @public {Fraction}
    this.fraction = fraction;
    
    // @public {Representation}
    this.representation = representation;
    
    // @public {Property.<Color>}
    this.colorProperty = colorProperty;
    
    // @public {ObservableArray.<ShapePiece>} - NOTE: These should only ever be popped/pushed.
    this.shapePieces = new ObservableArray();
  }

  fractionsCommon.register( 'ShapeStack', ShapeStack );

  return inherit( Stack, ShapeStack, {}, {
    /**
     * Returns the matrix transform (locally) for how to position a piece with the given properties.
     * @public
     *
     * @param {Fraction} fraction
     * @param {Representation} representation
     * @param {number} index
     * @returns {Matrix3}
     */
    getShapeMatrix: function( fraction, representation, index ) {
      return Matrix3.translation( ( representation === Representation.CIRCLE ? 1 : -1 ) * 4 * index, -4 * index ).timesMatrix( ShapeContainer.getShapeMatrix( 0, fraction, representation ) );
    }
  } );
} );
