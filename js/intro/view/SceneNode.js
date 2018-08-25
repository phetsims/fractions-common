// Copyright 2018, University of Colorado Boulder

/**
 * Base type for scene nodes.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );

  class SceneNode extends Node {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model ) {
      super();

      // @protected {ContainerSetModel}
      this.model = model;
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      // Behavior will be added in subtypes
    }
  }

  return fractionsCommon.register( 'SceneNode', SceneNode );
} );
