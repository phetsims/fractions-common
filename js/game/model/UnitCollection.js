// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  class UnitCollection {
    /**
     * @param {Array.<number>} quantities - quantities[ i ] represents the numerator n of ( n / ( i + 1 ) ).
     */
    constructor( quantities ) {

      // @public {Array.<number>}
      this.quantities = quantities;
    }

    /**
     * Returns the total fraction value of the full collection (all fractions added together).
     * @public
     *
     * @returns {Fraction}
     */
    get totalFraction() {
      return _.reduce( this.fractions, ( a, b ) => a.plus( b ), Fraction.ZERO ).reduced();
    }

    /**
     * Returns the value represented as a list of fractions (one for each denominator)
     * @public
     *
     * @returns {Array.<Fraction>}
     */
    get fractions() {
      return this.quantities.map( ( quantity, index ) => new Fraction( quantity, index + 1 ) ).filter( f => f.numerator !== 0 );
    }

    /**
     * Returns the collection as represented by unit fractions (1/x).
     * @public
     *
     * @returns {Array.<Fraction>}
     */
    get unitFractions() {
      return _.flatten( this.quantities.map( ( quantity, index ) => _.times( quantity, () => new Fraction( 1, index + 1 ) ) ) );
    }

    /**
     * Returns the total of all of the numerators.
     * @public
     *
     * @returns {number}
     */
    get totalQuantities() {
      return _.sum( this.quantities );
    }

    /**
     * Returns a value based on the lexicographic order of the two collections, used for sorting.
     * @public
     *
     * @param {UnitCollection} collection
     * @returns {number}
     */
    compare( collection ) {
      // We'll compare all of the indices, defaulting any not defined to 0
      const maxIndex = Math.max( this.quantities.length, collection.quantities.length ) - 1;

      for ( let i = 0; i <= maxIndex; i++ ) {
        const diff = ( this.quantities[ i ] || 0 ) - ( collection.quantities[ i ] || 0 );
        if ( diff ) {
          return diff;
        }
      }
      return 0;
    }

    /**
     * Returns whether the two collections have equal numbers of fractions.
     * @public
     *
     * @param {UnitCollection} collection
     * @returns {boolean}
     */
    equals( collection ) {
      return this.compare( collection ) === 0;
    }

    /**
     * Returns a string representation useful for debugging.
     * @public
     *
     * @returns {string}
     */
    toString() {
      return this.quantities.map( ( quantity, index ) => quantity ? `${quantity}/${index + 1}` : '' ).filter( _.identity ).join( ' + ' );
    }

    static allCollectionsTo8( fraction, options ) {
      const {
        maxQuantity = Number.POSITIVE_INFINITY,
        maxTotalQuantity = Number.POSITIVE_INFINITY,
        maxDenominator = 8 // TODO: pass in a list of denominators to the general version
      } = options || {};

      const results = [];

      fraction = fraction.reduced();
      const lcm = 8 * 3 * 5 * 7; // the LCM of 1 through 8.
      const aFactor = lcm;
      const bFactor = lcm / 2;
      const cFactor = lcm / 3;
      const dFactor = lcm / 4;
      const eFactor = lcm / 5;
      const fFactor = lcm / 6;
      const gFactor = lcm / 7;
      const hFactor = lcm / 8;
      const r = fraction.numerator * lcm / fraction.denominator;

      // If the reduced fraction's denominator does NOT divide our LCM, then there will be no solutions.
      if ( r % 1 !== 0 ) {
        return results;
      }

      const gMod = r % 7;
      const eMod = ( 2 * r ) % 5;

      for ( let g = gMod; g * gFactor <= r && g <= maxQuantity && g <= maxTotalQuantity && ( g === 0 || maxDenominator >= 7 ); g += 7 ) {
        const r7 = r - g * gFactor;
        const remaining7 = maxTotalQuantity - g;
        assert && assert( r7 % 7 === 0 );

        for ( let e = eMod; e * eFactor <= r7 && e <= maxQuantity && e <= remaining7 && ( e === 0 || maxDenominator >= 5 ); e += 5 ) {
          const r57 = r7 - e * eFactor;
          const remaining57 = remaining7 - e;
          assert && assert( r57 % 5 === 0 );

          const s = r57 / 5 / 7;
          assert && assert( s % 1 === 0 );
          const sMod = s % 3;

          for ( let c = 0; c * cFactor <= r57 && c <= maxQuantity && c <= remaining57 && ( c === 0 || maxDenominator >= 3 ); c++ ) {
            const r357 = r57 - c * cFactor;
            const remaining357 = remaining57 - c;

            for ( let f = 0; f * fFactor <= r357 && f <= maxQuantity && f <= remaining357 && ( f === 0 || maxDenominator >= 6 ); f++ ) {
              if ( ( 8 * c + 4 * f ) % 3 !== sMod ) { continue; }
              const r3567 = r357 - f * fFactor;
              const remaining3567 = remaining357 - f;

              for ( let a = 0; a * aFactor <= r3567 && a <= maxQuantity && a <= remaining3567 && ( a === 0 || maxDenominator >= 1 ); a++ ) {
                const r13567 = r3567 - a * aFactor;
                const remaining13567 = remaining3567 - a;

                for ( let b = 0; b * bFactor <= r13567 && b <= maxQuantity && b <= remaining13567 && ( b === 0 || maxDenominator >= 2 ); b++ ) {
                  const r123567 = r13567 - b * bFactor;
                  const remaining123567 = remaining13567 - b;

                  for ( let d = 0; d * dFactor <= r123567 && d <= maxQuantity && d <= remaining123567 && ( d === 0 || maxDenominator >= 4 ); d++ ) {
                    const r1234567 = r123567 - d * dFactor;
                    const remaining1234567 = remaining123567 - d;

                    const h = r1234567 / hFactor;

                    if ( h % 1 === 0 && h <= maxQuantity && h <= remaining1234567 && ( h === 0 || maxDenominator >= 8 ) ) {
                      const collection = new UnitCollection( [ a, b, c, d, e, f, g, h ] );

                      assert && assert( collection.totalFraction.equals( fraction ) );
                      assert && collection.quantities.forEach( quantity => assert( quantity <= maxQuantity ) );
                      assert && assert( _.sum( collection.quantities ) <= maxTotalQuantity );
                      results.push( collection );
                    }
                  }
                }
              }
            }
          }
        }
      }

      return results;
    }
  }

  return fractionsCommon.register( 'UnitCollection', UnitCollection );
} );
