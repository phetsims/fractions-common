// Copyright 2018, University of Colorado Boulder

/**
 * Supertype for different types of groups (containers of pieces in the play area)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Animator = require( 'FRACTIONS_COMMON/building/model/Animator' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Emitter = require( 'AXON/Emitter' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  class Group {
    /**
     * @param {BuildingType} type
     */
    constructor( type ) {

      // @public {BuildingType}
      this.type = type;

      // @public {Property.<Vector2>}
      this.positionProperty = new Property( Vector2.ZERO, {
        valueType: Vector2
      } );

      // @public {Property.<number>} - Applies only while out in the play area (being animated or dragged)
      this.scaleProperty = new NumberProperty( 1 );

      // @public {Emitter} - Emitted when containers/pieces change
      this.changedEmitter = new Emitter();

      // @public {Property.<boolean>} - Whether the group is being moved (not by the user)
      this.isAnimatingProperty = new BooleanProperty( false );

      // @public {Property.<Target|null>} - The target, if any, that the user is holding this group over.
      this.hoveringTargetProperty = new Property( null );

      // @public {Animator} - Responsible for animating the main properties of this group.
      this.animator = new Animator( {
        positionProperty: this.positionProperty,
        scaleProperty: this.scaleProperty,
        isAnimatingProperty: this.isAnimatingProperty
      } );

      // Keep our hover target up-to-date
      // REVIEW: Does this need an unlink?
      // REVIEW*: I don't believe so. Since we "own" the Property, any reference to this is going to also reference the
      // REVIEW*: Property (and vice versa).
      this.hoveringTargetProperty.lazyLink( ( newTarget, oldTarget ) => {
        oldTarget && oldTarget.hoveringGroups.remove( this );
        newTarget && newTarget.hoveringGroups.push( this );
      } );

      // @private {boolean}
      this.disposed = false;
    }

    /**
     * The current "amount" of the entire group
     * @public
     *
     * @returns {Fraction}
     */
    get totalFraction() {
      throw new Error( 'abstract method' );
    }

    /**
     * The center locations of every "container" in the group.
     * @public
     *
     * @returns {Array.<Vector2>}
     */
    get centerPoints() {
      throw new Error( 'abstract method' );
    }

    /**
     * Whether this group contains any pieces.
     * @public
     *
     * @returns {boolean}
     */
    hasAnyPieces() {
      throw new Error( 'abstract method' );
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
     * Clears some associated temporary properties (that isn't a full reset), particularly before it is pulled from a
     * stack.
     * @public
     */
    clear() {
      this.scaleProperty.reset();
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      assert && assert( !this.disposed );

      this.disposed = true;
    }
  }

  return fractionsCommon.register( 'Group', Group );
} );
