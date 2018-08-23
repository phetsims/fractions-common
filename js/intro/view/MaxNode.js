// Copyright 2018, University of Colorado Boulder

/**
 * Displays an up/down control for handling the maximum number of "containers"
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const representationMaxString = require( 'string!FRACTIONS_COMMON/representationMax' );

  class MaxNode extends VBox {
    /**
     * @param {NumberProperty} containerCountProperty
     * @param {Object} [options]
     */
    constructor( containerCountProperty, options ) {
      super();

      options = _.extend( {
        spacing: 5
      }, options );

      const increaseButton = new RoundArrowButton( {
        mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
        enabledProperty: new DerivedProperty( [ containerCountProperty ], count => count < containerCountProperty.range.max ),
        listener: () => {
          containerCountProperty.value++;
        }
      } );
      const decreaseButton = new RoundArrowButton( {
        mutableBaseColor: FractionsCommonColorProfile.yellowRoundArrowButtonProperty,
        arrowRotation: Math.PI,
        enabledProperty: new DerivedProperty( [ containerCountProperty ], count => count > containerCountProperty.range.min ),
        listener: () => {
          containerCountProperty.value--;
        }
      } );

      const maxText = new Text( representationMaxString, { font: new PhetFont( 24 ) } );
      const readoutText = new Text( '', { font: new PhetFont( 24 ) } );

      // Figure out what the largest bounds are for the readout
      const maxReadoutBounds = Bounds2.NOTHING.copy();
      for ( let n = 1; n <= FractionsCommonConstants.MAX_SHAPE_CONTAINERS; n++ ) {
        readoutText.text = n;
        maxReadoutBounds.includeBounds( readoutText.bounds );
      }

      // Now update the readout text
      containerCountProperty.link( count => {
        readoutText.text = count;
      } );

      this.children = [
        maxText,
        new HBox( {
          spacing: 5,
          children: [
            new AlignBox( readoutText, {
              alignBounds: maxReadoutBounds
            } ),
            new VBox( {
              spacing: 3,
              children: [
                increaseButton,
                decreaseButton
              ]
            } )
          ]
        } )
      ];

      this.mutate( options );
    }
  }

  return fractionsCommon.register( 'MaxNode', MaxNode );
} );
