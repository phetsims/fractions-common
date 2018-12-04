// Copyright 2018, University of Colorado Boulder

/**
 * View for a NumberStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const arrayRemove = require( 'PHET_CORE/arrayRemove' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const StackNode = require( 'FRACTIONS_COMMON/building/view/StackNode' );

  class NumberStackNode extends StackNode {
    /**
     * @param {NumberStack} numberStack
     * @param {Object} [options]
     */
    constructor( numberStack, options ) {
      assert && assert( numberStack instanceof NumberStack );

      super( numberStack );

      // @public {NumberStack}
      this.numberStack = numberStack;

      // @private {Array.<NumberPieceNode>}
      this.numberPieceNodes = [];

      // @private {function}
      this.numberPieceAddedListener = this.addNumberPiece.bind( this );
      this.numberPieceRemovedListener = this.removeNumberPiece.bind( this );

      this.stack.numberPieces.addItemAddedListener( this.numberPieceAddedListener );
      this.stack.numberPieces.addItemRemovedListener( this.numberPieceRemovedListener );
      this.stack.numberPieces.forEach( this.numberPieceAddedListener );

      // Inform about our available layout bounds
      const bounds = Bounds2.NOTHING.copy();
      const numberPiece = new NumberPiece( this.numberStack.number );
      const numberPieceNode = new NumberPieceNode( numberPiece );
      for ( let i = 0; i < this.numberStack.layoutQuantity; i++ ) {
        numberPieceNode.translation = NumberStack.getOffset( i );
        bounds.includeBounds( numberPieceNode.bounds );
      }
      numberPieceNode.dispose();
      this.layoutBounds = bounds;

      this.mutate( options );
    }

    /**
     * Adds a NumberPiece's view
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    addNumberPiece( numberPiece ) {
      assert && assert( numberPiece.number === this.numberStack.number );

      const index = this.numberPieceNodes.length;
      const numberPieceNode = new NumberPieceNode( numberPiece, {
        translation: NumberStack.getOffset( index )
      } );
      this.numberPieceNodes.push( numberPieceNode );
      this.addChild( numberPieceNode );
    }

    /**
     * Removes a NumberPiece's view
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    removeNumberPiece( numberPiece ) {
      const numberPieceNode = _.find( this.numberPieceNodes, numberPieceNode => {
        return numberPieceNode.numberPiece === numberPiece;
      } );
      assert && assert( numberPieceNode );

      arrayRemove( this.numberPieceNodes, numberPieceNode );
      this.removeChild( numberPieceNode );
      numberPieceNode.dispose();
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.numberPieceNodes.forEach( numberPieceNode => numberPieceNode.dispose() );
      this.stack.numberPieces.removeItemAddedListener( this.numberPieceAddedListener );
      this.stack.numberPieces.removeItemRemovedListener( this.numberPieceRemovedListener );

      super.dispose();
    }
  }

  return fractionsCommon.register( 'NumberStackNode', NumberStackNode );
} );
