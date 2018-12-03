// Copyright 2018, University of Colorado Boulder

/**
 * View for a NumberGroup.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const GroupNode = require( 'FRACTIONS_COMMON/building/view/GroupNode' );
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

  class NumberGroupNode extends GroupNode {
    /**
     * @param {NumberGroup} numberGroup
     * @param {Object} [options]
     */
    constructor( numberGroup, options ) {
      assert && assert( numberGroup instanceof NumberGroup );

      options = _.extend( {
        hasCardBackground: true,
        dragBoundsProperty: null,
        removeLastListener: null,

        // node options
        cursor: 'pointer'
      }, options );

      super( numberGroup, options );

      // @public {NumberGroup}
      this.numberGroup = numberGroup;

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
          center: outline.center
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

      const cardBackground = new Rectangle( {
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
        lineCap: 'round',
        lineWidth: 4,
        stroke: FractionsCommonColorProfile.numberFractionLineProperty
      } );

      // @private {Node}
      this.returnButton = new ReturnButton( options.removeLastListener );
      this.itemsToDispose.push( this.returnButton );

      // @private {function}
      this.allSpotsBoundsListener = allSpotsBounds => {
        const expandedBounds = allSpotsBounds.dilatedX( 5 );
        this.mouseArea = expandedBounds;
        this.touchArea = expandedBounds;
        cardBackground.rectBounds = allSpotsBounds.dilatedXY( 20, 15 );
        this.returnButton.rightCenter = cardBackground.leftCenter.plusXY( 5, 0 ); // Some slight overlap shown in mockups
      };
      this.numberGroup.allSpotsBoundsProperty.link( this.allSpotsBoundsListener );

      // @private {function}
      this.fractionLineLengthListener = hasDoubleDigits => {
        const lineWidth = hasDoubleDigits ? 60 : 40;
        fractionLine.x1 = -lineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX;
        fractionLine.x2 = lineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX;
      };
      this.numberGroup.hasDoubleDigitsProperty.link( this.fractionLineLengthListener );

      // @private {function}
      this.undoVisibilityListener = Property.multilink( [ numberGroup.hasPiecesProperty, this.isSelectedProperty ], ( hasPieces, isSelected ) => {
        this.returnButton.visible = hasPieces && isSelected;
      } );
      this.itemsToDispose.push( this.undoVisibilityListener );

      this.children = [
        ...( options.hasCardBackground ? [ cardBackground ] : [] ),
        ...( this.isIcon ? [] : [ this.returnButton ] ),
        fractionLine,
        numeratorSpot,
        denominatorSpot,
        ...( numberGroup.isMixedNumber ? [ wholeSpot ] : [] )
      ];

      if ( !this.isIcon ) {
        // @private {Property.<Bounds2>}
        this.dragBoundsProperty = new DerivedProperty( [ options.dragBoundsProperty, this.numberGroup.allSpotsBoundsProperty ], ( dragBounds, allSpotsBounds ) => {
          return dragBounds.withOffsets( cardBackground.left, cardBackground.top, -cardBackground.right, -cardBackground.bottom );
        } );
        this.itemsToDispose.push( this.dragBoundsProperty );

        // Keep the group in the drag bounds (when they change)
        this.dragBoundsProperty.lazyLink( dragBounds => {
          numberGroup.positionProperty.value = dragBounds.closestPointTo( numberGroup.positionProperty.value );
        } );

        this.attachDragListener( this.dragBoundsProperty, this, options );
      }

      this.mutate( options );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.numberGroup.isCompleteProperty.unlink( this.completeVisibilityListener );
      this.numberGroup.hasDoubleDigitsProperty.unlink( this.fractionLineLengthListener );
      this.numberGroup.allSpotsBoundsProperty.unlink( this.allSpotsBoundsListener );

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
