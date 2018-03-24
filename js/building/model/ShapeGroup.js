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
   */
  function ShapeGroup( representation ) {

    // @public {Representation}
    this.representation = representation;

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

    // TODO: doc
    undoPiece: function() {
      for ( var i = this.shapeContainers.length - 1; i >= 0; i-- ) {
        var shapeContainer = this.shapeContainers.get( i );
        if ( shapeContainer.shapePieces.length ) {
          shapeContainer.shapePieces.pop();
          return;
        }
      }
      throw new Error( 'Could not find a piece to remove' );
    },

    /**
     * Adds a container.
     * @public
     * TODO: don't require calling this at the start? Can we ALWAYS call it initially?
     */
    increaseContainerCount: function() {
      this.shapeContainers.push( new ShapeContainer( this.partitionDenominatorProperty, this.representation, this.changedEmitter ) );
    },

    /**
     * Removes the most-recently-added container
     * @public
     */
    decreaseContainerCount: function() {
      this.shapeContainers.pop();
    }
  } );
} );
