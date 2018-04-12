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
  var Stack = require( 'FRACTIONS_COMMON/building/model/Stack' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Stack}
   *
   * @param {Representation} representation
   */
  function ShapeGroupStack( representation ) {

    Stack.call( this );

    // @public {Representation}
    this.representation = representation;
    
    // @public {ObservableArray.<ShapeGroup>} - NOTE: These should only ever be popped/pushed.
    this.shapeGroups = new ObservableArray();
  }

  fractionsCommon.register( 'ShapeGroupStack', ShapeGroupStack );

  return inherit( Stack, ShapeGroupStack, {}, {
    // TODO: doc
    getOffset: function( index ) {
      return new Vector2( -4 * index, 4 * index );
    }
  } );
} );
