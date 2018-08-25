// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the beaker representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const BeakerContainerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerContainerNode' );
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const BeakerPieceNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerPieceNode' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const BucketNode = require( 'FRACTIONS_COMMON/intro/view/BucketNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SceneNode = require( 'FRACTIONS_COMMON/intro/view/SceneNode' );

  class BeakerSceneNode extends SceneNode {
    /**
     * TODO: EGADS, REFACTOR OUT THE COMMON STUFF!
     *
     * @param {ContainerSetModel} model
     * @param {function} getBucketLocation - function(): Vector2, gives the location of the bucket when called
     */
    constructor( model, getBucketLocation ) {

      super( model );

      // @private
      this.model = model;

      // @private {function}
      this.getBucketLocation = getBucketLocation;

      // @private {Node}
      this.containerLayer = new HBox( {
        spacing: 35
      } );

      // @private {Node}
      this.pieceLayer = new Node();

      // @private {Array.<CircularContainerNode>}
      this.containerNodes = [];

      // @private {Array.<*>} TODO improve doc type
      this.pieceNodes = [];

      // @private {function}
      this.addListener = this.addContainer.bind( this );
      this.removeListener = this.removeContainer.bind( this );
      this.pieceAddedListener = this.onPieceAdded.bind( this );
      this.pieceRemovedListener = this.onPieceRemoved.bind( this );
      this.clearListener = this.onClearChange.bind( this );

      model.containers.addItemAddedListener( this.addListener );
      model.containers.addItemRemovedListener( this.removeListener );
      model.pieces.addItemAddedListener( this.pieceAddedListener );
      model.pieces.addItemRemovedListener( this.pieceRemovedListener );
      model.denominatorProperty.lazyLink( this.clearListener );
      model.containerCountProperty.lazyLink( this.clearListener );

      // Initial setup
      model.containers.forEach( this.addListener );

      // @public {BucketNode} - TODO: better way?
      this.bucketNode = new BucketNode( model.denominatorProperty, this.startBeakerDrag.bind( this ), this.createBeakerNode.bind( this ), model.representationProperty );

      this.addChild( new AlignBox( this.containerLayer, {
        alignBounds: Bounds2.point( 0, 10 ),

        // aligns the containerNodes with respect to the top
        yAlign: 'top'
      } ) );
    }

    /**
     * Steps forward in time.
     * @public
     * @override
     *
     * @param {number} dt
     */
    step( dt ) {
      _.each( this.pieceNodes.slice(), function( pieceNode ) {
        if ( !pieceNode.isUserControlled ) {
          pieceNode.step( dt );
        }
      } );
    }

    /**
     * @private
     */
    onClearChange() {
      this.pieceLayer.interruptSubtreeInput();
      this.pieceLayer.removeAllChildren();
      this.pieceNodes = [];
    }

    /**
     * returns the closest cell
     * @param {Vector2} midpoint
     * @param {number} [threshold]
     * @returns {Cell}
     */
    getClosestCell( midpoint, threshold ) {
      var self = this;

      var closestCell = null;
      var closestDistance = (threshold === undefined) ? Number.POSITIVE_INFINITY : 100;
      this.model.containers.forEach( function( container ) {
        container.cells.forEach( function( cell ) {
          if ( !cell.isFilledProperty.value ) {
            var cellMidpoint = self.getCellMidpoint( cell );
            var distance = cellMidpoint.distance( midpoint );
            if ( distance < closestDistance ) {
              closestDistance = distance;
              closestCell = cell;
            }
          }
        } );
      } );
      return closestCell;
    }

    /**
     * returns the midpoint associated with the cell
     * @param {Cell} cell
     * @returns {Vector2}
     * @public
     */
    getCellMidpoint( cell ) {
      var containerNode = _.find( this.containerNodes, function( containerNode ) {
        return containerNode.container === cell.container;
      } );
      //TODO: proper coordinate transform
      var matrix = containerNode.getUniqueTrail().getMatrixTo( this.pieceLayer.getUniqueTrail() );
      return matrix.timesVector2( containerNode.getMidpointByIndex( cell.index ) );
    }

    /**
     * callback whenever a piece is added
     *
     * @param {Piece} piece
     * @private
     */
    onPieceAdded( piece ) {
      // TODO: CHECK THIS, it looks.... like a very overloaded copy of CellSceneNode's
      var self = this;

      //TODO: support on all
      if ( this.createPieceNode ) {
        var pieceNode = this.createPieceNode( self.model.denominatorProperty.value, function() {
          self.model.completePiece( piece );
        }, function() {
          var currentMidpoint = pieceNode.getMidpoint();

          var closestCell = self.getClosestCell( currentMidpoint, 100 );

          pieceNode.isUserControlled = false;
          pieceNode.originProperty.value = currentMidpoint;

          if ( closestCell ) {
            pieceNode.destinationProperty.value = self.getCellMidpoint( closestCell );
            self.model.targetPieceToCell( piece, closestCell );
          }
          else {
            pieceNode.destinationProperty.value = self.getBucketLocation();
          }
        } );

        pieceNode.piece = piece;

        var originCell = piece.originCell;
        if ( originCell ) {
          pieceNode.originProperty.value = this.getCellMidpoint( originCell );
        }
        else {
          pieceNode.originProperty.value = this.getBucketLocation();
        }

        var destinationCell = piece.destinationCell;
        if ( destinationCell ) {
          pieceNode.destinationProperty.value = this.getCellMidpoint( destinationCell );
        }
        else {
          pieceNode.destinationProperty.value = this.getBucketLocation();
        }

        this.pieceNodes.push( pieceNode );
        this.pieceLayer.addChild( pieceNode );
      }
      else {
        this.model.completePiece( piece ); // don't animate piece
      }
    }

    /**
     * create a beaker piece node
     * @param {number} denominator
     * @param {Function} finishedAnimatingCallback
     * @param {Function} droppedCallback
     * @returns {BeakerPieceNode}
     * @public
     */
    createPieceNode( denominator, finishedAnimatingCallback, droppedCallback ) {
      return new BeakerPieceNode( denominator, finishedAnimatingCallback, droppedCallback );
    }

    /**
     * callback whenever a piece is remove
     *
     * @param {Piece} piece
     * @private
     */
    onPieceRemoved( piece ) {

      if ( this.createPieceNode ) {
        var pieceNode = _.find( this.pieceNodes, function( pieceNode ) {
          return pieceNode.piece === piece;
        } );
        arrayRemove( this.pieceNodes, pieceNode );
        this.pieceLayer.removeChild( pieceNode );
      }
    }

    /**
     * handles when a beaker piece is dropped
     *
     * @param {BeakerPieceNode} pieceNode
     * @private
     */
    onBeakerDropped( pieceNode ) {
      var closestContainer = null;
      var closestDistance = 150;

      _.each( this.containerNodes, containerNode => {
        var matrix = containerNode.getUniqueTrail().getMatrixTo( this.pieceLayer.getUniqueTrail() );
        var position = matrix.timesVector2( containerNode.localBounds.center );
        var distance = pieceNode.center.distance( position );
        var container = containerNode.container;

        if ( distance < closestDistance && container.getNextEmptyCell() ) {
          closestContainer = containerNode.container;
          closestDistance = distance;
        }
      } );

      if ( closestContainer ) {
        this.model.changeNumeratorManually( 1 );

        closestContainer.getNextEmptyCell().fill();

        pieceNode.destinationProperty.value = closestContainer.center;
        arrayRemove( this.pieceNodes, pieceNode );
        this.pieceLayer.removeChild( pieceNode );
      }
      else {
        pieceNode.originProperty.value = pieceNode.center;
        pieceNode.destinationProperty.value = this.getBucketLocation();
        pieceNode.isUserControlled = false;
      }
    }

    /**
     * Called when a beaker piece or cell is dragged
     *
     * @param {Event} event
     * @private
     */
    startBeakerDrag( event ) {
      var piece = this.model.grabFromBucket();
      var pieceNode = this.createPieceNode( this.model.denominatorProperty.value, pieceNode => {
        this.model.completePiece( pieceNode.piece );
      }, this.onBeakerDropped.bind( this ) );
      pieceNode.piece = piece;

      this.pieceNodes.push( pieceNode );
      this.pieceLayer.addChild( pieceNode );

      pieceNode.isUserControlled = true;
      pieceNode.center = pieceNode.globalToParentPoint( event.pointer.point );
      pieceNode.dragListener.startDrag( event );
    }

    /**
     * Handles when a user drags a cell from a displayed container.
     *
     * @param {Container} container
     * @param {Event} event
     * @private
     */
    onExistingCellDragStart( container, event ) {
      this.model.changeNumeratorManually( -1 );
      var filledCell = container.getNextFilledCell();
      if ( filledCell.appearsFilledProperty.value ) {
        filledCell.empty();
      }
      else {
        var pieceOnWay = filledCell.targetedPiece;
        filledCell.untargetFromPiece( pieceOnWay );
        this.model.pieces.remove( pieceOnWay );
      }
      this.startBeakerDrag( event );
    }

    /**
     * Creates a beaker Node with 1/D
     *
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     * @returns {BeakerNode}
     * @public
     */
    createBeakerNode( denominator, index, options ) {

      // the numerator is set to one
      return new BeakerNode( 1, denominator, options );
    }

    /**
     * adds a container when max is increased
     *
     * @param {Container} container
     * @private
     */
    addContainer( container ) {
      var self = this;

      var containerNode = new BeakerContainerNode( container, event => {
        self.onExistingCellDragStart( container, event );
      } );

      this.containerNodes.push( containerNode );
      this.containerLayer.addChild( containerNode );
    }

    /**
     * removes a container when max is decreased
     *
     * @param {Container} container
     * @private
     */
    removeContainer( container ) {
      // TODO: factor out find
      const containerNode = _.find( this.containerNodes, containerNode => containerNode.container === container );

      this.containerLayer.removeChild( containerNode );
      arrayRemove( this.containerNodes, containerNode );
      containerNode.dispose();
    }

    /**
     * dispose of the links for garbage collection
     * @public
     */
    dispose() {
      this.containerNodes.forEach( containerNode => containerNode.dispose () );

      this.model.containers.removeItemAddedListener( this.addListener );
      this.model.containers.removeItemRemovedListener( this.removeListener );
      this.model.pieces.removeItemAddedListener( this.pieceAddedListener );
      this.model.pieces.removeItemRemovedListener( this.pieceRemovedListener );
      this.model.denominatorProperty.unlink( this.clearListener );
      this.model.containerCountProperty.unlink( this.clearListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'BeakerSceneNode', BeakerSceneNode );
} );
