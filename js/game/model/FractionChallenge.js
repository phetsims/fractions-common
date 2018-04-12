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
   * @param {BuildingType} interactiveType
   * @param {Array.<Target>} targets
   * @param {Array.<number>} pieces - An array (with duplicates allowed) of the denominators or numbers that are
   *                                  available to the user to interact with.
   */
  function FractionChallenge( interactiveType, targets, pieces ) {

    // @public {BuildingType}
    this.interactiveType = interactiveType;

    // @public {Array.<Target>}
    this.targets = targets;

    // @public {Array.<number>} pieces
    this.pieces = pieces;
  }

  fractionsCommon.register( 'FractionChallenge', FractionChallenge );

  return inherit( Object, FractionChallenge );
} );
