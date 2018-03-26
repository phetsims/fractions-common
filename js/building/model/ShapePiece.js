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

    // @public {Property.<boolean>}
    this.isUserControlledProperty = new BooleanProperty( false );
  }

  fractionsCommon.register( 'ShapePiece', ShapePiece );

  return inherit( Object, ShapePiece, {
    /**
     * Returns the centroid of this piece (without any rotation).
     * @public
     *
     * @returns {Vector2}
     */
    getCentroid: function() {
      if ( this.representation === Representation.CIRCLE ) {
        if ( this.fraction.getValue() === 1 ) {
          return Vector2.ZERO;
        }
        else {
          var positiveAngle = this.fraction.getValue() * 2 * Math.PI;

          // Compute the centroid for a circular sector
          var radius = FractionsCommonConstants.SHAPE_SIZE / 2;
          var distanceFromCenter = 4 / 3 * radius * Math.sin( positiveAngle / 2 ) / positiveAngle;
          return Vector2.createPolar( distanceFromCenter, -positiveAngle / 2 );
        }
      }
      else if ( this.representation === Representation.VERTICAL_BAR ) {
        return new Vector2( FractionsCommonConstants.SHAPE_SIZE * this.fraction.getValue() / 2, 0 );
      }
      else {
        throw new Error( 'Unsupported representation for ShapePiece: ' + this.representation );
      }
    }
  }, {
    // @public {Bounds2} - The bounds taken up by the full vertical-bar representation
    VERTICAL_BAR_BOUNDS: Bounds2.point( 0, 0 ).dilatedXY( FractionsCommonConstants.SHAPE_SIZE / 2, FractionsCommonConstants.SHAPE_VERTICAL_BAR_HEIGHT / 2 )
  } );
} );
