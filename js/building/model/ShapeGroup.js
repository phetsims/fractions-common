// Copyright 2018, University of Colorado Boulder

/**
 * Represents a (growing/shrinking) set of ShapeContainers, so that it can hold arbitrary mixed fraction
 * representations. Each container can hold shape pieces, and can add up to at most 1.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Group = require( 'FRACTIONS_COMMON/building/model/Group' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Range = require( 'DOT/Range' );
  const ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  const Vector2 = require( 'DOT/Vector2' );

  class ShapeGroup extends Group {
    /**
     * @param {BuildingRepresentation} representation
     * @param {Object} [options}]
     */
    constructor( representation, options ) {
      options = _.extend( {
        returnPieceListener: null,

        // {number} - The maximum number of containers. Should be at least 1
        maxContainers: FractionsCommonConstants.MAX_SHAPE_CONTAINERS
      }, options );

      super( BuildingType.SHAPE );

      assert && assert( _.includes( BuildingRepresentation.VALUES, representation ) );
      assert && assert( typeof options.maxContainers === 'number' && options.maxContainers >= 1 );

      // @public {BuildingRepresentation}
      this.representation = representation;

      // @public {number}
      this.maxContainers = options.maxContainers;

      // @private {function}
      this.returnPieceListener = options.returnPieceListener;

      // @public {ObservableArray.<ShapeContainer>} - Should generally only be popped/pushed
      this.shapeContainers = new ObservableArray();

      // @public {Property.<number>}
      this.partitionDenominatorProperty = new NumberProperty( 1, {
        range: new Range( 1, 8 ),
        numberType: 'Integer'
      } );

      this.shapeContainers.addItemAddedListener( () => this.changedEmitter.emit() );
      this.shapeContainers.addItemRemovedListener( () => this.changedEmitter.emit() );

      // Always want at least one container
      this.increaseContainerCount();
    }

    /**
     * The current "amount" of the entire group
     * @public
     * @override
     *
     * @returns {Fraction}
     */
    get totalFraction() {
      return this.shapeContainers.reduce( new Fraction( 0, 1 ), ( fraction, shapeContainer ) => fraction.plus( shapeContainer.totalFractionProperty.value ) );
    }

    /**
     * The center locations of every "container" in the group.
     * @public
     * @override
     *
     * @returns {Array.<Vector2>}
     */
    get centerPoints() {
      return this.shapeContainers.getArray().map( shapeContainer => this.positionProperty.value.plus( shapeContainer.offset ) );
    }

    /**
     * Clears some associated temporary properties (that isn't a full reset), particularly before it is pulled from a
     * stack.
     * @public
     * @override
     */
    clear() {
      this.partitionDenominatorProperty.reset();

      super.clear();
    }

    /**
     * Whether this group contains any pieces.
     * @public
     * @override
     *
     * @returns {boolean}
     */
    hasAnyPieces() {
      // REVIEW: Are we still using 'var' in for loops?
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
     */
    increaseContainerCount() {
      // REVIEW: 'let' instead of 'var'?
      var offset = new Vector2( this.shapeContainers.length * ( FractionsCommonConstants.SHAPE_SIZE + FractionsCommonConstants.SHAPE_CONTAINER_PADDING ), 0 );
      this.shapeContainers.push( new ShapeContainer( this, this.partitionDenominatorProperty, this.representation, this.changedEmitter, offset ) );
    }

    /**
     * Removes the most-recently-added container
     * @public
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
