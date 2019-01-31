// Copyright 2018, University of Colorado Boulder

/**
 * The main model for the matcher screens.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const Emitter = require( 'AXON/Emitter' );
  const FillType = require( 'FRACTIONS_COMMON/game/model/FillType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonQueryParameters = require( 'FRACTIONS_COMMON/common/FractionsCommonQueryParameters' );
  const MatcherLevel = require( 'FRACTIONS_COMMON/matcher/model/MatcherLevel' );
  const Property = require( 'AXON/Property' );

  // constants
  // TODO: Remove this usage with ShapePartition
  const SHAPES = [
    'PIES',
    'HORIZONTAL_BARS',
    'VERTICAL_BARS',
    'PLUSES',
    'GRID',
    'PYRAMID',
    'POLYGON',
    'TETRIS',
    'FLOWER',
    'LETTER_L_SHAPES',
    'INTERLEAVED_L_SHAPES',
    'RING_OF_HEXAGONS',
    'NINJA_STAR'
  ];

  class FractionMatcherModel {
    /**
     * @param {boolean} hasMixedNumbers
     * @param {boolean} [useShortTitle]
     */
    constructor( hasMixedNumbers, useShortTitle = false ) {
      assert && assert( typeof hasMixedNumbers === 'boolean' );

      // @public {boolean}
      this.hasMixedNumbers = hasMixedNumbers;
      this.useShortTitle = useShortTitle;

      // dimensions of the model's space
      // TODO: Don't do this.
      this.width = FractionMatcherView.LAYOUT_BOUNDS.width;
      this.height = FractionMatcherView.LAYOUT_BOUNDS.height;

      this.colorScheme = [
        FractionsCommonColorProfile.shapeBlueProperty,
        FractionsCommonColorProfile.shapeGreenProperty,
        FractionsCommonColorProfile.shapeRedProperty
      ];
      this.toSimplify = hasMixedNumbers;
      this.ANIMATION_TIME = 500;
      this.MAXIMUM_PAIRS = 6;
      this.MAX_POINTS_PER_GAME_LEVEL = 12;

      this.levels = [];

      this.currentLevelProperty = new Property( 0 );
      this.isTimerProperty = new Property( false );

      this.stepEmitter = new Emitter();

      const levelDescriptions = hasMixedNumbers ? FractionMatcherModel.getMixedLevelDescriptions() : FractionMatcherModel.getUnmixedLevelDescriptions();
      levelDescriptions.forEach( ( levelDescription, index ) => {
        this.levels.push( new MatcherLevel( this, levelDescription, index + 1 ) );
      } );
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.currentLevelProperty.reset();
      this.isTimerProperty.reset();
      this.levels.forEach( level => {
        level.reset();
        level.resetHistory();
      } );
    }

    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      // TODO: actually have the level object (as normal)
      if ( this.currentLevelProperty.get() > 0 ) {
        this.levels[ this.currentLevelProperty.get() - 1 ].step( dt );
      }

      //Signify that a step occurred: used in animating the RewardNodes
      this.stepEmitter.emit1( dt );
    }

    static getUnmixedLevelDescriptions() {
      return [
        /**
         * Level 1
         * No mixed numbers
         * Only “exact” matches will be present. So for instance if there is a 3/6  and a pie with 6 divisions and 3 shaded slices, there will not be a ½  present .  In other words, the numerical representation on this level will exactly match the virtual manipulative.
         * Only numbers/representations ≦ 1 possible on this level
         * “Easy” shapes on this level (not some of the more abstract representations)
         *
         * Can be hacked by FractionsCommonQueryParameters.testDenominator, see query parameter documentation for details.
         */
        {
          fractions: FractionsCommonQueryParameters.testDenominator === 0 ? [
            new Fraction( 1, 2 ),
            new Fraction( 1, 3 ),
            new Fraction( 2, 3 ),
            new Fraction( 1, 4 ),
            new Fraction( 3, 4 ),
            new Fraction( 1, 1 )
          ] : _.times( 6, index => new Fraction( index + 1, FractionsCommonQueryParameters.testDenominator ) ),
          numericScaleFactors: [ 1 ],
          fillType: [ FillType.SEQUENTIAL ],
          shapes: FractionsCommonQueryParameters.testDenominator === 0 ? SHAPES.slice( 0, 3 ) : SHAPES
        },
        /**
         * Level 2
         * Reduced fractions possible on this level. So, for instance 3/6 and ½  could both be present.  Or a virtual representation of 3/6 could have the numerical of ½ be its only possible match
         * Still only numbers/representations ≦ 1 possible
         * More shapes can be introduced
         */
        {
          fractions: [
            new Fraction( 1, 2 ),
            new Fraction( 1, 3 ),
            new Fraction( 2, 3 ),
            new Fraction( 2, 4 ),
            new Fraction( 3, 4 ),
            new Fraction( 2, 6 ),
            new Fraction( 3, 6 )
          ],
          numericScaleFactors: [ 1 ],
          fillType: [ FillType.SEQUENTIAL ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 3:
         * Reduced fractions possible on this level. So, for instance 3/6 and ½  could both be present.  Or a virtual representation of 3/6 could have the numerical of ½ be its only possible match
         * Still only numbers/representations ≦ 1 possible
         * More shapes can be introduced
         */
        {
          fractions: [
            new Fraction( 3, 2 ),
            new Fraction( 4, 3 ),
            new Fraction( 5, 4 ),
            new Fraction( 6, 4 ),
            new Fraction( 7, 4 ),
            new Fraction( 4, 5 ),
            new Fraction( 2, 6 ),
            new Fraction( 3, 6 ),
            new Fraction( 4, 6 ),
            new Fraction( 5, 6 ),
            new Fraction( 7, 6 ),
            new Fraction( 3, 8 ),
            new Fraction( 4, 8 ),
            new Fraction( 5, 8 ),
            new Fraction( 6, 8 ),
            new Fraction( 7, 8 )
          ],
          numericScaleFactors: [ 1 ],
          fillType: [ FillType.SEQUENTIAL ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 4:
         * All representations possible as well as complicated mixed/improper numbers
         */
        {
          fractions: [
            new Fraction( 13, 7 ),
            new Fraction( 13, 7 ),
            new Fraction( 6, 3 ),
            new Fraction( 9, 5 ),
            new Fraction( 9, 7 ),
            new Fraction( 9, 8 ),
            new Fraction( 14, 8 ),
            new Fraction( 2, 9 ),
            new Fraction( 3, 9 ),
            new Fraction( 4, 9 ),
            new Fraction( 6, 9 ),
            new Fraction( 8, 9 )
          ],
          numericScaleFactors: [ 1, 2 ],
          fillType: [ FillType.SEQUENTIAL ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 5:
         * All representations possible as well as complicated mixed/improper numbers.  Same fractions as level 4 but different representations.
         */
        {
          fractions: [
            new Fraction( 13, 7 ),
            new Fraction( 13, 7 ),
            new Fraction( 6, 3 ),
            new Fraction( 9, 5 ),
            new Fraction( 9, 7 ),
            new Fraction( 9, 8 ),
            new Fraction( 14, 8 ),
            new Fraction( 2, 9 ),
            new Fraction( 3, 9 ),
            new Fraction( 4, 9 ),
            new Fraction( 6, 9 ),
            new Fraction( 8, 9 )
          ],
          numericScaleFactors: [ 1, 2, 3 ],
          fillType: [ FillType.SEQUENTIAL, FillType.MIXED ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 6:
         * All representations possible as well as complicated mixed/improper numbers
         */
        {
          fractions: [
            new Fraction( 6, 5 ),
            new Fraction( 7, 5 ),
            new Fraction( 8, 5 ),
            new Fraction( 9, 5 ),
            new Fraction( 7, 6 ),
            new Fraction( 8, 6 ),
            new Fraction( 9, 6 ),
            new Fraction( 9, 7 ),
            new Fraction( 10, 7 ),
            new Fraction( 13, 7 ),
            new Fraction( 9, 8 ),
            new Fraction( 10, 8 ),
            new Fraction( 11, 8 ),
            new Fraction( 14, 8 ),
            new Fraction( 4, 9 ),
            new Fraction( 6, 9 ),
            new Fraction( 8, 9 ),
            new Fraction( 10, 9 ),
            new Fraction( 11, 9 )
          ],
          numericScaleFactors: [ 1, 4, 5 ],
          fillType: [ FillType.SEQUENTIAL, FillType.RANDOM ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 7:
         * All representations possible as well as complicated mixed/improper numbers
         */
        {
          fractions: [
            new Fraction( 3, 2 ),
            new Fraction( 4, 3 ),
            new Fraction( 5, 3 ),
            new Fraction( 5, 4 ),
            new Fraction( 7, 4 ),
            new Fraction( 6, 5 ),
            new Fraction( 7, 5 ),
            new Fraction( 8, 5 ),
            new Fraction( 9, 5 ),
            new Fraction( 7, 6 ),
            new Fraction( 11, 6 )
          ],
          numericScaleFactors: [ 1, 6, 7 ],
          fillType: [ FillType.SEQUENTIAL, FillType.RANDOM ],
          shapes: SHAPES.slice( 0 )
        },
        /**
         * Level 8:
         * All representations possible as well as complicated mixed/improper numbers
         */
        {
          fractions: [
            new Fraction( 8, 7 ),
            new Fraction( 9, 7 ),
            new Fraction( 10, 7 ),
            new Fraction( 11, 7 ),
            new Fraction( 12, 7 ),
            new Fraction( 13, 7 ),
            new Fraction( 9, 8 ),
            new Fraction( 10, 8 ),
            new Fraction( 11, 8 ),
            new Fraction( 12, 8 ),
            new Fraction( 13, 8 ),
            new Fraction( 14, 8 ),
            new Fraction( 15, 8 ),
            new Fraction( 10, 9 ),
            new Fraction( 11, 9 ),
            new Fraction( 12, 9 ),
            new Fraction( 13, 9 ),
            new Fraction( 14, 9 ),
            new Fraction( 15, 9 ),
            new Fraction( 16, 9 ),
            new Fraction( 17, 9 )
          ],
          numericScaleFactors: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
          fillType: [ FillType.SEQUENTIAL, FillType.RANDOM ],
          shapes: SHAPES.slice( 0 )
        }
      ];
    }

    static getMixedLevelDescriptions() {
      // TODO: Should this truly be stored as a delta?
      const descriptions = FractionMatcherModel.getUnmixedLevelDescriptions();

      //mixed numbers added some more fractions or remove extra
      descriptions[ 0 ].fractions.pop();
      // add mixed fractions
      descriptions[ 0 ].fractions.push(
        new Fraction( 3, 2 ),
        new Fraction( 4, 3 )
      );

      // level 2
      // add more mixed fractions
      descriptions[ 1 ].fractions.push(
        new Fraction( 3, 2 ),
        new Fraction( 4, 3 ),
        new Fraction( 5, 3 ),
        new Fraction( 5, 4 ),
        new Fraction( 6, 4 ),
        new Fraction( 6, 5 )
      );

      // level 3
      // add more mixed fractions
      descriptions[ 2 ].fractions.push(
        new Fraction( 5, 3 ),
        new Fraction( 6, 5 ),
        new Fraction( 7, 5 ),
        new Fraction( 8, 5 ),
        new Fraction( 9, 5 ),
        new Fraction( 8, 6 ),
        new Fraction( 9, 6 ),
        new Fraction( 10, 6 ),
        new Fraction( 11, 6 ),
        new Fraction( 8, 7 ),
        new Fraction( 9, 7 ),
        new Fraction( 10, 7 ),
        new Fraction( 11, 7 ),
        new Fraction( 12, 7 ),
        new Fraction( 13, 7 ),
        new Fraction( 9, 8 ),
        new Fraction( 10, 8 ),
        new Fraction( 11, 8 ),
        new Fraction( 12, 8 ),
        new Fraction( 13, 8 ),
        new Fraction( 14, 8 ),
        new Fraction( 15, 8 )
      );

      // level 4
      // remove one 13/7 fraction
      descriptions[ 3 ].fractions.shift();
      // add more mixed fractions
      descriptions[ 3 ].fractions.push(
        new Fraction( 6, 5 ),
        new Fraction( 7, 5 ),
        new Fraction( 8, 5 ),
        new Fraction( 7, 6 ),
        new Fraction( 8, 6 ),
        new Fraction( 9, 6 ),
        new Fraction( 10, 6 ),
        new Fraction( 11, 6 ),
        new Fraction( 8, 7 ),
        new Fraction( 10, 7 ),
        new Fraction( 11, 7 ),
        new Fraction( 12, 7 ),
        new Fraction( 10, 8 ),
        new Fraction( 11, 8 ),
        new Fraction( 12, 8 ),
        new Fraction( 13, 8 ),
        new Fraction( 15, 8 ),
        new Fraction( 10, 9 ),
        new Fraction( 11, 9 ),
        new Fraction( 12, 9 ),
        new Fraction( 13, 9 ),
        new Fraction( 14, 9 ),
        new Fraction( 15, 9 ),
        new Fraction( 16, 9 ),
        new Fraction( 17, 9 )
      );
      descriptions[ 3 ].numericScaleFactors = [ 1 ];

      // level 5
      descriptions[ 4 ].fractions = descriptions[ 3 ].fractions.slice( 0 );

      // level 6
      // add more mixed fractions
      descriptions[ 5 ].fractions.push(
        new Fraction( 10, 6 ),
        new Fraction( 11, 6 ),
        new Fraction( 8, 7 ),
        new Fraction( 11, 7 ),
        new Fraction( 12, 7 ),
        new Fraction( 12, 8 ),
        new Fraction( 13, 8 ),
        new Fraction( 15, 8 ),
        new Fraction( 12, 9 ),
        new Fraction( 13, 9 ),
        new Fraction( 14, 9 ),
        new Fraction( 15, 9 ),
        new Fraction( 16, 9 ),
        new Fraction( 17, 9 )
      );

      // level 7
      // add more mixed fractions
      descriptions[ 6 ].fractions.push(
        new Fraction( 8, 6 ),
        new Fraction( 9, 6 ),
        new Fraction( 10, 6 ),
        new Fraction( 8, 7 ),
        new Fraction( 9, 7 ),
        new Fraction( 10, 7 ),
        new Fraction( 11, 7 ),
        new Fraction( 12, 7 ),
        new Fraction( 13, 7 ),
        new Fraction( 9, 8 ),
        new Fraction( 10, 8 ),
        new Fraction( 11, 8 ),
        new Fraction( 12, 8 ),
        new Fraction( 13, 8 ),
        new Fraction( 14, 8 ),
        new Fraction( 15, 8 ),
        new Fraction( 10, 9 ),
        new Fraction( 11, 9 ),
        new Fraction( 12, 9 ),
        new Fraction( 13, 9 ),
        new Fraction( 14, 9 ),
        new Fraction( 15, 9 ),
        new Fraction( 16, 9 ),
        new Fraction( 17, 9 )
      );
      descriptions[ 6 ].numericScaleFactors = [ 3, 6, 7 ];

      // level 8
      // add more mixed fractions
      descriptions[ 7 ].fractions.push(
        new Fraction( 6, 5 ),
        new Fraction( 7, 5 ),
        new Fraction( 8, 5 ),
        new Fraction( 9, 5 ),
        new Fraction( 7, 6 ),
        new Fraction( 8, 6 ),
        new Fraction( 9, 6 ),
        new Fraction( 10, 6 ),
        new Fraction( 11, 6 )
      );
      descriptions[ 7 ].numericScaleFactors = [ 3, 4, 5, 6, 7, 8, 9 ];

      return descriptions;
    }
  }

  return fractionsCommon.register( 'FractionMatcherModel', FractionMatcherModel );
} );
