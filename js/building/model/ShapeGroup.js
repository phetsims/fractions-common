// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var ShapeContainer = require( 'FRACTIONS_COMMON/building/model/ShapeContainer' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Representation} representation
   * @param {Object} [options}]
   */
  function ShapeGroup( representation, options ) {
    options = _.extend( {
      returnPieceListener: null
    }, options );

    // @public {Representation}
    this.representation = representation;

    // @private {function}
    this.returnPieceListener = options.returnPieceListener;

    // @public {Property.<Vector2>}
    this.positionProperty = new Property( Vector2.ZERO );

    // @public {ObservableArray.<ShapeContainer>} - Should generally only be popped/pushed
    this.shapeContainers = new ObservableArray();

    // @public {Property.<number>}
    this.partitionDenominatorProperty = new NumberProperty( 1, {
      range: new Range( 1, 8 ),
      numberType: 'Integer'
    } );

    // @public {Emitter} - Emitted when containers/pieces change
    this.changedEmitter = new Emitter();

    this.shapeContainers.addItemAddedListener( this.changedEmitter.emit.bind( this.changedEmitter ) );
    this.shapeContainers.addItemRemovedListener( this.changedEmitter.emit.bind( this.changedEmitter ) );

    // Always want at least one container
    this.increaseContainerCount();
  }

  fractionsCommon.register( 'ShapeGroup', ShapeGroup );

  return inherit( Object, ShapeGroup, {
    // TODO: doc
    hasAnyPieces: function() {
      for ( var i = 0; i < this.shapeContainers.length; i++ ) {
        if ( this.shapeContainers.get( i ).shapePieces.length ) {
          return true;
        }
      }
      return false;
    },

    /**
     * Adds a container.
     * @public
     * TODO: don't require calling this at the start? Can we ALWAYS call it initially?
     */
    increaseContainerCount: function() {
      var offset = new Vector2( this.shapeContainers.length * ( FractionsCommonConstants.SHAPE_SIZE + FractionsCommonConstants.SHAPE_CONTAINER_PADDING ), 0 );
      this.shapeContainers.push( new ShapeContainer( this, this.partitionDenominatorProperty, this.representation, this.changedEmitter, offset ) );
    },

    /**
     * Removes the most-recently-added container
     * @public
     */
    decreaseContainerCount: function() {
      while ( this.shapeContainers.length && this.shapeContainers.get( this.shapeContainers.length - 1 ).shapePieces.length ) {
        this.returnPieceListener();
      }
      this.shapeContainers.pop();
    }
  } );
} );
