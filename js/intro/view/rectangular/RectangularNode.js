// Copyright 2018, University of Colorado Boulder

/**
 * Displays a rectangular slice of area.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );

  // constants
  const HORIZONTAL_SIZE = new Dimension2( 250, 50 );
  const VERTICAL_SIZE = new Dimension2( 115, 185 );

  class RectangularNode extends Node {
    /**
     * @param {number} denominator
     * @param {Object} [options]
     */
    constructor( denominator, options ) {
      assert && assert( typeof denominator === 'number' );

      options = _.extend( {
        dropShadow: false,
        rectangularOrientation: RectangularOrientation.VERTICAL_SIZE,

        // {ColorDef} - If non-null, it will override the given color
        colorOverride: null
      }, options );

      assert && assert( typeof options.dropShadow === 'boolean' );
      assert && assert( RectangularOrientation.is( options.rectangularOrientation ) );

      super();

      const size = RectangularNode.getSize( options.rectangularOrientation );
      let rectWidth = size.width;
      let rectHeight = size.height;
      if ( options.rectangularOrientation === RectangularOrientation.VERTICAL ) {
        rectHeight /= denominator;
      }
      else {
        rectWidth /= denominator;
      }

      const defaultColor = options.rectangularOrientation === RectangularOrientation.HORIZONTAL
        ? FractionsCommonColorProfile.introHorizontalBarProperty
        : FractionsCommonColorProfile.introVerticalBarProperty;

      var mainRectangle = new Rectangle( {
        rectX: -rectWidth / 2,
        rectY: -rectHeight / 2,
        rectWidth,
        rectHeight,
        fill: options.colorOverride ? options.colorOverride : defaultColor,
        stroke: 'black'
      } );

      var shadowRectangle = new Rectangle( {
        center: mainRectangle.center.plusScalar( FractionsCommonConstants.INTRO_DROP_SHADOW_OFFSET ),
        rectWidth,
        rectHeight,
        fill: 'black'
      } );

      this.children = [
        ...( options.dropShadow ? [
          shadowRectangle
        ] : [] ),
        mainRectangle
      ];

      this.mutate( options );
    }

    /**
     * Returns the size of the rectangle for a given orientation.
     * @public
     *
     * @param {RectangularOrientation}
     * @returns {Dimension2}
     */
    static getSize( orientation ) {
      assert && assert( RectangularOrientation.is( orientation ) );

      if ( orientation === RectangularOrientation.VERTICAL ) {
        return VERTICAL_SIZE;
      }
      else {
        return HORIZONTAL_SIZE;
      }
    }
  }

  return fractionsCommon.register( 'RectangularNode', RectangularNode );
} );
