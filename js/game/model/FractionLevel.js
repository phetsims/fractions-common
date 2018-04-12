// Copyright 2018, University of Colorado Boulder

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
  var NumberProperty = require( 'AXON/NumberProperty' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {number} number
   * @param {number} numTargets
   */
  function FractionLevel( number, numTargets ) {

    // @public {number}
    this.number = number;

    // @public {number}
    this.numTargets = numTargets;

    // @public {Property.<number>}
    this.scoreProperty = new NumberProperty( 0 );
  }

  fractionsCommon.register( 'FractionLevel', FractionLevel );

  return inherit( Object, FractionLevel, {
    /**
     * Resets the object.
     * @public
     */
    reset: function() {
      this.scoreProperty.reset();
    }
  } );
} );
