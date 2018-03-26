// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Fraction} fraction
   * @param {Representation} representation
   * @param {Property.<Color>} colorProperty
   */
  function ShapePiece( fraction, representation, colorProperty ) {
    assert && assert( fraction instanceof Fraction );
    assert && assert( Representation.SHAPE_VALUES.includes( representation ) );
    assert && assert( colorProperty instanceof Property );

    // @public {Fraction}
    this.fraction = fraction;
    
    // @public {Representation}
    this.representation = representation;
    
    // @public {Property.<Color>}
    this.colorProperty = colorProperty;

    // @public {Property.<Vector2>} - Applies only while out in the play area (being animated or dragged)
    this.positionProperty = new Property( Vector2.ZERO );

    // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
    this.rotationProperty = new NumberProperty( 0 );

    // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
    this.scaleProperty = new NumberProperty( 1 );

    // @public {Property.<boolean>}
    this.isUserControlledProperty = new BooleanProperty( false );

    // @public {Property.<boolean>}
    this.isAnimatingProperty = new BooleanProperty( false );

    // @private {number} - Ratio of the animation
    this.ratio = 0;

    // @private {Vector2|null}
    this.originPosition = null;
    this.destinationPosition = null;

    // @private {number|null}
    this.originRotation = null;
    this.destinationRotation = null;

    // @private {number|null}
    this.originScale = null;
    this.destinationScale = null;

    // @private {function|null}
    this.endAnimationCallback = null;

    // @private {Easing|null}
    this.easing = null;
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  return inherit( Object, ShapePiece, {
    animateTo: function( endPosition, endRotation, endScale, invalidationProperty, easing, endAnimationCallback ) {
      // TODO: How to handle an already-animating value? Finish it and call endAnimationCallback?
      // TODO: rotation

      // TODO: how to handle interruption of the property
      this.isAnimatingProperty.value = true;
      this.ratio = 0;

      this.originPosition = this.positionProperty.value;
      this.destinationPosition = endPosition;

      this.originRotation = this.rotationProperty.value;
      this.destinationRotation = endRotation;

      this.originScale = this.scaleProperty.value;
      this.destinationScale = endScale;

      this.endAnimationCallback = endAnimationCallback;
      this.easing = easing;
    },

    step: function( dt ) {
      if ( this.isAnimatingProperty.value ) {
        // TODO: Could factor our speed, make it constant
        // TODO: factor out the speed with other things in this sim
        // this.ratio = Math.min( 1, this.ratio + dt * 50 / Math.sqrt( this.originPosition.distance( this.destinationPosition ) ) );
        // TODO: Use above-sped-up animations soon
        this.ratio = Math.min( 1, this.ratio + dt * 10 / Math.sqrt( this.originPosition.distance( this.destinationPosition ) ) );
        if ( this.ratio === 1 ) {
          this.positionProperty.value = this.destinationPosition;
          this.scaleProperty.value = this.destinationScale;
          this.rotationProperty.value = this.destinationRotation;
          this.isAnimatingProperty.value = false;
          this.endAnimationCallback();
        }
        else {
          // TODO: control the easing in/out more? sometimes we want IN_OUT
          var easedRatio = this.easing.value( this.ratio );
          this.positionProperty.value = this.originPosition.blend( this.destinationPosition, easedRatio );
          this.scaleProperty.value = this.originScale * ( 1 - easedRatio ) + this.destinationScale * easedRatio;

          // TODO: closest-rotation handling (where have I done this). THEN PUT IT IN COMMON CODE THIS TIME.
          this.rotationProperty.value = this.originRotation * ( 1 - easedRatio ) + this.destinationRotation * easedRatio;
        }
      }
    }
  }, {
    // @public {Bounds2} - The bounds taken up by the full vertical-bar representation
    VERTICAL_BAR_BOUNDS: Bounds2.point( 0, 0 ).dilatedXY( FractionsCommonConstants.SHAPE_SIZE / 2, FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT / 2 ),

    /**
     * Returns the centroid of a swept (circular arc) piece (without any rotation).
     * @public
     *
     * @param {Fraction} fraction
     * @returns {Vector2}
     */
    getSweptCentroid: function( fraction ) {
      if ( fraction.getValue() === 1 ) {
        return Vector2.ZERO;
      }
      else {
        var positiveAngle = fraction.getValue() * 2 * Math.PI;

        // Compute the centroid for a circular sector
        var radius = FractionsCommonConstants.SHAPE_SIZE / 2;
        var distanceFromCenter = 4 / 3 * radius * Math.sin( positiveAngle / 2 ) / positiveAngle;
        return Vector2.createPolar( distanceFromCenter, -positiveAngle / 2 );
      }
    },

  } );
} );
