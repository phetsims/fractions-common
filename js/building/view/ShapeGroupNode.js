// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoundArrowButton = require( 'FRACTIONS_COMMON/common/view/RoundArrowButton' );
  var ShapeContainerNode = require( 'FRACTIONS_COMMON/building/view/ShapeContainerNode' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );

  // constants
  var CONTAINER_PADDING = 8;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {ShapeGroup} shapeGroup
   * @param {Object} [options]
   */
  function ShapeGroupNode( shapeGroup, options ) {
    assert && assert( shapeGroup instanceof ShapeGroup );

    // TODO: animation

    Node.call( this );

    // @private {ShapeGroup}
    this.shapeGroup = shapeGroup;

    // @private {Node}
    this.shapeContainerLayer = new Node();

    // @private {Array.<ShapeContainerNode>}
    this.shapeContainerNodes = [];

    this.addChild( this.shapeContainerLayer );

    // NOTE: Groups will disappear whenever their views disappear
    shapeGroup.shapeContainers.addItemAddedListener( this.addShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.addItemRemovedListener( this.removeShapeContainer.bind( this ) );
    shapeGroup.shapeContainers.forEach( this.addShapeContainer.bind( this ) );    

    assert && assert( shapeGroup.shapeContainers.length > 0 );

    this.addChild( new HBox( {
      spacing: CONTAINER_PADDING,
      children: [
        new RoundArrowButton( {
          arrowRotation: -Math.PI / 2,
          enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
            return denominator > shapeGroup.partitionDenominatorProperty.range.min;
          } ),
          listener: function() {
            shapeGroup.partitionDenominatorProperty.value -= 1;
          }
        } ),
        new RoundArrowButton( {
          arrowRotation: Math.PI / 2,
          enabledProperty: new DerivedProperty( [ shapeGroup.partitionDenominatorProperty ], function( denominator ) {
            return denominator < shapeGroup.partitionDenominatorProperty.range.max;
          } ),
          listener: function() {
            shapeGroup.partitionDenominatorProperty.value += 1;
          }
        } )
      ],
      top: this.shapeContainerNodes[ 0 ].bottom + CONTAINER_PADDING - 3,
      centerX: 0
    } ) );

    this.mutate( options );
  }

  fractionsCommon.register( 'ShapeGroupNode', ShapeGroupNode );

  return inherit( Node, ShapeGroupNode, {
    /**
     * Adds a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    addShapeContainer: function( shapeContainer ) {
      var shapeContainerNode = new ShapeContainerNode( shapeContainer, {
        x: this.shapeContainerNodes.length * ( FractionsCommonConstants.SHAPE_WIDTH + CONTAINER_PADDING )
      } );
      this.shapeContainerNodes.push( shapeContainerNode );
      this.shapeContainerLayer.addChild( shapeContainerNode );
    },

    /**
     * Removes a ShapeContainer's view
     * @private
     *
     * @param {ShapeContainer} shapeContainer
     */
    removeShapeContainer: function( shapeContainer ) {
      var shapeContainerNode = _.find( this.shapeContainerNodes, function( shapeContainerNode ) {
        return shapeContainerNode.shapeContainer === shapeContainer;
      } );
      assert && assert( shapeContainerNode );

      this.shapeContainerNodes.remove( shapeContainerNode );
      this.shapeContainerLayer.removeChild( shapeContainerNode );
    }
  } );
} );
