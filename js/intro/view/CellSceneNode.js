// Copyright 2018, University of Colorado Boulder

/**
 * Shows scenes that are based off of cells.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const BucketNode = require( 'FRACTIONS_COMMON/intro/view/BucketNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SceneNode = require( 'FRACTIONS_COMMON/intro/view/SceneNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class CellSceneNode extends SceneNode {
    /**
     * @param {ContainerSetModel} model
     * @param {Object} config
     */
    constructor( model, config ) {
      config = _.extend( {
        // {function} - function( {Node} container, {function} cellDownCallback ): {Node}
        createContainerNode: null,

        // {function} - function( {Node} piece, {function} finishedAnimatingCallback, {function} droppedCallback ): {Node}
        createPieceNode: null,

        // {function} - function( {number} denominator, {number} index, {Object} options ): {Node}
        createCellNode: null,

        // {function} - function(): {Vector2} - gives the location of the bucket when called
        getBucketLocation: null,

        // {number} - optional
        horizontalSpacing: 10, // horizontal spacing between adjacent containers
        verticalSpacing: 10, // vertical spacing between containers
        verticalOffset: 0
      }, config );

      assert && assert( typeof config.createContainerNode === 'function' );
      assert && assert( typeof config.createPieceNode === 'function' );
      assert && assert( typeof config.createCellNode === 'function' );
      assert && assert( typeof config.getBucketLocation === 'function' );

      super( model );

      // {function} - Creation functions from subtypes (here since we can't use the inherit pattern)
      this.createContainerNode = config.createContainerNode;
      this.createPieceNode = config.createPieceNode;
      this.createCellNode = config.createCellNode;

      // @private {function}
      this.getBucketLocation = config.getBucketLocation;

      // @private {number}
      this.horizontalSpacing = config.horizontalSpacing;

      // @private {VBox}
      this.containerLayer = new VBox( {
        spacing: config.verticalSpacing,
        align: 'left'
      } );

      // @private {Node}
      this.pieceLayer = new Node();

      // @private {Array.<*>}
      this.containerNodes = [];

      // @private {Array.<PieceNode>}
      this.pieceNodes = [];

      //@private {Array.<HBox>}
      this.containerHBoxes = [];

      // @private {function}
      this.addListener = this.addContainer.bind( this );
      this.removeListener = this.removeContainer.bind( this );
      this.pieceAddedListener = this.onPieceAdded.bind( this );
      this.pieceRemovedListener = this.onPieceRemoved.bind( this );

      model.containers.addItemAddedListener( this.addListener );
      model.containers.addItemRemovedListener( this.removeListener );
      model.pieces.addItemAddedListener( this.pieceAddedListener );
      model.pieces.addItemRemovedListener( this.pieceRemovedListener );

      // Initial setup
      model.containers.forEach( this.addListener );

      // @public {BucketNode} - TODO: better way?
      this.bucketNode = new BucketNode( model.denominatorProperty, this.onBucketDragStart.bind( this ),
                                        this.createCellNode.bind( this ), model.representationProperty );

      this.addChild( new AlignBox( this.containerLayer, {
        //TODO: WTF? This is tiny?
        alignBounds: Bounds2.point( 0, config.verticalOffset ),

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
      super.step( dt );

      this.pieceNodes.slice().forEach( pieceNode => {
        pieceNode.step( dt );

        if ( pieceNode.isUserControlled ) {
          const closestCell = this.getClosestCell( pieceNode.getMidpoint() );
          if ( closestCell ) {
            pieceNode.orient( closestCell, dt );
          }
        }
      } );
    }

    /**
     * Orients the piece to match the closest cell.
     * @public
     *
     * @param {Cell} closestCell
     * @param {number} dt
     */
    orient( closestCell, dt ) {
      // Implementations can customize
    }

    /**
     * returns the closest cell
     * @param {Vector2} midpoint
     * @param {number} [threshold]
     * @returns {Cell}
     */
    getClosestCell( midpoint, threshold ) {
      let closestCell = null;
      let closestDistance = (threshold === undefined) ? Number.POSITIVE_INFINITY : 100;
      this.model.containers.forEach( container => {
        container.cells.forEach( cell => {
          if ( !cell.isFilledProperty.value ) {
            const cellMidpoint = this.getCellMidpoint( cell );
            const distance = cellMidpoint.distance( midpoint );
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
      const containerNode = _.find( this.containerNodes, containerNode => containerNode.container === cell.container );
      //TODO: proper coordinate transform
      const matrix = containerNode.getUniqueTrail().getMatrixTo( this.pieceLayer.getUniqueTrail() );
      return matrix.timesVector2( containerNode.getMidpointByIndex( cell.index ) );
    }

    /**
     * callback whenever a piece is added
     * @param {Piece} piece
     * @private
     */
    onPieceAdded( piece ) {
      //TODO: support on all
      if ( this.createPieceNode ) {
        const pieceNode = this.createPieceNode( piece,
          () => {
            this.model.completePiece( piece );
          },
          () => {
            const currentMidpoint = pieceNode.getMidpoint();

            const closestCell = this.getClosestCell( currentMidpoint, 100 );

            pieceNode.isUserControlled = false;
            pieceNode.originProperty.value = currentMidpoint;

            if ( closestCell ) {
              pieceNode.destinationProperty.value = this.getCellMidpoint( closestCell );
              this.model.targetPieceToCell( piece, closestCell );
            }
            else {
              pieceNode.destinationProperty.value = this.getBucketLocation();
            }
          } );

        const originCell = piece.originCell;
        if ( originCell ) {
          pieceNode.originProperty.value = this.getCellMidpoint( originCell );
        }
        else {
          pieceNode.originProperty.value = this.getBucketLocation();
        }

        const destinationCell = piece.destinationCell;
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
        this.model.completePiece( piece );
      }
    }

    /**
     * callback whenever a piece is remove
     *
     * @param {Piece} piece
     * @private
     */
    onPieceRemoved( piece ) {
      //TODO: support on all
      if ( this.createPieceNode ) {
        const pieceNode = _.find( this.pieceNodes, pieceNode => pieceNode.piece === piece );
        arrayRemove( this.pieceNodes, pieceNode );
        this.pieceLayer.removeChild( pieceNode );
      }
    }

    /**
     * callback on start event when grabbing piece from bucketNode
     * @param {Event} event
     * @private
     */
    onBucketDragStart( event ) {
      const piece = this.model.grabFromBucket();
      // TODO: factor out function for the find
      const pieceNode = _.find( this.pieceNodes, pieceNode => pieceNode.piece === piece );

      pieceNode.originProperty.value = this.globalToLocalPoint( event.pointer.point );
      pieceNode.isUserControlled = true;
      pieceNode.dragListener.startDrag( event );
    }

    /**
     * Handles when a user drags a cell from a displayed container.
     *
     * @param {Cell} cell
     * @param {Event} event
     * @private
     */
    onExistingCellDragStart( cell, event ) {
      const piece = this.model.grabCell( cell );
      const pieceNode = _.find( this.pieceNodes, pieceNode => pieceNode.piece === piece );

      pieceNode.originProperty.value = this.getCellMidpoint( cell );
      pieceNode.isUserControlled = true;
      pieceNode.dragListener.startDrag( event );
    }

    /**
     * add a container node to the scene graph
     * @param {Container} container
     * @private
     */
    addContainer( container ) {

      const containerNode = this.createContainerNode( container, this.onExistingCellDragStart.bind( this ) );

      const currentContainerNodesLength = this.containerNodes.length;

      this.containerNodes.push( containerNode );

      // creates new HBox within containerLayer dependent on VBox container
      if ( currentContainerNodesLength % this.model.containerCountProperty.range.max === 0 ) {
        const containerHBox = new HBox( {
          spacing: this.horizontalSpacing,
          align: 'top'
        } );
        this.containerHBoxes.push( containerHBox );
        this.containerLayer.addChild( containerHBox );
      }

      // adds the new containerNode at the end of containerHboxes array
      this.containerHBoxes[ this.containerHBoxes.length - 1 ].addChild( containerNode );

    }

    /**
     * remove a container node from the scene graph
     * @param {Container} container
     * @private
     */
    removeContainer( container ) {
      // TODO: factor out find
      const containerNode = _.find( this.containerNodes, containerNode => containerNode.container === container );

      arrayRemove( this.containerNodes, containerNode );

      // removes the last containerNode within the containerHBox Array
      this.containerHBoxes[ this.containerHBoxes.length - 1 ].removeChild( containerNode );

      const currentContainerLength = this.containerNodes.length;
      if ( currentContainerLength % this.model.containerCountProperty.range.max === 0 ) {

        // removes the last HBox within containerLayer
        const containerHBoxRemoved = this.containerHBoxes.pop();
        this.containerLayer.removeChild( containerHBoxRemoved );
      }

      containerNode.dispose();
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.containerNodes.forEach( containerNode => containerNode.dispose () );

      this.model.containers.removeItemAddedListener( this.addListener );
      this.model.containers.removeItemRemovedListener( this.removeListener );
      this.model.pieces.removeItemAddedListener( this.pieceAddedListener );
      this.model.pieces.removeItemRemovedListener( this.pieceRemovedListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'CellSceneNode', CellSceneNode );
} );
