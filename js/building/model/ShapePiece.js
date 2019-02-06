// Copyright 2018, University of Colorado Boulder

/**
 * A movable shape "piece" that can be combined/placed into groups.
 *
 * NOTE: The coordinate frame of pieces are always where the origin of this piece is at its centroid.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Animator = require( 'FRACTIONS_COMMON/common/model/Animator' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/model/BuildingRepresentation' );
  const DampedHarmonic = require( 'DOT/DampedHarmonic' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  // globals
  // Used for unique identifiers for every ShapePiece (so we can efficiently store a map from piece ID to other objects.
  let globalID = 0;

  class ShapePiece {
    /**
     * @param {Fraction} fraction
     * @param {BuildingRepresentation} representation
     * @param {ColorDef} color
     */
    constructor( fraction, representation, color ) {
      assert && assert( fraction instanceof Fraction );
      assert && assert( BuildingRepresentation.VALUES.includes( representation ) );
      assert && assert( color instanceof Property );

      this.id = globalID++;

      // @public {Fraction}
      this.fraction = fraction;

      // @public {BuildingRepresentation}
      this.representation = representation;

      // @public {ColorDef}
      this.color = color;

      // @public {Property.<Vector2>} - Applies only while out in the play area (being animated or dragged)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.rotationProperty = new NumberProperty( 0 );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged). Will be
      // inclusively between 0 (no shadow shown, directly behind) and 1 (largest shadow offset).
      this.shadowProperty = new NumberProperty( 0 );

      // @public {Property.<boolean>}
      this.isUserControlledProperty = new BooleanProperty( false );

      // @public {Property.<boolean>} - NOTE: The shape piece can rotate when this is false (e.g. when the user is
      // dragging it). It just means that the position/rotation/scale/shadow are controlled by animation.
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Animator}
      this.animator = new Animator( {
        positionProperty: this.positionProperty,
        rotationProperty: this.rotationProperty,
        scaleProperty: this.scaleProperty,
        shadowProperty: this.shadowProperty,
        isAnimatingProperty: this.isAnimatingProperty
      } );

      // @private {Property.<number>}
      this.angularVelocityProperty = new NumberProperty( 0 );
      this.targetRotationProperty = new NumberProperty( 0 );

      // @private {DampedHarmonic|null} - For rotational animation
      this.dampedHarmonic = null;

      // @private {number}
      this.dampedHarmonicTimeElapsed = 0;
      this.trueTargetRotation = 0;

      // No need to unlink, as we own the given Property
      this.isUserControlledProperty.link( isUserControlled => {
        if ( isUserControlled ) {
          this.shadowProperty.value = 1;
        }
      } );

      // Handle rotational animation towards a target (if any)
      // No need to unlink, as we own the given Properties
      Property.multilink( [ this.isUserControlledProperty, this.targetRotationProperty ], ( isUserControlled, targetRotation ) => {
        if ( isUserControlled ) {
          const currentRotation = this.rotationProperty.value;
          this.trueTargetRotation = Animator.modifiedEndAngle( currentRotation, this.targetRotationProperty.value );

          // Constants tweaked to give the damped harmonic a pleasing behavior.
          const damping = 1;
          const force = 50;
          this.dampedHarmonicTimeElapsed = 0;
          this.dampedHarmonic = new DampedHarmonic( 1, Math.sqrt( 4 * force ) * damping, force, currentRotation - this.trueTargetRotation, this.angularVelocityProperty.value );
        }
        else {
          this.dampedHarmonic = null;
        }
      } );
    }

    /**
     * Clears some associated temporary properties (that isn't a full reset), particularly before it is pulled from a
     * stack.
     * @public
     */
    clear() {
      this.scaleProperty.reset();
      this.rotationProperty.reset();
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
     * Rotates the piece so that it is closer to having the desired orientation for the shape container.
     * @public
     *
     * @param {ShapeContainer} closestContainer
     * @param {number} dt
     */
    orientTowardsContainer( closestContainer, dt ) {
      this.targetRotationProperty.value = -2 * Math.PI * closestContainer.totalFractionProperty.value.value;

      this.dampedHarmonicTimeElapsed += dt;
      this.rotationProperty.value = this.trueTargetRotation + this.dampedHarmonic.getValue( this.dampedHarmonicTimeElapsed );
      this.angularVelocityProperty.value = this.dampedHarmonic.getDerivative( this.dampedHarmonicTimeElapsed );
    }

    /**
     * Returns the centroid of a swept (circular arc) piece (without any rotation).
     * @public
     *
     * @param {Fraction} fraction
     * @returns {Vector2}
     */
    static getSweptCentroid( fraction ) {
      if ( fraction.value === 1 ) {
        return Vector2.ZERO;
      }
      else {
        const positiveAngle = fraction.value * 2 * Math.PI;

        // Compute the centroid for a circular sector
        const radius = FractionsCommonConstants.SHAPE_SIZE / 2;
        const distanceFromCenter = 4 / 3 * radius * Math.sin( positiveAngle / 2 ) / positiveAngle;
        return Vector2.createPolar( distanceFromCenter, -positiveAngle / 2 );
      }
    }
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  // @public {Bounds2}
  ShapePiece.VERTICAL_BAR_BOUNDS = Bounds2.point( 0, 0 ).dilatedXY(
    FractionsCommonConstants.SHAPE_SIZE / 2,
    FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT / 2
  );

  return ShapePiece;
} );
