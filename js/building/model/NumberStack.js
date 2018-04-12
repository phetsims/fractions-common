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
  var Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Stack}
   *
   * @param {number} number
   */
  function NumberStack( number ) {

    Stack.call( this );

    // @public {number}
    this.number = number;
    
    // @public {ObservableArray.<NumberPiece>} - NOTE: These should only ever be popped/pushed.
    this.numberPieces = new ObservableArray();
  }

  fractionsCommon.register( 'NumberStack', NumberStack );

  return inherit( Stack, NumberStack, {}, {
    // TODO: doc
    getOffset: function( index ) {
      return new Vector2( 4 * index, 4 * index );
    }
  } );
} );
