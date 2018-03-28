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
  var Touch = require( 'SCENERY/input/Touch' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var CIRCLE_RADIUS = FractionsCommonConstants.SHAPE_SIZE / 2;
  var BAR_WIDTH = FractionsCommonConstants.SHAPE_SIZE;
  var BAR_HEIGHT = FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT;
  var SHADOW_VECTOR = new Vector2( 4, 4 );

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
      // {function|null} - Called when it is dropped, with a single argument of whether it was from a touch.
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

    // @private {Node|null}
    this.viewNode = null;
    this.shadowNode = null;

    var nodeOptions = {
      fill: shapePiece.colorProperty,
      stroke: FractionsCommonColorProfile.shapePieceStrokeProperty
    };
    var shadowOptions = {
      fill: FractionsCommonColorProfile.shapeShadowProperty
    };
    if ( shapePiece.representation === Representation.CIRCLE ) {
      if ( fractionValue === 1 ) {
        this.viewNode = new Circle( CIRCLE_RADIUS, nodeOptions );
        this.shadowNode = new Circle( CIRCLE_RADIUS, shadowOptions ); // TODO: conditionally create?
      }
      else {
        var translation = ShapePiece.getSweptCentroid( shapePiece.fraction ).negated();
        var sliceShape = new Shape().moveTo( translation.x, translation.y )
                                    .lineTo( CIRCLE_RADIUS + translation.x, translation.y )
                                    .arc( translation.x, translation.y, CIRCLE_RADIUS, 0, -fractionValue * 2 * Math.PI, true )
                                    .close();
        this.viewNode = new Path( sliceShape, nodeOptions );
        this.shadowNode = new Path( sliceShape, shadowOptions );
      }
    }
    else if ( shapePiece.representation === Representation.VERTICAL_BAR ) {
      var width = fractionValue * BAR_WIDTH;
      this.viewNode = new Rectangle( -width / 2, -BAR_HEIGHT / 2, width, BAR_HEIGHT, nodeOptions );
      this.shadowNode = new Rectangle( -width / 2, -BAR_HEIGHT / 2, width, BAR_HEIGHT, shadowOptions );
    }
    else {
      throw new Error( 'Unsupported representation for ShapePieceNode: ' + shapePiece.representation );
    }
    if ( this.positioned ) {
      // @private {Node}
      this.shadowContainer = new Node();
      this.shadowContainer.addChild( this.shadowNode );
      this.addChild( this.shadowContainer );
    }
    this.addChild( this.viewNode );

    // @private {function}
    this.positionListener = this.updatePosition.bind( this );
    this.scaleListener = this.updateScale.bind( this );
    this.rotationListener = this.updateRotation.bind( this );
    this.animatingListener = this.updateAnimating.bind( this );
    this.shadowListener = this.updateShadow.bind( this );
    if ( this.positioned ) {
      this.shapePiece.positionProperty.link( this.positionListener );
      this.shapePiece.scaleProperty.link( this.scaleListener );
      this.shapePiece.rotationProperty.link( this.rotationListener );
      this.shapePiece.isAnimatingProperty.link( this.animatingListener );
      this.shapePiece.shadowProperty.link( this.shadowListener );
    }

    // @private {function}
    this.visibilityListener = Property.multilink( [ shapePiece.isUserControlledProperty, shapePiece.isAnimatingProperty ], function( isUserControlled, isAnimating ) {
      if ( !self.positioned ) {
        self.visible = !isUserControlled && !isAnimating;
      }
    } );

    var wasTouch = false;

    // @public {DragListener}
    this.dragListener = new DragListener( {
      // TODO: drag bounds
      targetNode: this,
      transform: options.modelViewTransform,
      locationProperty: shapePiece.positionProperty,
      isUserControlledProperty: shapePiece.isUserControlledProperty,
      start: function( event ) {
        wasTouch = event.pointer instanceof Touch;
      },
      end: function() {
        options.dropListener && options.dropListener( wasTouch );
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
     * Updates the rotation of this node to correspond to the model rotation.
     * @public
     */
    updateRotation: function() {
      this.viewNode.rotation = this.shapePiece.rotationProperty.value;
      if ( this.positioned ) {
        this.shadowNode.rotation = this.shapePiece.rotationProperty.value;
      }
    },

    /**
     * Updates the scale of this node to correspond to the model scale.
     * @public
     */
    updateScale: function() {
      this.setScaleMagnitude( this.shapePiece.scaleProperty.value );
    },

    /**
     * Updates whether the shadow is visible or not
     * @public
     */
    updateShadow: function() {
      this.shadowContainer.translation = SHADOW_VECTOR.timesScalar( this.shapePiece.shadowProperty.value );
    },

    /**
     * Handles animation changes.
     * @public
     */
    updateAnimating: function() {
      if ( this.shapePiece.isAnimatingProperty.value ) {
        this.moveToBack();
        this.pickable = false;
      }
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
        this.shapePiece.scaleProperty.unlink( this.scaleListener );
        this.shapePiece.rotationProperty.unlink( this.rotationListener );
        this.shapePiece.isAnimatingProperty.unlink( this.animatingListener );
        this.shapePiece.shadowProperty.unlink( this.shadowListener );
      }

      Node.prototype.dispose.call( this );
    }
  } );
} );
