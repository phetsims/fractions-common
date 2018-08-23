// Copyright 2017, University of Colorado Boulder

/**
 * Scenery node for the visual representation of a fraction with up/down spinners for numerator/denominator
 *
 * @author Michael Moorer (Berea College)
 * @author Vincent Davis (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const FractionDisplayType = require( 'FRACTIONS_COMMON/common/enum/FractionDisplayType' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const Range = require( 'DOT/Range' );
  const RoundNumberSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundNumberSpinner' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const DENOMINATOR_RANGE = new Range( 1, 8 );

  class AdjustableFractionNode extends HBox {
    /**
     * @param {Property.<number>} numeratorProperty
     * @param {Property.<number>} denominatorProperty
     * @param {Property.<number>} containerCountProperty
     * @param {Object} [options]
     */
    constructor( numeratorProperty, denominatorProperty, containerCountProperty, options ) {
      options = _.extend( {
        // {FractionDisplayType}
        type: FractionDisplayType.IMPROPER
      }, options );

      // convenience variable
      var properties = [ numeratorProperty, denominatorProperty, containerCountProperty ];

      super( _.extend( {
        spacing: 10,
        children: [
          new PropertyFractionNode( numeratorProperty, denominatorProperty, {
            type: options.type,
            scale: 3
          } ),
          new VBox( {
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
                  return ( denominator + 1 ) <= DENOMINATOR_RANGE.max;
                } ),
                new DerivedProperty( properties, ( numerator, denominator, containerCount ) => {
                  return ( denominator - 1 ) >= DENOMINATOR_RANGE.min && numerator / ( denominator - 1 ) <= containerCount;
                } )
              )
            ]
          } )
        ]
      }, options ) );
    }
  }

  return fractionsCommon.register( 'AdjustableFractionNode', AdjustableFractionNode );
} );
