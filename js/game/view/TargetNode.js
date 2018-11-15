// Copyright 2018, University of Colorado Boulder

/**
 * Shows a container with a given visual representation of the target (what should go in it).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const FilledPartitionNode = require( 'FRACTIONS_COMMON/game/view/FilledPartitionNode' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const GradientRectangle = require( 'FRACTIONS_COMMON/common/view/GradientRectangle' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ReturnButton = require( 'FRACTIONS_COMMON/building/view/ReturnButton' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapeTarget = require( 'FRACTIONS_COMMON/game/model/ShapeTarget' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const CORNER_RADIUS = 5;
  const CORNER_OFFSET = 1;

  class TargetNode extends HBox {
    /**
     * @param {Target} target
     * @param {FractionChallenge} challenge
     */
    constructor( target, challenge ) {
      super( {
        spacing: 10
      } );

      // @private {Target}
      this.target = target;

      // @private {ModelViewTransform|null}
      this.modelViewTransform = null;

      // @private {Node|null}
      this.parentContainer = null;

      const isShapeTarget = target instanceof ShapeTarget;

      // @private {Node|null}
      this.placeholder = null;
      if ( challenge.hasShapes ) {
        const shapeGroup = new ShapeGroup( challenge.representation );
        _.times( challenge.maxTargetWholes - 1, () => shapeGroup.increaseContainerCount() );
        this.placeholder = new ShapeGroupNode( shapeGroup, {
          isIcon: true,
          hasButtons: false,
          scale: FractionsCommonConstants.SHAPE_COLLECTION_SCALE
        } );
      }
      else {
        const numberGroup = new NumberGroup( challenge.hasMixedTargets );
        numberGroup.numeratorSpot.pieceProperty.value = new NumberPiece( challenge.maxNumber );
        numberGroup.denominatorSpot.pieceProperty.value = new NumberPiece( challenge.maxNumber );
        if ( challenge.hasMixedTargets ) {
          numberGroup.wholeSpot.pieceProperty.value = new NumberPiece( challenge.maxNumber );
        }
        this.placeholder = new NumberGroupNode( numberGroup, {
          isIcon: true,
          hasCardBackground: false,
          scale: FractionsCommonConstants.NUMBER_COLLECTION_SCALE
        } );
      }

      this.background = new Rectangle( 0, 0, this.placeholder.width + ( challenge.hasShapes ? 20 : challenge.hasMixedTargets ? 60 : 80 ), 100, {
        cornerRadius: CORNER_RADIUS,
        fill: FractionsCommonColorProfile.collectionBackgroundProperty,
        stroke: FractionsCommonColorProfile.collectionBorderProperty
      } );
      this.placeholder.dispose();
      this.placeholder = null;

      // @private {GradientRectangle}
      this.highlight = new GradientRectangle( {
        fill: 'yellow'
      } );
      this.highlight.rectBounds = this.background.bounds.eroded( 5 );
      this.highlight.extension = 0.5;
      this.highlight.margin = 10;
      this.highlightListener = hoveringCount => {
        this.highlight.visible = hoveringCount > 0;
      };
      this.target.hoveringGroups.lengthProperty.link( this.highlightListener );

      // @private {Rectangle}
      this.container = new Node( {
        children: [
          this.highlight,
          this.background
        ]
      } );

      // @private {Vector2}
      this.groupCenter = this.background.center.plusXY( 0, challenge.hasShapes ? 10 : 0 );

      // @private {Node|null}
      this.groupNode = null;

      // @private {Node}
      this.returnButton = new ReturnButton( () => {
        // TODO: cleanup?
        if ( this.groupNode ) {
          const group = target.groupProperty.value;

          // If the group hasn't fully completed its animation, then force it to complete early.
          group.animator.endAnimation();

          target.groupProperty.value = null;
          if ( challenge.hasShapes ) {
            challenge.shapeGroups.push( group );
            challenge.returnShapeGroup( group );
          }
          else {
            challenge.numberGroups.push( group );
            challenge.returnNumberGroup( group );
          }
        }
      }, {
        cornerRadius: CORNER_RADIUS - CORNER_OFFSET,
        leftTop: this.background.leftTop.plus( new Vector2( CORNER_OFFSET, CORNER_OFFSET ) )
      } );
      this.container.addChild( this.returnButton );

      // @private {function}
      this.groupListener = group => {
        this.returnButton.visible = !!group;

        this.groupNode && this.groupNode.dispose();
        this.groupNode = null;

        if ( group ) {
          if ( challenge.hasShapes ) {
            this.groupNode = new ShapeGroupNode( group, {
              isIcon: true,
              hasButtons: false,
              scale: FractionsCommonConstants.SHAPE_COLLECTION_SCALE,
              positioned: false
            } );
          }
          else {
            this.groupNode = new NumberGroupNode( group, {
              isIcon: true,
              hasCardBackground: false,
              scale: FractionsCommonConstants.NUMBER_COLLECTION_SCALE,
              positioned: false
            } );
          }
          this.groupNode.center = this.groupCenter;
          this.container.addChild( this.groupNode );

          if ( this.modelViewTransform ) {
            // Whenever we get a group placed, we need to update the target location so that the subsequent animation
            // goes to the right place.
            target.positionProperty.value = this.modelViewTransform.viewToModelPosition(
              this.groupNode.getUniqueTrailTo( this.parentContainer ).localToGlobalPoint( Vector2.ZERO )
            );
          }
        }
      };
      this.target.groupProperty.link( this.groupListener );

      this.addChild( this.container );

      if ( isShapeTarget ) {
        this.addChild( new HBox( {
          scale: 0.6,
          spacing: 8,
          children: target.filledPartitions.map( filledPartition => new FilledPartitionNode( filledPartition ) )
        } ) );
      }
      else {
        let whole = challenge.hasMixedTargets ? Math.floor( target.fraction.value ) : null;
        let numerator = whole ? target.fraction.minus( new Fraction( whole, 1 ) ).numerator : target.fraction.numerator;
        let denominator = target.fraction.denominator;
        this.addChild( new MixedFractionNode( {
          whole: whole === 0 ? null : whole,
          numerator: numerator === 0 ? ( whole === null ? 0 : null ) : numerator,
          denominator
        } ) );
      }
    }

    /**
     * Sets the model positions of our model objects corresponding to their displayed (view) positions.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Node} parentContainer - A parent node that contains this node, and has no transform relative to the
     *                                 screenView.
     */
    updateModelLocations( modelViewTransform, parentContainer ) {
      this.modelViewTransform = modelViewTransform;
      this.parentContainer = parentContainer;

      // Initialize with an approximate location so we can compute the closest target
      this.target.positionProperty.value = modelViewTransform.viewToModelPosition(
        this.container.getUniqueTrailTo( parentContainer ).localToGlobalPoint( this.groupCenter )
      );
    }

    /**
     * Disposes the node
     * @public
     * @override
     */
    dispose() {
      this.target.groupProperty.unlink( this.groupListener );
      this.target.hoveringGroups.lengthProperty.unlink( this.highlightListener );

      this.groupNode && this.groupNode.dispose();
      this.highlight.dispose();
      this.returnButton.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'TargetNode', TargetNode );
} );
