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

  /**
   * @constructor
   * @extends {Stack}
   *
   * @param {boolean} isMixedNumber
   */
  function NumberGroupStack( isMixedNumber ) {

    Stack.call( this );

    // @public {boolean}
    this.isMixedNumber = isMixedNumber;
    
    // @public {ObservableArray.<NumberGroup>} - NOTE: These should only ever be popped/pushed.
    this.numberGroups = new ObservableArray();
  }

  fractionsCommon.register( 'NumberGroupStack', NumberGroupStack );

  return inherit( Stack, NumberGroupStack );
} );
