// Copyright 2018, University of Colorado Boulder

/**
 * The large horizontal panel at the top of the screen for selecting different representations.
 *
 * @author Martin Veillette (Berea College)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerSceneNode' );
  const CakeSceneNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeSceneNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineSceneNode' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularSceneNode' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );

  class RepresentationRadioButtonGroup extends RadioButtonGroup {
    /**
     * @param {Property.<Representation>} representationProperty
     * @param {Array.<Representation>} - The representations to show
     * @param {Object} [options]
     */
    constructor( representationProperty, representations, options ) {
      super( representationProperty, [
        {
          value: Representation.CIRCLE,
          node: CircularSceneNode.getIcon()
        },
        {
          value: Representation.HORIZONTAL_BAR,
          node: RectangularSceneNode.getIcon( RectangularOrientation.HORIZONTAL )
        },
        {
          value: Representation.VERTICAL_BAR,
          node: RectangularSceneNode.getIcon( RectangularOrientation.VERTICAL )
        },
        {
          value: Representation.BEAKER,
          node: BeakerSceneNode.getIcon()
        },
        {
          value: Representation.CAKE,
          node: CakeSceneNode.getIcon()
        },
        {
          value: Representation.NUMBER_LINE,
          node: NumberLineSceneNode.getIcon()
        }
      ].filter( item => _.includes( representations, item.value ) ), _.extend( {
        orientation: 'horizontal',
        baseColor: 'white',
        spacing: 12,
        buttonContentXMargin: 5,
        buttonContentYMargin: 10
      }, options ) );
    }
  }

  return fractionsCommon.register( 'RepresentationRadioButtonGroup', RepresentationRadioButtonGroup );
} );