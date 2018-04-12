// Copyright 2017, University of Colorado Boulder

/**
 * Model for game screens where the objective is to build specific fractions.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  var FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {boolean} hasMixedNumbers - Whether this is the equivalent of the "Build a Fraction" or "Mixed Numbers" game
   */
  function BuildingGameModel( hasMixedNumbers ) {

    // @public {boolean}
    this.hasMixedNumbers = hasMixedNumbers;

    // @public {Property.<FractionLevel|null>}
    this.levelProperty = new Property( null );

    // @public {Property.<boolean>}
    this.soundEnabledProperty = new BooleanProperty( true );

    // @public {FractionLevel}
    this.shapeLevels = [
      new FractionLevel( 1, 3, BuildingType.SHAPE ),
      new FractionLevel( 2, 3, BuildingType.SHAPE ),
      new FractionLevel( 3, 3, BuildingType.SHAPE ),
      new FractionLevel( 4, 3, BuildingType.SHAPE ),
      new FractionLevel( 5, 3, BuildingType.SHAPE ),
      new FractionLevel( 6, 4, BuildingType.SHAPE ),
      new FractionLevel( 7, 4, BuildingType.SHAPE ),
      new FractionLevel( 8, 4, BuildingType.SHAPE ),
      new FractionLevel( 9, 4, BuildingType.SHAPE ),
      new FractionLevel( 10, 4, BuildingType.SHAPE )
    ];

    // @public {FractionLevel}
    this.numberLevels = [
      new FractionLevel( 1, 3, BuildingType.NUMBER ),
      new FractionLevel( 2, 3, BuildingType.NUMBER ),
      new FractionLevel( 3, 3, BuildingType.NUMBER ),
      new FractionLevel( 4, 3, BuildingType.NUMBER ),
      new FractionLevel( 5, 3, BuildingType.NUMBER ),
      new FractionLevel( 6, 4, BuildingType.NUMBER ),
      new FractionLevel( 7, 4, BuildingType.NUMBER ),
      new FractionLevel( 8, 4, BuildingType.NUMBER ),
      new FractionLevel( 9, 4, BuildingType.NUMBER ),
      new FractionLevel( 10, 4, BuildingType.NUMBER )
    ];
  }

  fractionsCommon.register( 'BuildingGameModel', BuildingGameModel );

  return inherit( Object, BuildingGameModel, {
    reset: function() {

    },

    step: function( dt ) {
      
    }
  } );
} );
