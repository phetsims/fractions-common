// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var TemporaryUndoButton = require( 'FRACTIONS_COMMON/building/view/TemporaryUndoButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {NumberGroup} numberGroup
   * @param {Object} [options]
   */
  function NumberGroupNode( numberGroup, options ) {
    assert && assert( numberGroup instanceof NumberGroup );

    var self = this;

    options = _.extend( {
      // {boolean} - For pieces placed in stacks/containers, we don't care about the positionProperty. In addition,
      // pieces in stacks/containers ALSO care about not showing up when the piece is user-controlled or animating.
      isIcon: false,

      isSelectedProperty: new BooleanProperty( true ), // takes ownership, will dispose at the end

      dragBoundsProperty: null,

      // {ModelViewTransform2|null}
      modelViewTransform: null,

      dropListener: null,
      selectListener: null,
      removeLastListener: null,

      // node options
      cursor: 'pointer'
    }, options );

    Node.call( this );

    // @public {NumberGroup}
    this.numberGroup = numberGroup;

    // @private {ModelViewTransform2|null}
    this.modelViewTransform = options.modelViewTransform;

    assert && assert( options.isIcon || this.modelViewTransform, 'Positioned NumberGroupNodes need a MVT' );

    function createSpot( spot ) {
      var outline = Rectangle.bounds( spot.bounds, {
        stroke: FractionsCommonColorProfile.numberOutlineProperty,
        lineDash: [ 10, 5 ],
        lineWidth: 2,
        lineJoin: 'round'
      } );
      var text = new Text( ' ', {
        fill: FractionsCommonColorProfile.numberTextFillProperty,
        font: spot.type === NumberSpotType.WHOLE ? FractionsCommonConstants.NUMBER_WHOLE_FONT : FractionsCommonConstants.NUMBER_FRACTIONAL_FONT,
        center: outline.center // TODO: is this right-aligned instead for the whole number?
      } );
      var notAllowedSize = spot.bounds.width * 0.6; // Find the right ratio?
      var notAllowedShape = new Shape().circle( 0, 0, notAllowedSize )
                                       .moveToPoint( Vector2.createPolar( notAllowedSize, -0.25 * Math.PI ) )
                                       .lineToPoint( Vector2.createPolar( notAllowedSize, 0.75 * Math.PI ) );
      var notAllowedNode = new Path( notAllowedShape, {
        stroke: FractionsCommonColorProfile.numberNotAllowedProperty,
        lineWidth: 3,
        center: outline.center
      } );
      Property.multilink( [ spot.pieceProperty, spot.showNotAllowedProperty ], function( piece, notAllowed ) {
        if ( piece !== null ) {
          text.text = piece.number;
          text.center = outline.center;
        }
        text.visible = piece !== null;
        outline.visible = !text.visible && !notAllowed;
        notAllowedNode.visible = !text.visible && notAllowed;
      } );
      return new Node( { children: [ outline, notAllowedNode, text ] } );
    }

    var numeratorSpot = createSpot( numberGroup.numeratorSpot );
    var denominatorSpot = createSpot( numberGroup.denominatorSpot );
    var wholeSpot;
    if ( numberGroup.isMixedNumber ) {
      wholeSpot = createSpot( numberGroup.wholeSpot );
    }

    this.mouseArea = numberGroup.allSpotsBounds.dilatedX( 5 );
    this.touchArea = numberGroup.allSpotsBounds.dilatedX( 5 );

    var cardBackground = Rectangle.bounds( numberGroup.allSpotsBounds.dilatedXY( 20, 15 ), {
      fill: FractionsCommonColorProfile.numberFillProperty,
      stroke: FractionsCommonColorProfile.numberStrokeProperty,
      cornerRadius: FractionsCommonConstants.NUMBER_CORNER_RADIUS
    } );
    numberGroup.isCompleteProperty.linkAttribute( cardBackground, 'visible' );

    var fractionLine = new Line( {
      x1: -numberGroup.fractionLineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX,
      x2: numberGroup.fractionLineWidth / 2 + numberGroup.numeratorSpot.bounds.centerX,
      lineCap: 'round',
      lineWidth: 4,
      stroke: FractionsCommonColorProfile.numberFractionLineProperty
    } );

    // @private {Node}
    this.undoButton = new TemporaryUndoButton( options.removeLastListener, {
      // TODO: Make it computational
      rightCenter: cardBackground.leftCenter.plusXY( 5, 0 ) // Some slight overlap shown in mockups
    } );

    // @private {Property.<boolean>}
    this.isSelectedProperty = options.isSelectedProperty;

    // @private {function}
    this.undoVisibilityListener = Property.multilink( [ numberGroup.hasPiecesProperty, options.isSelectedProperty ], function( hasPieces, isSelected ) {
      self.undoButton.visible = hasPieces && isSelected;
    } );

    if ( !options.isIcon ) {
      // TODO: Factor out common code here between the groups!!!
      numberGroup.positionProperty.link( function( position ) {
        self.translation = options.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value );
      } );
      numberGroup.scaleProperty.link( function( scale ) {
        self.setScaleMagnitude( scale );
      } );

      // Don't allow touching once we start animating
      numberGroup.isAnimatingProperty.link( function( isAnimating ) {
        if ( isAnimating ) {
          self.pickable = false;
        }
      } );
    }

    this.children = [
      cardBackground
    ].concat( options.isIcon ? [] : [ this.undoButton ] ).concat( [
      fractionLine,
      numeratorSpot,
      denominatorSpot
    ] ).concat( numberGroup.isMixedNumber ? [ wholeSpot ] : [] );

    if ( !options.isIcon ) {
      // @private {Property.<Bounds2>}
      this.dragBoundsProperty = new DerivedProperty( [ options.dragBoundsProperty ], function( dragBounds ) {
        return dragBounds.withOffsets( cardBackground.left, cardBackground.top, -cardBackground.right, -cardBackground.bottom );
      } );

      // Keep the group in the drag bounds (when they change)
      this.dragBoundsProperty.lazyLink( function( dragBounds ) {
        numberGroup.positionProperty.value = dragBounds.closestPointTo( numberGroup.positionProperty.value );
      } );

      // @public {DragListener}
      this.dragListener = new DragListener( {
        // TODO: drag bounds
        targetNode: this,
        dragBoundsProperty: this.dragBoundsProperty,
        transform: options.modelViewTransform,
        locationProperty: numberGroup.positionProperty,
        start: function( event ) {
          options.selectListener && options.selectListener();
          self.moveToFront();
        },
        end: function( event ) {
          options.dropListener && options.dropListener();
        }
      } );
      this.addInputListener( this.dragListener );

      this.addInputListener( {
        down: function( event ) {
          options.selectListener && options.selectListener();
          event.handle();
        }
      } );
    }

    this.mutate( options );
  }

  fractionsCommon.register( 'NumberGroupNode', NumberGroupNode );

  return inherit( Node, NumberGroupNode, {
    /**
     * Releases references.
     * @public
     */
    dispose: function() {
      // Required disposal, since we are passing the isUserControlledProperty
      this.dragListener.dispose();
      this.dragBoundsProperty.dispose();
      this.undoButton.dispose();
      this.undoVisibilityListener.dispose();
      this.isSelectedProperty.dispose();

      Node.prototype.dispose.call( this );
    }
  }, {
    createIcon: function( isMixedNumber ) {
      return new NumberGroupNode( new NumberGroup( isMixedNumber ), {
        isIcon: true,
        scale: FractionsCommonConstants.NUMBER_BUILD_SCALE,
        pickable: false
      } );
    }
  } );
} );
