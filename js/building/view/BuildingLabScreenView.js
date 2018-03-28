// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var arrayRemove = require( 'PHET_CORE/arrayRemove' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LabNumberPanel = require( 'FRACTIONS_COMMON/building/view/LabNumberPanel' );
  var LabShapePanel = require( 'FRACTIONS_COMMON/building/view/LabShapePanel' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );

  // constants
  var PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {BuildingLabModel} model
   */
  function BuildingLabScreenView( model ) {
    var self = this;

    // @private
    this.model = model;

    ScreenView.call( this );

    // @public {ModelViewTransform2}
    this.modelViewTransform = new ModelViewTransform2( Matrix3.translationFromVector( this.layoutBounds.center ) );

    // @private {Node}
    this.shapePanel = new LabShapePanel( model, {
      dragPieceFromStackListener: function( event, stack ) {
        var shapePiece = new ShapePiece( stack.fraction, stack.representation, stack.colorProperty );
        shapePiece.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
        model.activeShapePieces.push( shapePiece );
        // TODO: factor this "find" usage out
        var shapePieceNode = _.find( self.shapePieceNodes, function( shapePieceNode ) {
          return shapePieceNode.shapePiece === shapePiece;
        } );
        shapePieceNode.dragListener.press( event, shapePieceNode );
      },
      dragGroupFromStackListener: function( event, representation ) {
        // TODO: encapsulation
        var shapeGroup = model.addShapeGroup( representation );
        shapeGroup.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
        var shapeGroupNode = _.find( self.shapeGroupNodes, function( shapeGroupNode ) {
          return shapeGroupNode.shapeGroup === shapeGroup;
        } );
        shapeGroupNode.dragListener.press( event, shapeGroupNode );
        event.handle(); // for our selection
      }
    } );

    // @private {Node}
    this.numberPanel = new LabNumberPanel( model, {
      dragPieceFromStackListener: function( event, numberStack ) {
        var numberPiece = new NumberPiece( numberStack.number );
        numberPiece.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
        model.activeNumberPieces.push( numberPiece );
        // TODO: factor this "find" usage out
        var numberPieceNode = _.find( self.numberPieceNodes, function( numberPieceNode ) {
          return numberPieceNode.numberPiece === numberPiece;
        } );
        numberPieceNode.dragListener.press( event, numberPieceNode );
      },
      dragGroupFromStackListener: function( event, isMixedNumber ) {
        // TODO: encapsulation
        var numberGroup = new NumberGroup( isMixedNumber );
        model.numberGroups.push( numberGroup );
        numberGroup.positionProperty.value = self.modelViewTransform.viewToModelPosition( self.globalToLocalPoint( event.pointer.point ) );
        var numberGroupNode = _.find( self.numberGroupNodes, function( numberGroupNode ) {
          return numberGroupNode.numberGroup === numberGroup;
        } );
        numberGroupNode.dragListener.press( event, numberGroupNode );
      }
    } );

    // @private {Node}
    this.groupLayer = new Node();

    // @private {Node}
    this.pieceLayer = new Node();

    // @private {Array.<ShapeGroupNode>}
    this.shapeGroupNodes = []; // TODO: interrupt on reset

    model.shapeGroups.addItemAddedListener( this.addShapeGroup.bind( this ) );
    model.shapeGroups.addItemRemovedListener( this.removeShapeGroup.bind( this ) );
    model.shapeGroups.forEach( this.addShapeGroup.bind( this ) );

    // @private {Array.<NumberGroupNode>}
    this.numberGroupNodes = []; // TODO: interrupt on reset

    model.numberGroups.addItemAddedListener( this.addNumberGroup.bind( this ) );
    model.numberGroups.addItemRemovedListener( this.removeNumberGroup.bind( this ) );
    model.numberGroups.forEach( this.addNumberGroup.bind( this ) );

    // @private {Array.<ShapePieceNode>}
    this.shapePieceNodes = []; // TODO: interrupt on reset

    model.activeShapePieces.addItemAddedListener( function( shapePiece ) {
      var shapePieceNode = new ShapePieceNode( shapePiece, {
        positioned: true,
        modelViewTransform: self.modelViewTransform,
        dropListener: function( wasTouch ) {
          model.shapePieceDropped( shapePiece, wasTouch ? 50 : 0 );
        }
      } );
      self.shapePieceNodes.push( shapePieceNode );
      self.pieceLayer.addChild( shapePieceNode );
    } );
    model.activeShapePieces.addItemRemovedListener( function( shapePiece ) {
      var shapePieceNode = _.find( self.shapePieceNodes, function( shapePieceNode ) {
        return shapePieceNode.shapePiece === shapePiece;
      } );

      arrayRemove( self.shapePieceNodes, shapePieceNode );
      self.pieceLayer.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    } );

    // @private {Array.<NumberPieceNode>}
    this.numberPieceNodes = []; // TODO: interrupt on reset

    model.activeNumberPieces.addItemAddedListener( function( numberPiece ) {
      var numberPieceNode = new NumberPieceNode( numberPiece, {
        positioned: true,
        modelViewTransform: self.modelViewTransform,
        dropListener: function( wasTouch ) {
          model.numberPieceDropped( numberPiece, wasTouch ? 50 : 20 );
        }
      } );
      self.numberPieceNodes.push( numberPieceNode );
      self.pieceLayer.addChild( numberPieceNode );
    } );
    model.activeNumberPieces.addItemRemovedListener( function( numberPiece ) {
      var numberPieceNode = _.find( self.numberPieceNodes, function( numberPieceNode ) {
        return numberPieceNode.numberPiece === numberPiece;
      } );

      arrayRemove( self.numberPieceNodes, numberPieceNode );
      self.pieceLayer.removeChild( numberPieceNode );
      numberPieceNode.dispose();
    } );

    phet.joist.display.addInputListener( {
      down: function() {
        // Any event on a shape group should handle it.
        // TODO: How do we.... handle number groups? Use same property presumably. TODO
        model.selectedShapeGroupProperty.value = null;
      }
    } );

    // @private {Node}
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var topAlignBox = new AlignBox( this.shapePanel, {
      xAlign: 'center',
      yAlign: 'top',
      margin: PANEL_MARGIN
    } );

    var bottomAlignBox = new AlignBox( this.numberPanel, {
      xAlign: 'center',
      yAlign: 'bottom',
      margin: PANEL_MARGIN
    } );

    var bottomRightAlignBox = new AlignBox( resetAllButton, {
      xAlign: 'right',
      yAlign: 'bottom',
      margin: PANEL_MARGIN
    } );

    this.children = [
      bottomRightAlignBox,
      topAlignBox,
      bottomAlignBox,
      this.groupLayer,
      this.pieceLayer
    ];

    this.visibleBoundsProperty.link( function( visibleBounds ) {
      topAlignBox.alignBounds = visibleBounds;
      bottomAlignBox.alignBounds = visibleBounds;
      bottomRightAlignBox.alignBounds = visibleBounds;
      self.shapePanel.updateModelLocations( self.modelViewTransform );
      self.numberPanel.updateModelLocations( self.modelViewTransform );
    } );
  }

  fractionsCommon.register( 'BuildingLabScreenView', BuildingLabScreenView );

  return inherit( ScreenView, BuildingLabScreenView, {
    addShapeGroup: function( shapeGroup ) {
      var self = this;

      var shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        modelViewTransform: this.modelViewTransform,
        dropListener: function() {
          // TODO: What about groups with lots of containers?
          if ( self.shapePanel.bounds.dilated( 10 ).containsPoint( self.modelViewTransform.modelToViewPosition( shapeGroup.positionProperty.value ) ) ) {
            self.model.returnShapeGroup( shapeGroup );
          }
        },
        selectListener: function() {
          self.model.selectedShapeGroupProperty.value = shapeGroup;
        },
        removeLastListener: function() {
          self.model.removeLastPieceFromShapeGroup( shapeGroup );
        },
        isSelectedProperty: new DerivedProperty( [ self.model.selectedShapeGroupProperty ], function( selectedShapeGroup ) {
          return selectedShapeGroup === shapeGroup;
        } )
      } );
      this.shapeGroupNodes.push( shapeGroupNode );
      this.groupLayer.addChild( shapeGroupNode );
    },

    removeShapeGroup: function( shapeGroup ) {
      var shapeGroupNode = _.find( this.shapeGroupNodes, function( shapeGroupNode ) {
        return shapeGroupNode.shapeGroup === shapeGroup;
      } );
      assert && assert( shapeGroupNode );

      arrayRemove( this.shapeGroupNodes, shapeGroupNode );
      this.groupLayer.removeChild( shapeGroupNode );
      shapeGroupNode.dispose();
    },

    addNumberGroup: function( numberGroup ) {
      var self = this;

      var numberGroupNode = new NumberGroupNode( numberGroup, {
        modelViewTransform: this.modelViewTransform,

        dropListener: function() {
          if ( self.numberPanel.bounds.dilated( 10 ).containsPoint( self.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value ) ) ) {
            self.model.returnNumberGroup( numberGroup );
          }
        },
        removeLastListener: function() {
          self.model.removeLastPieceFromNumberGroup( numberGroup );
        }
      } );
      this.numberGroupNodes.push( numberGroupNode );
      this.groupLayer.addChild( numberGroupNode );
    },

    removeNumberGroup: function( numberGroup ) {
      var numberGroupNode = _.find( this.numberGroupNodes, function( numberGroupNode ) {
        return numberGroupNode.numberGroup === numberGroup;
      } );
      assert && assert( numberGroupNode );

      arrayRemove( this.numberGroupNodes, numberGroupNode );
      this.groupLayer.removeChild( numberGroupNode );
      numberGroupNode.dispose();
    },

    step: function( dt ) {

    }
  } );
} );
