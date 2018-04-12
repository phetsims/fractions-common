// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var StackNodesBox = require( 'FRACTIONS_COMMON/building/view/StackNodesBox' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {BuildingLabModel} model
   * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
   */
  function LabNumberPanel( model, pressCallback ) {
    // @private {StackNodesBox}
    // TODO: slight cleanup
    this.box = new StackNodesBox( [ model.numberGroupStacks[ 0 ] ].concat( model.numberStacks ).concat( model.allowMixedNumbers ? [ model.numberGroupStacks[ 1 ] ] : [] ), pressCallback );

    // TODO: background color customizable
    Panel.call( this, this.box, {
      xMargin: 20
    } );
  }

  fractionsCommon.register( 'LabNumberPanel', LabNumberPanel );

  return inherit( Panel, LabNumberPanel, {
    // TODO: doc
    updateModelLocations: function( modelViewTransform ) {
      this.box.updateModelLocations( modelViewTransform, this );
    }
  } );
} );
