// Copyright 2017, University of Colorado Boulder

/**
 * Model for intro-like screens that use a set of containers.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Container = require( 'FRACTIONS_COMMON/intro/model/Container' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Piece = require( 'FRACTIONS_COMMON/intro/model/Piece' );
  var Property = require( 'AXON/Property' );
  var Representation = require( 'FRACTIONS_COMMON/intro/model/Representation' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {Object} [options]
   */
  function ContainerSetModel( options ) {

    options = _.extend( {
      representations: Representation.VALUES,
      initialNumerator: 0,
      initialDenominator: 1,
      initialContainerCount: 1
    }, options );

    // @public {Array.<Representation>}
    this.representations = options.representations;

    // @public {Property.<Representation>}
    this.representationProperty = new Property( Representation.CIRCLE );

    // @public {Property.<number>} - If a fraction is N/D, the numerator is the N.
    // NOTE: All internal changes to this property should be done through changeNumeratorManually.
    this.numeratorProperty = new NumberProperty( options.initialNumerator );

    // @public {Property.<number>} - If a fraction is N/D, the numerator is the D
    this.denominatorProperty = new NumberProperty( options.initialDenominator );

    // @public {Property.<number>} - What is the maximum value the fraction can have?
    this.containerCountProperty = new NumberProperty( options.initialContainerCount );

    // @public {ObservableArray.<Container>}
    this.containers = new ObservableArray();

    // @private {boolean} - Determines if the numerator has been changed indirectly (say, through interaction with a
    // cell/piece) rather than direct interaction (manipulation of  the numerator spinner). All internal changes to
    // the value associated with numeratorProperty should be done through the method 'changeNumeratorManually'
    this.changingInternally = false;

    // @public {ObservableArray.<Piece>} - Pieces that are not filled cells (animating or user controlled)
    this.pieces = new ObservableArray();

    // initialize the model with the appropriate number of containers and number of filled cells
    this.onMaxChange( this.containerCountProperty.value, 0 );
    this.onNumeratorChange( this.numeratorProperty.value, 0 );

    // Hook up listeners for external notifications
    this.numeratorProperty.lazyLink( this.onNumeratorChange.bind( this ) );
    this.denominatorProperty.lazyLink( this.onDenominatorChange.bind( this ) );
    this.containerCountProperty.lazyLink( this.onMaxChange.bind( this ) );
  }

  fractionsCommon.register( 'ContainerSetModel', ContainerSetModel );

  return inherit( Object, ContainerSetModel, {
    /**
     * Called when a user grabs a cell.
     * @public
     *
     * @param {Cell} cell
     * @returns {Piece} - The created piece that the user will start dragging
     */
    grabCell: function( cell ) {
      this.changeNumeratorManually( -1 );
      cell.empty();

      var piece = new Piece( this.denominatorProperty.value );
      piece.originCell = cell;
      this.pieces.push( piece );
      return piece;
    },

    /**
     * Called when a user grabs a piece from the bucketNode.
     * @public
     *
     * @returns {Piece} - The created piece that the user will start dragging
     */
    grabFromBucket: function() {
      var piece = new Piece( this.denominatorProperty.value );
      this.pieces.push( piece );
      return piece;
    },

    /**
     * Starts a piece animating towards the cell (counts as being filled immediately).
     * @public
     *
     * @param {Piece} piece
     * @param {Cell} cell
     */
    targetPieceToCell: function( piece, cell ) {
      assert && assert( piece.destinationCell === null );

      this.changeNumeratorManually( 1 );
      cell.targetWithPiece( piece );
    },

    /**
     * Interrupt a piece animating towards a cell (counts as being un-filled immediately).
     * @public
     *
     * @param {Piece} piece
     */
    untargetPiece: function( piece ) {
      assert && assert( piece.destinationCell !== null );

      this.changeNumeratorManually( -1 );
      piece.destinationCell.untargetFromPiece( piece );
    },

    /**
     * Immediately "finishes" the action of a piece, and removes it. If it was animating towards a cell, it will appear
     * filled.
     * @public
     *
     * @param {Piece} piece
     */
    completePiece: function( piece ) {
      var destinationCell = piece.destinationCell;
      if ( destinationCell ) {
        destinationCell.fillWithPiece( piece );
      }
      this.pieces.remove( piece );
    },

    /**
     * Immediately finish the action of all pieces. Helpful for denominator/max/other changes where we want to finish
     * all animations before proceeding.
     * @public
     */
    completeAllPieces: function() {
      while ( this.pieces.length ) {
        this.completePiece( this.pieces.get( 0 ) );
      }
    },

    /**
     * Resets the entire model.
     * @public
     */
    reset: function() {
      this.numeratorProperty.reset();
      this.denominatorProperty.reset();
      this.containerCountProperty.reset();
      this.representationProperty.reset();
    },

    /**
     * Fills the first available empty cell.
     * @private
     *
     * @param {boolean} animate - Whether the cell should animate into place (if false, will be instant)
     */
    fillNextCell: function( animate ) {
      for ( var i = 0; i < this.containers.length; i++ ) {
        var container = this.containers.get( i );
        var cell = container.getNextEmptyCell();

        if ( cell ) {
          if ( animate ) {
            var piece = new Piece( this.denominatorProperty.value );
            cell.targetWithPiece( piece );
            this.pieces.push( piece );
          }
          else {
            cell.fill();
          }
          return;
        }
      }

      throw new Error( 'could not fill a cell' );
    },

    /**
     * Empties the first available filled cell.
     * @private
     *
     * @param {boolean} animate - Whether the cell should animate to the bucketNode (if false, will be instant)
     */
    emptyNextCell: function( animate ) {
      for ( var i = this.containers.length - 1; i >= 0; i-- ) {
        var container = this.containers.get( i );

        var cell = container.getNextFilledCell();
        if ( cell ) {
          // If something was animating to this cell, finish the animation first
          var targetedPiece = cell.targetedPiece;
          if ( targetedPiece ) {
            this.completePiece( targetedPiece );
          }

          cell.empty();

          if ( animate && !targetedPiece ) {
            var newPiece = new Piece( this.denominatorProperty.value );
            newPiece.originCell = cell;
            this.pieces.push( newPiece );
          }
          return;
        }
      }

      throw new Error( 'could not empty a cell' );
    },

    /**
     * Handles a change in the 'max'.
     * @private
     *
     * @param {number} newMax
     * @param {number} oldMax
     */
    onMaxChange: function( newMax, oldMax ) {

      // So we don't have to worry about animating to different places
      this.completeAllPieces();

      var self = this;
      var change = Math.abs( newMax - oldMax );
      _.times( change, function() {

        // Increases are simple, just add a container.
        if ( newMax > oldMax ) {
          var container = new Container();
          container.addCells( self.denominatorProperty.value );
          self.containers.push( container );
        }

        else {

          // find the container to be removed
          var lastContainer = self.containers.get( self.containers.length - 1 );

          // filled cells in the last container
          var displacedCellsCount = lastContainer.filledCellCountProperty.value;

          // number of filled cells in the other containers (excluding the last container)
          var filledCells = self.getFilledCellCount() - displacedCellsCount;

          // number of empty cells in the other containers
          var availableCellsCount = lastContainer.cells.length * newMax - filledCells;

          // the number of  filled cells to transfer from last container to the other containers
          var keptCellsCount = Math.min( availableCellsCount, displacedCellsCount );

          // add up fill
          _.times( keptCellsCount, function() {
            self.fillNextCell( false );
          } );

          // handle the extra filled cells when all the other containers are filled
          if ( displacedCellsCount > availableCellsCount ) {

            var overflowCellsCount = displacedCellsCount - availableCellsCount;
            _.times( overflowCellsCount, function() {
              self.emptyNextCell( true );
            } );

            // update the value of the numerator
            self.changeNumeratorManually( -overflowCellsCount );
          }
          // release the last (now empty) container
          self.containers.pop();
        }
      } );
    },

    /**
     * Handles a change in the numerator.
     * @private
     *
     * @param {number} newNumerator
     * @param {number} oldNumerator
     */
    onNumeratorChange: function( newNumerator, oldNumerator ) {
      // Ignore changes to this if we made an internal change
      if ( this.changingInternally ) {
        return;
      }

      var self = this;
      var change = Math.abs( newNumerator - oldNumerator );
      _.times( change, function() {
        if ( newNumerator > oldNumerator ) {
          self.fillNextCell( true );
        }
        else {
          self.emptyNextCell( true );
        }
      } );
    },

    /**
     * Handles a change in the denominator.
     * @private
     *
     * @param {number} newDenominator
     * @param {number} oldDenominator
     */
    onDenominatorChange: function( newDenominator, oldDenominator ) {
      // So we don't have to worry about animating to different places
      this.completeAllPieces();

      var self = this;
      var change = Math.abs( newDenominator - oldDenominator );

      // Add empty cells to every container on an increase.
      if ( newDenominator > oldDenominator ) {
        this.containers.forEach( function( container ) {
          container.addCells( change );
        } );
      }
      // Rearrange filled cells on a decrease.
      else {
        var removedCount = 0;
        this.containers.forEach( function( container ) {
          removedCount += container.removeCells( change );
        } );
        _.times( removedCount, function() {
          self.fillNextCell( false );
        } );
      }
    },

    /**
     * For manually changing the numerator, where we have already applied the action to be taken manually.
     * @public
     *
     * This is in contrast to automatic changes (from spinners or drag handler on numberline) where
     * we still have yet to take the actions to make our state match internally.
     *
     * @param {number} delta - The amount to add to our numerator (may be negative)
     */
    changeNumeratorManually: function( delta ) {
      this.changingInternally = true;
      this.numeratorProperty.value += delta;
      this.changingInternally = false;
    },

    /**
     * get the filled cells count in the containers
     * @private
     * @returns {number}
     */
    getFilledCellCount: function() {
      return this.containers.reduce( 0, function( accumulator, container ) {
        return accumulator + container.filledCellCountProperty.value;
      } );
    }
  } );
} );