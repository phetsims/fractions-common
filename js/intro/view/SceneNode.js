// Copyright 2018-2025, University of Colorado Boulder

/**
 * Base type for scene nodes.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import fractionsCommon from '../../fractionsCommon.js';

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

fractionsCommon.register( 'SceneNode', SceneNode );
export default SceneNode;