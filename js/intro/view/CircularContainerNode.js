// Copyright 2017, University of Colorado Boulder

/**
 * create circle container
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var CircleNode = require( 'FRACTIONS_COMMON/intro/view/CircleNode' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroConstants = require( 'FRACTIONS_COMMON/intro/IntroConstants' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Circle}
   *
   * TODO: factor out common things with RectangularContainerNode
   *
   * @param {Container} container
   * @param {function} cellDownCallback TODO doc, function( event )
   * @param {Object} [options]
   */
  function CircularContainerNode( container, cellDownCallback, options ) {

    options = _.extend( {
        isIcon: false
      },
      options );

    // @public
    // TODO: Don't do this! And don't pass in to children!
    this.options = options;

    // @public
    this.circleRadius = this.options.isIcon ? IntroConstants.CIRCULAR_RADIUS / 4 : IntroConstants.CIRCULAR_RADIUS;

    // @private
    this.container = container;

    // @private
    this.cellDownCallback = cellDownCallback;
    // @private {Property.<string>} TODO factor out?
    this.strokeProperty = new DerivedProperty( [ container.filledCellCountProperty ], function( count ) {
      return count > 0 ? 'black' : 'gray';
    } );
    Circle.call( this, this.circleRadius, {
      stroke: this.strokeProperty,
      lineWidth: this.options.isIcon ? 2 : 3
    } );

    // @private {Path} creates the path for the dividing lines between cells
    this.cellDividersPath = new Path( null, { stroke: this.strokeProperty } );
    this.addChild( this.cellDividersPath );

    // @private {function}
    this.rebuildListener = this.rebuild.bind( this );

    // @private {Array.<CircleNode>}
    this.cellNodes = [];

    container.cells.lengthProperty.link( this.rebuildListener );
  }

  fractionsCommon.register( 'CircularContainerNode', CircularContainerNode );

  return inherit( Circle, CircularContainerNode, {
    /**
     * get midpoint of a particular piece by index
     *
     * @param {number} index
     * @returns {Vector2}
     * @public
     */
    getMidpointByIndex: function( index ) {
      var node = this.cellNodes[ index ];

      return node.translation.plus( node.midpointOffset );
    },

    /**
     * redraw all the container on the screen
     * @private
     */
    rebuild: function() {
      var self = this;

      this.removeCellNodes();

      var cellDividersShape = new Shape();

      var denominator = this.container.cells.length;

      // disregard segment for denominator equal to 1
      var cellDividersLength = ( denominator > 1 ) ? self.circleRadius : 0;

      // creates an angle between the cells of a circle node that corresponds to the denominator value
      var cellDividersAngle = ( Math.PI * 2 ) / (denominator);

      for ( var i = 0; i < denominator; i++ ) {
        (function() {
          var cell = self.container.cells.get( i );

          var cellNode = new CircleNode( denominator, i, self.options );
          self.cellNodes.push( cellNode );
          self.addChild( cellNode );
          cellNode.cursor = 'pointer';
          cellNode.addInputListener( {
            down: function( event ) {
              self.cellDownCallback( cell, event );
            }
          } );

          // TODO: don't do it this way
          cellNode.cell = cell;
          cellNode.visibilityListener = cell.appearsFilledProperty.linkAttribute( cellNode, 'visible' );
        })();

        // positions and draws the polar coordinate of the dividing line between cells
        var edgePosition = Vector2.createPolar( cellDividersLength, i * cellDividersAngle );
        if ( cellDividersLength ) {
          // Workaround for https://github.com/phetsims/scenery/issues/750
          cellDividersShape.moveToPoint( edgePosition ).lineToPoint( edgePosition.normalized().timesScalar( 0.01 ) );
        }
      }
      self.cellDividersPath.setShape( cellDividersShape );
    },

    /**
     * Remove all the cells in the array and detach their listeners
     * @private
     */
    removeCellNodes: function() {
      while ( this.cellNodes.length ) {
        var cellNode = this.cellNodes.pop();
        cellNode.cell.appearsFilledProperty.unlink( cellNode.visibilityListener );
        this.removeChild( cellNode );
      }
    },

    /**
     * dispose of the links for garbage collection
     * @public
     */
    dispose: function() {
      this.removeCellNodes();

      this.container.cells.lengthProperty.unlink( this.rebuildListener );

      Circle.prototype.dispose.call( this );
    }
  } );
} );
