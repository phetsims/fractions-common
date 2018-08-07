// Copyright 2018, University of Colorado Boulder

/**
 * Main view for FractionChallenges
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const FractionChallengePanel = require( 'FRACTIONS_COMMON/game/view/FractionChallengePanel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberGroupNode = require( 'FRACTIONS_COMMON/building/view/NumberGroupNode' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const ShapeGroupNode = require( 'FRACTIONS_COMMON/building/view/ShapeGroupNode' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const TargetNode = require( 'FRACTIONS_COMMON/game/view/TargetNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const levelTitlePatternString = require( 'string!FRACTIONS_COMMON/levelTitlePattern' );

  // constants
  const PANEL_MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class FractionChallengeNode extends Node {
    // TODO: anything to share with build?
    /**
     * @param {FractionChallenge} challenge
     * @param {Bounds2} layoutBounds
     */
    constructor( challenge, layoutBounds ) {
      super();

      // @private
      this.challenge = challenge;

      // @private {Property.<Bounds2>}
      this.shapeDragBoundsProperty = new Property( layoutBounds );
      this.numberDragBoundsProperty = new Property( layoutBounds );

      // @private {Node}
      this.panel = new FractionChallengePanel( challenge, ( event, stack ) => {
        if ( stack instanceof ShapeStack ) {
          if ( !stack.shapePieces.length ) { return; }
          var shapePiece = stack.shapePieces.pop();
          shapePiece.scaleProperty.reset();
          shapePiece.rotationProperty.reset();
          shapePiece.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          challenge.activeShapePieces.push( shapePiece );
          // TODO: factor this "find" usage out
          var shapePieceNode = _.find( this.shapePieceNodes, function( shapePieceNode ) {
            return shapePieceNode.shapePiece === shapePiece;
          } );
          shapePieceNode.dragListener.press( event, shapePieceNode );
        }
        else if ( stack instanceof NumberStack ) {
          if ( !stack.numberPieces.length ) { return; }
          var numberPiece = stack.numberPieces.pop();
          numberPiece.scaleProperty.reset();
          numberPiece.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          challenge.dragNumberPieceFromStack( numberPiece, stack );
          // TODO: factor this "find" usage out
          var numberPieceNode = _.find( this.numberPieceNodes, function( numberPieceNode ) {
            return numberPieceNode.numberPiece === numberPiece;
          } );
          numberPieceNode.dragListener.press( event, numberPieceNode );
        }
        else if ( stack instanceof ShapeGroupStack ) {
          // TODO: encapsulation
          // TODO: limit quantity
          var shapeGroup = challenge.addShapeGroup( stack.representation );
          shapeGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          var shapeGroupNode = _.find( this.shapeGroupNodes, function( shapeGroupNode ) {
            return shapeGroupNode.shapeGroup === shapeGroup;
          } );
          shapeGroupNode.dragListener.press( event, shapeGroupNode );
          event.handle(); // for our selection
        }
        else if ( stack instanceof NumberGroupStack ) {
          // TODO: limit quantity
          var numberGroup = challenge.addNumberGroup( stack.isMixedNumber );
          numberGroup.positionProperty.value = this.modelViewTransform.viewToModelPosition( this.globalToLocalPoint( event.pointer.point ) );
          var numberGroupNode = _.find( this.numberGroupNodes, function( numberGroupNode ) {
            return numberGroupNode.numberGroup === numberGroup;
          } );
          numberGroupNode.dragListener.press( event, numberGroupNode );
        }
        else {
          throw new Error( 'unknown stack type' );
        }
      } );

      // @private {function}
      this.addShapeGroupListener = this.addShapeGroup.bind( this );
      this.removeShapeGroupListener = this.removeShapeGroup.bind( this );
      this.addNumberGroupListener = this.addNumberGroup.bind( this );
      this.removeNumberGroupListener = this.removeNumberGroup.bind( this );
      this.addShapePieceListener = this.addShapePiece.bind( this );
      this.removeShapePieceListener = this.removeShapePiece.bind( this );
      this.addNumberPieceListener = this.addNumberPiece.bind( this );
      this.removeNumberPieceListener = this.removeNumberPiece.bind( this );

      // @private {Node}
      this.groupLayer = new Node();

      // @private {Node}
      this.pieceLayer = new Node();

      // @private {Node}
      this.targetsContainer = new VBox( {
        // TODO: unhook from panel_margin?
        spacing: PANEL_MARGIN + 2,
        align: 'left',
        // TODO: unlink?
        children: challenge.targets.map( target => new TargetNode( target ) )
      } );

      // @private {Node}
      this.levelText = new Text( StringUtils.fillIn( levelTitlePatternString, { number: challenge.levelNumber } ), {
        font: new PhetFont( { size: 30, weight: 'bold' } )
      } );

      this.children = [
        this.panel,
        this.targetsContainer,
        this.levelText,
        this.groupLayer,
        this.pieceLayer
      ];

      // layout
      this.panel.bottom = layoutBounds.bottom - PANEL_MARGIN;
      this.targetsContainer.right = layoutBounds.right - PANEL_MARGIN;
      const horizontalCenter = ( layoutBounds.left + this.targetsContainer.left ) / 2;
      this.targetsContainer.centerY = ( layoutBounds.top + this.panel.top ) / 2;
      this.panel.centerX = horizontalCenter;
      if ( this.panel.left < PANEL_MARGIN ) {
        this.panel.left = PANEL_MARGIN;
      }
      this.levelText.centerX = horizontalCenter;
      this.levelText.top = layoutBounds.top + PANEL_MARGIN;

      // @public {ModelViewTransform2}
      this.modelViewTransform = new ModelViewTransform2( Matrix3.translationFromVector( new Vector2( horizontalCenter, layoutBounds.centerY ) ) );

      this.panel.updateModelLocations( this.modelViewTransform );

      this.shapeDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( layoutBounds );
      this.numberDragBoundsProperty.value = this.modelViewTransform.viewToModelBounds( layoutBounds );

      // @private {Array.<ShapeGroupNode>}
      this.shapeGroupNodes = []; // TODO: interrupt on reset

      challenge.shapeGroups.addItemAddedListener( this.addShapeGroupListener );
      challenge.shapeGroups.addItemRemovedListener( this.removeShapeGroupListener );
      challenge.shapeGroups.forEach( this.addShapeGroupListener );

      // @private {Array.<NumberGroupNode>}
      this.numberGroupNodes = []; // TODO: interrupt on reset

      challenge.numberGroups.addItemAddedListener( this.addNumberGroupListener );
      challenge.numberGroups.addItemRemovedListener( this.removeNumberGroupListener );
      challenge.numberGroups.forEach( this.addNumberGroupListener );

      // @private {Array.<ShapePieceNode>}
      this.shapePieceNodes = []; // TODO: interrupt on reset

      challenge.activeShapePieces.addItemAddedListener( this.addShapePieceListener );
      challenge.activeShapePieces.addItemRemovedListener( this.removeShapePieceListener );

      // @private {Array.<NumberPieceNode>}
      this.numberPieceNodes = []; // TODO: interrupt on reset

      challenge.activeNumberPieces.addItemAddedListener( this.addNumberPieceListener );
      challenge.activeNumberPieces.addItemRemovedListener( this.removeNumberPieceListener );
    }

    addShapeGroup( shapeGroup ) {
      var shapeGroupNode = new ShapeGroupNode( shapeGroup, {
        dragBoundsProperty: this.shapeDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,
        dropListener: () => {
          // TODO: What about groups with lots of containers?
          if ( this.panel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( shapeGroup.positionProperty.value ) ) ) {
            this.challenge.returnShapeGroup( shapeGroup );
          }
        },
        removeLastListener: () => {
          this.challenge.removeLastPieceFromShapeGroup( shapeGroup );
        },
        isSelectedProperty: this.challenge.getShapeControlsVisibleProperty( shapeGroup )
      } );
      this.shapeGroupNodes.push( shapeGroupNode );
      this.groupLayer.addChild( shapeGroupNode );
    }

    removeShapeGroup( shapeGroup ) {
      var shapeGroupNode = _.find( this.shapeGroupNodes, function( shapeGroupNode ) {
        return shapeGroupNode.shapeGroup === shapeGroup;
      } );
      assert && assert( shapeGroupNode );

      arrayRemove( this.shapeGroupNodes, shapeGroupNode );
      this.groupLayer.removeChild( shapeGroupNode );
      shapeGroupNode.dispose();
    }

    addNumberGroup( numberGroup ) {
      var numberGroupNode = new NumberGroupNode( numberGroup, {
        dragBoundsProperty: this.numberDragBoundsProperty,
        modelViewTransform: this.modelViewTransform,

        dropListener: () => {
          if ( this.panel.bounds.dilated( 10 ).containsPoint( this.modelViewTransform.modelToViewPosition( numberGroup.positionProperty.value ) ) ) {
            this.challenge.returnNumberGroup( numberGroup );
          }
        },
        removeLastListener: () => {
          this.challenge.removeLastPieceFromNumberGroup( numberGroup );
        },
        isSelectedProperty: new BooleanProperty( true )
      } );
      this.numberGroupNodes.push( numberGroupNode );
      this.groupLayer.addChild( numberGroupNode );
    }

    removeNumberGroup( numberGroup ) {
      var numberGroupNode = _.find( this.numberGroupNodes, numberGroupNode => numberGroupNode.numberGroup === numberGroup );
      assert && assert( numberGroupNode );

      arrayRemove( this.numberGroupNodes, numberGroupNode );
      this.groupLayer.removeChild( numberGroupNode );
      numberGroupNode.dispose();
    }

    addShapePiece( shapePiece ) {
      var shapePieceNode = new ShapePieceNode( shapePiece, {
        positioned: true,
        modelViewTransform: this.modelViewTransform,
        dropListener: wasTouch => {
          this.challenge.shapePieceDropped( shapePiece, wasTouch ? 50 : 0 );
        }
      } );
      this.shapePieceNodes.push( shapePieceNode );
      this.pieceLayer.addChild( shapePieceNode );
    }

    removeShapePiece( shapePiece ) {
      var shapePieceNode = _.find( this.shapePieceNodes, shapePieceNode => shapePieceNode.shapePiece === shapePiece );

      arrayRemove( this.shapePieceNodes, shapePieceNode );
      this.pieceLayer.removeChild( shapePieceNode );
      shapePieceNode.dispose();
    }

    addNumberPiece( numberPiece ) {
      var numberPieceNode = new NumberPieceNode( numberPiece, {
        positioned: true,
        modelViewTransform: this.modelViewTransform,
        dropListener: wasTouch => {
          this.challenge.numberPieceDropped( numberPiece, wasTouch ? 50 : 20 );
        }
      } );
      this.numberPieceNodes.push( numberPieceNode );
      this.pieceLayer.addChild( numberPieceNode );
    }

    removeNumberPiece( numberPiece ) {
      var numberPieceNode = _.find( this.numberPieceNodes, numberPieceNode => numberPieceNode.numberPiece === numberPiece );

      arrayRemove( this.numberPieceNodes, numberPieceNode );
      this.pieceLayer.removeChild( numberPieceNode );
      numberPieceNode.dispose();
    }

    dispose() {
      this.challenge.shapeGroups.removeItemAddedListener( this.addShapeGroupListener );
      this.challenge.shapeGroups.removeItemRemovedListener( this.removeShapeGroupListener );

      this.challenge.numberGroups.removeItemAddedListener( this.addNumberGroupListener );
      this.challenge.numberGroups.removeItemRemovedListener( this.removeNumberGroupListener );

      this.challenge.activeShapePieces.removeItemAddedListener( this.addShapePieceListener );
      this.challenge.activeShapePieces.removeItemRemovedListener( this.removeShapePieceListener );

      this.challenge.activeNumberPieces.removeItemAddedListener( this.addNumberPieceListener );
      this.challenge.activeNumberPieces.removeItemRemovedListener( this.removeNumberPieceListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'FractionChallengeNode', FractionChallengeNode );
} );
