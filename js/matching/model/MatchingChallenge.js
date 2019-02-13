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
  const Emitter = require( 'AXON/Emitter' );
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const FilledPartition = require( 'FRACTIONS_COMMON/game/model/FilledPartition' );
  const FillType = require( 'FRACTIONS_COMMON/game/model/FillType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const MatchPiece = require( 'FRACTIONS_COMMON/matching/model/MatchPiece' );
  const MatchSpot = require( 'FRACTIONS_COMMON/matching/model/MatchSpot' );
  const MatchTarget = require( 'FRACTIONS_COMMON/matching/model/MatchTarget' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
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
          ...ShapePartition.PLUS_SIGNS.filter( shapePartition => shapePartition.length > 2 ),
          ...ShapePartition.GRIDS,
          ...ShapePartition.PYRAMIDS,
          ...ShapePartition.POLYGONS,
          ...ShapePartition.DIAGONAL_LS.filter( shapePartition => shapePartition.length > 2 ),
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

      // @public {Property.<MatchingChallenge.State>}
      this.stateProperty = new Property( MatchingChallenge.State.NO_COMPARISON );

      // @public {Property.<number>}
      this.scoreProperty = new NumberProperty( 0 );
      this.lastScoreGainProperty = new NumberProperty( 0 );

      // @public {Property.<boolean>}
      this.wasLastAttemptFailureProperty = new BooleanProperty( false );

      // @public {Property.<number>}
      this.elapsedTimeProperty = new NumberProperty( 0 );
      this.bestElapsedTimeProperty = new NumberProperty( Number.POSITIVE_INFINITY );

      // @public {Emitter} - Fires when the challenge is fully completed
      this.completedEmitter = new Emitter();

      // @public {MatchingChallenge} - Set externally if, when going from this challenge to the specified one, there
      // should instead be a "refresh" animation instead of "next" challenge.
      this.refreshedChallenge = null;

      // @public {Array.<MatchSpot>}
      this.sourceSpots = _.range( 0, 2 * NUM_PAIRS ).map( () => new MatchSpot() );
      this.scaleSpots = _.range( 0, 2 ).map( () => new MatchSpot() );

      // @public {Property.<MatchSpot>}
      this.lastChangedScaleSpotProperty = new Property( this.scaleSpots[ 0 ] );
      this.scaleSpots.forEach( scaleSpot => {
        scaleSpot.pieceProperty.lazyLink( () => {
          this.lastChangedScaleSpotProperty.value = scaleSpot;
        } );
      } );

      // TODO: replacement drag to scale replaces one

      // @public {Array.<MatchTarget>}
      this.targets = _.range( 0, NUM_PAIRS ).map( () => new MatchTarget() );

      const pieces = [];
      const fractions = phet.joist.random.shuffle( config.fractions ).slice( 0, NUM_PAIRS );
      const hasGreaterThanOne = _.some( fractions, fraction => Fraction.ONE.isLessThan( fraction ) );

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
          const piece = new MatchPiece( filledPartitions ? fraction : scaledFraction, filledPartitions, config.hasMixedNumbers, hasGreaterThanOne, {
            grab: () => {
              if ( piece.spotProperty.value ) {
                piece.spotProperty.value.pieceProperty.value = null;
                piece.spotProperty.value = null;
              }
            },
            drop: () => {
              const distanceFunction = spot => spot.positionProperty.value.distance( piece.positionProperty.value );
              const openSpots = [ ...this.sourceSpots, ...this.scaleSpots ].filter( spot => spot.pieceProperty.value === null );
              const closestSpot = _.minBy( [ ...this.sourceSpots, ...this.scaleSpots ], distanceFunction );
              const closestOpenSpot = _.minBy( openSpots, distanceFunction );
              assert && assert( closestOpenSpot );

              // If the user drops the piece on the scale, it will replace any existing piece
              if ( _.includes( this.scaleSpots, closestSpot ) && closestSpot.pieceProperty.value ) {
                const existingPiece = closestSpot.pieceProperty.value;
                existingPiece.moveToSpot( closestOpenSpot );
                piece.moveToSpot( closestSpot );
              }
              else {
                piece.moveToSpot( closestOpenSpot );
              }
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

      // @private {Array.<MatchPiece>}
      this.lastFailedPair = [];
      Property.multilink( this.scaleSpots.map( scaleSpot => scaleSpot.pieceProperty ), ( leftPiece, rightPiece ) => {
        if ( !leftPiece || !rightPiece ) {
          this.stateProperty.value = MatchingChallenge.State.NO_COMPARISON;
        }
        else if ( this.stateProperty.value === MatchingChallenge.State.NO_COMPARISON &&
             leftPiece &&
             rightPiece &&
             ( !_.includes( this.lastFailedPair, leftPiece ) || !_.includes( this.lastFailedPair, rightPiece ) ) ) {
          this.stateProperty.value = MatchingChallenge.State.COMPARISON;
        }
      } );

      // TODO: implement pickability toggles based on state
    }

    collect() {
      const leftPiece = this.scaleSpots[ 0 ].pieceProperty.value;
      const rightPiece = this.scaleSpots[ 1 ].pieceProperty.value;

      const target = _.find( this.targets, target => !target.isFilledProperty.value );

      // Hook up the spot/piece changes
      this.scaleSpots.forEach( scaleSpot => {
        scaleSpot.pieceProperty.value = null;
      } );

      leftPiece.moveToSpot( target.spots[ 0 ], {
        scale: leftPiece.filledPartitions ? 0.5 : 0.7
      } );
      rightPiece.moveToSpot( target.spots[ 1 ], {
        scale: rightPiece.filledPartitions ? 0.5 : 0.7
      } );

      target.isFilledProperty.value = true;
      this.wasLastAttemptFailureProperty.value = false;

      if ( _.every( this.targets, target => target.isFilledProperty.value ) ) {
        this.completedEmitter.emit();

        this.bestElapsedTimeProperty.value = Math.min( this.bestElapsedTimeProperty.value, this.elapsedTimeProperty.value );
      }
    }

    compare() {
      const leftPiece = this.scaleSpots[ 0 ].pieceProperty.value;
      const rightPiece = this.scaleSpots[ 1 ].pieceProperty.value;

      if ( leftPiece.fraction.equals( rightPiece.fraction ) ) {
        this.stateProperty.value = MatchingChallenge.State.MATCHED;

        const scoreDelta = this.wasLastAttemptFailureProperty.value ? 1 : 2;
        this.lastScoreGainProperty.value = scoreDelta;

        this.scoreProperty.value += scoreDelta;
      }
      else {
        if ( this.wasLastAttemptFailureProperty.value ) {
          this.stateProperty.value = MatchingChallenge.State.SHOW_ANSWER;
        }
        else {
          this.stateProperty.value = MatchingChallenge.State.TRY_AGAIN;
        }
        this.lastFailedPair = [ leftPiece, rightPiece ];
        this.wasLastAttemptFailureProperty.value = true;
        this.lastScoreGainProperty.value = 0;
      }
    }

    tryAgain() {
      this.stateProperty.value = MatchingChallenge.State.NO_COMPARISON;
    }

    showAnswer() {
      const changingSpot = this.lastChangedScaleSpotProperty.value;
      const stationarySpot = this.scaleSpots[ ( this.scaleSpots.indexOf( changingSpot ) + 1 ) % 2 ];
      const discardPiece = changingSpot.pieceProperty.value;
      const matchedPiece = _.find( this.pieces, piece => {
        // TODO: how to handle multitouch here if a person is dragging the matched piece?
        return _.includes( this.sourceSpots, piece.spotProperty.value ) && piece.fraction.equals( stationarySpot.pieceProperty.value.fraction );
      } );
      assert && assert( matchedPiece );

      discardPiece.moveToSpot( matchedPiece.spotProperty.value );
      matchedPiece.moveToSpot( changingSpot );

      this.stateProperty.value = MatchingChallenge.State.MATCHED;
    }

    cheat() {
      // Only do things if both scales are empty, and there is one unfilled target
      if ( _.every( this.scaleSpots, spot => spot.pieceProperty.value === null ) &&
           _.some( this.targets, target => !target.isFilledProperty.value ) ) {
        const firstPiece = _.find( this.pieces, piece => _.includes( this.sourceSpots, piece.spotProperty.value ) );
        const secondPiece = _.find( this.pieces, piece => {
          return piece !== firstPiece &&
                 _.includes( this.sourceSpots, piece.spotProperty.value ) &&
                 piece.fraction.equals( firstPiece.fraction );
        } );

        firstPiece.moveToSpot( this.scaleSpots[ 0 ] );
        secondPiece.moveToSpot( this.scaleSpots[ 1 ] );
      }
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
  }

  MatchingChallenge.State = new Enumeration( [
    'NO_COMPARISON',
    'COMPARISON',
    'MATCHED',
    'TRY_AGAIN',
    'SHOW_ANSWER'
  ] );

  return fractionsCommon.register( 'MatchingChallenge', MatchingChallenge );
} );
