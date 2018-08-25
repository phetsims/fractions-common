// Copyright 2018, University of Colorado Boulder

/**
 * The large horizontal panel at the top of the screen for selecting different representations.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );

  // images
  const cakeImage = require( 'image!FRACTIONS_COMMON/cake_1_1.png' );

  // constants
  const LINE_LENGTH = 55;
  const TICK_HEIGHT = 20;

  class RepresentationRadioButtonGroup extends RadioButtonGroup {
    /**
     * @param {Property.<Representation>} representationProperty
     * @param {Array.<Representation>} - The representations to show
     * @param {Object} [options]
     */
    constructor( representationProperty, representations, options ) {
      super( representationProperty, [
        {
          value: Representation.CIRCLE,
          node: new Circle( 30, {
            fill: '#8EC53F',
            lineWidth: 2,
            stroke: 'black'
          } )
        },
        {
          value: Representation.HORIZONTAL_BAR,
          node: new Rectangle( {
            rectWidth: 80,
            rectHeight: 20,
            fill: '#ED4344',
            lineWidth: 2,
            stroke: 'black'
          } )
        },
        {
          value: Representation.VERTICAL_BAR,
          node: new Rectangle( {
            rectWidth: 40,
            rectHeight: 60,
            fill: '#FFE600',
            lineWidth: 2,
            stroke: 'black'
          } )
        },
        {
          value: Representation.BEAKER,
          node: new BeakerNode( 1, 1, {
            yRadius: 4.5,
            xRadius: 15,
            fullHeight: 55
          } )
        },
        {
          value: Representation.CAKE,
          node: new Image( cakeImage, {
            maxHeight: 75
          } )
        },
        {
          value: Representation.NUMBER_LINE,
          node: new Node( {
            children: [
              new Path( new Shape().moveTo( 0, 0 ).verticalLineToRelative( TICK_HEIGHT )
                                                  .moveTo( LINE_LENGTH, 0 )
                                                  .verticalLineToRelative( TICK_HEIGHT )
                                                  .moveTo( 0, TICK_HEIGHT / 2 )
                                                  .horizontalLineToRelative( LINE_LENGTH ), { stroke: 'black' } ),
              new Text( '0', { font: new PhetFont( 10 ), centerX: 0, top: TICK_HEIGHT } ),
              new Text( '1', { font: new PhetFont( 10 ), centerX: LINE_LENGTH, top: TICK_HEIGHT } )
            ]
          } )
        }
      ].filter( item => _.includes( representations, item.value ) ), _.extend( {
        orientation: 'horizontal',
        baseColor: 'white',
        spacing: 12,
        buttonContentXMargin: 5,
        buttonContentYMargin: 10
      }, options ) );
    }
  }

  return fractionsCommon.register( 'RepresentationRadioButtonGroup', RepresentationRadioButtonGroup );
} );