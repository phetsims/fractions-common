// Copyright 2018, University of Colorado Boulder

/**
 * Button for group nodes that returns a piece from the group to the panel it came from.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  const Path = require( 'SCENERY/nodes/Path' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Shape = require( 'KITE/Shape' );

  const ICON_HEIGHT = 17;

  class ReturnButton extends MutableOptionsNode {
    /**
     * @param {function} listener
     * @param {Object} [options]
     */
    constructor( listener, options ) {
      const undoArrowShape = new Shape()
        .moveTo( 0, 0 )
        .lineTo( 0, ICON_HEIGHT )
        .lineTo( ICON_HEIGHT, ICON_HEIGHT )
        .lineTo( ICON_HEIGHT * 0.7, ICON_HEIGHT * 0.7 )
        .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.1, ICON_HEIGHT * 2, ICON_HEIGHT * 0.75 )
        .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.5, ICON_HEIGHT * 0.3, ICON_HEIGHT * 0.3 )
        .close();

      super( RectangularPushButton, [], _.extend( {
        content: new Path( undoArrowShape, {
          fill: 'black',
          scale: 0.7
        } ),
        xMargin: 5,
        yMargin: 5,
        listener
      }, options ), {
        baseColor: FractionsCommonColorProfile.undoButtonProperty
      } );
    }
  }

  return fractionsCommon.register( 'ReturnButton', ReturnButton );
} );
