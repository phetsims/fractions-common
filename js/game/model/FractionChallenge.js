// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @extends {Object}
   *
   * @param {BuildingType} buildingType
   */
  function FractionChallenge( buildingType ) {

    // @public {BuildingType}
    this.buildingType = buildingType;
  }

  fractionsCommon.register( 'FractionChallenge', FractionChallenge );

  return inherit( Object, FractionChallenge );
} );
