// Copyright 2018, University of Colorado Boulder

/**
 * Bottom panel for fraction challenges that holds the pieces.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Panel = require( 'SUN/Panel' );
  const StackNodesBox = require( 'FRACTIONS_COMMON/building/view/StackNodesBox' );

  class FractionChallengePanel extends Panel {
    /**
     * @param {FractionChallenge} challenge
     * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
     */
    constructor( challenge, pressCallback ) {
      const box = new StackNodesBox( [
        ...challenge.shapeStacks,
        ...challenge.numberStacks,
        ...challenge.shapeGroupStacks,
        ...challenge.numberGroupStacks
      ], pressCallback );

      // TODO: background color customizable
      super( box, {
        xMargin: 20
      } );

      // @private {StackNodesBox}
      this.box = box;
    }

    updateModelLocations( modelViewTransform ) {
      this.box.updateModelLocations( modelViewTransform, this );
    }
  }

  return fractionsCommon.register( 'FractionChallengePanel', FractionChallengePanel );
} );
