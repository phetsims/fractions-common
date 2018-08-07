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
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MixedFractionNode = require( 'FRACTIONS_COMMON/common/view/MixedFractionNode' );
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
        shapeGroup.partitionDenominatorProperty.value = target.fraction.denominator;
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

      // @private {Rectangle}
      this.container = new Rectangle( 0, 0, this.placeholder.width + ( challenge.hasShapes ? 20 : challenge.hasMixedTargets ? 60 : 80 ), 100, {
        cornerRadius: CORNER_RADIUS,
        fill: FractionsCommonColorProfile.collectionBackgroundProperty,
        stroke: FractionsCommonColorProfile.collectionBorderProperty
      } );

      // @private {Vector2}
      this.groupCenter = this.container.center.plusXY( 0, challenge.hasShapes ? 10 : 0 );

      // @private {Node|null}
      this.groupNode = null;

      // @private {Node}
      this.returnButton = new ReturnButton( () => {
        // TODO: cleanup?
        if ( this.groupNode ) {
          const group = target.groupProperty.value;
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
        leftTop: this.container.leftTop.plus( new Vector2( CORNER_OFFSET, CORNER_OFFSET ) )
      } );
      this.container.addChild( this.returnButton );

      // @private {function}
      this.groupListener = group => {
        this.returnButton.visible = !!group;

        this.groupNode && this.groupNode.dispose();

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

          // Whenever we get a group placed, we need to update the target location so that the subsequent animation
          // goes to the right place.
          target.positionProperty.value = this.modelViewTransform.viewToModelPosition(
            this.groupNode.getUniqueTrailTo( this.parentContainer ).localToGlobalPoint( Vector2.ZERO )
          );
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
        let whole = Math.floor( target.fraction.getValue() );
        let numerator = target.fraction.minus( new Fraction( whole, 1 ) ).numerator;
        let denominator = target.fraction.denominator;
        this.addChild( new MixedFractionNode( {
          whole: whole === 0 ? null : whole,
          numerator,
          denominator
        } ) );
      }
    }

    // TODO: doc and cleanup
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

      this.groupNode && this.groupNode.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'TargetNode', TargetNode );
} );
