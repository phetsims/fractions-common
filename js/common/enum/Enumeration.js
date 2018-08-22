// Copyright 2018, University of Colorado Boulder

/**
 * Creates a simple enumeration, with most of the boilerplate.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class Enumeration {
    /**
     * @param {Array.<string>} values
     * @param {function} [beforeFreeze]
     */
    constructor( values, beforeFreeze ) {
      assert && assert( Array.isArray( values ), 'Values should be an array' );
      assert && values.forEach( value => assert( typeof value === 'string', 'Each value should be a string' ) );
      assert && assert( !_.includes( values, 'VALUES' ) );
      assert && assert( !_.includes( values, 'is' ) );

      for ( let value of values ) {
        // @public {string}
        this[ value ] = value;
      }

      // @public {Array.<string>}
      this.VALUES = values.slice(); // defensive copy

      beforeFreeze && beforeFreeze( this );
      assert && Object.freeze( this );
    }

    /**
     * Checks whether the given value is a value of this enumeration. Should generally be used for assertions
     * @public
     *
     * @param {string} value
     * @returns {boolean}
     */
    is( value ) {
      return this.VALUES.includes( value );
    }
  }

  return fractionsCommon.register( 'Enumeration', Enumeration );
} );
