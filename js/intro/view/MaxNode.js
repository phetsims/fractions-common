// Copyright 2018-2019, University of Colorado Boulder

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
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RoundNumberSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundNumberSpinner' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const representationMaxString = require( 'string!FRACTIONS_COMMON/representationMax' );

  class MaxNode extends VBox {
    /**
     * @param {Property.<number>} containerCountProperty
     * @param {Object} [options]
     */
    constructor( containerCountProperty, options ) {
      super();

      options = _.extend( {
        spacing: 5
      }, options );

      const maxText = new Text( representationMaxString, {
        font: new PhetFont( 24 ),
        maxWidth: 100
      } );
      const readoutText = new Text( '', { font: new PhetFont( 34 ) } );

      // Figure out what the largest bounds are for the readout
      const maxReadoutBounds = Bounds2.NOTHING.copy();
      for ( let n = 1; n <= containerCountProperty.range.max; n++ ) {
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
            new RoundNumberSpinner(
              containerCountProperty,
              new DerivedProperty( [ containerCountProperty ], value => value < containerCountProperty.range.max ),
              new DerivedProperty( [ containerCountProperty ], value => value > containerCountProperty.range.min )
            )
          ]
        } )
      ];

      this.mutate( options );
    }
  }

  return fractionsCommon.register( 'MaxNode', MaxNode );
} );
