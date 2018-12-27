// Copyright 2018, University of Colorado Boulder

/**
 * Utilities or references used for all of the fractions sims
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Screen = require( 'JOIST/Screen' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  const FractionsCommonGlobals = {
    /**
     * Wraps content with a background and centered alignment (for home screen / navbar icons).
     * @public
     *
     * @param {Node} content
     * @param {PaintDef} backgroundFill
     * @returns {Node}
     */
    wrapIcon( content, backgroundFill ) {
      const background = new Rectangle( {
        rectBounds: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds( 0, 0 ),
        fill: backgroundFill
      } );

      return new Node( {
        children: [
          background,
          new AlignBox( content, {
            alignBounds: background.bounds
          } )
        ]
      } );
    }
  };

  return fractionsCommon.register( 'FractionsCommonGlobals', FractionsCommonGlobals );
} );
