// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BuildingModel = require( 'FRACTIONS_COMMON/building/model/BuildingModel' );
  const ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );
  const Vector2 = require( 'DOT/Vector2' );

  class FractionChallenge extends BuildingModel {
    /**
     * @param {ChallengeType} challengeType
     * @param {Array.<Target>} targets
     * @param {Array.<ShapePiece>} shapePieces
     * @param {Array.<NumberPiece>} numberPieces
     */
    constructor( challengeType, targets, shapePieces, numberPieces ) {
      assert && assert( ChallengeType.VALUES.includes( challengeType ) );
      assert && assert( Array.isArray( targets ) );
      assert && assert( Array.isArray( shapePieces ) );
      assert && assert( Array.isArray( numberPieces ) );
      assert && targets.forEach( target => assert( target instanceof Target ) );
      assert && shapePieces.forEach( shapePiece => assert( shapePiece instanceof ShapePiece ) );
      assert && numberPieces.forEach( numberPiece => assert( numberPiece instanceof NumberPiece ) );

      super();

      // @public {ChallengeType}
      this.challengeType = challengeType;

      // @public {Array.<Target>}
      this.targets = targets;

      // @public {boolean}
      this.hasMixedTargets = _.some( targets, target => Fraction.ONE.isLessThan( target.fraction ) );

      const hasCircles = _.some( shapePieces, piece => piece.representation === Representation.CIRCLE );
      const hasBars = _.some( shapePieces, piece => piece.representation === Representation.VERTICAL_BAR );
      const hasNumbers = !!numberPieces.length;

      if ( hasCircles ) {
        this.shapeGroupStacks.push( new ShapeGroupStack( Representation.CIRCLE ) );
      }
      if ( hasBars ) {
        this.shapeGroupStacks.push( new ShapeGroupStack( Representation.VERTICAL_BAR ) );
      }
      if ( hasNumbers ) {
        this.numberGroupStacks.push( new NumberGroupStack( this.hasMixedTargets ) );
      }

      // Sort out inputs (with a new copy, so we don't modify our actual paramater reference) so we create the stacks in
      // increasing order
      shapePieces = shapePieces.slice().sort( ( a, b ) => {
        // NOTE: This seems backwards, but we want the BIGGEST fraction at the start
        if ( a.fraction.isLessThan( b.fraction ) ) {
          return 1;
        }
        else if ( a.fraction.equals( b.fraction ) ) {
          return 0;
        }
        else {
          return -1;
        }
      } );
      numberPieces = numberPieces.slice().sort( ( a, b ) => {
        if ( a.number < b.number ) { return -1; } else if ( a.number === b.number ) { return 0; } else { return 1; }
      } );

      shapePieces.forEach( shapePiece => {
        var shapeStack = this.findMatchingShapeStack( shapePiece );
        if ( !shapeStack ) {
          shapeStack = new ShapeStack( shapePiece.fraction, shapePiece.representation, shapePiece.colorProperty );
          this.shapeStacks.push( shapeStack );
        }
        shapeStack.shapePieces.push( shapePiece );
      } );

      numberPieces.forEach( numberPiece => {
        var numberStack = this.findMatchingNumberStack( numberPiece );
        if ( !numberStack ) {
          numberStack = new NumberStack( numberPiece.number );
          this.numberStacks.push( numberStack );
        }
        numberStack.numberPieces.push( numberPiece );
      } );

      if ( shapePieces.length ) {
        // WAT? TODO: representation
        this.addShapeGroup( Representation.CIRCLE );

        // TODO: Don't add all reprs
        this.shapeGroupStacks.forEach( shapeGroupStack => {
          shapeGroupStack.shapeGroups.push( new ShapeGroup( shapeGroupStack.representation ) );
        } );
      }

      if ( numberPieces.length ) {
        this.addNumberGroup( this.hasMixedTargets );

        // TODO: Don't add all reprs
        this.numberGroupStacks.forEach( numberGroupStack => {
          numberGroupStack.numberGroups.push( new NumberGroup( numberGroupStack.isMixedNumber ) );
        } );
      }

      this.reset();

      const initialGroups = [];
      if ( hasCircles ) {
        initialGroups.push( this.addShapeGroup( Representation.CIRCLE ) );
      }
      if ( hasBars ) {
        initialGroups.push( this.addShapeGroup( Representation.VERTICAL_BAR ) );
      }
      if ( hasNumbers ) {
        initialGroups.push( this.addNumberGroup( this.hasMixedTargets ) );
      }

      // Lay out initial groups
      const halfSpace = 170;
      initialGroups.forEach( ( group, index ) => {
        group.positionProperty.value = new Vector2( halfSpace * ( 2 * index - initialGroups.length + 1 ), 0 );
      } );
    }
  }

  return fractionsCommon.register( 'FractionChallenge', FractionChallenge );
} );
