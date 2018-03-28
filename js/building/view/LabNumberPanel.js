// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  var NumberStackNode = require( 'FRACTIONS_COMMON/building/view/NumberStackNode' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {BuildingLabModel} model
   * @param {Object} options
   */
  function LabNumberPanel( model, options ) {
    var self = this;

    options = _.extend( {
      dragPieceFromStackListener: null,
      dragGroupFromStackListener: null
    }, options );

    // @private {BuildingLabModel}
    this.model = model;

    // TODO: DO WE REALLY NEED THIS?
    var stackAlignGroup = new AlignGroup( {
      matchHorizontal: false
    } );

    // @private {Array.<NumberStackNode>}
    this.numberStackNodes = [];

    var stackContainers = model.numberStacks.map( function( numberStack ) {
      var node = new NumberStackNode( numberStack, {
        pickable: false
      } );
      self.numberStackNodes.push( node );
      return new AlignBox( node, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            // TODO: doc
            options.dragPieceFromStackListener( event, numberStack );
          } )
        ]
      } );
    } );

    function createGroupIcon( isMixedNumber ) {
      var iconGroup = new NumberGroup( isMixedNumber );
      var iconNode = new NumberGroupNode( iconGroup, {
        isIcon: true,
        scale: FractionsCommonConstants.NUMBER_BUILD_SCALE,
        pickable: false
      } );
      return new AlignBox( iconNode, {
        group: stackAlignGroup,
        cursor: 'pointer',
        inputListeners: [
          DragListener.createForwardingListener( function( event ) {
            // TODO
            options.dragGroupFromStackListener( event, isMixedNumber );
          } )
        ]
      } );
    }

    var nonMixedGroupIcon = createGroupIcon( false );
    var mixedGroupIcon = createGroupIcon( true );

    var STACK_PADDING = 20;

    stackContainers.concat( [ nonMixedGroupIcon, mixedGroupIcon ] ).forEach( function( node ) {
      Property.multilink( [ stackAlignGroup.maxHeightProperty ], function( height ) {
        var bounds = new Bounds2( -STACK_PADDING / 2 + node.left, 0, node.right + STACK_PADDING / 2, height );
        node.mouseArea = bounds;
        node.touchArea = bounds;
      } );
    } );

    var numberBox = new HBox( {
      spacing: STACK_PADDING,
      children: [ nonMixedGroupIcon ].concat( stackContainers ).concat( model.allowMixedNumbers ? [ mixedGroupIcon ] : [] )
    } );

    // TODO: background color customizable
    Panel.call( this, numberBox, {
      xMargin: 20
    } );
  }

  fractionsCommon.register( 'LabNumberPanel', LabNumberPanel );

  return inherit( Panel, LabNumberPanel, {
    // TODO: doc
    updateModelLocations: function( modelViewTransform ) {
      for ( var i = 0; i < this.numberStackNodes.length; i++ ) {
        var numberStackNode = this.numberStackNodes[ i ];
        var stackLocation = modelViewTransform.viewToModelPosition( numberStackNode.getUniqueTrailTo( this ).localToGlobalPoint( Vector2.ZERO ) );
        numberStackNode.numberStack.positionProperty.value = stackLocation;
      }

      // TODO: positioning of the groups
    }
  } );
} );
