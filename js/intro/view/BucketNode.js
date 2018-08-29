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
  const BeakerNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerNode' );
  const Bucket = require( 'PHETCOMMON/model/Bucket' );
  const BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  const BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  const CakeContainerNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeContainerNode' );
  const Circle = require( 'SCENERY/nodes/Circle' );
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
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularContainerNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularContainerNode' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const IDENTITY_TRANSFORM = ModelViewTransform2.createIdentity();
  // TODO: Uhh, not constant? Need to do some cleanup
  let PIECE_OFFSET_POSITIONS = [
    // Offsets used for initial position of pieces, relative to bucket hole center. Empirically determined.
    new Vector2( 90, 4 ),
    new Vector2( -85, 5 ),
    new Vector2( -40, 9 ),
    new Vector2( 0, 0 ),
    new Vector2( 37, 7 ),
    new Vector2( 75, 5 ),
    new Vector2( 90, 5 )
  ];

  class BucketNode extends Node {
    /**
     * @param {Property.<number>} denominatorProperty
     * @param {function} startPieceDrag
     * @param {function} createCellNode
     * @param {Property.<Representation>} representationProperty
     * @param {Object} [options]
     */
    constructor( denominatorProperty, startPieceDrag, createCellNode, representationProperty, options ) {

      options = _.extend( {}, options );

      // model of the bucket
      const bucket = new Bucket( {
        baseColor: FractionsCommonColorProfile.introBucketBackgroundProperty,
        size: new Dimension2( 355, 125 ),
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

      // creates icon specific to representationProperty
      // TODO: cleanup
      switch ( representationProperty.value ) {
        case Representation.CIRCLE:
          var bucketIcon = new CircularContainerNode( iconContainer, () => {} );
          var bucketIconBackground = new Circle( bucketIcon.radius, { fill: 'white', center: bucketIcon.center } );
          break;
        case Representation.HORIZONTAL_BAR:
          bucketIcon = new RectangularContainerNode( iconContainer, () => {}, {
            rectangularOrientation: RectangularOrientation.HORIZONTAL
          } );
          bucketIconBackground = new Rectangle( 0, 0, bucketIcon.width, bucketIcon.height, 0, 0, {
            fill: 'white',
            center: bucketIcon.center
          } );
          PIECE_OFFSET_POSITIONS = [

            // Offsets used for initial position of pieces, relative to bucket hole center. Empirically determined.
            new Vector2( -12, 9 ),
            new Vector2( 0, 0 ),
            new Vector2( 12, 7 )
          ];
          break;
        case Representation.VERTICAL_BAR:
          bucketIcon = new RectangularContainerNode( iconContainer, () => {}, {
            rectangularOrientation: RectangularOrientation.VERTICAL
          } );
          bucketIconBackground = new Rectangle( 0, 0, bucketIcon.width, bucketIcon.height, 0, 0, {
            fill: 'white',
            center: bucketIcon.center
          } );
          PIECE_OFFSET_POSITIONS = [

            // Offsets used for initial position of pieces, relative to bucket hole center. Empirically determined.
            new Vector2( -70, 5 ),
            new Vector2( -40, 9 ),
            new Vector2( 0, 0 ),
            new Vector2( 37, 7 ),
            new Vector2( 75, 5 )
          ];
          break;
        case Representation.CAKE:
          bucketIcon = new CakeContainerNode( iconContainer, () => {}, {
            maxHeight: 50
          } );
          bucketIconBackground = new Node();
          break;
        case Representation.BEAKER:
          bucketIcon = new BeakerNode( 1, denominatorProperty.value, {
            fullHeight: BeakerNode.DEFAULT_BEAKER_HEIGHT / 4,
            xRadius: 10,
            yRadius: 3
          } );
          bucketIconBackground = new Node();
          break;
        default:
          throw new Error( 'Unknown representation: ' + representationProperty.value );
      }

      // layer to hold all the static cell nodes in the bucket
      var staticLayer = new Node();

      denominatorProperty.link( denominator => {
        // take denominator, and the length of the icon container
        // find the difference add/remove that many cells from the container
        var difference = denominator - iconContainer.cells.length;
        if ( difference > 0 ) {

          //add cells
          iconContainer.addCells( difference );
        }
        else if ( difference < 0 ) {

          //remove cells
          iconContainer.removeCells( -difference );
        }

        staticLayer.removeAllChildren();

        // places pieces in bucket dependent on defined vectors
        PIECE_OFFSET_POSITIONS.forEach( function( position ) {
          var staticCellNode = createCellNode( denominator, 0, { center: position.plus( bucketHole.center ) } );
          staticLayer.addChild( staticCellNode );
        } );
      } );

      bucketFront.setLabel( new HBox( {
        spacing: 20,
        children: [
          new Node( {
            children: [
              bucketIconBackground,
              bucketIcon
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
      [ bucketHole, staticLayer, bucketFront ].forEach( function( node ) {
        node.addInputListener( {
          down: function( event ) {
            startPieceDrag( event );
          }
        } );
      } );
    }
  }

  return fractionsCommon.register( 'BucketNode', BucketNode );
} );
