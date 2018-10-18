// Copyright 2018, University of Colorado Boulder

/**
 * Displays a fraction based on a numerator/denominator Property pair.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const FractionDisplayType = require( 'FRACTIONS_COMMON/common/enum/FractionDisplayType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );

  class PropertyFractionNode extends MixedFractionNode {
    /**
     * @param {Property.<number>} numeratorProperty
     * @param {Property.<number>} denominatorProperty
     * @param {Object} [options]
     */
    constructor( numeratorProperty, denominatorProperty, options ) {
      options = _.extend( {
        // {FractionDisplayType}
        type: FractionDisplayType.IMPROPER,

        // {boolean}
        simplify: false
      }, options );

      assert && assert( FractionDisplayType.includes( options.type ) );
      assert && assert( typeof options.simplify === 'boolean' );

      super( options );

      // @private {Property.<number>}
      this.numeratorProperty = numeratorProperty;
      this.denominatorProperty = denominatorProperty;

      // @private {function}
      this.propertyListener = this.updateFromProperties.bind( this );

      // @private {FractionDisplayType}
      this.type = options.type;

      // @private {boolean}
      this.simplify = options.simplify;

      this.numeratorProperty.lazyLink( this.propertyListener );
      this.denominatorProperty.lazyLink( this.propertyListener );
      this.updateFromProperties();
    }

    /**
     * Updates our display based on our Property values.
     * @private
     */
    updateFromProperties() {
      const numerator = this.numeratorProperty.value;
      const denominator = this.denominatorProperty.value;

      const hasWhole = this.type === FractionDisplayType.IMPROPER || !this.simplify || numerator === 0 || numerator >= denominator;
      const hasFraction = this.type === FractionDisplayType.IMPROPER || !this.simplify || numerator > 0;

      this.denominator = hasFraction ? denominator : null;

      if ( this.type === FractionDisplayType.MIXED ) {
        this.whole = hasWhole ? Math.floor( numerator / denominator ) : null;
        this.numerator = hasFraction ? ( numerator % denominator ) : null;
      }
      else {
        this.numerator = numerator;
      }
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.numeratorProperty.unlink( this.propertyListener );
      this.denominatorProperty.unlink( this.propertyListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'PropertyFractionNode', PropertyFractionNode );
} );
