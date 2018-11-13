// Copyright 2018, University of Colorado Boulder

/**
 * Represents a mixed or non-mixed fraction represented by numerator/denominator and optionally a whole number.
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
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const NumberSpot = require( 'FRACTIONS_COMMON/building/model/NumberSpot' );
  const NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants

  // {number} - Controls for the sizing of the number group
  const HORIZONTAL_SPACING = 18;
  const FRACTIONAL_NUMBER_HEIGHT = 43;
  const FRACTIONAL_NUMBER_WIDTH = 32;
  const WHOLE_NUMBER_HEIGHT = 100;
  const WHOLE_NUMBER_WIDTH = FractionsCommonConstants.WHOLE_FRACTIONAL_SIZE_RATIO * FRACTIONAL_NUMBER_WIDTH;
  const VERTICAL_SPACING = 12;

  // {Bounds2} - Of the spots, in an arbitrary coordinate frame
  const SEPARATE_NUMERATOR_BOUNDS = Bounds2.rect( 0, 0, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
  const SEPARATE_DENOMINATOR_BOUNDS = Bounds2.rect( 0, SEPARATE_NUMERATOR_BOUNDS.bottom + 2 * VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
  const SEPARATE_WHOLE_BOUNDS = Bounds2.rect( -WHOLE_NUMBER_WIDTH - HORIZONTAL_SPACING, ( 2 * FRACTIONAL_NUMBER_HEIGHT + 2 * VERTICAL_SPACING - WHOLE_NUMBER_HEIGHT ) / 2, WHOLE_NUMBER_WIDTH, WHOLE_NUMBER_HEIGHT );

  // {Vector2} - Centers of the two "groups" of spots (mixed and unmixed)
  const UNMIXED_CENTER = SEPARATE_NUMERATOR_BOUNDS.union( SEPARATE_DENOMINATOR_BOUNDS ).center;
  const MIXED_CENTER = SEPARATE_NUMERATOR_BOUNDS.union( SEPARATE_DENOMINATOR_BOUNDS ).union( SEPARATE_WHOLE_BOUNDS ).center;

  // {Bounds2} - "Centered" versions of the spot bounds for the "unmixed" case
  const NUMERATOR_BOUNDS = SEPARATE_NUMERATOR_BOUNDS.shifted( -UNMIXED_CENTER.x, -UNMIXED_CENTER.y );
  const DENOMINATOR_BOUNDS = SEPARATE_DENOMINATOR_BOUNDS.shifted( -UNMIXED_CENTER.x, -UNMIXED_CENTER.y );

  // {Bounds2} - "Centered" versions of the spot bounds for the "mixed" case
  const MIXED_NUMERATOR_BOUNDS = SEPARATE_NUMERATOR_BOUNDS.shifted( -MIXED_CENTER.x, -MIXED_CENTER.y );
  const MIXED_DENOMINATOR_BOUNDS = SEPARATE_DENOMINATOR_BOUNDS.shifted( -MIXED_CENTER.x, -MIXED_CENTER.y );
  const MIXED_WHOLE_BOUNDS = SEPARATE_WHOLE_BOUNDS.shifted( -MIXED_CENTER.x, -MIXED_CENTER.y );

  // TODO: double-digit support

  // TODO: Supertype for ShapeGroup/NumberGroup
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
      this.spots = [
        ...( isMixedNumber ? [ this.wholeSpot ] : [] ),
        this.numeratorSpot,
        this.denominatorSpot
      ];

      // @public {Property.<boolean>}
      this.isCompleteProperty = new DerivedProperty( this.spots.map( spot => spot.pieceProperty ), () => {
        return _.every( this.spots, spot => spot.pieceProperty.value !== null );
      } );

      // @public {Property.<boolean>} TODO: hasAnyPieces usage can move to this?
      this.hasPiecesProperty = new DerivedProperty( this.spots.map( spot => spot.pieceProperty ), () => {
        return _.some( this.spots, spot => spot.pieceProperty.value !== null );
      } );

      // @public {Property.<Vector2>}
      this.positionProperty = new Property( Vector2.ZERO, {
        valueType: Vector2 // TODO: add valueType to more things?
      } );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // @public {Property.<boolean>}
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Property.<Target|null>}
      this.hoveringTargetProperty = new Property( null );

      // @public {Animator}
      this.animator = new Animator( {
        positionProperty: this.positionProperty,
        scaleProperty: this.scaleProperty,
        isAnimatingProperty: this.isAnimatingProperty
      } );

      // @public {Property.<boolean>}
      this.hasDoubleDigitsProperty = new DerivedProperty( [
        this.numeratorSpot.pieceProperty,
        this.denominatorSpot.pieceProperty
      ], ( numeratorPiece, denominatorPiece ) => {
        return ( numeratorPiece && numeratorPiece.number >= 10 ) ||
               ( denominatorPiece && denominatorPiece.number >= 10 );
      } );

      const allSpotsBounds = _.reduce( this.spots, ( bounds, spot ) => bounds.union( spot.bounds ), Bounds2.NOTHING );

      // @public {Property.<Bounds2>}
      this.allSpotsBoundsProperty = new DerivedProperty( [ this.hasDoubleDigitsProperty ], hasDoubleDigits => {
        const bounds = allSpotsBounds.copy();
        if ( hasDoubleDigits ) {
          bounds.maxX += 10;
          if ( !this.isMixedNumber ) {
            bounds.minX -= 10;
          }
        }
        return bounds;
      } );

      // @private {function}
      this.spotAllowedListener = this.updateAllowedSpots.bind( this );
      this.activeNumberRangeProperty.link( this.spotAllowedListener );

      // Keep our hover target up-to-date
      this.hoveringTargetProperty.lazyLink( ( oldTarget, newTarget ) => {
        oldTarget && oldTarget.hoveringGroups.remove( this );
        newTarget && newTarget.hoveringGroups.push( this );
      } );

      // @public {boolean} TODO
      this.disposed = false;
    }

    // TODO: do we want this as a property?
    get totalFraction() {
      const fraction = new Fraction( this.wholeSpot && this.wholeSpot.pieceProperty.value ? this.wholeSpot.pieceProperty.value.number : 0, 1 );
      if ( this.numeratorSpot.pieceProperty.value && this.denominatorSpot.pieceProperty.value ) {
        fraction.add( new Fraction( this.numeratorSpot.pieceProperty.value.number, this.denominatorSpot.pieceProperty.value.number ) );
      }
      return fraction;
    }

    get centerPoints() {
      return [ this.positionProperty.value ];
    }

    updateAllowedSpots() {
      if ( this.isMixedNumber ) {
        var range = this.activeNumberRangeProperty.value;

        this.numeratorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.min, this.numeratorSpot );
        this.denominatorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.max, this.denominatorSpot );
        this.wholeSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.min, this.wholeSpot );
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

        // Don't allow putting 2-digit numbers in the wholes spot.
        if ( spot === this.wholeSpot && number >= 10 ) {
          return false;
        }
      }

      return true;
    }

    // TODO: doc
    hasAnyPieces() {
      return _.some( this.spots, spot => spot.pieceProperty.value !== null );
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.animator.step( dt );
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.activeNumberRangeProperty.unlink( this.spotAllowedListener );
      this.disposed = true;
    }
  }

  return fractionsCommon.register( 'NumberGroup', NumberGroup );
} );
