// Copyright 2018, University of Colorado Boulder

/**
 * What type of representation is being shown.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'FRACTIONS_COMMON/common/enum/Enumeration' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Vector2 = require( 'DOT/Vector2' );

  const Representation = new Enumeration( [
    'CIRCLE',
    'HORIZONTAL_BAR',
    'VERTICAL_BAR',
    'BEAKER',
    'CAKE',
    'NUMBER_LINE'
  ], Representation => {
    // @public {Array.<Representation>} - Values allowed for shape representations (lab/build-a-fraction/etc.)
    Representation.SHAPE_VALUES = [
      Representation.CIRCLE,
      Representation.VERTICAL_BAR
    ];

    /**
     * Returns the offset for a stack given the index.
     * @public
     *
     * @param {Representation} representation
     * @param {number} index
     *
     * @returns {Vector2}
     */
    Representation.getOffset = ( representation, index ) => {
      return new Vector2( ( representation === Representation.CIRCLE ? 1 : -1 ) * 4 * index, -4 * index );
    };
  } );

  return fractionsCommon.register( 'Representation', Representation );
} );
