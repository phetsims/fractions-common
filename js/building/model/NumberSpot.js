// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {NumberGroup} numberGroup
   * @param {NumberSpotType} type
   * @param {Bounds2} bounds
   */
  function NumberSpot( numberGroup, type, bounds ) {

    // @public {NumberGroup}
    this.numberGroup = numberGroup;

    // @public {NumberSpotType}
    this.type = type;

    // @public {Bounds2}
    this.bounds = bounds;

    // @public {Property.<NumberPiece|null>}
    this.pieceProperty = new Property( null );

    // @public {Property.<boolean>}
    this.showNotAllowedProperty = new BooleanProperty( false );
  }

  fractionsCommon.register( 'NumberSpot', NumberSpot );

  return inherit( Object, NumberSpot );
} );
