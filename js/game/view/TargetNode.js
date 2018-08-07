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

      const isShapeTarget = target instanceof ShapeTarget;

      // @private {Node|null}
      this.placeholder = null;
      if ( challenge.hasShapes ) {
        const shapeGroup = new ShapeGroup( challenge.representation );
        shapeGroup.partitionDenominatorProperty.value = target.fraction.denominator;
        _.times( challenge.maxTargetWholes, () => shapeGroup.increaseContainerCount() );
        this.placeholder = new ShapeGroupNode( shapeGroup, {
          isIcon: true,
          hasButtons: false,
          scale: 0.5
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
          scale: 0.5
        } );
      }

      // @private {Rectangle}
      this.container = new Rectangle( 0, 0, Math.max( 100, this.placeholder.width + 20 ), 100, {
        cornerRadius: CORNER_RADIUS,
        fill: FractionsCommonColorProfile.collectionBackgroundProperty,
        stroke: FractionsCommonColorProfile.collectionBorderProperty
      } );

      this.placeholder.center = this.container.center.plusXY( 0, challenge.hasShapes ? 10 : 0 );
      this.container.addChild( this.placeholder );

      // @private {Node}
      this.returnButton = new ReturnButton( () => {}, {
        cornerRadius: CORNER_RADIUS - CORNER_OFFSET,
        leftTop: this.container.leftTop.plus( new Vector2( CORNER_OFFSET, CORNER_OFFSET ) )
      } );
      this.container.addChild( this.returnButton );

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
  }

  return fractionsCommon.register( 'TargetNode', TargetNode );
} );
