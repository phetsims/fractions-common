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
  const NumberLineNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineNode' );
  const SceneNode = require( 'FRACTIONS_COMMON/intro/view/SceneNode' );

  class NumberLineSceneNode extends SceneNode {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model ) {
      super( model );

      // @private {NumberLineNode}
      this.numberLineNode = new NumberLineNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty );
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
  }

  return fractionsCommon.register( 'NumberLineSceneNode', NumberLineSceneNode );
} );