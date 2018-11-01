// Copyright 2018, University of Colorado Boulder

/**
 * The bottom panel with number pieces/groups for the Lab screen.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Panel = require( 'SUN/Panel' );
  const StackNodesBox = require( 'FRACTIONS_COMMON/building/view/StackNodesBox' );

  class LabNumberPanel extends Panel {
    /**
     * @param {BuildingLabModel} model
     * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
     */
    constructor( model, pressCallback ) {
      const box = new StackNodesBox( [
        model.numberGroupStacks[ 0 ],
        ...model.numberStacks,
        ...( model.allowMixedNumbers ? [ model.numberGroupStacks[ 1 ] ] : [] )
      ], pressCallback );

      super( box, {
        xMargin: 20
      } );

      // @private {StackNodesBox}
      this.box = box;
    }

    /**
     * Sets the model positions of our model objects corresponding to their displayed (view) positions.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     */
    updateModelLocations( modelViewTransform ) {
      this.box.updateModelLocations( modelViewTransform, this );
    }
  }

  return fractionsCommon.register( 'LabNumberPanel', LabNumberPanel );
} );
