// Copyright 2018-2019, University of Colorado Boulder

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
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const IntroRepresentation = require( 'FRACTIONS_COMMON/intro/model/IntroRepresentation' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PropertyFractionNode = require( 'SCENERY_PHET/PropertyFractionNode' );
  const Random = require( 'DOT/Random' );
  const RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularContainerNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/RectangularOrientation' );

  // constants
  const IDENTITY_TRANSFORM = ModelViewTransform2.createIdentity();

  class BucketNode extends Node {
    /**
     * @param {Property.<number>} denominatorProperty
     * @param {function} startPieceDrag
     * @param {function} createCellNode
     * @param {Property.<IntroRepresentation>} representationProperty
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
        [ IntroRepresentation.CIRCLE ]() {
          return new CircularContainerNode( iconContainer );
        },
        [ IntroRepresentation.HORIZONTAL_BAR ]() {
          return new RectangularContainerNode( iconContainer, {
            rectangularOrientation: RectangularOrientation.HORIZONTAL
          } );
        },
        [ IntroRepresentation.VERTICAL_BAR ]() {
          return new RectangularContainerNode( iconContainer, {
            rectangularOrientation: RectangularOrientation.VERTICAL
          } );
        },
        [ IntroRepresentation.CAKE ]() {
          return new CakeContainerNode( iconContainer );
        },
        [ IntroRepresentation.BEAKER ]() {
          return new BeakerContainerNode( iconContainer );
        }
      }[ representation ]();

      const availableCellWidth = {
        [ IntroRepresentation.CIRCLE ]() { return options.bucketWidth - 25; },
        [ IntroRepresentation.HORIZONTAL_BAR ]() { return options.bucketWidth - 35; },
        [ IntroRepresentation.VERTICAL_BAR ]() { return options.bucketWidth - 75; },
        [ IntroRepresentation.CAKE ]() { return options.bucketWidth - 45; },
        [ IntroRepresentation.BEAKER ]() { return options.bucketWidth - 55; }
      }[ representation ]();

      const verticalCellOffset = {
        [ IntroRepresentation.CIRCLE ]() { return height => -12 + height / 6; },
        [ IntroRepresentation.HORIZONTAL_BAR ]() { return height => 5; },
        [ IntroRepresentation.VERTICAL_BAR ]() { return height => 14 - height / 7; },
        [ IntroRepresentation.CAKE ]() { return height => 0; },
        [ IntroRepresentation.BEAKER ]() { return height => -10; }
      }[ representation ]();

      const cellQuantity = {
        [ IntroRepresentation.CIRCLE ]() { return 16; },
        [ IntroRepresentation.HORIZONTAL_BAR ]() { return 16; },
        [ IntroRepresentation.VERTICAL_BAR ]() { return 16; },
        [ IntroRepresentation.CAKE ]() { return 8; },
        [ IntroRepresentation.BEAKER ]() { return 8; }
      }[ representation ]();

      // layer to hold all the static cell nodes in the bucket
      const staticLayer = new Node();

      var propertyFractionNode = new PropertyFractionNode( new NumberProperty( 1 ), denominatorProperty, {
        scale: 0.7
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
          propertyFractionNode
        ]
      } ) );

      options.children = [ bucketHole, staticLayer, bucketFront ];
      super( options );

      // @private {Property.<number>}
      this.denominatorProperty = denominatorProperty;

      // @private {PropertyFractionNode}
      this.propertyFractionNode = propertyFractionNode;

      // @private {BucketFront}
      this.bucketFront = bucketFront;

      // @private {BucketHole}
      this.bucketHole = bucketHole;

      // @private {Node}
      this.iconNode = iconNode;

      // @private {function}
      this.denominatorListener = denominator => {
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
        const bounds = representation === IntroRepresentation.CAKE ? cellNode.bounds : cellNode.getSafeTransformedVisibleBounds();
        // We generate a well-defined random sequence so that the appearance is consistent across runs
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
      };
      this.denominatorProperty.link( this.denominatorListener );

      // add listener to the bucket and static pieces
      const bucketListener = DragListener.createForwardingListener( startPieceDrag );
      [ bucketHole, staticLayer, bucketFront ].forEach( node => node.addInputListener( bucketListener ) );
    }

    /**
     * Releases references.
     * @public
     */
    dispose() {
      this.denominatorProperty.unlink( this.denominatorListener );
      this.propertyFractionNode.dispose();
      this.bucketFront.dispose();
      this.bucketHole.dispose();
      this.iconNode.dispose();

      super.dispose();
    }
  }

  return fractionsCommon.register( 'BucketNode', BucketNode );
} );
