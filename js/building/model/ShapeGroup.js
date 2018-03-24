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
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Representation} representation
   */
  function ShapeGroup( representation ) {

    // @public {Representation}
    this.representation = representation;

    // @public {Property.<Vector2>}
    this.positionProperty = new Property( Vector2.ZERO );

    // @public {ObservableArray.<ShapeContainer>} - Should generally only be popped/pushed
    this.shapeContainers = new ObservableArray();

    // @public {Property.<number>}
    this.partitionDenominatorProperty = new NumberProperty( 1, {
      range: new Range( 1, 8 ),
      numberType: 'Integer'
    } );
  }

  fractionsCommon.register( 'ShapeGroup', ShapeGroup );

  return inherit( Object, ShapeGroup );
} );
