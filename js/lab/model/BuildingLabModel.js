// Copyright 2018, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingModel = require( 'FRACTIONS_COMMON/building/model/BuildingModel' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Property = require( 'AXON/Property' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const PIECE_LAYOUT_QUANTITY = 2;
  const GROUP_LAYOUT_QUANTITY = 1;

  class BuildingLabModel extends BuildingModel {
    /**
     * @param {boolean} allowMixedNumbers
     */
    constructor( allowMixedNumbers ) {
      super();

      // @public {boolean}
      this.allowMixedNumbers = allowMixedNumbers;

      // @public {Property.<BuildingRepresentation>}
      this.topRepresentationProperty = new Property( BuildingRepresentation.PIE );

      // Shape stacks
      [
        { representation: BuildingRepresentation.PIE, color: FractionsCommonColorProfile.labPieFillProperty },
        { representation: BuildingRepresentation.BAR, color: FractionsCommonColorProfile.labBarFillProperty }
      ].forEach( ( { representation, color } ) => {
        _.range( 1, 9 ).forEach( denominator => {
          var stack = new ShapeStack( new Fraction( 1, denominator ), PIECE_LAYOUT_QUANTITY, representation, color, false );
          stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, color ) );
          stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, color ) );
          this.shapeStacks.push( stack );
        } );
      } );

      // Number stacks
      _.range( 1, 9 ).map( number => {
        var stack = new NumberStack( number, PIECE_LAYOUT_QUANTITY, false );
        stack.numberPieces.push( new NumberPiece( number ) );
        stack.numberPieces.push( new NumberPiece( number ) );
        this.numberStacks.push( stack );
      } );

      // Non-mutable stacks
      this.shapeGroupStacks.push( new ShapeGroupStack( GROUP_LAYOUT_QUANTITY, BuildingRepresentation.PIE, true, false ) );
      this.shapeGroupStacks.push( new ShapeGroupStack( GROUP_LAYOUT_QUANTITY, BuildingRepresentation.BAR, true, false ) );
      this.numberGroupStacks.push( new NumberGroupStack( GROUP_LAYOUT_QUANTITY, false, false ) );
      this.numberGroupStacks.push( new NumberGroupStack( GROUP_LAYOUT_QUANTITY, true, false ) );

      // Add initial stacks
      this.shapeGroupStacks.forEach( shapeGroupStack => {
        shapeGroupStack.shapeGroups.push( new ShapeGroup( shapeGroupStack.representation ) );
      } );
      this.numberGroupStacks.forEach( numberGroupStack => {
        numberGroupStack.numberGroups.push( new NumberGroup( numberGroupStack.isMixedNumber ) );
      } );

      // Shared to set up some initial state
      this.reset();
    }

    /**
     * Returns the index to which pieces should animate to in the shape stack.
     * @protected
     * @override
     *
     * @param {ShapeStack} shapeStack
     * @returns {number}
     */
    getShapeStackIndex( shapeStack ) {
      return 1;
    }

    /**
     * Returns the index to which pieces should animate to in the number stack.
     * @protected
     * @override
     *
     * @param {NumberStack} numberStack
     * @returns {number}
     */
    getNumberStackIndex( numberStack ) {
      return 1;
    }

    /**
     * Resets the model.
     * @public
     */
    reset() {
      this.topRepresentationProperty.reset();

      super.reset();

      // Initial state
      var shapeGroup = this.addShapeGroup( BuildingRepresentation.PIE );
      shapeGroup.positionProperty.value = new Vector2( 170, 0 );
      this.selectedGroupProperty.value = shapeGroup;

      var numberGroup = this.addNumberGroup( this.allowMixedNumbers );
      numberGroup.positionProperty.value = new Vector2( -170, 0 );
    }
  }

  return fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );
} );
