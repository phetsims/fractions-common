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

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Fraction} fraction
   */
  function Target( fraction ) {

    // @public {Fraction}
    this.fraction = fraction;
  }

  fractionsCommon.register( 'Target', Target );

  return inherit( Object, Target );
} );
