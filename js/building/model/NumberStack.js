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
   * @param {number} number
   */
  function NumberStack( number ) {

    // @public {number}
    this.number = number;
    
    // @public {ObservableArray.<NumberPiece>} - NOTE: These should only ever be popped/pushed.
    this.numberPieces = new ObservableArray();

    // @public {Property.<Vector2>} - Position of our stack in model units (updated from the view)
    this.positionProperty = new Property( Vector2.ZERO );
  }

  fractionsCommon.register( 'NumberStack', NumberStack );

  return inherit( Object, NumberStack, {}, {
    // TODO: doc
    getOffset: function( index ) {
      return new Vector2( 4 * index, 4 * index );
    }
  } );
} );
