// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var NumberSpot = require( 'FRACTIONS_COMMON/building/model/NumberSpot' );
  var NumberSpotType = require( 'FRACTIONS_COMMON/building/enum/NumberSpotType' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  var HORIZONTAL_SPACING = 18;
  var FRACTIONAL_NUMBER_HEIGHT = 43;
  var FRACTIONAL_NUMBER_WIDTH = 32;
  var WHOLE_NUMBER_HEIGHT = 100;
  // TODO: Probably compute the width slightly differently here, but we need this compensation right now
  var HACK_FACTOR = FractionsCommonConstants.WHOLE_FRACTIONAL_SIZE_RATIO / ( WHOLE_NUMBER_HEIGHT / FRACTIONAL_NUMBER_HEIGHT );
  var WHOLE_NUMBER_WIDTH = HACK_FACTOR * WHOLE_NUMBER_HEIGHT * FRACTIONAL_NUMBER_WIDTH / FRACTIONAL_NUMBER_HEIGHT;
  var FRACTION_LINE_WIDTH = 40;
  var VERTICAL_SPACING = 12;

  var NUMERATOR_BOUNDS = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, -FRACTIONAL_NUMBER_HEIGHT - VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
  var DENOMINATOR_BOUNDS = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );

  // TODO: Can we construct these in a nicer way up front?
  var MIXED_NUMERATOR_BOUNDS = NUMERATOR_BOUNDS.copy();
  var MIXED_DENOMINATOR_BOUNDS = DENOMINATOR_BOUNDS.copy();
  var MIXED_WHOLE_BOUNDS = Bounds2.rect( -WHOLE_NUMBER_WIDTH - HORIZONTAL_SPACING - FRACTIONAL_NUMBER_WIDTH / 2, -WHOLE_NUMBER_HEIGHT / 2, WHOLE_NUMBER_WIDTH, WHOLE_NUMBER_HEIGHT );
  var beforeCenter = ( NUMERATOR_BOUNDS.right + MIXED_WHOLE_BOUNDS.left ) / 2;
  MIXED_NUMERATOR_BOUNDS.shiftX( -beforeCenter );
  MIXED_DENOMINATOR_BOUNDS.shiftX( -beforeCenter );
  MIXED_WHOLE_BOUNDS.shiftX( -beforeCenter );

  // TODO: double-digit support

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} isMixedNumber
   * @param {Object} [options]
   */
  function NumberGroup( isMixedNumber, options ) {
    var self = this;

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
    this.isCompleteProperty = new DerivedProperty( this.spots.map( function( spot ) { return spot.pieceProperty; } ), function() {
      return _.every( self.spots, function( spot ) {
        return spot.pieceProperty.value !== null;
      } );
    } );

    // @public {Property.<boolean>} TODO: hasAnyPieces usage can move to this?
    this.hasPiecesProperty = new DerivedProperty( this.spots.map( function( spot ) { return spot.pieceProperty; } ), function() {
      return _.some( self.spots, function( spot ) {
        return spot.pieceProperty.value !== null;
      } );
    } );

    // @public {Bounds2}
    this.allSpotsBounds = _.reduce( this.spots, function( bounds, spot ) {
      return bounds.union( spot.bounds );
    }, Bounds2.NOTHING );

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
  }

  fractionsCommon.register( 'NumberGroup', NumberGroup );

  return inherit( Object, NumberGroup, {
    updateAllowedSpots: function() {
      if ( this.isMixedNumber ) {
        var range = this.activeNumberRangeProperty.value;

        this.numeratorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.min, this.numeratorSpot );
        this.denominatorSpot.showNotAllowedProperty.value = range === null ? false : !this.canPlaceNumberInSpot( range.max, this.denominatorSpot );
      }
    },

    canPlaceNumberInSpot: function( number, spot ) {
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
    },

    // TODO: doc
    hasAnyPieces: function() {
      return _.some( this.spots, function( spot ) {
        return spot.pieceProperty.value !== null;
      } );
    },

    step: function( dt ) {
      this.animator.step( dt );
    },

    dispose: function() {
      this.activeNumberRangeProperty.unlink( this.spotAllowedListener );
    }
  } );
} );
