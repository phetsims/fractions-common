// Copyright 2018-2019, University of Colorado Boulder

/**
 * View for a NumberPiece.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Touch = require( 'SCENERY/input/Touch' );
  const Vector2 = require( 'DOT/Vector2' );

  class NumberPieceNode extends Node {
    /**
     * @param {NumberPiece} numberPiece
     * @param {Object} [options]
     */
    constructor( numberPiece, options ) {
      assert && assert( numberPiece instanceof NumberPiece );

      options = merge( {
        // {function|null} - Called when it is dropped, with a single argument of whether it was from a touch.
        dropListener: null,

        // {boolean} - For pieces placed in stacks/containers, we don't care about the positionProperty. In addition,
        // pieces in stacks/containers ALSO care about not showing up when the piece is user-controlled or animating.
        positioned: false,

        // {ModelViewTransform2|null} - If positioned, a model-view-transform should be provided.
        modelViewTransform: null
      }, options );

      super();

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
      this.visibilityListener = Property.multilink( [
        numberPiece.isUserControlledProperty,
        numberPiece.isAnimatingProperty
      ], ( isUserControlled, isAnimating ) => {
        if ( !this.positioned ) {
          this.visible = !isUserControlled && !isAnimating;
        }
      } );

      let wasTouch = false;

      // @public {DragListener}
      this.dragListener = new DragListener( {
        targetNode: this,
        transform: options.modelViewTransform,
        positionProperty: numberPiece.positionProperty,
        start: event => {
          wasTouch = event.pointer instanceof Touch;
        },
        end: () => {
          options.dropListener && options.dropListener( wasTouch );
        }
      } );

      // No need to unlink, as we own the given Property (same lifetime, and we own the listener)
      this.dragListener.isUserControlledProperty.link( controlled => {
        numberPiece.isUserControlledProperty.value = controlled;
      } );

      this.mutate( options );
    }

    /**
     * Updates the position of this node to correspond to the model position.
     * @public
     */
    updatePosition() {
      this.translation = this.modelViewTransform.modelToViewPosition( this.numberPiece.positionProperty.value );
    }

    /**
     * Updates the scale of this node to correspond to the model scale.
     * @public
     */
    updateScale() {
      this.setScaleMagnitude( this.numberPiece.scaleProperty.value );
    }

    /**
     * Handles animation changes.
     * @public
     */
    updateAnimating() {
      if ( this.numberPiece.isAnimatingProperty.value ) {
        this.moveToBack();
        this.pickable = false;
      }
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      // Required disposal, since we are passing the isUserControlledProperty
      this.dragListener.dispose();

      this.visibilityListener.dispose();

      if ( this.positioned ) {
        this.numberPiece.positionProperty.unlink( this.positionListener );
        this.numberPiece.scaleProperty.unlink( this.scaleListener );
        this.numberPiece.isAnimatingProperty.unlink( this.animatingListener );
      }

      super.dispose();
    }
  }

  return fractionsCommon.register( 'NumberPieceNode', NumberPieceNode );
} );
