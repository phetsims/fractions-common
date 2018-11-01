// Copyright 2018, University of Colorado Boulder

/**
 * View for a NumberGroup.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ReturnButton = require( 'FRACTIONS_COMMON/building/view/ReturnButton' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  class NumberGroupNode extends Node {
    /**
     * @param {NumberGroup} numberGroup
     * @param {Object} [options]
     */
    constructor( numberGroup, options ) {
      assert && assert( numberGroup instanceof NumberGroup );

      // TODO: cleanup
      options = _.extend( {
        // {boolean} - For pieces placed in stacks/containers, we don't care about the positionProperty. In addition,
        // pieces in stacks/containers ALSO care about not showing up when the piece is user-controlled or animating.
        isIcon: false,

        hasCardBackground: true,

        isSelectedProperty: new BooleanProperty( true ), // takes ownership, will dispose at the end

        dragBoundsProperty: null,

        // {ModelViewTransform2|null}
        modelViewTransform: null,

        dragListener: null, // TODO: naming for this!
        dropListener: null,
        selectListener: null,
        removeLastListener: null,

        // node options
        cursor: 'pointer',

        // TODO: cleanup
        positioned: true
      }, options );

      super();

      // @public {NumberGroup}
      this.numberGroup = numberGroup;

      // @private {ModelViewTransform2|null}
      this.modelViewTransform = options.modelViewTransform;

      // @private {Array.<*>}
      this.itemsToDispose = [];

      assert && assert( options.isIcon || this.modelViewTransform, 'Positioned NumberGroupNodes need a MVT' );

      const createSpot = spot => {
        const outline = Rectangle.bounds( spot.bounds, {
          stroke: FractionsCommonColorProfile.numberOutlineProperty,
          lineDash: [ 10, 5 ],
          lineWidth: 2,
          lineJoin: 'round'
        } );
        const text = new Text( ' ', {
          fill: FractionsCommonColorProfile.numberTextFillProperty,
          font: spot.type === NumberSpotType.WHOLE ? FractionsCommonConstants.NUMBER_WHOLE_FONT : FractionsCommonConstants.NUMBER_FRACTIONAL_FONT,
          center: outline.center // TODO: is this right-aligned instead for the whole number?
        } );
        const notAllowedSize = spot.bounds.width * 0.6; // Find the right ratio?
        const notAllowedShape = new Shape().circle( 0, 0, notAllowedSize )
                                         .moveToPoint( Vector2.createPolar( notAllowedSize, -0.25 * Math.PI ) )
                                         .lineToPoint( Vector2.createPolar( notAllowedSize, 0.75 * Math.PI ) );
        const notAllowedNode = new Path( notAllowedShape, {
          stroke: FractionsCommonColorProfile.numberNotAllowedProperty,
          lineWidth: 3,
          center: outline.center
        } );
        this.itemsToDispose.push( Property.multilink( [ spot.pieceProperty, spot.showNotAllowedProperty ], ( piece, notAllowed ) => {
          if ( piece !== null ) {
            text.text = piece.number;
            text.center = outline.center;
          }
          text.visible = piece !== null;
          outline.visible = !text.visible && !notAllowed;
          notAllowedNode.visible = !text.visible && notAllowed;
        } ) );
        return new Node( { children: [ outline, notAllowedNode, text ] } );
      };

      const numeratorSpot = createSpot( numberGroup.numeratorSpot );
      const denominatorSpot = createSpot( numberGroup.denominatorSpot );
      let wholeSpot;
      if ( numberGroup.isMixedNumber ) {
        wholeSpot = createSpot( numberGroup.wholeSpot );
      }

      this.mouseArea = numberGroup.allSpotsBounds.dilatedX( 5 );
      this.touchArea = numberGroup.allSpotsBounds.dilatedX( 5 );

      const cardBackground = Rectangle.bounds( numberGroup.allSpotsBounds.dilatedXY( 20, 15 ), {
        fill: FractionsCommonColorProfile.numberFillProperty,
        stroke: FractionsCommonColorProfile.numberStrokeProperty,
        cornerRadius: FractionsCommonConstants.NUMBER_CORNER_RADIUS
      } );

      // @private {function}
      this.completeVisibilityListener = isComplete => {
        cardBackground.visible = isComplete;
      };
      this.numberGroup.isCompleteProperty.link( this.completeVisibilityListener );

      const fractionLine = new Line( {
        x1: -numberGroup.fractionLineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX,
        x2: numberGroup.fractionLineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX,
        lineCap: 'round',
        lineWidth: 4,
        stroke: FractionsCommonColorProfile.numberFractionLineProperty
      } );

      // @private {Node}
      this.returnButton = new ReturnButton( options.removeLastListener, {
        // TODO: Make it computational
        rightCenter: cardBackground.leftCenter.plusXY( 5, 0 ) // Some slight overlap shown in mockups
      } );
      this.itemsToDispose.push( this.returnButton );

      // @private {Property.<boolean>}
      this.isSelectedProperty = options.isSelectedProperty;
      this.itemsToDispose.push( this.isSelectedProperty );

      // @private {function}
      this.undoVisibilityListener = Property.multilink( [ numberGroup.hasPiecesProperty, options.isSelectedProperty ], ( hasPieces, isSelected ) => {
        this.returnButton.visible = hasPieces && isSelected;
      } );
      this.itemsToDispose.push( this.undoVisibilityListener );

      if ( !options.isIcon ) {
        // TODO: Factor out common code here between the groups!!!
        // @private {function}
        this.positionListener = position => {
          this.translation = options.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value );
        };
        this.numberGroup.positionProperty.link( this.positionListener );

        // @private {function}
        this.scaleListener = scale => {
          this.setScaleMagnitude( scale );
        };
        this.numberGroup.scaleProperty.link( this.scaleListener );

        // Don't allow touching once we start animating
        // @private {function}
        this.isAnimatingListener = isAnimating => {
          this.pickable = !isAnimating;
        };
        this.numberGroup.isAnimatingProperty.link( this.isAnimatingListener );
      }

      this.children = [
        ...( options.hasCardBackground ? [ cardBackground ] : [] ),
        ...( options.isIcon ? [] : [ this.returnButton ] ),
        fractionLine,
        numeratorSpot,
        denominatorSpot,
        ...( numberGroup.isMixedNumber ? [ wholeSpot ] : [] )
      ];

      // @private {function}
      this.visibilityListener = isAnimating => {
        if ( !options.positioned ) {
          this.visible = !isAnimating;
        }
      };
      this.numberGroup.isAnimatingProperty.link( this.visibilityListener );

      if ( !options.isIcon ) {
        // @private {Property.<Bounds2>}
        this.dragBoundsProperty = new DerivedProperty( [ options.dragBoundsProperty ], dragBounds => {
          return dragBounds.withOffsets( cardBackground.left, cardBackground.top, -cardBackground.right, -cardBackground.bottom );
        } );
        this.itemsToDispose.push( this.dragBoundsProperty );

        // Keep the group in the drag bounds (when they change)
        this.dragBoundsProperty.lazyLink( dragBounds => {
          numberGroup.positionProperty.value = dragBounds.closestPointTo( numberGroup.positionProperty.value );
        } );

        // @public {DragListener}
        this.dragListener = new DragListener( {
          // TODO: drag bounds
          targetNode: this,
          dragBoundsProperty: this.dragBoundsProperty,
          transform: options.modelViewTransform,
          locationProperty: numberGroup.positionProperty,
          start: event => {
            options.selectListener && options.selectListener();
            this.moveToFront();
          },
          drag: event => {
            options.dragListener && options.dragListener();
          },
          end: event => {
            options.dropListener && options.dropListener();
          }
        } );
        this.itemsToDispose.push( this.dragListener );
        this.addInputListener( this.dragListener );

        this.addInputListener( {
          down: event => {
            options.selectListener && options.selectListener();
            event.handle();
          }
        } );
      }

      this.mutate( options );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.numberGroup.isAnimatingProperty.unlink( this.visibilityListener );
      this.numberGroup.isCompleteProperty.unlink( this.completeVisibilityListener );
      this.positionListener && this.numberGroup.positionProperty.unlink( this.positionListener );
      this.scaleListener && this.numberGroup.scaleProperty.unlink( this.scaleListener );
      this.isAnimatingListener && this.numberGroup.isAnimatingProperty.unlink( this.isAnimatingListener );
      this.itemsToDispose.forEach( item => item.dispose() );

      super.dispose();
    }

    /**
     * Creates an icon for the number group node.
     * @public
     *
     * @param {boolean} isMixedNumber
     * @returns {Node}
     */
    static createIcon( isMixedNumber ) {
      return new NumberGroupNode( new NumberGroup( isMixedNumber ), {
        isIcon: true,
        scale: FractionsCommonConstants.NUMBER_BUILD_SCALE,
        pickable: false
      } );
    }
  }

  return fractionsCommon.register( 'NumberGroupNode', NumberGroupNode );
} );
