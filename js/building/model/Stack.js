// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class Stack {
    constructor() {

      // @public {Property.<Vector2>} - Position of our stack in model units (updated from the view)
      this.positionProperty = new Property( Vector2.ZERO );

      // TODO: abstract out the observable array if needed/desired?
    }
  }

  return fractionsCommon.register( 'Stack', Stack );
} );
