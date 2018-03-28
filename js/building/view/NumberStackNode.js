// Copyright 2017, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPieceNode = require( 'FRACTIONS_COMMON/building/view/NumberPieceNode' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {NumberStack} numberStack
   * @param {Object} [options]
   */
  function NumberStackNode( numberStack, options ) {
    assert && assert( numberStack instanceof NumberStack );

    Node.call( this );

    // @public {NumberStack}
    this.numberStack = numberStack;

    // @private {Array.<NumberPieceNode>}
    this.numberPieceNodes = [];

    // NOTE: Stacks and their nodes should be persistent, no need to unlink
    numberStack.numberPieces.addItemAddedListener( this.addNumberPiece.bind( this ) );
    numberStack.numberPieces.addItemRemovedListener( this.removeNumberPiece.bind( this ) );
    numberStack.numberPieces.forEach( this.addNumberPiece.bind( this ) );    

    this.mutate( options );
  }

  fractionsCommon.register( 'NumberStackNode', NumberStackNode );

  return inherit( Node, NumberStackNode, {
    /**
     * Adds a NumberPiece's view
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    addNumberPiece: function( numberPiece ) {
      assert && assert( numberPiece.number === this.numberStack.number );

      var index = this.numberPieceNodes.length;
      var numberPieceNode = new NumberPieceNode( numberPiece, {
        translation: new Vector2( 4 * index, 4 * index )
      } );
      this.numberPieceNodes.push( numberPieceNode );
      this.addChild( numberPieceNode );
    },

    /**
     * Removes a NumberPiece's view
     * @private
     *
     * @param {NumberPiece} numberPiece
     */
    removeNumberPiece: function( numberPiece ) {
      var numberPieceNode = _.find( this.numberPieceNodes, function( numberPieceNode ) {
        return numberPieceNode.numberPiece === numberPiece;
      } );
      assert && assert( numberPieceNode );

      this.numberPieceNodes.remove( numberPieceNode );
      this.removeChild( numberPieceNode );
      numberPieceNode.dispose();
    }
  } );
} );
