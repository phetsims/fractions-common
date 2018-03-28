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
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {number} number
   */
  function NumberPiece( number ) {

    // @public {number}
    this.number = number;
    
    // @public {Property.<Vector2>} - Applies only while out in the play area (being animated or dragged)
    this.positionProperty = new Property( Vector2.ZERO );

    // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
    this.scaleProperty = new NumberProperty( 1 );

    // @public {Property.<boolean>}
    this.isUserControlledProperty = new BooleanProperty( false );

    // @public {Property.<boolean>} TODO: consider rename, as we also "animate" when this is false...
    this.isAnimatingProperty = new BooleanProperty( false );

    // @public {Animator}
    this.animator = new Animator( this.positionProperty, new NumberProperty( 0 ), this.scaleProperty, new NumberProperty( 0 ), this.isAnimatingProperty );

    // @public {Bounds2}
    this.bounds = Bounds2.point( 0, 0 ).dilatedXY( ( number >= 10 ? FractionsCommonConstants.NUMBER_DOUBLE_DIGIT_WIDTH : FractionsCommonConstants.NUMBER_SINGLE_DIGIT_WIDTH ) / 2, FractionsCommonConstants.NUMBER_HEIGHT / 2 );
  }

  fractionsCommon.register( 'NumberPiece', NumberPiece );

  return inherit( Object, NumberPiece, {
    step: function( dt ) {
      this.animator.step( dt );
    }
  } );
} );
