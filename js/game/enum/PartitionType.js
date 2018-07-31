// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // TODO: check for usage
  var PartitionType = {
    PIE: 'PIE'
    //tetrisPiece
    //sixFlower
    //horizontalBars
    //verticalBars
    //polygon
    //grid
    //plusSigns
    //singlePyramid
    //fourPyramid
    //ninePyramid
    //ringOfHexagons
    //ninjaStar
    //fivePointStarWithLeaves
    //letterLShapedDiagonal
    //interleavedLShape,
    //horizontallySlicedCube
    //verticallySlicedCube
  };

  fractionsCommon.register( 'PartitionType', PartitionType );

  // @public {Array.<PartitionType>} - All values the enumeration can take.
  PartitionType.VALUES = [
    PartitionType.PIE
  ];

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( PartitionType ); }

  return PartitionType;
} );
