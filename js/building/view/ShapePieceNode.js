// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Shape = require( 'KITE/Shape' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_WIDTH / 2;
  var BAR_WIDTH = FractionsCommonConstants.SHAPE_WIDTH;
  var BAR_HEIGHT = FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapePiece} shapePiece
   * @param {Object} [options]
   */
  function ShapePieceNode( shapePiece, options ) {
    assert && assert( shapePiece instanceof ShapePiece );

    options = _.extend( {
      dropListener: null // {function|null} - Called when it is dropped
    }, options );

    var self = this;

    Node.call( this );

    // @public {ShapePiece}
    this.shapePiece = shapePiece;

    var fractionValue = shapePiece.fraction.getValue();
    assert && assert( fractionValue <= 1 );

    var nodeOptions = {
      fill: shapePiece.colorProperty,
      stroke: FractionsCommonColorProfile.shapePieceStrokeProperty
    };
    if ( shapePiece.representation === Representation.CIRCLE ) {
      if ( fractionValue === 1 ) {
        this.addChild( new Circle( CIRCLE_RADIUS, nodeOptions ) );
      }
      else {
        var sliceShape = new Shape().moveTo( 0, 0 )
                                    .lineTo( CIRCLE_RADIUS, 0 )
                                    .arc( 0, 0, CIRCLE_RADIUS, 0, -fractionValue * 2 * Math.PI, true )
                                    .close();
        this.addChild( new Path( sliceShape, nodeOptions ) );
      }
    }
    else if ( shapePiece.representation === Representation.VERTICAL_BAR ) {
      this.addChild( new Rectangle( 0, -BAR_HEIGHT / 2, fractionValue * BAR_WIDTH, BAR_HEIGHT, nodeOptions ) );
    }
    else {
      throw new Error( 'Unsupported representation for ShapePieceNode: ' + shapePiece.representation );
    }

    // TODO: hmm, we don't want this on some. Maybe just have it for draggable ones?
    shapePiece.positionProperty.lazyLink( function( position ) {
      // TODO: add an offset for approximately where our "center" looks
      self.translation = position;
    } );

    // @public {DragListener}
    this.dragListener = new DragListener( {
      // TODO: drag bounds
      targetNode: this,
      locationProperty: shapePiece.positionProperty,
      end: function( event ) {
        options.dropListener && options.dropListener();
      }
    } );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapePieceNode', ShapePieceNode );

  return inherit( Node, ShapePieceNode );
} );
