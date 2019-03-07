// Copyright 2018, University of Colorado Boulder

/**
 * Represents the goal "target" fraction along with its associated collection area values.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  class Target {
    /**
     * @param {Fraction} fraction
     */
    constructor( fraction ) {

      // @public {Fraction}
      this.fraction = fraction;

      // @public {Property.<Group|null>}
      this.groupProperty = new Property( null );

      // @public - Position of our target in model units (updated from the view)
      this.positionProperty = new Vector2Property( Vector2.ZERO );

      // @public {ObservableArray.<Group>}
      this.hoveringGroups = new ObservableArray();
    }
  }

  return fractionsCommon.register( 'Target', Target );
} );
