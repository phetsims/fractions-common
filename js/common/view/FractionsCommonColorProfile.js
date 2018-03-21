// Copyright 2017, University of Colorado Boulder

/**
 * Colors for the fractions simulations.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );

  // Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
  // tweaks with the top-level files)
  var FractionsCommonColorProfile = new ColorProfile( {
    panelBackground: { default: new Color( 230, 230, 230 ) }
  }, [ 'default' ] );

  fractionsCommon.register( 'FractionsCommonColorProfile', FractionsCommonColorProfile );

  return FractionsCommonColorProfile;
} );
