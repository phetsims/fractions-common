// Copyright 2017, University of Colorado Boulder

/**
 * A stack of number groups (either mixed or non-mixed)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class NumberGroupStack extends Stack {
    /**
     * @param {boolean} isMixedNumber
     */
    constructor( isMixedNumber ) {
      super();

      // @public {boolean}
      this.isMixedNumber = isMixedNumber;

      // @public {ObservableArray.<NumberGroup>} - NOTE: These should only ever be popped/pushed.
      this.numberGroups = new ObservableArray();
    }
  }

  return fractionsCommon.register( 'NumberGroupStack', NumberGroupStack );
} );
