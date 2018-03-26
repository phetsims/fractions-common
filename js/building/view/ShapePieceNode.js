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
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Shape = require( 'KITE/Shape' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;
  var BAR_WIDTH = FractionsCommonConstants.SHAPE_SIZE;
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

    var self = this;

    options = _.extend( {
      // {function|null} - Called when it is dropped
      dropListener: null,

      // {boolean} - For pieces placed in stacks/containers, we don't care about the positionProperty. In addition,
      // pieces in stacks/containers ALSO care about not showing up when the piece is user-controlled or animating.
      positioned: false,

      // {ModelViewTransform2|null} - If positioned, a model-view-transform should be provided.
      modelViewTransform: null
    }, options );

    Node.call( this );

    // @public {ShapePiece}
    this.shapePiece = shapePiece;

    // @private {boolean}
    this.positioned = options.positioned;

    // @private {ModelViewTransform2|null}
    this.modelViewTransform = options.modelViewTransform;

    assert && assert( !this.positioned || this.modelViewTransform, 'Positioned ShapePieceNodes need a MVT' );

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
        this.addChild( new Path( sliceShape, _.extend( {
          translation: ShapePiece.getSweptCentroid( shapePiece.fraction ).negated()
        }, nodeOptions ) ) );
      }
    }
    else if ( shapePiece.representation === Representation.VERTICAL_BAR ) {
      var width = fractionValue * BAR_WIDTH;
      this.addChild( new Rectangle( -width / 2, -BAR_HEIGHT / 2, width, BAR_HEIGHT, nodeOptions ) );
    }
    else {
      throw new Error( 'Unsupported representation for ShapePieceNode: ' + shapePiece.representation );
    }

    // @private {function}
    this.positionListener = this.updatePosition.bind( this );
    if ( this.positioned ) {
      this.shapePiece.positionProperty.link( this.positionListener );
    }

    // @private {function}
    this.visibilityListener = Property.multilink( [ shapePiece.isUserControlledProperty, shapePiece.isAnimatingProperty ], function( isUserControlled, isAnimating ) {
      if ( !self.positioned ) {
        self.visible = !isUserControlled && !isAnimating;
      }
    } );

    // @public {DragListener}
    this.dragListener = new DragListener( {
      // TODO: drag bounds
      targetNode: this,
      transform: options.modelViewTransform,
      locationProperty: shapePiece.positionProperty,
      isUserControlledProperty: shapePiece.isUserControlledProperty,
      end: function( event ) {
        options.dropListener && options.dropListener();
      }
    } );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapePieceNode', ShapePieceNode );

  return inherit( Node, ShapePieceNode, {
    /**
     * Updates the position of this node to correspond to the model position.
     * @public
     */
    updatePosition: function() {
      this.translation = this.modelViewTransform.modelToViewPosition( this.shapePiece.positionProperty.value );
    },

    /** 
     * Releases references.
     * @public
     */
    dispose: function() {
      // Required disposal, since we are passing the isUserControlledProperty
      this.dragListener.dispose();

      this.visibilityListener.dispose();

      if ( this.positioned ) {
        this.shapePiece.positionProperty.unlink( this.positionListener );
      }

      Node.prototype.dispose.call( this );
    }
  } );
} );
