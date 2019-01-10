// Copyright 2018, University of Colorado Boulder

/**
 * A stack of number groups (either mixed or non-mixed)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingType = require( 'FRACTIONS_COMMON/building/model/BuildingType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );

  class NumberGroupStack extends Stack {
    /**
     * @param {number} layoutQuantity
     * @param {boolean} isMixedNumber
     * @param {boolean} [isMutable]
     */
    constructor( layoutQuantity, isMixedNumber, isMutable = true ) {
      super( BuildingType.NUMBER, layoutQuantity, isMutable );

      // @public {boolean}
      this.isMixedNumber = isMixedNumber;

      // @public {ObservableArray.<NumberGroup>} - NOTE: These should only ever be popped/pushed.
      this.numberGroups = this.array;
    }
  }

  return fractionsCommon.register( 'NumberGroupStack', NumberGroupStack );
} );
