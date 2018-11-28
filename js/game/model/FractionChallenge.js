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
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const ChallengeType = require( 'FRACTIONS_COMMON/game/enum/ChallengeType' );
  const CollectionFinder = require( 'FRACTIONS_COMMON/game/model/CollectionFinder' );
  const ColorDef = require( 'SCENERY/util/ColorDef' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const NumberGroup = require( 'FRACTIONS_COMMON/building/model/NumberGroup' );
  const NumberGroupStack = require( 'FRACTIONS_COMMON/building/model/NumberGroupStack' );
  const NumberPiece = require( 'FRACTIONS_COMMON/building/model/NumberPiece' );
  const NumberStack = require( 'FRACTIONS_COMMON/building/model/NumberStack' );
  const PrimeFactorization = require( 'FRACTIONS_COMMON/common/model/PrimeFactorization' );
  const ShapeGroup = require( 'FRACTIONS_COMMON/building/model/ShapeGroup' );
  const ShapeGroupStack = require( 'FRACTIONS_COMMON/building/model/ShapeGroupStack' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapeStack = require( 'FRACTIONS_COMMON/building/model/ShapeStack' );
  const ShapeTarget = require( 'FRACTIONS_COMMON/game/model/ShapeTarget' );
  const Target = require( 'FRACTIONS_COMMON/game/model/Target' );
  const UnitCollection = require( 'FRACTIONS_COMMON/game/model/UnitCollection' );
  const Vector2 = require( 'DOT/Vector2' );

  // global
  let isDoingResetGeneration = false;
  let resetTypes = [];

  class FractionChallenge extends BuildingModel {
    /**
     * @param {number} levelNumber
     * @param {ChallengeType} challengeType
     * @param {boolean} hasMixedTargets
     * @param {Array.<Target>} targets
     * @param {Array.<ShapePiece>} shapePieces
     * @param {Array.<NumberPiece>} numberPieces
     */
    constructor( levelNumber, challengeType, hasMixedTargets, targets, shapePieces, numberPieces ) {
      assert && assert( typeof levelNumber === 'number' );
      assert && assert( ChallengeType.VALUES.includes( challengeType ) );
      assert && assert( typeof hasMixedTargets === 'boolean' );
      assert && assert( Array.isArray( targets ) );
      assert && assert( Array.isArray( shapePieces ) );
      assert && assert( Array.isArray( numberPieces ) );
      assert && targets.forEach( target => assert( target instanceof Target ) );
      assert && shapePieces.forEach( shapePiece => assert( shapePiece instanceof ShapePiece ) );
      assert && numberPieces.forEach( numberPiece => assert( numberPiece instanceof NumberPiece ) );

      super();

      // TODO: PIE/BAR terminology. look for other "circles" cases
      const hasCircles = _.some( shapePieces, piece => piece.representation === BuildingRepresentation.PIE );
      const hasBars = _.some( shapePieces, piece => piece.representation === BuildingRepresentation.BAR );
      const hasNumbers = !!numberPieces.length;

      assert && assert( hasCircles + hasBars + hasNumbers === 1, 'We only support one for now' );

      // @public {number}
      this.levelNumber = levelNumber;

      // @public {ChallengeType}
      this.challengeType = challengeType;

      // @public {Array.<Target>}
      this.targets = targets;

      // @public {boolean}
      this.hasMixedTargets = hasMixedTargets;

      // @public {boolean}
      this.hasShapes = hasBars || hasCircles;

      // @public {BuildingRepresentation|null}
      this.representation = hasCircles ? BuildingRepresentation.PIE : ( hasBars ? BuildingRepresentation.BAR : null );

      // @public {number}
      this.maxTargetWholes = Math.ceil( Math.max( ...targets.map( target => target.fraction.value ) ) );

      // @public {number}
      this.maxNumber = Math.max( ...numberPieces.map( numberPiece => numberPiece.number ) );

      // @public {Property.<number>}
      this.scoreProperty = new DerivedProperty( targets.map( target => target.groupProperty ), ( ...groups ) => {
        return groups.filter( group => group !== null ).length;
      } );

      // @public {FractionChallenge} - Set externally if, when going from this challenge to the specified one, there
      // should instead be a "refresh" animation instead of "next" challenge.
      this.refreshedChallenge = null;

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

      if ( hasCircles ) {
        this.shapeGroupStacks.push( new ShapeGroupStack( targets.length, BuildingRepresentation.PIE ) );
      }
      if ( hasBars ) {
        this.shapeGroupStacks.push( new ShapeGroupStack( targets.length, BuildingRepresentation.BAR ) );
      }
      if ( hasNumbers ) {
        this.numberGroupStacks.push( new NumberGroupStack( targets.length, this.hasMixedTargets ) );
      }

      shapePieces.forEach( shapePiece => {
        var shapeStack = this.findMatchingShapeStack( shapePiece );
        if ( !shapeStack ) {
          const quantity = shapePieces.filter( otherPiece => otherPiece.fraction.equals( shapePiece.fraction ) ).length;
          shapeStack = new ShapeStack( shapePiece.fraction, quantity, shapePiece.representation, shapePiece.color );
          this.shapeStacks.push( shapeStack );
        }
        shapeStack.shapePieces.push( shapePiece );
      } );

      numberPieces.forEach( numberPiece => {
        var numberStack = this.findMatchingNumberStack( numberPiece );
        if ( !numberStack ) {
          const quantity = numberPieces.filter( otherPiece => otherPiece.number === numberPiece.number ).length;
          numberStack = new NumberStack( numberPiece.number, quantity );
          this.numberStacks.push( numberStack );
        }
        numberStack.numberPieces.push( numberPiece );
      } );

      if ( shapePieces.length ) {
        // TODO: Don't add all reprs
        this.shapeGroupStacks.forEach( shapeGroupStack => {
          _.times( targets.length - 1, () => {
            shapeGroupStack.shapeGroups.push( new ShapeGroup( shapeGroupStack.representation, {
              maxContainers: this.maxTargetWholes
            } ) );
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
        initialGroups.push( this.addShapeGroup( BuildingRepresentation.PIE, this.maxTargetWholes ) );
      }
      if ( hasBars ) {
        initialGroups.push( this.addShapeGroup( BuildingRepresentation.BAR, this.maxTargetWholes ) );
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
      shapeGroup.animator.animateTo( {
        position: positionProperty.value,
        scale: FractionsCommonConstants.SHAPE_COLLECTION_SCALE,
        animationInvalidationProperty: positionProperty,
        endAnimationCallback: () => {
          this.shapeGroups.remove( shapeGroup );
        }
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
      numberGroup.animator.animateTo( {
        position: positionProperty.value,
        scale: FractionsCommonConstants.NUMBER_COLLECTION_SCALE,
        animationInvalidationProperty: positionProperty,
        endAnimationCallback: () => {
          this.numberGroups.remove( numberGroup );
        }
      } );
    }

    centerShapeGroup( shapeGroup ) {
      assert && assert( shapeGroup instanceof ShapeGroup );

      shapeGroup.animator.animateTo( {
        position: Vector2.ZERO,
        scale: 1,
        velocity: 60
      } );
    }

    centerNumberGroup( numberGroup ) {
      assert && assert( numberGroup instanceof NumberGroup );

      numberGroup.animator.animateTo( {
        position: Vector2.ZERO,
        scale: 1,
        velocity: 60
      } );
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

    /**
     * Grabs a ShapePiece from the stack, sets up state for it to be dragged/placed, and places it at the
     * given point.
     * @public
     *
     * @param {ShapeStack} stack
     * @param {Vector2} modelPoint
     * @returns {ShapePiece}
     */
    pullShapePieceFromStack( stack, modelPoint ) {
      const shapePiece = stack.shapePieces.pop();
      shapePiece.scaleProperty.reset();
      shapePiece.rotationProperty.reset();
      shapePiece.positionProperty.value = modelPoint;
      this.dragShapePieceFromStack( shapePiece );
      return shapePiece;
    }

    /**
     * Grabs a NumberPiece from the stack, sets up state for it to be dragged/placed, and places it at the
     * given point.
     * @public
     *
     * @param {NumberStack} stack
     * @param {Vector2} modelPoint
     * @returns {NumberPiece}
     */
    pullNumberPieceFromStack( stack, modelPoint ) {
      const numberPiece = stack.numberPieces.pop();
      numberPiece.scaleProperty.reset();
      numberPiece.positionProperty.value = modelPoint;
      this.dragNumberPieceFromStack( numberPiece );
      return numberPiece;
    }

    /**
     * Grabs a ShapeGroup from the stack, sets up state for it to be dragged/placed, and places it at the
     * given point.
     * @public
     *
     * @param {ShapeGroupStack} stack
     * @param {Vector2} modelPoint
     * @returns {ShapeGroup}
     */
    pullShapeGroupFromStack( stack, modelPoint ) {
      const shapeGroup = stack.shapeGroups.pop();
      shapeGroup.scaleProperty.reset();
      shapeGroup.partitionDenominatorProperty.reset();
      shapeGroup.positionProperty.value = modelPoint;
      this.dragShapeGroupFromStack( shapeGroup );
      return shapeGroup;
    }

    // TODO: can we reduce duplication of these functions?
    /**
     * Grabs a NumberGroup from the stack, sets up state for it to be dragged/placed, and places it at the
     * given point.
     * @public
     *
     * @param {NumberGroupStack} stack
     * @param {Vector2} modelPoint
     * @returns {NumberGroup}
     */
    pullNumberGroupFromStack( stack, modelPoint ) {
      const numberGroup = stack.numberGroups.pop();
      numberGroup.scaleProperty.reset();
      numberGroup.positionProperty.value = modelPoint;
      this.dragNumberGroupFromStack( numberGroup );
      return numberGroup;
    }

    /**
     * Returns the contents of a target to the collection panels.
     * @public
     *
     * @param {Target} target
     */
    returnTarget( target ) {
      const group = target.groupProperty.value;

      if ( group ) {
        // If the group hasn't fully completed its animation, then force it to complete early.
        group.animator.endAnimation();

        target.groupProperty.value = null;
        if ( this.hasShapes ) {
          this.shapeGroups.push( group );
          this.returnShapeGroup( group );
        }
        else {
          this.numberGroups.push( group );
          this.returnNumberGroup( group );
        }
      }
    }

    /**
     * Does a semi-reset of the challenge state, and constructs a solution (without putting things in targets).
     * @public
     */
    cheat() {
      this.endAnimation();

      this.targets.forEach( target => this.returnTarget( target ) );
      this.endAnimation();

      this.shapeGroups.forEach( shapeGroup => this.returnShapeGroup( shapeGroup ) );
      this.numberGroups.forEach( numberGroup => this.returnNumberGroup( numberGroup ) );
      this.endAnimation();

      const groupStack = this.hasShapes ? this.shapeGroupStacks[ 0 ] : this.numberGroupStacks[ 0 ];

      const numGroups = groupStack.array.length;
      const groups = _.range( 0, numGroups ).map( index => {
        const point = new Vector2( this.hasShapes ? -100 : 0, ( index - ( numGroups - 1 ) / 2 ) * 100 );

        if ( this.hasShapes ) {
          return this.pullShapeGroupFromStack( groupStack, point );
        }
        else {
          return this.pullNumberGroupFromStack( groupStack, point );
        }
      } );

      this.endAnimation();

      if ( this.hasShapes ) {
        let maxQuantity = 0;
        const availableCollection = UnitCollection.fractionsToCollection( this.shapeStacks.map( shapeStack => {
          maxQuantity = Math.max( maxQuantity, shapeStack.array.length );
          return new Fraction( shapeStack.array.length, shapeStack.fraction.denominator );
        } ) );
        const denominators = availableCollection.nonzeroDenominators;
        const fractions = this.targets.map( target => target.fraction );

        const collectionFinder = new CollectionFinder( {
          denominators: denominators.map( PrimeFactorization.factor )
        } );

        const solution = FractionChallenge.findShapeSolution( fractions, collectionFinder, maxQuantity, availableCollection );

        solution.forEach( ( groupCollections, groupIndex ) => {
          const group = groups[ groupIndex ];
          while ( group.shapeContainers.length < groupCollections.length ) {
            group.increaseContainerCount();
          }

          groupCollections.forEach( ( collection, containerIndex ) => {
            collection.unitFractions.forEach( fraction => {
              const stack = _.find( this.shapeStacks, stack => stack.fraction.equals( fraction ) );
              const piece = this.pullShapePieceFromStack( stack, Vector2.ZERO );
              this.placeActiveShapePiece( piece, group.shapeContainers.get( containerIndex ), group );
            } );
          } );
        } );
      }
      else {
        const pullNumberPiece = ( number, spot ) => {
          const stack = _.find( this.numberStacks, stack => stack.number === number );
          const piece = this.pullNumberPieceFromStack( stack, Vector2.ZERO );
          this.draggedNumberPieces.remove( piece );
          this.placeNumberPiece( spot, piece );
        };

        const availableQuantities = {};
        const numbers = this.numberStacks.map( numberStack => {
          availableQuantities[ numberStack.number ] = numberStack.array.length;
          return numberStack.number;
        } );
        const fractions = [];

        // if we have mixed numbers, their "whole" parts are exactly computable
        groups.forEach( ( group, index ) => {
          let fraction = this.targets[ index ].fraction;
          if ( group.isMixedNumber ) {
            const whole = Math.floor( fraction.value );
            pullNumberPiece( whole, group.wholeSpot );
            availableQuantities[ whole ]--;
            fraction = fraction.minusInteger( whole );
          }
          fractions.push( fraction.reduced() );
        } );

        const solution = FractionChallenge.findNumberSolution( fractions, Math.max( ...numbers ), availableQuantities );

        groups.forEach( ( group, index ) => {
          pullNumberPiece( solution[ index ] * fractions[ index ].numerator, group.numeratorSpot );
          pullNumberPiece( solution[ index ] * fractions[ index ].denominator, group.denominatorSpot );
        } );        
      }

      this.endAnimation();
    }

    static findShapeSolution( fractions, collectionFinder, maxQuantity, availableCollection ) {
      // {Array.<Array.<Object>>} - Each object is { {Array.<UnitCollection>} containers, {UnitCollection} total }
      const fractionPossibilities = fractions.map( fraction => {
        const collections = collectionFinder.search( fraction, {
          maxQuantity: maxQuantity
        } );

        // {Array.<Array.<Array.<Fraction>>>}
        const compactGroups = collections.map( collection => collection.getCompactRequiredGroups( Math.ceil( fraction.value ) ) ).filter( _.identity );

        return compactGroups.map( compactGroup => {
          const containers = compactGroup.map( UnitCollection.fractionsToCollection );
          return {
            containers,
            total: _.reduce( containers, ( a, b ) => a.plus( b ), new UnitCollection( [] ) )
          };
        } );
      } );

      let currentCollection = availableCollection;
      function findSolution( i ) {
        if ( i === fractions.length ) {
          return [];
        }

        const possibilities = fractionPossibilities[ i ];

        for ( let possibility of possibilities ) {
          if ( currentCollection.contains( possibility.total ) ) {
            currentCollection = currentCollection.minus( possibility.total );

            const subsolution = findSolution( i + 1 );

            currentCollection = currentCollection.plus( possibility.total );

            if ( subsolution ) {
              return [ possibility.containers, ...subsolution ];
            }
          }
        }
      }
      return findSolution( 0 );
    }

    /**
     * Returns an array of solutions (multipliers for each fraction such that numerator*n and denominator*n are in
     * availableQuantities).
     * @private
     *
     * @param {Array.<Fraction>} fractions
     * @param {number} maxNumber
     * @param {Object} availableQuantities - Map from number => quantity available.
     * @returns {Array.<number>} - multipliers
     */
    static findNumberSolution( fractions, maxNumber, availableQuantities ) {
      if ( fractions.length === 0 ) {
        return [];
      }

      const fraction = fractions[ 0 ];
      const maxSolution = Math.floor( maxNumber / fraction.denominator );

      for ( let i = 1; i <= maxSolution; i++ ) {
        const numerator = i * fraction.numerator;
        const denominator = i * fraction.denominator;
        if ( availableQuantities[ numerator ] && availableQuantities[ denominator ] &&
             ( numerator !== denominator || availableQuantities[ numerator ] > 1 ) ) {
          availableQuantities[ numerator ]--;
          availableQuantities[ denominator ]--;
          const subsolution = FractionChallenge.findNumberSolution( fractions.slice( 1 ), maxNumber, availableQuantities );
          availableQuantities[ numerator ]++;
          availableQuantities[ denominator ]++;

          if ( subsolution ) {
            return [ i, ...subsolution ];
          }
        }
      }

      return null;
    }

    /**
     * There is a desired "pseudorandom" generation for the first 4 shape levels, which should have a "nice" mix of
     * pie and bar. This should change on every "initial" or "reset" generation (where all 4 are generated), but
     * if only one is generated then it should be random.
     * @public
     *
     * Call this before generation when it's initial/reset.
     */
    static beginFullGeneration() {
      isDoingResetGeneration = true;
      resetTypes = [
        ...phet.joist.random.shuffle( [
          ChallengeType.PIE,
          ChallengeType.BAR
        ] ),
        ...phet.joist.random.shuffle( [
          ChallengeType.PIE,
          ChallengeType.BAR
        ] )
      ];
    }

    /**
     * Call this after generation when it's initial/reset, see beginFullGeneration()
     * @public
     */
    static endFullGeneration() {
      isDoingResetGeneration = false;
    }

    /**
     * Creates a FractionChallenge for a "Shape" level.
     * @public
     *
     * @param {number} levelNumber
     * @param {boolean} hasMixedTargets
     * @param {ColorDef} color
     * @param {Array.<Fraction>} targetFractions
     * @param {Array.<Fraction>} pieceFractions
     * @returns {FractionChallenge}
     */
    static createShapeChallenge( levelNumber, hasMixedTargets, color, targetFractions, pieceFractions ) {
      assert && assert( typeof levelNumber === 'number' );
      assert && assert( typeof hasMixedTargets === 'boolean' );
      assert && assert( ColorDef.isColorDef( color ) );
      assert && assert( Array.isArray( targetFractions ) );
      assert && targetFractions.forEach( fraction => assert( fraction instanceof Fraction ) );
      assert && assert( Array.isArray( pieceFractions ) );
      assert && pieceFractions.forEach( fraction => assert( fraction instanceof Fraction ) );

      // Pseudorandom start for the first 4 levels
      const type = ( levelNumber >= 1 && levelNumber <= 4 && isDoingResetGeneration )
        ? resetTypes[ levelNumber - 1 ]
        : phet.joist.random.nextBoolean() ? ChallengeType.PIE : ChallengeType.BAR;

      const representation = type === ChallengeType.PIE ? BuildingRepresentation.PIE : BuildingRepresentation.BAR;
      const targets = targetFractions.map( f => new Target( f ) );
      const shapePieces = pieceFractions.map( f => new ShapePiece( f, representation, color ) );
      return new FractionChallenge( levelNumber, type, hasMixedTargets, targets, shapePieces, [] );
    }

    /**
     * Creates a FractionChallenge for a "Number" level.
     * @public
     *
     * @param {number} levelNumber
     * @param {boolean} hasMixedTargets
     * @param {Array.<ShapeTarget>} shapeTargets
     * @param {Array.<number>} pieceNumbers
     */
    static createNumberChallenge( levelNumber, hasMixedTargets, shapeTargets, pieceNumbers ) {
      assert && assert( typeof levelNumber === 'number' );
      assert && assert( typeof hasMixedTargets === 'boolean' );
      assert && assert( Array.isArray( shapeTargets ) );
      assert && shapeTargets.forEach( shapeTarget => assert( shapeTarget instanceof ShapeTarget ) );
      assert && assert( Array.isArray( pieceNumbers ) );
      assert && pieceNumbers.forEach( pieceNumber => assert( typeof pieceNumber === 'number' ) );

      return new FractionChallenge( levelNumber, ChallengeType.NUMBER, hasMixedTargets, shapeTargets, [], pieceNumbers.map( number => {
        return new NumberPiece( number );
      } ) );
    }
  }

  return fractionsCommon.register( 'FractionChallenge', FractionChallenge );
} );
