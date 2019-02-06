// Copyright 2019, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const FilledPartition = require( 'FRACTIONS_COMMON/game/model/FilledPartition' );
  const FillType = require( 'FRACTIONS_COMMON/game/model/FillType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const MatchPiece = require( 'FRACTIONS_COMMON/matching/model/MatchPiece' );
  const MatchSpot = require( 'FRACTIONS_COMMON/matching/model/MatchSpot' );
  const MatchTarget = require( 'FRACTIONS_COMMON/matching/model/MatchTarget' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );

  // constants
  const NUM_PAIRS = 6;
  const PIECE_COLORS = [
    FractionsCommonColorProfile.shapeBlueProperty,
    FractionsCommonColorProfile.shapeGreenProperty,
    FractionsCommonColorProfile.shapeRedProperty
  ];

  class MatchingChallenge {
    /**
     * @param {number} levelNumber
     * @param {Object} config
     */
    constructor( levelNumber, config ) {

      config = _.extend( {
        // {Array.<Fraction>}
        fractions: [],

        // {Array.<ShapePartition>} optional
        shapePartitions: [
          ...ShapePartition.PIES,
          ...ShapePartition.HORIZONTAL_BARS,
          ...ShapePartition.VERTICAL_BARS,
          ...ShapePartition.PLUS_SIGNS,
          ...ShapePartition.GRIDS,
          ...ShapePartition.PYRAMIDS,
          ...ShapePartition.POLYGONS,
          ...ShapePartition.DIAGONAL_LS,
          ...ShapePartition.INTERLEAVED_LS,
          ShapePartition.TETRIS,
          ShapePartition.SIX_FLOWER,
          ShapePartition.FIVE_POINT,
          ShapePartition.NINJA_STAR,
          ShapePartition.HEX_RING
        ],

        // {boolean}
        hasMixedNumbers: false,

        // {Array.<FillType>} optional
        fillTypes: [
          FillType.SEQUENTIAL
        ],

        // {Array.<number>} optional
        numericScaleFactors: [ 1 ],

        // {Property.<boolean>} optional
        timeVisibleProperty: new BooleanProperty( true )
      }, config );

      assert && assert( config.fractions.length > 0 );

      // @public {Property.<boolean>}
      this.timeVisibleProperty = config.timeVisibleProperty;

      // @public {number}
      this.levelNumber = levelNumber;

      // @public {Property.<number>}
      this.scoreProperty = new NumberProperty( 0 );

      // @public {Property.<number>}
      this.elapsedTimeProperty = new NumberProperty( 0 );

      // @public {MatchingChallenge} - Set externally if, when going from this challenge to the specified one, there
      // should instead be a "refresh" animation instead of "next" challenge.
      this.refreshedChallenge = null;

      // @public {Array.<MatchSpot>}
      this.sourceSpots = _.range( 0, 2 * NUM_PAIRS ).map( () => new MatchSpot() );
      this.scaleSpots = _.range( 0, 2 ).map( () => new MatchSpot() );

      // @public {Array.<MatchTarget>}
      this.targets = _.range( 0, NUM_PAIRS ).map( () => new MatchTarget() );

      const pieces = [];
      const fractions = phet.joist.random.shuffle( config.fractions ).slice( 0, NUM_PAIRS );

      fractions.forEach( ( fraction, index ) => {
        const scaleFactor = phet.joist.random.sample( config.numericScaleFactors );
        const scaledFraction = new Fraction( fraction.numerator * scaleFactor, fraction.denominator * scaleFactor );
        const fillType = phet.joist.random.sample( config.fillTypes );
        const shapePartitions = ShapePartition.supportsDenominator( config.shapePartitions, fraction.denominator );

        [ 0, 1 ].forEach( subIndex => {
          // First (generally 3) fractions should be numbers
          const shapePartition = ( subIndex === 0 && index < NUM_PAIRS / 2 ) ? null : phet.joist.random.sample( shapePartitions );
          const color = PIECE_COLORS[ ( index + subIndex ) % 3 ];

          const filledPartitions = shapePartition ? FilledPartition.fill( shapePartition, fraction, color, fillType ) : null;
          const piece = new MatchPiece( filledPartitions ? fraction : scaledFraction, filledPartitions, config.hasMixedNumbers, {
            grab: () => {
              if ( piece.spotProperty.value ) {
                piece.spotProperty.value.pieceProperty.value = null;
                piece.spotProperty.value = null;
              }
            },
            drop: () => {
              const openSpots = [ ...this.sourceSpots, ...this.scaleSpots ].filter( spot => spot.pieceProperty.value === null );
              const closestSpot = _.minBy( openSpots, spot => spot.positionProperty.value.distance( piece.positionProperty.value ) );
              assert && assert( closestSpot );

              closestSpot.pieceProperty.value = piece;
              piece.spotProperty.value = closestSpot;

              piece.animator.animateTo( {
                position: closestSpot.positionProperty.value,
                scale: 1,
                animationInvalidationProperty: piece.spotProperty
              } );
            }
          } );
          pieces.push( piece );
        } );
      } );

      // @public {Array.<MatchPiece>}
      this.pieces = phet.joist.random.shuffle( pieces );

      // Connect the pieces to the initial source spots
      this.pieces.forEach( ( piece, index ) => {
        const sourceSpot = this.sourceSpots[ index ];

        piece.spotProperty.value = sourceSpot;
        sourceSpot.pieceProperty.value = piece;
      } );
    }

    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.elapsedTimeProperty.value += dt;

      this.pieces.forEach( piece => piece.step( dt ) );
    }

    cheat() {
      // TODO
    }
  }

  return fractionsCommon.register( 'MatchingChallenge', MatchingChallenge );
} );
