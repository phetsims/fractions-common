// Copyright 2017, University of Colorado Boulder

/**
 * Scenery Node that displays a spinner with the label 'Max' and displays the max number
 *
 * @author Vincent Davis (Berea College)
 */

define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroConstants = require( 'FRACTIONS_COMMON/intro/IntroConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RoundSpinner = require( 'FRACTIONS_COMMON/intro/view/RoundSpinner' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var representationMaxString = require( 'string!FRACTIONS_COMMON/representationMax' );

  /**
   * @extends {Node}
   *
   * @param {Property.<number>} containerCountProperty
   * @param {Object} [options]
   * @constructor
   */
  function MaxSpinner( containerCountProperty, options ) {

    options = _.extend( {
      font: new PhetFont( 24 ),
      radius: 15, // radius of the button
      spacing: 3 // spacing for spinner
    }, options );

    var maxUpEnabledProperty = new DerivedProperty( [ containerCountProperty ],
      function( maxNumberOfUnits ) {
        return maxNumberOfUnits < IntroConstants.MAX_RANGE.max;
      } );
    var maxDownEnabledProperty = new DerivedProperty( [ containerCountProperty ],
      function( maxNumberOfUnits ) {
        return maxNumberOfUnits > IntroConstants.MAX_RANGE.min;
      } );

    var maxUpButtonListener = function() {containerCountProperty.value++;};
    var maxDownButtonListener = function() {containerCountProperty.value--;};

    // creates spinner that is linked to the containerCountProperty
    var maxValueSpinner = new RoundSpinner( maxUpButtonListener, maxDownButtonListener,
      maxUpEnabledProperty, maxDownEnabledProperty, {
        radius: options.radius,
        spacing: options.spacing
      } );

    // creates the maxValueText
    var maxValueText = new Text( containerCountProperty.value, { font: options.font } );

    containerCountProperty.link( function( value ) {
      maxValueText.text = value;

      // moves maxValueText to the right of the maxValueSpinner
      maxValueText.right = maxValueSpinner.left - 10;

      // centers maxValueText vertically with maxValueSpinner
      maxValueText.centerY = maxValueSpinner.centerY;
    } );

    var maxLabelText = new Text( representationMaxString, {
      font: options.font,
      bottom: maxValueSpinner.top,
      left: maxValueText.left
    } );

    // Specify the children to be rendered with this node
    options.children = [ maxValueSpinner, maxValueText, maxLabelText ];
    Node.call( this, options );
  }

  fractionsCommon.register( 'MaxSpinner', MaxSpinner );

  return inherit( Node, MaxSpinner );
} );