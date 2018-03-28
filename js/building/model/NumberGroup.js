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
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  var HORIZONTAL_SPACING = 18;
  var FRACTIONAL_NUMBER_HEIGHT = 43;
  var FRACTIONAL_NUMBER_WIDTH = 32;
  var WHOLE_NUMBER_HEIGHT = 100;
  var WHOLE_NUMBER_WIDTH = WHOLE_NUMBER_HEIGHT * FRACTIONAL_NUMBER_WIDTH / FRACTIONAL_NUMBER_HEIGHT;
  var FRACTION_LINE_WIDTH = 40;
  var VERTICAL_SPACING = 12;

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} isMixedNumber
   */
  function NumberGroup( isMixedNumber ) {

    // @public {boolean}
    this.isMixedNumber = isMixedNumber;

    // @public {Property.<NumberPiece|null>} TODO: consider rename to note 'piece' in name?
    this.numeratorProperty = new Property( null );

    // @public {Property.<NumberPiece|null>}
    this.denominatorProperty = new Property( null );

    // @public {Property.<NumberPiece|null>} -- If it's a mixed number
    this.wholeProperty = new Property( null );

    // @public {Property.<Vector2>}
    this.positionProperty = new Property( Vector2.ZERO, {
      valueType: Vector2 // TODO: add valueType to more things?
    } );

    // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
    this.scaleProperty = new NumberProperty( 1 );

    // @public {Property.<boolean>}
    this.isAnimatingProperty = new BooleanProperty( false );

    // @public {Animator}
    this.animator = new Animator( this.positionProperty, new NumberProperty( 0 ), this.scaleProperty, this.isAnimatingProperty );

    // @public {Bounds2}
    this.numeratorBounds = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, -FRACTIONAL_NUMBER_HEIGHT - VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
    this.denominatorBounds = Bounds2.rect( -FRACTIONAL_NUMBER_WIDTH / 2, VERTICAL_SPACING, FRACTIONAL_NUMBER_WIDTH, FRACTIONAL_NUMBER_HEIGHT );
    this.wholeBounds = Bounds2.rect( -WHOLE_NUMBER_WIDTH - HORIZONTAL_SPACING - FRACTIONAL_NUMBER_WIDTH / 2, -WHOLE_NUMBER_HEIGHT / 2, WHOLE_NUMBER_WIDTH, WHOLE_NUMBER_HEIGHT );

    // @public {number} - TODO: Any reason we need this in the model
    this.fractionLineWidth = FRACTION_LINE_WIDTH;

    if ( this.isMixedNumber ) {
      var beforeCenter = ( this.numeratorBounds.right + this.wholeBounds.left ) / 2;
      this.numeratorBounds.shiftX( -beforeCenter );
      this.denominatorBounds.shiftX( -beforeCenter );
      this.wholeBounds.shiftX( -beforeCenter );
    }
  }

  fractionsCommon.register( 'NumberGroup', NumberGroup );

  return inherit( Object, NumberGroup, {
    step: function( dt ) {
      this.animator.step( dt );
    }
  } );
} );
