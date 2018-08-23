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
        type: FractionDisplayType.IMPROPER
      }, options );

      assert && assert( FractionDisplayType.is( options.type ) );

      super( options );

      // @private {Property.<number>}
      this.numeratorProperty = numeratorProperty;
      this.denominatorProperty = denominatorProperty;

      // @private {function}
      this.propertyListener = this.updateFromProperties.bind( this );

      // @private {FractionDisplayType}
      this.type = options.type;

      this.numeratorProperty.lazyLink( this.propertyListener );
      this.denominatorProperty.lazyLink( this.propertyListener );
      this.updateFromProperties();
    }

    /**
     * Updates our display based on our Property values.
     * @private
     */
    updateFromProperties() {
      this.denominator = this.denominatorProperty.value;

      if ( this.type === FractionDisplayType.MIXED ) {
        this.whole = Math.floor( this.numeratorProperty.value / this.denominatorProperty.value ) || null;
        this.numerator = this.numeratorProperty.value % this.denominatorProperty.value;
      }
      else {
        this.numerator = this.numeratorProperty.value;
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
