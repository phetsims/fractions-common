// Copyright 2018, University of Colorado Boulder

/**
 * Displays a fraction with up/down spinners for both the numerator and denominator.
 *
 * @author Michael Moorer (Berea College)
 * @author Vincent Davis (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const FractionDisplayType = require( 'FRACTIONS_COMMON/common/model/FractionDisplayType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const RoundNumberSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundNumberSpinner' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class AdjustableFractionNode extends HBox {
    /**
     * @param {NumberProperty} numeratorProperty
     * @param {NumberProperty} denominatorProperty
     * @param {NumberProperty} containerCountProperty
     * @param {Object} [options]
     */
    constructor( numeratorProperty, denominatorProperty, containerCountProperty, options ) {
      options = _.extend( {
        // {FractionDisplayType}
        type: FractionDisplayType.IMPROPER,

        // {boolean} - If false, the spinners will be to the left
        spinnersOnRight: true
      }, options );

      // convenience variable
      const properties = [ numeratorProperty, denominatorProperty, containerCountProperty ];

      const fractionNode = new PropertyFractionNode( numeratorProperty, denominatorProperty, {
        type: options.type,
        scale: 3,

        maxNumerator: numeratorProperty.range.max,
        maxDenominator: denominatorProperty.range.max
      } );

      const spinnersNode = new VBox( {
        spacing: 30,
        children: [
          // Numerator
          new RoundNumberSpinner(
            numeratorProperty,
            new DerivedProperty( properties, ( numerator, denominator, containerCount ) => {
              return ( numerator + 1 ) / denominator <= containerCount;
            } ),
            new DerivedProperty( properties, ( numerator, denominator, containerCount ) => {
              return ( numerator - 1 ) >= 0;
            } )
          ),
          // Denominator
          new RoundNumberSpinner(
            denominatorProperty,
            new DerivedProperty( properties, ( numerator, denominator, containerCount ) => {
              return ( denominator + 1 ) <= denominatorProperty.range.max;
            } ),
            new DerivedProperty( properties, ( numerator, denominator, containerCount ) => {
              return ( denominator - 1 ) >= denominatorProperty.range.min && numerator / ( denominator - 1 ) <= containerCount;
            } )
          )
        ]
      } );

      super( _.extend( {
        spacing: 10,
        children: options.spinnersOnRight ? [
          fractionNode,
          spinnersNode
        ] : [
          spinnersNode,
          fractionNode
        ]
      }, options ) );
    }
  }

  return fractionsCommon.register( 'AdjustableFractionNode', AdjustableFractionNode );
} );
