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
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ReturnButton = require( 'FRACTIONS_COMMON/building/view/ReturnButton' );
  const ShapeTarget = require( 'FRACTIONS_COMMON/game/model/ShapeTarget' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const CORNER_RADIUS = 5;
  const CORNER_OFFSET = 1;

  class TargetNode extends HBox {
    /**
     * @param {Target} target
     */
    constructor( target ) {
      super( {
        spacing: 10
      } );

      const isShapeTarget = target instanceof ShapeTarget;

      // @private {Rectangle}
      this.container = new Rectangle( 0, 0, 100, 100, {
        cornerRadius: CORNER_RADIUS,
        fill: FractionsCommonColorProfile.collectionBackgroundProperty,
        stroke: FractionsCommonColorProfile.collectionBorderProperty
      } );

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
