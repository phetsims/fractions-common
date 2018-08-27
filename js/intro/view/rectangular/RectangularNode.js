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
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  class RectangularNode extends Node {
    /**
     * @param {number} denominator
     * @param {Object} [options]
     */
    constructor( denominator, options ) {

      options = _.extend( {
        dropShadow: false,
        dropShadowOffset: 5,
        rectangleOrientation: 'vertical',
        isIcon: false
      }, options );

      var rectangle = RectangularNode.VERTICAL_RECTANGULAR_SIZE;
      var rectangleWidth = rectangle.width;
      var rectangleHeight = rectangle.height / denominator;

      // determine the size of the rectangle size and pieces in th bucket depend upon the representation
      if ( options.rectangleOrientation === 'horizontal' ) {
        rectangle = RectangularNode.HORIZONTAL_RECTANGULAR_SIZE;
        rectangleWidth = rectangle.width / denominator;
        rectangleHeight = rectangle.height;
      }

      //executes condition if the isIcon is true
      if ( options.isIcon ) {
        rectangleHeight /= 4;
        rectangleWidth /= 4;
      }
      var foregroundRectangle = new Rectangle( {
        rectX: -rectangleWidth / 2,
        rectY: -rectangleHeight / 2,
        rectWidth: rectangleWidth,
        rectHeight: rectangleHeight,

        // determine the color depend upon representation
        fill: options.rectangleOrientation === 'horizontal' ? '#ED4344' : '#FFE600',
        stroke: 'black',
        lineWidth: options.isIcon ? 1 : 3
      } );

      options.children = [ foregroundRectangle ];

      // creates dropShadow
      if ( options.dropShadow ) {
        var backgroundRectangle = new Rectangle( {
          center: foregroundRectangle.center.plusXY( options.dropShadowOffset, options.dropShadowOffset ),
          rectWidth: rectangleWidth,
          rectHeight: rectangleHeight,
          fill: 'black',
          lineWidth: 2
        } );

        options.children = [ backgroundRectangle, foregroundRectangle ];
      }

      super( options );
    }

    /**
     * The size of vertical rectangular nodes.
     * @public
     *
     * @returns {Dimension2}
     */
    static get VERTICAL_RECTANGULAR_SIZE() { return new Dimension2( 130, 185 ); }

    /**
     * The size of horizontal rectangular nodes.
     * @public
     *
     * @returns {Dimension2}
     */
    static get HORIZONTAL_RECTANGULAR_SIZE() { return new Dimension2( 300, 50 ); }
  }

  return fractionsCommon.register( 'RectangularNode', RectangularNode );
} );
