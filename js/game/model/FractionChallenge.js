// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildingModel = require( 'FRACTIONS_COMMON/building/model/BuildingModel' );
  var ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  var NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  var NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  var Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  var ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  var Target = require( 'FRACTIONS_COMMON/game/model/Target' );

  /**
   * @constructor
   * @extends {BuildingModel}
   *
   * @param {ChallengeType} challengeType
   * @param {Array.<Target>} targets
   * @param {Array.<ShapePiece>} shapePieces
   * @param {Array.<NumberPiece>} numberPieces
   */
  function FractionChallenge( challengeType, targets, shapePieces, numberPieces ) {
    assert && assert( ChallengeType.VALUES.includes( challengeType ) );
    assert && assert( Array.isArray( targets ) );
    assert && assert( Array.isArray( shapePieces ) );
    assert && assert( Array.isArray( numberPieces ) );
    assert && targets.forEach( function( target ) { assert( target instanceof Target ); } );
    assert && shapePieces.forEach( function( shapePiece ) { assert( shapePiece instanceof ShapePiece ); } );
    assert && numberPieces.forEach( function( numberPiece ) { assert( numberPiece instanceof NumberPiece ); } );

    var self = this;

    // @public {ChallengeType}
    this.challengeType = challengeType;

    // @public {Array.<Target>}
    this.targets = targets;

    // @public {boolean}
    this.hasMixedTargets = _.some( targets, function( target ) {
      return Fraction.ONE.isLessThan( target.fraction );
    } );

    BuildingModel.call( this );

    // Sort out inputs (with a new copy, so we don't modify our actual paramater reference) so we create the stacks in
    // increasing order
    shapePieces = shapePieces.slice().sort( function( a, b ) {
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
    numberPieces = numberPieces.slice().sort( function( a, b ) {
      if ( a.number < b.number ) { return -1; } else if ( a.number === b.number ) { return 0; } else { return 1; }
    } );

    shapePieces.forEach( function( shapePiece ) {
      var shapeStack = self.findMatchingShapeStack( shapePiece );
      if ( !shapeStack ) {
        shapeStack = new ShapeStack( shapePiece.fraction, shapePiece.representation, shapePiece.colorProperty );
        self.shapeStacks.push( shapeStack );
      }
      shapeStack.shapePieces.push( shapePiece );
    } );

    numberPieces.forEach( function( numberPiece ) {
      var numberStack = self.findMatchingNumberStack( numberPiece );
      if ( !numberStack ) {
        numberStack = new NumberStack( numberPiece.number );
        self.numberStacks.push( numberStack );
      }
      numberStack.numberPieces.push( numberPiece );
    } );

    if ( shapePieces.length ) {
      // WAT? TODO: representation
      this.addShapeGroup( Representation.CIRCLE );

      // TODO: Don't add all reprs
      this.shapeGroupStacks.forEach( function( shapeGroupStack ) {
        shapeGroupStack.shapeGroups.push( new ShapeGroup( shapeGroupStack.representation ) );
      } );
    }

    if ( numberPieces.length ) {
      this.addNumberGroup( this.hasMixedTargets );

      // TODO: Don't add all reprs
      this.numberGroupStacks.forEach( function( numberGroupStack ) {
        numberGroupStack.numberGroups.push( new NumberGroup( numberGroupStack.isMixedNumber ) );
      } );
    }
  }

  fractionsCommon.register( 'FractionChallenge', FractionChallenge );

  return inherit( BuildingModel, FractionChallenge );
} );
