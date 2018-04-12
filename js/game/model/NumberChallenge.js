// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildingType = require( 'FRACTIONS_COMMON/building/enum/BuildingType' );
  var FractionChallenge = require( 'FRACTIONS_COMMON/game/model/FractionChallenge' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {FractionChallenge}
   */
  function NumberChallenge() {
    FractionChallenge.call( this, BuildingType.SHAPE );
  }

  fractionsCommon.register( 'NumberChallenge', NumberChallenge );

  return inherit( FractionChallenge, NumberChallenge );
} );
