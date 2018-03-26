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
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Fraction} fraction
   * @param {Representation} representation
   * @param {Property.<Color>} colorProperty
   */
  function ShapeStack( fraction, representation, colorProperty ) {

    // @public {Fraction}
    this.fraction = fraction;
    
    // @public {Representation}
    this.representation = representation;
    
    // @public {Property.<Color>}
    this.colorProperty = colorProperty;
    
    // @public {ObservableArray.<ShapePiece>} - NOTE: These should only ever be popped/pushed.
    this.shapePieces = new ObservableArray();

    // @public {Property.<Vector2>} - Position of our stack in model units (updated from the view)
    this.positionProperty = new Property( Vector2.ZERO );
  }

  fractionsCommon.register( 'ShapeStack', ShapeStack );

  return inherit( Object, ShapeStack );
} );
