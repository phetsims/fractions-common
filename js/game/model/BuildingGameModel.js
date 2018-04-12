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
  var FractionLevel = require( 'FRACTIONS_COMMON/game/model/FractionLevel' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   * @extends {Object}
   */
  function BuildingGameModel() {

    // @public {Property.<FractionLevel|null>}
    this.levelProperty = new Property( null );

    // @public {Property.<boolean>}
    this.soundEnabledProperty = new BooleanProperty( true );

    // @public {FractionLevel}
    this.shapeLevels = [
      new FractionLevel( 1, 3 ),
      new FractionLevel( 2, 3 ),
      new FractionLevel( 3, 3 ),
      new FractionLevel( 4, 3 ),
      new FractionLevel( 5, 3 ),
      new FractionLevel( 6, 4 ),
      new FractionLevel( 7, 4 ),
      new FractionLevel( 8, 4 ),
      new FractionLevel( 9, 4 ),
      new FractionLevel( 10, 4 )
    ];

    // @public {FractionLevel}
    this.numberLevels = [
      new FractionLevel( 1, 3 ),
      new FractionLevel( 2, 3 ),
      new FractionLevel( 3, 3 ),
      new FractionLevel( 4, 3 ),
      new FractionLevel( 5, 3 ),
      new FractionLevel( 6, 4 ),
      new FractionLevel( 7, 4 ),
      new FractionLevel( 8, 4 ),
      new FractionLevel( 9, 4 ),
      new FractionLevel( 10, 4 )
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
