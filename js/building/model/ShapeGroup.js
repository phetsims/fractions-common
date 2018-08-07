// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Emitter = require( 'AXON/Emitter' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  const Vector2 = require( 'DOT/Vector2' );

  class ShapeGroup {
    /**
     * @param {Representation} representation
     * @param {Object} [options}]
     */
    constructor( representation, options ) {
      options = _.extend( {
        returnPieceListener: null
      }, options );

      // @public {Representation}
      this.representation = representation;

      // @private {function}
      this.returnPieceListener = options.returnPieceListener;

      // @public {Property.<Vector2>}
      this.positionProperty = new Property( Vector2.ZERO, {
        valueType: Vector2
      } );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // @public {ObservableArray.<ShapeContainer>} - Should generally only be popped/pushed
      this.shapeContainers = new ObservableArray();

      // @public {Property.<number>}
      this.partitionDenominatorProperty = new NumberProperty( 1, {
        range: new Range( 1, 8 ),
        numberType: 'Integer'
      } );

      // @public {Emitter} - Emitted when containers/pieces change
      this.changedEmitter = new Emitter();

      // @public {Property.<boolean>}
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Animator}
      this.animator = new Animator( this.positionProperty, new NumberProperty( 0 ), this.scaleProperty, new NumberProperty( 0 ), this.isAnimatingProperty );

      this.shapeContainers.addItemAddedListener( this.changedEmitter.emit.bind( this.changedEmitter ) );
      this.shapeContainers.addItemRemovedListener( this.changedEmitter.emit.bind( this.changedEmitter ) );

      // Always want at least one container
      this.increaseContainerCount();
    }

    // TODO: do we want this as a property?
    get totalFraction() {
      return this.shapeContainers.reduce( new Fraction( 0, 1 ), ( fraction, shapeContainer ) => fraction.plus( shapeContainer.totalFractionProperty.value ) );
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
     * Returns whether there are any pieces in any of the shape containers.
     * @public
     *
     * @returns {boolean}
     */
    hasAnyPieces() {
      for ( var i = 0; i < this.shapeContainers.length; i++ ) {
        if ( this.shapeContainers.get( i ).shapePieces.length ) {
          return true;
        }
      }
      return false;
    }

    /**
     * Adds a container.
     * @public
     * TODO: don't require calling this at the start? Can we ALWAYS call it initially?
     */
    increaseContainerCount() {
      var offset = new Vector2( this.shapeContainers.length * ( FractionsCommonConstants.SHAPE_SIZE + FractionsCommonConstants.SHAPE_CONTAINER_PADDING ), 0 );
      this.shapeContainers.push( new ShapeContainer( this, this.partitionDenominatorProperty, this.representation, this.changedEmitter, offset ) );
    }

    /**
     * Removes the most-recently-added container
     * @public
     *
     * TODO: Should we do this when being returned/animated back to the panel?
     */
    decreaseContainerCount() {
      while ( this.shapeContainers.length && this.shapeContainers.get( this.shapeContainers.length - 1 ).shapePieces.length ) {
        this.returnPieceListener();
      }
      this.shapeContainers.pop();
    }
  }

  return fractionsCommon.register( 'ShapeGroup', ShapeGroup );
} );
