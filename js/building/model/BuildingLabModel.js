// Copyright 2017, University of Colorado Boulder

/**
 * Model for the "Lab" screen of Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingModel = require( 'FRACTIONS_COMMON/building/model/BuildingModel' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Property = require( 'AXON/Property' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const Vector2 = require( 'DOT/Vector2' );

  class BuildingLabModel extends BuildingModel {
    /**
     * @param {boolean} allowMixedNumbers
     */
    constructor( allowMixedNumbers ) {
      super();

      // @public {boolean}
      this.allowMixedNumbers = allowMixedNumbers;

      // @public {Property.<Representation>}
      this.topRepresentationProperty = new Property( Representation.CIRCLE );

      // @public {Property.<ShapeGroup|NumberGroup|null>} - We'll only show controls for this shape group
      this.selectedGroupProperty = new Property( null );

      // Shape stacks
      [
        { representation: Representation.CIRCLE, color: FractionsCommonColorProfile.labCircleFillProperty },
        { representation: Representation.VERTICAL_BAR, color: FractionsCommonColorProfile.labBarFillProperty }
      ].forEach( ( { representation, color } ) => {
        _.range( 1, 9 ).forEach( denominator => {
          var stack = new ShapeStack( new Fraction( 1, denominator ), representation, color );
          stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, color ) );
          stack.shapePieces.push( new ShapePiece( new Fraction( 1, denominator ), representation, color ) );
          this.shapeStacks.push( stack );
        } );
      } );

      // Number stacks
      _.range( 1, 9 ).map( number => {
        var stack = new NumberStack( number );
        stack.numberPieces.push( new NumberPiece( number ) );
        stack.numberPieces.push( new NumberPiece( number ) );
        this.numberStacks.push( stack );
      } );

      // Non-mutable stacks
      this.shapeGroupStacks.push( new ShapeGroupStack( Representation.CIRCLE, false ) );
      this.shapeGroupStacks.push( new ShapeGroupStack( Representation.VERTICAL_BAR, false ) );
      this.numberGroupStacks.push( new NumberGroupStack( false, false ) );
      this.numberGroupStacks.push( new NumberGroupStack( true, false ) );

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

    // NOTE: Meant to override
    getShapeControlsVisibleProperty( shapeGroup ) {
      return new DerivedProperty( [ this.selectedGroupProperty ], selectedGroup => selectedGroup === shapeGroup );
    }

    reset() {
      this.topRepresentationProperty.reset();

      BuildingModel.prototype.reset.call( this );

      // Initial state
      var shapeGroup = this.addShapeGroup( Representation.CIRCLE );
      shapeGroup.positionProperty.value = new Vector2( 170, 0 );
      this.selectedGroupProperty.value = shapeGroup;

      var numberGroup = this.addNumberGroup( false );
      numberGroup.positionProperty.value = new Vector2( -170, 0 );
    }
  }

  return fractionsCommon.register( 'BuildingLabModel', BuildingLabModel );
} );
