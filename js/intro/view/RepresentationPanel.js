// Copyright 2017, University of Colorado Boulder

/**
 * The large horizontal panel at the top of the screen for selecting different representations.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BeakerNode = require( 'FRACTIONS_COMMON/intro/view/BeakerNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonRadioButtonPanel = require( 'FRACTIONS_COMMON/common/view/FractionsCommonRadioButtonPanel' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Representation = require( 'FRACTIONS_COMMON/intro/model/Representation' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var cakeImage = require( 'image!FRACTIONS_COMMON/cake_1_1.png' );

  // constants
  var LINE_LENGTH = 55;
  var TICK_HEIGHT = 20;

  /**
   * @constructor
   * @extends {FractionsCommonRadioButtonPanel}
   *
   * @param {Property.<Representation>} representationProperty
   * @param {Array.<Representation>} representations - The options that should be presented
   * @param {Object} [options]
   */
  function RepresentationPanel( representationProperty, representations, options ) {
    var icons = {};
    icons[ Representation.CIRCLE ] = new Circle( 30, {
      fill: '#8EC53F',
      lineWidth: 2,
      stroke: 'black'
    } );
    icons[ Representation.HORIZONTAL_BAR ] = new Rectangle( {
      rectWidth: 80,
      rectHeight: 20,
      fill: '#ED4344',
      lineWidth: 2,
      stroke: 'black'
    } );
    icons[ Representation.VERTICAL_BAR ] = new Rectangle( {
      rectWidth: 40,
      rectHeight: 60,
      fill: '#FFE600',
      lineWidth: 2,
      stroke: 'black'
    } );
    icons[ Representation.BEAKER ] = new BeakerNode( 1, 1, {
      yRadius: 4.5,
      xRadius: 15,
      fullHeight: 55
    } );
    icons[ Representation.CAKE ] = new Image( cakeImage, {
      maxHeight: 75
    } );
    icons[ Representation.NUMBER_LINE ] = new Node( {
      children: [
        new Path( new Shape().moveTo( 0, 0 ).verticalLineToRelative( TICK_HEIGHT )
                                            .moveTo( LINE_LENGTH, 0 )
                                            .verticalLineToRelative( TICK_HEIGHT )
                                            .moveTo( 0, TICK_HEIGHT / 2 )
                                            .horizontalLineToRelative( LINE_LENGTH ), { stroke: 'black' } ),
        new Text( '0', { font: new PhetFont( 10 ), centerX: 0, top: TICK_HEIGHT } ),
        new Text( '1', { font: new PhetFont( 10 ), centerX: LINE_LENGTH, top: TICK_HEIGHT } )
      ]
    } );

    FractionsCommonRadioButtonPanel.call( this, representationProperty, representations.map( function( representation ) {
      return {
        value: representation,
        node: icons[ representation ]
      };
    } ), options );
  }

  fractionsCommon.register( 'RepresentationPanel', RepresentationPanel );

  return inherit( FractionsCommonRadioButtonPanel, RepresentationPanel );
} );