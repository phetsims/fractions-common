// Copyright 2018, University of Colorado Boulder

/**
 * Scene for the number-line representation
 *
 * @author Vincent Davis (Berea College)
 * @author Dusty Cole (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineNode' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const SceneNode = require( 'FRACTIONS_COMMON/intro/view/SceneNode' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );

  class NumberLineSceneNode extends SceneNode {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model ) {
      super( model );

      // @private {NumberLineNode}
      this.numberLineNode = new NumberLineNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty, {
        interactive: true
      } );
      this.addChild( this.numberLineNode );
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.numberLineNode.dispose();

      super.dispose();
    }

    /**
     * Returns the icon node to be used for this representation.
     * @public
     *
     * @returns {Node}
     */
    static getIcon() {
      const lineLength = 55;
      const tickHeight = 20;

      return new Node( {
        children: [
          new Path( new Shape().moveTo( 0, 0 ).verticalLineToRelative( tickHeight )
                                              .moveTo( lineLength, 0 )
                                              .verticalLineToRelative( tickHeight )
                                              .moveTo( 0, tickHeight / 2 )
                                              .horizontalLineToRelative( lineLength ), { stroke: 'black' } ),
          new Text( '0', { font: new PhetFont( 10 ), centerX: 0, top: tickHeight } ),
          new Text( '1', { font: new PhetFont( 10 ), centerX: lineLength, top: tickHeight } )
        ]
      } );
    }
  }

  return fractionsCommon.register( 'NumberLineSceneNode', NumberLineSceneNode );
} );