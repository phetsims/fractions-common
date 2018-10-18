// Copyright 2018, University of Colorado Boulder

/**
 * Displays a bucket of pieces.
 *
 * @author Vincent Davis (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  // modules
  const BeakerContainerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerContainerNode' );
  const Bucket = require( 'PHETCOMMON/model/Bucket' );
  const BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  const BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  const CakeContainerNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeContainerNode' );
  const CircularContainerNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularContainerNode' );
  const Container = require( 'FRACTIONS_COMMON/intro/model/Container' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PropertyFractionNode = require( 'FRACTIONS_COMMON/common/view/PropertyFractionNode' );
  const Random = require( 'DOT/Random' );
  const RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularContainerNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );

  // constants
  const IDENTITY_TRANSFORM = ModelViewTransform2.createIdentity();

  // TODO: piece layout improvements
  class BucketNode extends Node {
    /**
     * @param {Property.<number>} denominatorProperty
     * @param {function} startPieceDrag
     * @param {function} createCellNode
     * @param {Property.<Representation>} representationProperty
     * @param {Object} [options]
     */
    constructor( denominatorProperty, startPieceDrag, createCellNode, representationProperty, options ) {

      options = _.extend( {
        bucketWidth: 355
      }, options );

      // model of the bucket
      const bucket = new Bucket( {
        baseColor: FractionsCommonColorProfile.introBucketBackgroundProperty,
        size: new Dimension2( options.bucketWidth, 125 ),
        invertY: true
      } );

      // creates bucketNode front
      const bucketFront = new BucketFront( bucket, IDENTITY_TRANSFORM );

      // creates hole of bucketNode
      const bucketHole = new BucketHole( bucket, IDENTITY_TRANSFORM );

      // creates icon Container
      const iconContainer = new Container();

      // fills one cell according to denominator property
      iconContainer.addCells( denominatorProperty.value );
      iconContainer.cells.get( 0 ).fill();

      const representation = representationProperty.value;

      const iconNode = {
        [ Representation.CIRCLE ]() {
          return new CircularContainerNode( iconContainer );
        },
        [ Representation.HORIZONTAL_BAR ]() {
          return new RectangularContainerNode( iconContainer, {
            rectangularOrientation: RectangularOrientation.HORIZONTAL
          } );
        },
        [ Representation.VERTICAL_BAR ]() {
          return new RectangularContainerNode( iconContainer, {
            rectangularOrientation: RectangularOrientation.VERTICAL
          } );
        },
        [ Representation.CAKE ]() {
          return new CakeContainerNode( iconContainer );
        },
        [ Representation.BEAKER ]() {
          return new BeakerContainerNode( iconContainer );
        }
      }[ representation ]();

      const availableCellWidth = {
        [ Representation.CIRCLE ]() { return options.bucketWidth - 25; },
        [ Representation.HORIZONTAL_BAR ]() { return options.bucketWidth - 35; },
        [ Representation.VERTICAL_BAR ]() { return options.bucketWidth - 75; },
        [ Representation.CAKE ]() { return options.bucketWidth - 45; },
        [ Representation.BEAKER ]() { return options.bucketWidth - 55; }
      }[ representation ]();

      const verticalCellOffset = {
        [ Representation.CIRCLE ]() { return height => -12 + height / 6; },
        [ Representation.HORIZONTAL_BAR ]() { return height => 5; },
        [ Representation.VERTICAL_BAR ]() { return height => 14 - height / 7; },
        [ Representation.CAKE ]() { return height => 0; },
        [ Representation.BEAKER ]() { return height => -10; }
      }[ representation ]();

      const cellQuantity = {
        [ Representation.CIRCLE ]() { return 16; },
        [ Representation.HORIZONTAL_BAR ]() { return 16; },
        [ Representation.VERTICAL_BAR ]() { return 16; },
        [ Representation.CAKE ]() { return 8; },
        [ Representation.BEAKER ]() { return 8; }
      }[ representation ]();

      // layer to hold all the static cell nodes in the bucket
      const staticLayer = new Node();

      denominatorProperty.link( denominator => {
        // take denominator, and the length of the icon container
        // find the difference add/remove that many cells from the container
        const difference = denominator - iconContainer.cells.length;
        if ( difference > 0 ) {

          //add cells
          iconContainer.addCells( difference );
        }
        else if ( difference < 0 ) {

          //remove cells
          iconContainer.removeCells( -difference );
        }

        const cellNode = createCellNode( denominator, 0, {} );
        const bounds = representation === Representation.CAKE ? cellNode.bounds : cellNode.getSafeTransformedVisibleBounds();
        const random = new Random( {
          seed: 4 // https://xkcd.com/221/
        } );

        const left = -availableCellWidth / 2 + bounds.width / 2;
        const right = availableCellWidth / 2 - bounds.width / 2;

        const numSections = cellQuantity;
        const children = [];
        for ( let i = 0; i < numSections; i++ ) {
          // stochastic within its rectangle, so there is a more consistent layout
          const sectionLeft = left + ( right - left ) * i / numSections;
          const sectionRight = left + ( right - left ) * ( i + 1 ) / numSections;
          const x = sectionLeft + ( sectionRight - sectionLeft ) * random.nextDouble();
          const y = ( random.nextDouble() - 0.5 ) * 20 + verticalCellOffset( bounds.height );
          children.push( new Node( {
            children: [ cellNode ],
            translation: bucketHole.center.plusXY( x, y ).minus( bounds.center )
          } ) );
        }
        staticLayer.children = random.shuffle( children );
      } );

      bucketFront.setLabel( new HBox( {
        spacing: 15,
        children: [
          new Node( {
            maxWidth: 100,
            maxHeight: 50,
            children: [
              iconNode
            ]
          } ),
          new PropertyFractionNode( new NumberProperty( 1 ), denominatorProperty, {
            scale: 0.7
          } )
        ]
      } ) );

      options.children = [ bucketHole, staticLayer, bucketFront ];
      super( options );

      // add listener to the bucket and static pieces
      [ bucketHole, staticLayer, bucketFront ].forEach( node => {
        node.addInputListener( {
          down: event => {
            startPieceDrag( event );
          }
        } );
      } );
    }
  }

  return fractionsCommon.register( 'BucketNode', BucketNode );
} );
