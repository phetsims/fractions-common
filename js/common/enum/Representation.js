// Copyright 2017, University of Colorado Boulder

/**
 * What type of representation is being shown.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Vector2 = require( 'DOT/Vector2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  const Representation = {
    CIRCLE: 'CIRCLE',
    HORIZONTAL_BAR: 'HORIZONTAL_BAR',
    VERTICAL_BAR: 'VERTICAL_BAR',
    BEAKER: 'BEAKER',
    CAKE: 'CAKE',
    NUMBER_LINE: 'NUMBER_LINE'
  };

  fractionsCommon.register( 'Representation', Representation );

  // @public {Array.<Representation>} - All values the enumeration can take.
  Representation.VALUES = [
    Representation.CIRCLE,
    Representation.HORIZONTAL_BAR,
    Representation.VERTICAL_BAR,
    Representation.BEAKER,
    Representation.CAKE,
    Representation.NUMBER_LINE
  ];

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

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( Representation ); }

  return Representation;
} );
