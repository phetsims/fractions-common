// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const NumberSpot = require( 'FRACTIONS_COMMON/building/model/NumberSpot' );
  const NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  const HORIZONTAL_SPACING = 18;
  const FRACTIONAL_NUMBER_HEIGHT = 43;
  const FRACTIONAL_NUMBER_WIDTH = 32;
  const WHOLE_NUMBER_HEIGHT = 100;
  // TODO: Probably compute the width slightly differently here, but we need this compensation right now
  const HACK_FACTOR = FractionsCommonConstants.WHOLE_FRACTIONAL_SIZE_RATIO / ( WHOLE_NUMBER_HEIGHT / FRACTIONAL_NUMBER_HEIGHT );
  const WHOLE_NUMBER_WIDTH = HACK_FACTOR * WHOLE_NUMBER_HEIGHT * FRACTIONAL_NUMBER_WIDTH / FRACTIONAL_NUMBER_HEIGHT;
  const FRACTION_LINE_WIDTH = 40;
  const VERTICAL_SPACING = 12;

  const NUMERATOR_BOUNDS = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, -FRACTIONAL_NUMBER_HEIGHT - VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
  const DENOMINATOR_BOUNDS = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );

  // TODO: Can we construct these in a nicer way up front?
  const MIXED_NUMERATOR_BOUNDS = NUMERATOR_BOUNDS.copy();
  const MIXED_DENOMINATOR_BOUNDS = DENOMINATOR_BOUNDS.copy();
  const MIXED_WHOLE_BOUNDS = Bounds2.rect( -WHOLE_NUMBER_WIDTH - HORIZONTAL_SPACING - FRACTIONAL_NUMBER_WIDTH / 2, -WHOLE_NUMBER_HEIGHT / 2, WHOLE_NUMBER_WIDTH, WHOLE_NUMBER_HEIGHT );
  const beforeCenter = ( NUMERATOR_BOUNDS.right + MIXED_WHOLE_BOUNDS.left ) / 2;
  MIXED_NUMERATOR_BOUNDS.shiftX( -beforeCenter );
  MIXED_DENOMINATOR_BOUNDS.shiftX( -beforeCenter );
  MIXED_WHOLE_BOUNDS.shiftX( -beforeCenter );

  // TODO: double-digit support

  class NumberGroup {
    /**
     * @param {boolean} isMixedNumber
     * @param {Object} [options]
     */
    constructor( isMixedNumber, options ) {
      options = _.extend( {
        // {Property.<Range|null>}
        activeNumberRangeProperty: new Property( null )
      }, options );

      // @public {boolean}
      this.isMixedNumber = isMixedNumber;

      // @private {Property.<Range|null>}
      this.activeNumberRangeProperty = options.activeNumberRangeProperty;

      // @public {NumberSpot}
      this.numeratorSpot = new NumberSpot( this, NumberSpotType.NUMERATOR, isMixedNumber ? MIXED_NUMERATOR_BOUNDS : NUMERATOR_BOUNDS );

      // @public {NumberSpot}
      this.denominatorSpot = new NumberSpot( this, NumberSpotType.DENOMINATOR, isMixedNumber ? MIXED_DENOMINATOR_BOUNDS : DENOMINATOR_BOUNDS );

      // @public {NumberSpot|null}
      this.wholeSpot = isMixedNumber ? new NumberSpot( this, NumberSpotType.WHOLE, MIXED_WHOLE_BOUNDS ) : null;

      // @public {Array.<NumberSpot>}
      this.spots = ( isMixedNumber ? [ this.wholeSpot ] : [] ).concat( [ this.numeratorSpot, this.denominatorSpot ] );

      // @public {Property.<boolean>}
      this.isCompleteProperty = new DerivedProperty( this.spots.map( spot => spot.pieceProperty ), () => {
        return _.every( this.spots, spot => spot.pieceProperty.value !== null );
      } );

      // @public {Property.<boolean>} TODO: hasAnyPieces usage can move to this?
      this.hasPiecesProperty = new DerivedProperty( this.spots.map( spot => spot.pieceProperty ), () => {
        return _.some( this.spots, spot => spot.pieceProperty.value !== null );
      } );

      // @public {Bounds2}
      this.allSpotsBounds = _.reduce( this.spots, ( bounds, spot ) => bounds.union( spot.bounds ), Bounds2.NOTHING );

      // @public {Property.<Vector2>}
      this.positionProperty = new Property( Vector2.ZERO, {
        valueType: Vector2 // TODO: add valueType to more things?
      } );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // @public {Property.<boolean>}
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Animator}
      this.animator = new Animator( this.positionProperty, new NumberProperty( 0 ), this.scaleProperty, new NumberProperty( 0 ), this.isAnimatingProperty );

      // @public {number} - TODO: Any reason we need this in the model
      this.fractionLineWidth = FRACTION_LINE_WIDTH;

      // @private {function}
      this.spotAllowedListener = this.updateAllowedSpots.bind( this );
      this.activeNumberRangeProperty.link( this.spotAllowedListener );

      // @public {boolean} TODO
      this.disposed = false;
    }

    updateAllowedSpots() {
      if ( this.isMixedNumber ) {
        var range = this.activeNumberRangeProperty.value;

        this.numeratorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.min, this.numeratorSpot );
        this.denominatorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.max, this.denominatorSpot );
      }
    }

    canPlaceNumberInSpot( number, spot ) {
      // TODO: simplify into one boolean
      if ( spot.pieceProperty.value !== null ) {
        return false;
      }

      if ( this.isMixedNumber ) {
        if ( spot === this.denominatorSpot && this.numeratorSpot.pieceProperty.value !== null && this.numeratorSpot.pieceProperty.value.number >= number ) {
          return false;
        }
        if ( spot === this.numeratorSpot && this.denominatorSpot.pieceProperty.value !== null && this.denominatorSpot.pieceProperty.value.number <= number ) {
          return false;
        }

        // Don't allow 1s here as there is no valid choice
        if ( spot === this.denominatorSpot && number === 1 ) {
          return false;
        }
      }

      return true;
    }

    // TODO: doc
    hasAnyPieces() {
      return _.some( this.spots, spot => spot.pieceProperty.value !== null );
    }

    step( dt ) {
      this.animator.step( dt );
    }

    dispose() {
      this.activeNumberRangeProperty.unlink( this.spotAllowedListener );
      this.disposed = true;
    }
  }

  return fractionsCommon.register( 'NumberGroup', NumberGroup );
} );
