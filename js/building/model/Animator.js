// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Util = require( 'DOT/Util' );

  class Animator {
    /**
     * @param {Property.<Vector2>} positionProperty
     * @param {Property.<number>} rotationProperty
     * @param {Property.<number>} scaleProperty
     * @param {Property.<number>} shadowProperty
     * @param {Property.<boolean>} isAnimatingProperty
     */
    constructor( positionProperty, rotationProperty, scaleProperty, shadowProperty, isAnimatingProperty ) {
      // @public {Property.<Vector2>}
      this.positionProperty = positionProperty;

      // @public {Property.<number>}
      this.rotationProperty = rotationProperty;

      // @public {Property.<number>}
      this.scaleProperty = scaleProperty;

      // @public {Property.<number>}
      this.shadowProperty = shadowProperty;

      // @public {Property.<boolean>}
      this.isAnimatingProperty = isAnimatingProperty;

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

      // @private {number|null}
      this.originShadow = null;
      this.destinationShadow = null;

      // @private {function|null}
      this.endAnimationCallback = null;

      // @private {Easing|null}
      this.easing = null;
    }

    // TODO: Options objects, since we do have some "unused" options that could have defaults?
    animateTo( endPosition, endRotation, endScale, endShadow, animationInvalidationProperty, easing, animationSpeed, endAnimationCallback ) {
      // TODO: Make it non-pickable so we can't regrab


      // TODO: How to handle an already-animating value? Finish it and call endAnimationCallback?
      this.isAnimatingProperty.value = true;
      this.ratio = 0;

      this.originPosition = this.positionProperty.value;
      this.destinationPosition = endPosition;

      this.originRotation = this.rotationProperty.value;
      this.destinationRotation = endRotation;

      this.originScale = this.scaleProperty.value;
      this.destinationScale = endScale;

      this.originShadow = this.shadowProperty.value;
      this.destinationShadow = endShadow;

      this.animationInvalidationProperty = animationInvalidationProperty;
      this.animationInvalidationProperty.lazyLink( this.endAnimationListener );

      this.easing = easing;
      this.animationSpeed = animationSpeed;
      this.endAnimationCallback = endAnimationCallback;
    }

    endAnimation() {
      if ( this.isAnimatingProperty.value ) {
        this.positionProperty.value = this.destinationPosition;
        this.rotationProperty.value = this.destinationRotation;
        this.scaleProperty.value = this.destinationScale;
        this.shadowProperty.value = this.destinationShadow;
        this.isAnimatingProperty.value = false;
        this.animationInvalidationProperty.unlink( this.endAnimationListener );
        this.endAnimationCallback();
      }
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      if ( this.isAnimatingProperty.value ) {
        this.ratio = Math.min( 1, this.ratio + dt * this.animationSpeed );
        if ( this.ratio === 1 ) {
          this.endAnimation();
        }
        else {
          // TODO: control the easing in/out more? sometimes we want IN_OUT
          var easedRatio = this.easing.value( this.ratio );
          this.positionProperty.value = this.originPosition.blend( this.destinationPosition, easedRatio );
          this.rotationProperty.value = Animator.clerp( this.originRotation, this.destinationRotation, easedRatio );
          this.scaleProperty.value = this.originScale * ( 1 - easedRatio ) + this.destinationScale * easedRatio;
          this.shadowProperty.value = this.originShadow * ( 1 - easedRatio ) + this.destinationShadow * easedRatio;
        }
      }
    }

    orientTowardsContainer( closestContainer, dt ) {
      this.targetRotationProperty.value = -2 * Math.PI * closestContainer.totalFractionProperty.value.value;

      this.dampedHarmonicTimeElapsed += dt;
      this.rotationProperty.value = this.trueTargetRotation + this.dampedHarmonic.getValue( this.dampedHarmonicTimeElapsed );
      this.angularVelocityProperty.value = this.dampedHarmonic.getDerivative( this.dampedHarmonicTimeElapsed );
    }

    static modifiedEndAngle( startAngle, endAngle ) {
      var modifiedEndAngle = Util.moduloBetweenDown( endAngle, startAngle, startAngle + 2 * Math.PI );
      if ( modifiedEndAngle > startAngle + Math.PI ) {
        modifiedEndAngle -= 2 * Math.PI;
      }
      return modifiedEndAngle;
    }

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
    static clerp( startAngle, endAngle, ratio ) {
      return startAngle * ( 1 - ratio ) + Animator.modifiedEndAngle( startAngle, endAngle ) * ratio;
    }
  }

  return fractionsCommon.register( 'Animator', Animator );
} );
