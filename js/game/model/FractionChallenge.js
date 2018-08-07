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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Easing = require( 'TWIXT/Easing' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
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
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );
  const Vector2 = require( 'DOT/Vector2' );

  class FractionChallenge extends BuildingModel {
    /**
     * @param {number} levelNumber
     * @param {ChallengeType} challengeType
     * @param {Array.<Target>} targets
     * @param {Array.<ShapePiece>} shapePieces
     * @param {Array.<NumberPiece>} numberPieces
     */
    constructor( levelNumber, challengeType, targets, shapePieces, numberPieces ) {
      assert && assert( ChallengeType.VALUES.includes( challengeType ) );
      assert && assert( Array.isArray( targets ) );
      assert && assert( Array.isArray( shapePieces ) );
      assert && assert( Array.isArray( numberPieces ) );
      assert && targets.forEach( target => assert( target instanceof Target ) );
      assert && shapePieces.forEach( shapePiece => assert( shapePiece instanceof ShapePiece ) );
      assert && numberPieces.forEach( numberPiece => assert( numberPiece instanceof NumberPiece ) );

      super();

      const hasCircles = _.some( shapePieces, piece => piece.representation === Representation.CIRCLE );
      const hasBars = _.some( shapePieces, piece => piece.representation === Representation.VERTICAL_BAR );
      const hasNumbers = !!numberPieces.length;

      assert && assert( hasCircles + hasBars + hasNumbers === 1, 'We only support one for now' );

      // @public {number}
      this.levelNumber = levelNumber;

      // @public {ChallengeType}
      this.challengeType = challengeType;

      // @public {Array.<Target>}
      this.targets = targets;

      // @public {boolean}
      this.hasMixedTargets = _.some( targets, target => Fraction.ONE.isLessThan( target.fraction ) );

      // @public {boolean}
      this.hasShapes = hasBars || hasCircles;

      // @public {Representation|null}
      this.representation = hasCircles ? Representation.CIRCLE : ( hasBars ? Representation.VERTICAL_BAR : null );

      // @public {number}
      this.maxTargetWholes = Math.ceil( Math.max( ...targets.map( target => target.fraction.getValue() ) ) );

      // @public {number}
      this.maxNumber = Math.max( ...numberPieces.map( numberPiece => numberPiece.number ) );

      // @public {Property.<number>}
      this.scoreProperty = new DerivedProperty( targets.map( target => target.groupProperty ), ( ...groups ) => {
        return groups.filter( group => group !== null ).length;
      } );

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
          shapeStack = new ShapeStack( shapePiece.fraction, shapePiece.representation, shapePiece.color );
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
        // TODO: Don't add all reprs
        this.shapeGroupStacks.forEach( shapeGroupStack => {
          _.times( targets.length - 1, () => {
            shapeGroupStack.shapeGroups.push( new ShapeGroup( shapeGroupStack.representation ) );
          } );
        } );
      }

      if ( numberPieces.length ) {
        // TODO: Don't add all reprs
        this.numberGroupStacks.forEach( numberGroupStack => {
          _.times( targets.length - 1, () => {
            numberGroupStack.numberGroups.push( new NumberGroup( numberGroupStack.isMixedNumber ) );
          } );
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

    /**
     * Finds the closest Target to a list of given model positions.
     * @public
     *
     * @param {Array.<Vector2>} positions
     * @returns {Target}
     */
    findClosestTarget( positions ) {
      let bestTarget = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      positions.forEach( position => {
        this.targets.forEach( target => {
          const distance = target.positionProperty.value.distance( position );
          if ( distance < bestDistance ) {
            bestDistance = distance;
            bestTarget = target;
          }
        } );
      } );

      assert && assert( bestTarget );

      return bestTarget;
    }

    // TODO: reduce duplication between shapes and numbers!
    collectShapeGroup( shapeGroup, target ) {
      assert && assert( shapeGroup instanceof ShapeGroup );
      assert && assert( target.groupProperty.value === null );

      // Setting this should result in a side-effect of updating our target's positionProperty to the correct location.
      target.groupProperty.value = shapeGroup;

      shapeGroup.partitionDenominatorProperty.value = target.fraction.denominator;

      // Try to start moving out another group
      this.ensureShapeGroups();

      var positionProperty = target.positionProperty;
      var speed = 40 / Math.sqrt( positionProperty.value.distance( shapeGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      shapeGroup.animator.animateTo( positionProperty.value, 0, FractionsCommonConstants.SHAPE_COLLECTION_SCALE, 0, positionProperty, Easing.QUADRATIC_IN, speed, () => {
        this.shapeGroups.remove( shapeGroup );
      } );
    }

    collectNumberGroup( numberGroup, target ) {
      assert && assert( numberGroup instanceof NumberGroup );
      assert && assert( target.groupProperty.value === null );

      // Setting this should result in a side-effect of updating our target's positionProperty to the correct location.
      target.groupProperty.value = numberGroup;

      // Try to start moving out another group
      this.ensureNumberGroups();

      var positionProperty = target.positionProperty;
      var speed = 40 / Math.sqrt( positionProperty.value.distance( numberGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      numberGroup.animator.animateTo( positionProperty.value, 0, FractionsCommonConstants.NUMBER_COLLECTION_SCALE, 0, positionProperty, Easing.QUADRATIC_IN, speed, () => {
        this.numberGroups.remove( numberGroup );
      } );
    }

    centerShapeGroup( shapeGroup ) {
      assert && assert( shapeGroup instanceof ShapeGroup );

      const center = Vector2.ZERO;
      var speed = 60 / Math.sqrt( center.distance( shapeGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      shapeGroup.animator.animateTo( center, 0, 1, 0, new Property( center ), Easing.QUADRATIC_IN, speed, () => {} );
    }

    centerNumberGroup( numberGroup ) {
      assert && assert( numberGroup instanceof NumberGroup );

      const center = Vector2.ZERO;
      var speed = 60 / Math.sqrt( center.distance( numberGroup.positionProperty.value ) ); // TODO: factor out speed elsewhere
      numberGroup.animator.animateTo( center, 0, 1, 0, new Property( center ), Easing.QUADRATIC_IN, speed, () => {} );
    }

    ensureShapeGroups() {
      // If we already have one out, don't look for more
      if ( this.shapeGroups.length >= 2 ) { return; }

      for ( let shapeGroupStack of this.shapeGroupStacks ) {
        if ( !shapeGroupStack.isEmpty() ) {
          const shapeGroup = shapeGroupStack.shapeGroups.pop();
          // TODO: don't require this here AND in the challengenode. Have things "reset" once they go to the stack!!!
          shapeGroup.partitionDenominatorProperty.reset();
          // TODO: add the stack offset here (should be a common method on Stack?)
          shapeGroup.positionProperty.value = shapeGroupStack.positionProperty.value;
          this.shapeGroups.push( shapeGroup );
          this.centerShapeGroup( shapeGroup );
          break;
        }
      }
    }

    ensureNumberGroups() {
      // If we already have one out, don't look for more
      if ( this.numberGroups.length >= 2 ) { return; }

      for ( let numberGroupStack of this.numberGroupStacks ) {
        if ( !numberGroupStack.isEmpty() ) {
          const numberGroup = numberGroupStack.numberGroups.pop();
          // TODO: add the stack offset here (should be a common method on Stack?)
          numberGroup.positionProperty.value = numberGroupStack.positionProperty.value;
          this.numberGroups.push( numberGroup );
          this.centerNumberGroup( numberGroup );
          break;
        }
      }
    }
  }

  return fractionsCommon.register( 'FractionChallenge', FractionChallenge );
} );
