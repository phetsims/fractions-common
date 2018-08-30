// Copyright 2018, University of Colorado Boulder

/**
 * Displays a number line.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/NumberLineOrientation' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  class NumberLineNode extends Node {
    /**
     * @param {NumberProperty} numeratorProperty
     * @param {NumberProperty} denominatorProperty
     * @param {NumberProperty} containerCountProperty
     * @param {Object} [options]
     */
    constructor( numeratorProperty, denominatorProperty, containerCountProperty, options ) {
      assert && assert( numeratorProperty.range );
      assert && assert( denominatorProperty.range );
      assert && assert( containerCountProperty.range );

      options = _.extend( {
        // {NumberLineOrientation}
        orientation: NumberLineOrientation.HORIZONTAL,

        // {boolean} - If true, an arrow will be shown next to the current value.
        showArrow: false,

        // {boolean} - If true, dragging will be able to modify the numerator.
        interactive: false,

        // {Property.<number>}
        multiplierProperty: new NumberProperty( 1 ),

        // {number} - How many view units should a single unit (0 to 1) take up?
        unitSize: 130,

        // {number}
        majorTickLength: 80,
        minorTickLength: 40,
        evenMajorLineWidth: 5,
        oddMajorLineWidth: 3,
        minorTickLineWidth: 2,
        axisLineWidth: 3,
        markerRadius: 12,
        highlightLineWidth: 18,
        highlightExtension: 8,

        // {ColorDef}
        markerFill: FractionsCommonColorProfile.introCircleFillProperty,

        // TODO: isUserControlledProperty so we can properly handle lock-out?

        // {PhetFont}
        tickLabelFont: new PhetFont( 40 )
      }, options );

      super();

      // @private {Property.<number>}
      this.numeratorProperty = numeratorProperty;
      this.denominatorProperty = denominatorProperty;
      this.containerCountProperty = containerCountProperty;
      this.multiplierProperty = options.multiplierProperty;

      const majorTickNodes = _.range( 0, containerCountProperty.range.max + 1 ).map( n => {
        return new Node( {
          x: n * options.unitSize,
          children: [
            new Line( 0, -options.majorTickLength / 2, 0, options.majorTickLength / 2, {
              stroke: 'black',
              lineWidth: n % 2 === 0 ? options.evenMajorLineWidth : options.oddMajorLineWidth
            } ),
            new Text( n, {
              rotation: options.orientation === NumberLineOrientation.HORIZONTAL ? 0 : Math.PI / 2,
              centerX: 0,
              top: options.majorTickLength / 2 + 4,
              font: options.tickLabelFont
            } )
          ]
        } );
      } );

      const axisNode = new Line( {
        stroke: 'black',
        lineWidth: options.axisLineWidth
      } );

      const minorTicksNode = new Path( null, {
        stroke: 'black'
      } );

      const multipliedTicksNode = new Path( null, {
        stroke: 'black'
      } );

      const markerNode = new Circle( options.markerRadius, {
        fill: options.markerFill,
        stroke: 'black',
        lineWidth: 3
      } );

      const highlightNode = new Line( {
        stroke: FractionsCommonColorProfile.introNumberLineHighlightProperty,
        lineWidth: options.highlightLineWidth
      } );

      const hitTargetNode = new Node( {
        cursor: 'pointer'
      } );
      if ( options.interactive ) {
        const setApproximateValue = n => {
          const idealNumerator = Util.roundSymmetric( n * denominatorProperty.value );
          const restrictedNumerator = Math.min( idealNumerator, denominatorProperty.value * containerCountProperty.value );
          numeratorProperty.value = numeratorProperty.range.constrainValue( restrictedNumerator );
        };

        // @private {DragListener}
        this.dragListener = new DragListener( {
          applyOffset: false,
          start( event, listener ) {
            setApproximateValue( listener.parentPoint.x / options.unitSize );
          },
          drag( event, listener ) {
            setApproximateValue( listener.parentPoint.x / options.unitSize );
          }
        } );
        hitTargetNode.addInputListener( this.dragListener );
      }

      // @private {function}
      this.containerCountListener = containerCount => {
        const width = containerCount * options.unitSize;
        majorTickNodes.forEach( ( node, index ) => {
          node.visible = index <= containerCount;
        } );
        axisNode.x2 = width;

        const hitBounds = new Bounds2( 0, -options.majorTickLength / 2, width, options.majorTickLength / 2 );
        hitTargetNode.mouseArea = hitBounds.dilated( 5 );
        hitTargetNode.touchArea = hitBounds.dilated( 10 );
      };
      this.containerCountProperty.link( this.containerCountListener );

      // @private {Multilink}
      this.minorTickMultilink = Property.multilink( [ denominatorProperty, containerCountProperty ], ( denominator, containerCount ) => {
        const shape = new Shape();

        for ( let i = 0; i <= containerCount * denominator; i++ ) {
          // Don't draw over major ticks
          if ( i % denominator === 0 ) {
            continue;
          }

          const x = i * options.unitSize / denominator;
          shape.moveTo( x, -options.minorTickLength / 2 ).lineTo( x, 0 );
        }

        minorTicksNode.shape = shape;
      } );

      // @private {Multilink}
      // TODO: format
      this.multipliedTickMultilink = Property.multilink( [ denominatorProperty, containerCountProperty, options.multiplierProperty ], ( denominator, containerCount, multiplier ) => {
        const shape = new Shape();

        const effectiveDenominator = denominator * multiplier;

        for ( let i = 0; i <= containerCount * effectiveDenominator; i++ ) {
          // Don't draw over major ticks
          if ( i % effectiveDenominator === 0 ) {
            continue;
          }

          const x = i * options.unitSize / effectiveDenominator;
          shape.moveTo( x, 0 ).lineTo( x, options.minorTickLength / 2 );
        }

        multipliedTicksNode.shape = shape;
      } );

      // @private {Multilink}
      this.markerMultilink = Property.multilink( [ numeratorProperty, denominatorProperty ], ( numerator, denominator ) => {
        const x = options.unitSize * numerator / denominator;
        const tickY = ( ( numerator % denominator === 0 ) ? options.majorTickLength : options.minorTickLength ) / 2;
        markerNode.x = x;
        highlightNode.x1 = x;
        highlightNode.x2 = x;
        highlightNode.y1 = -tickY - options.highlightExtension;
        highlightNode.y2 = tickY + options.highlightExtension;
      } );

      this.children = [
        highlightNode,
        axisNode,
        minorTicksNode,
        multipliedTicksNode,
        ...majorTickNodes,
        markerNode,
        hitTargetNode
      ];

      this.x = -containerCountProperty.range.max * options.unitSize / 2;

      this.mutate( options );
    }

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose() {
      this.containerCountProperty.unlink( this.containerCountListener );
      this.minorTickMultilink.dispose();
      this.multipliedTickMultilink.dispose();
      this.markerMultilink.dispose();
      this.dragListener.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'NumberLineNode', NumberLineNode );
} );