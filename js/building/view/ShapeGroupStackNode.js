// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  var StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {StackNode}
   *
   * @param {ShapeStackGroup} shapeGroupStack
   * @param {Object} [options]
   */
  function ShapeGroupStackNode( shapeGroupStack, options ) {

    StackNode.call( this, shapeGroupStack );

    // @private {Representation}
    this.representation = shapeGroupStack.representation;

    // @private {Node}
    this.icon = ShapeGroupNode.createIcon( shapeGroupStack.representation );

    // NOTE: Stacks and their nodes should be persistent, no need to unlink
    shapeGroupStack.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
    shapeGroupStack.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
    shapeGroupStack.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeGroupStackNode', ShapeGroupStackNode );

  return inherit( StackNode, ShapeGroupStackNode, {
    /**
     * Adds a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    addShapeGroup: function( shapeGroup ) {
      var numOffsets = FractionsCommonConstants.SHAPE_BUILD_SCALE * this.children.length;

      this.addChild( new Node( {
        children: [ this.icon ],
        translation: new Vector2( this.representation === Representation.CIRCLE ? 4 : -4, 4 ).timesScalar( numOffsets )
      } ) );
    },

    /**
     * Removes a ShapePiece's view
     * @private
     *
     * @param {ShapePiece} shapeGroup
     */
    removeShapeGroup: function( shapeGroup ) {
      this.removeChild( this.children[ this.children.length - 1 ] );
    }
  } );
} );
