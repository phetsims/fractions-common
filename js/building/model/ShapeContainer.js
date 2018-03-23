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
  var ObservableArray = require( 'AXON/ObservableArray' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Representation} representation
   */
  function ShapeContainer( representation ) {

    // @public {Representation}
    this.representation = representation;

    // @public {ObservableArray.<ShapePiece>}
    this.shapePieces = new ObservableArray();
  }

  fractionsCommon.register( 'ShapeContainer', ShapeContainer );

  return inherit( Object, ShapeContainer );
} );
