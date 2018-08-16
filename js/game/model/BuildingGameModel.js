// Copyright 2017, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  const ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  const FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const Property = require( 'AXON/Property' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const ShapePartition = require( 'FRACTIONS_COMMON/game/model/ShapePartition' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeTarget = require( 'FRACTIONS_COMMON/game/model/ShapeTarget' );
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );

  class BuildingGameModel {
    /**
     * @param {boolean} hasMixedNumbers - Whether this is the equivalent of the "Build a Fraction" or "Mixed Numbers" game
     */
    constructor( hasMixedNumbers ) {

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;

      function placeholderShapeChallengeGenerator( numTargets, hasMixedNumbers ) {
        assert && assert( typeof hasMixedNumbers === 'boolean' );

        return ( levelNumber, color ) => {
          // TODO: unimplemented
          var targets = ( hasMixedNumbers ? [
            new Target( new Fraction( 3, 2 ) ),
            new Target( new Fraction( 5, 3 ) ),
            new Target( new Fraction( 11, 4 ) ),
            new Target( new Fraction( 5, 2 ) )
          ] : [
            new Target( new Fraction( 1, 2 ) ),
            new Target( new Fraction( 2, 3 ) ),
            new Target( new Fraction( 5, 6 ) ),
            new Target( new Fraction( 3, 4 ) )
          ] ).slice( 0, numTargets );
          var type = phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;
          var representation = type === ChallengeType.PIE ? Representation.CIRCLE : Representation.VERTICAL_BAR;
          var shapePieces = [
            new ShapePiece( new Fraction( 1, 2 ), representation, color ),
            new ShapePiece( new Fraction( 1, 2 ), representation, color ),
            new ShapePiece( new Fraction( 1, 2 ), representation, color ),
            new ShapePiece( new Fraction( 1, 2 ), representation, color ),
            new ShapePiece( new Fraction( 1, 2 ), representation, color ),
            new ShapePiece( new Fraction( 1, 3 ), representation, color ),
            new ShapePiece( new Fraction( 1, 3 ), representation, color ),
            new ShapePiece( new Fraction( 1, 4 ), representation, color ),
            new ShapePiece( new Fraction( 1, 4 ), representation, color ),
            new ShapePiece( new Fraction( 1, 5 ), representation, color ),
            new ShapePiece( new Fraction( 1, 6 ), representation, color ),
            new ShapePiece( new Fraction( 1, 6 ), representation, color )
          ];
          return new FractionChallenge( levelNumber, type, hasMixedNumbers, targets, shapePieces, [] );
        };
      }

      function placeholderNumberChallengeGenerator( numTargets, hasMixedNumbers ) {
        assert && assert( typeof hasMixedNumbers === 'boolean' );

        return ( levelNumber, color ) => {
          // TODO: deduplicate
          function select( shapePartitions, quantity ) {
            return _.find( shapePartitions, shapePartition => shapePartition.shapes.length === quantity );
          }
          var targets = ( hasMixedNumbers ? [
            ShapeTarget.sequentialFill( select( ShapePartition.HORIZONTAL_BARS, 2 ), new Fraction( 3, 2 ), color ),
            ShapeTarget.sequentialFill( select( ShapePartition.PIES, 3 ), new Fraction( 5, 3 ), color ),
            ShapeTarget.sequentialFill( select( ShapePartition.PYRAMIDS, 4 ), new Fraction( 15, 4 ), color ),
            ShapeTarget.sequentialFill( select( ShapePartition.PLUS_SIGNS, 2 ), new Fraction( 5, 2 ), color )
          ] : [
            ShapeTarget.sequentialFill( select( ShapePartition.HORIZONTAL_BARS, 2 ), new Fraction( 1, 2 ), color ),
            ShapeTarget.sequentialFill( select( ShapePartition.PIES, 3 ), new Fraction( 2, 3 ), color ),
            ShapeTarget.sequentialFill( ShapePartition.SIX_FLOWER, new Fraction( 5, 6 ), color ),
            ShapeTarget.sequentialFill( select( ShapePartition.PYRAMIDS, 4 ), new Fraction( 3, 4 ), color )
          ] ).slice( 0, numTargets );
          var numberPieces = [
            new NumberPiece( 1 ),
            new NumberPiece( 1 ),
            new NumberPiece( 1 ),
            new NumberPiece( 1 ),
            new NumberPiece( 2 ),
            new NumberPiece( 2 ),
            new NumberPiece( 3 ),
            new NumberPiece( 4 ),
            new NumberPiece( 4 ),
            new NumberPiece( 5 ),
            new NumberPiece( 6 ),
            new NumberPiece( 6 )
          ];
          return new FractionChallenge( levelNumber, ChallengeType.NUMBER, hasMixedNumbers, targets, [], numberPieces );
        };
      }

      // @public {FractionLevel}
      this.shapeLevels = hasMixedNumbers ? [
        // "Mixed Numbers" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level1Property, placeholderShapeChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level2Property, placeholderShapeChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level3Property, placeholderShapeChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level4Property, placeholderShapeChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level5Property, placeholderShapeChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level6Property, placeholderShapeChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level7Property, placeholderShapeChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level8Property, placeholderShapeChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level9Property, placeholderShapeChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level10Property, placeholderShapeChallengeGenerator( 4, true ) )
      ] : [
        // "Build a Fraction" Shapes level 1
        new FractionLevel( 1, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level1Property, FractionLevel.level1Shapes ),
        // "Build a Fraction" Shapes level 2
        new FractionLevel( 2, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level2Property, FractionLevel.level2Shapes ),
        // "Build a Fraction" Shapes level 3
        new FractionLevel( 3, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level3Property, FractionLevel.level3Shapes ),
        // "Build a Fraction" Shapes level 4
        new FractionLevel( 4, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level4Property, FractionLevel.level4Shapes ),
        // "Build a Fraction" Shapes level 5
        new FractionLevel( 5, 3, BuildingType.SHAPE, FractionsCommonColorProfile.level5Property, FractionLevel.level5Shapes ),
        // "Build a Fraction" Shapes level 6
        new FractionLevel( 6, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level6Property, FractionLevel.level6Shapes ),
        // "Build a Fraction" Shapes level 7
        new FractionLevel( 7, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level7Property, FractionLevel.level7Shapes ),
        // "Build a Fraction" Shapes level 8
        new FractionLevel( 8, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level8Property, placeholderShapeChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Shapes level 9
        new FractionLevel( 9, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level9Property, placeholderShapeChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Shapes level 10
        new FractionLevel( 10, 4, BuildingType.SHAPE, FractionsCommonColorProfile.level10Property, placeholderShapeChallengeGenerator( 4, false ) )
      ];

      // @public {FractionLevel}
      this.numberLevels = hasMixedNumbers ? [
        // "Mixed Numbers" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level1Property, placeholderNumberChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level2Property, placeholderNumberChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level3Property, placeholderNumberChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level4Property, placeholderNumberChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level5Property, placeholderNumberChallengeGenerator( 3, true ) ),
        // "Mixed Numbers" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level6Property, placeholderNumberChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level7Property, placeholderNumberChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level8Property, placeholderNumberChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level9Property, placeholderNumberChallengeGenerator( 4, true ) ),
        // "Mixed Numbers" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level10Property, placeholderNumberChallengeGenerator( 4, true ) )
      ] : [
        // "Build a Fraction" Numbers level 1
        new FractionLevel( 1, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level1Property, placeholderNumberChallengeGenerator( 3, false ) ),
        // "Build a Fraction" Numbers level 2
        new FractionLevel( 2, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level2Property, placeholderNumberChallengeGenerator( 3, false ) ),
        // "Build a Fraction" Numbers level 3
        new FractionLevel( 3, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level3Property, placeholderNumberChallengeGenerator( 3, false ) ),
        // "Build a Fraction" Numbers level 4
        new FractionLevel( 4, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level4Property, placeholderNumberChallengeGenerator( 3, false ) ),
        // "Build a Fraction" Numbers level 5
        new FractionLevel( 5, 3, BuildingType.NUMBER, FractionsCommonColorProfile.level5Property, placeholderNumberChallengeGenerator( 3, false ) ),
        // "Build a Fraction" Numbers level 6
        new FractionLevel( 6, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level6Property, placeholderNumberChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Numbers level 7
        new FractionLevel( 7, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level7Property, placeholderNumberChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Numbers level 8
        new FractionLevel( 8, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level8Property, placeholderNumberChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Numbers level 9
        new FractionLevel( 9, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level9Property, placeholderNumberChallengeGenerator( 4, false ) ),
        // "Build a Fraction" Numbers level 10
        new FractionLevel( 10, 4, BuildingType.NUMBER, FractionsCommonColorProfile.level10Property, placeholderNumberChallengeGenerator( 4, false ) )
      ];

      assert && assert( this.shapeLevels.length === FractionsCommonConstants.NUM_LEVELS );
      assert && assert( this.numberLevels.length === FractionsCommonConstants.NUM_LEVELS );

      // @public {Property.<FractionLevel|null>}
      this.levelProperty = new Property( null );

      // @public {Property.<FractionChallenge|null>}
      this.challengeProperty = new DynamicProperty( this.levelProperty, {
        derive: 'challengeProperty'
      } );

      // @public {Property.<boolean>}
      this.soundEnabledProperty = new BooleanProperty( true );
    }

    /**
     * Steps the model forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.challengeProperty.value && this.challengeProperty.value.step( dt );
    }

    /**
     * Moves to the next level (if possible)
     * @public
     */
    nextLevel() {
      const shapeIndex = this.shapeLevels.indexOf( this.levelProperty.value ) + 1;
      const numberIndex = this.numberLevels.indexOf( this.levelProperty.value ) + 1;
      if ( shapeIndex > 0 && this.shapeLevels[ shapeIndex ] ) {
        this.levelProperty.value = this.shapeLevels[ shapeIndex ];
      }
      else if ( numberIndex > 0 && this.numberLevels[ numberIndex ] ) {
        this.levelProperty.value = this.numberLevels[ numberIndex ];
      }
    }

    /**
     * Resets the entire model.
     * @public
     */
    reset() {
      this.levelProperty.reset();
      this.soundEnabledProperty.reset();
      this.shapeLevels.forEach( function( level ) { level.reset(); } );
      this.numberLevels.forEach( function( level ) { level.reset(); } );
    }
  }

  return fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );
} );
