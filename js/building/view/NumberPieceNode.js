// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Touch = require( 'SCENERY/input/Touch' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {NumberPiece} numberPiece
   * @param {Object} [options]
   */
  function NumberPieceNode( numberPiece, options ) {
    assert && assert( numberPiece instanceof NumberPiece );

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

    // @public {NumberPiece}
    this.numberPiece = numberPiece;

    // @private {boolean}
    this.positioned = options.positioned;

    // @private {ModelViewTransform2|null}
    this.modelViewTransform = options.modelViewTransform;

    assert && assert( !this.positioned || this.modelViewTransform, 'Positioned NumberPieceNodes need a MVT' );

    this.addChild( Rectangle.bounds( numberPiece.bounds, {
      fill: FractionsCommonColorProfile.numberFillProperty,
      stroke: FractionsCommonColorProfile.numberStrokeProperty,
      cornerRadius: FractionsCommonConstants.NUMBER_CORNER_RADIUS
    } ) );

    this.addChild( new Text( numberPiece.number, {
      font: FractionsCommonConstants.NUMBER_FRACTIONAL_FONT,
      fill: FractionsCommonColorProfile.numberTextFillProperty,
      center: Vector2.ZERO
    } ) );

    // @private {function}
    this.positionListener = this.updatePosition.bind( this );
    this.scaleListener = this.updateScale.bind( this );
    this.animatingListener = this.updateAnimating.bind( this );
    if ( this.positioned ) {
      this.numberPiece.positionProperty.link( this.positionListener );
      this.numberPiece.scaleProperty.link( this.scaleListener );
      this.numberPiece.isAnimatingProperty.link( this.animatingListener );
    }

    // @private {function}
    this.visibilityListener = Property.multilink( [ numberPiece.isUserControlledProperty, numberPiece.isAnimatingProperty ], function( isUserControlled, isAnimating ) {
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
      locationProperty: numberPiece.positionProperty,
      isUserControlledProperty: numberPiece.isUserControlledProperty,
      start: function( event ) {
        wasTouch = event.pointer instanceof Touch;
      },
      end: function() {
        options.dropListener && options.dropListener( wasTouch );
      }
    } );

    this.mutate( options );
  }

  fractionsCommon.register( 'NumberPieceNode', NumberPieceNode );

  return inherit( Node, NumberPieceNode, {
    /**
     * Updates the position of this node to correspond to the model position.
     * @public
     */
    updatePosition: function() {
      this.translation = this.modelViewTransform.modelToViewPosition( this.numberPiece.positionProperty.value );
    },

    /**
     * Updates the scale of this node to correspond to the model scale.
     * @public
     */
    updateScale: function() {
      this.setScaleMagnitude( this.numberPiece.scaleProperty.value );
    },

    /**
     * Handles animation changes.
     * @public
     */
    updateAnimating: function() {
      if ( this.numberPiece.isAnimatingProperty.value ) {
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
        this.numberPiece.positionProperty.unlink( this.positionListener );
        this.numberPiece.scaleProperty.unlink( this.scaleListener );
        this.numberPiece.isAnimatingProperty.unlink( this.animatingListener );
      }

      Node.prototype.dispose.call( this );
    }
  } );
} );
