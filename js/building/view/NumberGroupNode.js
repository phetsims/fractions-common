// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

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

      // {ModelViewTransform2|null}
      modelViewTransform: null,

      dropListener: null,

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
      spot.pieceProperty.link( function( piece ) {
        if ( piece !== null ) {
          text.text = piece.number;
          text.center = outline.center;
        }
        text.visible = piece !== null;
        outline.visible = !text.visible;
      } );
      return new Node( { children: [ outline, text ] } );
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
      cardBackground,
      fractionLine,
      numeratorSpot,
      denominatorSpot
    ].concat( numberGroup.isMixedNumber ? [ wholeSpot ] : [] );

    // @public {DragListener}
    this.dragListener = new DragListener( {
      // TODO: drag bounds
      targetNode: this,
      transform: options.modelViewTransform,
      locationProperty: numberGroup.positionProperty,
      start: function( event ) {
        self.moveToFront();
      },
      end: function( event ) {
        options.dropListener && options.dropListener();
      }
    } );
    this.addInputListener( this.dragListener );

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

      Node.prototype.dispose.call( this );
    }
  } );
} );
