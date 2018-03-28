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
  var Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
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

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  return inherit( Object, ShapePiece, {
    step: function( dt ) {
      this.animator.step( dt );
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
    }
  } );
} );
