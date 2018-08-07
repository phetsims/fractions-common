// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @constructor
   * @extends {MutableOptionsNode}
   *
   * @param {function} callback
   * @param {Object} [options]
   */
  function ReturnButton( callback, options ) {

    // TODO: Copied from UndoButton in expression-exchange. IF this is kept as-is, factor out into a common component.
    var ICON_HEIGHT = 17; // empirically determined, controls size of icon
    var undoArrowShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( 0, ICON_HEIGHT )
      .lineTo( ICON_HEIGHT, ICON_HEIGHT )
      .lineTo( ICON_HEIGHT * 0.7, ICON_HEIGHT * 0.7 )
      .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.1, ICON_HEIGHT * 2, ICON_HEIGHT * 0.75 )
      .quadraticCurveTo( ICON_HEIGHT * 1.25, -ICON_HEIGHT * 0.5, ICON_HEIGHT * 0.3, ICON_HEIGHT * 0.3 )
      .close();

    MutableOptionsNode.call( this, RectangularPushButton, [], _.extend( {
      content: new Path( undoArrowShape, {
        fill: 'black',
        scale: 0.7
      } ),
      xMargin: 5,
      yMargin: 5,
      listener: function() {
        callback();
      }
    }, options ), {
      baseColor: FractionsCommonColorProfile.undoButtonProperty
    } );
  }

  fractionsCommon.register( 'ReturnButton', ReturnButton );

  return inherit( MutableOptionsNode, ReturnButton );
} );
