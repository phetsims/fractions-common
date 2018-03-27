// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * NOTE: The coordinate frame of pieces are always where the origin of this piece is at its centroid.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DampedHarmonic = require( 'DOT/DampedHarmonic' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var Util = require( 'DOT/Util' );
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

    var self = this;

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

    // Animation when the user has released the piece

    // @public {Property.<boolean>} TODO: consider rename, as we also "animate" when this is false...
    this.isAnimatingProperty = new BooleanProperty( false );

    // @function {Property.<Vector2>|null}
    this.animationInvalidationProperty = null;

    // @private {function}
    this.endAnimationListener = this.endAnimation.bind( this );

    // @private {number} - Ratio of the animation
    this.ratio = 0;

    // @private {number}
    this.animationSpeed = 0;

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

    // rotation-based animation while the user drags

    // @private {Property.<number>}
    this.angularVelocityProperty = new NumberProperty( 0 );
    this.targetRotationProperty = new NumberProperty( 0 );

    // @private {DampedHarmonic|null}
    this.dampedHarmonic = null;

    // @private {number}
    this.dampedHarmonicTimeElapsed = 0;
    this.trueTargetRotation = 0;

    Property.multilink( [ this.isUserControlledProperty, this.targetRotationProperty ], function( isUserControlled, targetRotation ) {
      if ( isUserControlled ) {
        var currentRotation = self.rotationProperty.value;
        self.trueTargetRotation = ShapePiece.modifiedEndAngle( currentRotation, self.targetRotationProperty.value );

        var damping = 1;
        var force = 50;
        self.dampedHarmonicTimeElapsed = 0;
        self.dampedHarmonic = new DampedHarmonic( 1, Math.sqrt( 4 * force ) * damping, force, currentRotation - self.trueTargetRotation, self.angularVelocityProperty.value );
      }
      else {
        self.dampedHarmonic = null;
      }
    } );
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  return inherit( Object, ShapePiece, {
    animateTo: function( endPosition, endRotation, endScale, animationInvalidationProperty, easing, animationSpeed, endAnimationCallback ) {
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

      this.animationInvalidationProperty = animationInvalidationProperty;
      this.animationInvalidationProperty.lazyLink( this.endAnimationListener );

      this.easing = easing;
      this.animationSpeed = animationSpeed;
      this.endAnimationCallback = endAnimationCallback;
    },

    endAnimation: function() {
      this.positionProperty.value = this.destinationPosition;
      this.scaleProperty.value = this.destinationScale;
      this.rotationProperty.value = this.destinationRotation;
      this.isAnimatingProperty.value = false;
      this.animationInvalidationProperty.unlink( this.endAnimationListener );
      this.endAnimationCallback();
    },

    step: function( dt ) {
      if ( this.isAnimatingProperty.value ) {
        this.ratio = Math.min( 1, this.ratio + dt * this.animationSpeed );
        if ( this.ratio === 1 ) {
          this.endAnimation();
        }
        else {
          // TODO: control the easing in/out more? sometimes we want IN_OUT
          var easedRatio = this.easing.value( this.ratio );
          this.positionProperty.value = this.originPosition.blend( this.destinationPosition, easedRatio );
          this.scaleProperty.value = this.originScale * ( 1 - easedRatio ) + this.destinationScale * easedRatio;
          this.rotationProperty.value = ShapePiece.clerp( this.originRotation, this.destinationRotation, easedRatio );
        }
      }
    },

    orientTowardsContainer: function( closestContainer, dt ) {
      this.targetRotationProperty.value = -2 * Math.PI * closestContainer.totalFractionProperty.value.getValue();

      this.dampedHarmonicTimeElapsed += dt;
      this.rotationProperty.value = this.trueTargetRotation + this.dampedHarmonic.getValue( this.dampedHarmonicTimeElapsed );
      this.angularVelocityProperty.value = this.dampedHarmonic.getDerivative( this.dampedHarmonicTimeElapsed );
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

    modifiedEndAngle: function( startAngle, endAngle ) {
      var modifiedEndAngle = Util.moduloBetweenDown( endAngle, startAngle, startAngle + 2 * Math.PI );
      if ( modifiedEndAngle > startAngle + Math.PI ) {
        modifiedEndAngle -= 2 * Math.PI;
      }
      return modifiedEndAngle;
    },

    /**
     * Circular linear interpolation (like slerp, but on a plane).
     * @public
     *
     * NOTE: my Google search for "slerp on a plane" didn't come up with anything useful besides neck pillows, so this
     * is just called clerp. :P
     *
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {number} ratio
     * @return {number}
     */
    clerp: function( startAngle, endAngle, ratio ) {
      return startAngle * ( 1 - ratio ) + ShapePiece.modifiedEndAngle( startAngle, endAngle ) * ratio;
    }
  } );
} );
