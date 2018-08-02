// Copyright 2017, University of Colorado Boulder

/**
 * draw the rectangle
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroConstants = require( 'FRACTIONS_COMMON/intro/IntroConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {number} denominator
   * @param {Object} [options]
   */
  function RectangleNode( denominator, options ) {

    options = _.extend( {
        dropShadow: false,
        dropShadowOffset: 5,
        rectangleOrientation: 'vertical',
        isIcon: false
      },
      options );

    var rectangle = IntroConstants.VERTICAL_RECTANGULAR_SIZE;
    var rectangleWidth = rectangle.width;
    var rectangleHeight = rectangle.height / denominator;

    // determine the size of the rectangle size and pieces in th bucket depend upon the representation
    if ( options.rectangleOrientation === 'horizontal' ) {
      rectangle = IntroConstants.HORIZONTAL_RECTANGULAR_SIZE;
      rectangleWidth = rectangle.width / denominator;
      rectangleHeight = rectangle.height;
    }

    //executes condition if the isIcon is true
    if ( options.isIcon ) {
      rectangleHeight /= 4;
      rectangleWidth /= 4;
    }
    var foregroundRectangle = new Rectangle( {
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

    Node.call( this, options );

    // @public {Vector2}
    this.midpointOffset = this.center;
  }

  fractionsCommon.register( 'RectangleNode', RectangleNode );

  return inherit( Node, RectangleNode );
} );
