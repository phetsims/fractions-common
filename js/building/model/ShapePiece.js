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
  const Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const DampedHarmonic = require( 'DOT/DampedHarmonic' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const Vector2 = require( 'DOT/Vector2' );

  class ShapePiece {
    /**
     * @param {Fraction} fraction
     * @param {Representation} representation
     * @param {ColorDef} color
     */
    constructor( fraction, representation, color ) {
      assert && assert( fraction instanceof Fraction );
      assert && assert( Representation.SHAPE_VALUES.includes( representation ) );
      assert && assert( color instanceof Property );

      var self = this;

      // @public {Fraction}
      this.fraction = fraction;

      // @public {Representation}
      this.representation = representation;

      // @public {ColorDef}
      this.color = color;

      // @public {Property.<Vector2>} - Applies only while out in the play area (being animated or dragged)
      this.positionProperty = new Property( Vector2.ZERO );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.rotationProperty = new NumberProperty( 0 );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // TODO: doc [0,1]
      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.shadowProperty = new NumberProperty( 0 );

      // @public {Property.<boolean>}
      this.isUserControlledProperty = new BooleanProperty( false );

      // @public {Property.<boolean>} TODO: consider rename, as we also "animate" when this is false...
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Animator}
      this.animator = new Animator( this.positionProperty, this.rotationProperty, this.scaleProperty, this.shadowProperty, this.isAnimatingProperty );

      // @private {Property.<number>}
      this.angularVelocityProperty = new NumberProperty( 0 );
      this.targetRotationProperty = new NumberProperty( 0 );

      // @private {DampedHarmonic|null}
      this.dampedHarmonic = null;

      // @private {number}
      this.dampedHarmonicTimeElapsed = 0;
      this.trueTargetRotation = 0;

      this.isUserControlledProperty.link( function( isUserControlled ) {
        if ( isUserControlled ) {
          self.shadowProperty.value = 1;
        }
      } );

      Property.multilink( [ this.isUserControlledProperty, this.targetRotationProperty ], function( isUserControlled, targetRotation ) {
        if ( isUserControlled ) {
          var currentRotation = self.rotationProperty.value;
          self.trueTargetRotation = Animator.modifiedEndAngle( currentRotation, self.targetRotationProperty.value );

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
        var positiveAngle = fraction.value * 2 * Math.PI;

        // Compute the centroid for a circular sector
        var radius = FractionsCommonConstants.SHAPE_SIZE / 2;
        var distanceFromCenter = 4 / 3 * radius * Math.sin( positiveAngle / 2 ) / positiveAngle;
        return Vector2.createPolar( distanceFromCenter, -positiveAngle / 2 );
      }
    }
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  ShapePiece.VERTICAL_BAR_BOUNDS = Bounds2.point( 0, 0 ).dilatedXY( FractionsCommonConstants.SHAPE_SIZE / 2, FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT / 2 );

  return ShapePiece;
} );
