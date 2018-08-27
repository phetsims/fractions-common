// Copyright 2018, University of Colorado Boulder

/**
 * Displays a circular slice.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  class CircularNode extends Node {
    /**
     * @param {number} denominator
     * @param {number} index
     * @param {Object} [options]
     */
    constructor( denominator, index, options ) {

      assert && assert( index < denominator );

      options = _.extend( {
        fill: 'rgb(140, 198, 61)', // TODO: clean up how we are getting this!
        stroke: 'black',
        dropShadow: false,
        dropShadowOffset: 5,
        lineWidth: 2,
        isIcon: false
      }, options );
      options.lineWidth = options.isIcon ? 1 : 2;

      super();

      // @private {number}
      this.denominator = denominator;
      this.angleUnit = 2 * Math.PI / denominator;

      // @private {boolean}
      this.dropShadow = options.dropShadow;

      var startAngle = index * this.angleUnit;
      var endAngle = startAngle + this.angleUnit;

      var shape = new Shape();
      if ( denominator > 1 ) {
        shape.moveTo( 0, 0 );
      }
      var circleRadius = options.isIcon ? CircularNode.DEFAULT_RADIUS / 4 : CircularNode.DEFAULT_RADIUS;
      shape.arc( 0, 0, circleRadius, startAngle, endAngle, false ).close();

      // @private {Node}
      this.container = new Node();
      this.addChild( this.container );

      this.foregroundSector = new Path( shape, options );
      if ( this.dropShadow ) {
        this.backgroundSector = new Path( shape, { fill: 'black' } );
        this.backgroundSector.center = this.foregroundSector.center.plusScalar( options.dropShadowOffset );
        this.container.addChild( this.backgroundSector );
      }
      this.container.addChild( this.foregroundSector );

      this.rotateCircle( startAngle );
    }

    /**
     *
     * @param {number} angle
     * @public
     */
    rotateCircle( angle ) {
      this.foregroundSector.rotation = angle;
      if ( this.dropShadow ) {
        this.backgroundSector.rotation = angle;
        this.backgroundSector.x = this.foregroundSector.x + 5;
      }

      this.container.translation = this.denominator === 1 ? Vector2.ZERO : Vector2.createPolar(
        CircularNode.DEFAULT_RADIUS / 2,
        this.angleUnit / 2 + angle + Math.PI
      );
    }

    /**
     *
     * @returns {number}
     * @public
     */
    getCircleRotation() {
      return this.foregroundSector.rotation;
    }

    /**
     * The normal radius.
     * @public
     *
     * @returns {number}
     */
    static get DEFAULT_RADIUS() { return 75; }
  }

  return fractionsCommon.register( 'CircularNode', CircularNode );
} );
