// Copyright 2018, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  var ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  var StackNodesBox = require( 'FRACTIONS_COMMON/building/view/StackNodesBox' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {BuildingLabModel} model
   * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
   */
  function LabShapePanel( model, pressCallback ) {
    var self = this;

    function createBox( representation ) {
      var stacks = model.shapeStacks.filter( function( shapeStack ) {
        return shapeStack.representation === representation;
      } );
      var groupStacks = model.shapeGroupStacks.filter( function( shapeGroupStack ) {
        return shapeGroupStack.representation === representation;
      } );
      return new StackNodesBox( stacks.concat( groupStacks ), pressCallback, {
        // TODO: Is there a better way where this is not needed or hardcoded?
        maxHeightOverride: 113,

        padding: 37
      } );
    }

    // @private {StackNodesBox}
    this.circleBox = createBox( BuildingRepresentation.PIE );
    this.barBox = createBox( BuildingRepresentation.BAR );

    var boxContainer = new Node( {
      children: [
        this.circleBox,
        this.barBox
      ]
    } );

    // @private {Property.<BuildingRepresentation>}
    this.representationProperty = model.topRepresentationProperty;

    // TODO: Move all this code out to a named panel?
    var representationSelectionNode = new MutableOptionsNode( RadioButtonGroup, [ this.representationProperty, [
      {
        value: BuildingRepresentation.PIE,
        node: new ShapePieceNode( new ShapePiece( Fraction.ONE, BuildingRepresentation.PIE, FractionsCommonColorProfile.labCircleFillProperty ), {
          scale: 0.3
        } )
      },
      {
        value: BuildingRepresentation.BAR,
        node: new ShapePieceNode( new ShapePiece( Fraction.ONE, BuildingRepresentation.BAR, FractionsCommonColorProfile.labBarFillProperty ), {
          scale: 0.3
        } )
      }
    ] ], _.extend( {
      orientation: 'vertical',
      buttonContentXMargin: 6,
      buttonContentYMargin: 6,
      selectedLineWidth: 2,
      touchAreaXDilation: 5,
      touchAreaYDilation: 2.5,
      spacing: 5
    } ), {
      selectedStroke: FractionsCommonColorProfile.radioStrokeProperty,
      baseColor: FractionsCommonColorProfile.radioBaseProperty
    } );

    var shapeBox = new HBox( {
      spacing: 20,
      children: [ new AlignBox( representationSelectionNode, {
        rightMargin: 10
      } ) ].concat( [ boxContainer ] )
    } );
    this.representationProperty.link( function( representation ) {
      self.circleBox.visible = representation === BuildingRepresentation.PIE;
      self.barBox.visible = representation === BuildingRepresentation.BAR;
    } );

    // TODO: background color customizable
    Panel.call( this, shapeBox, {
      xMargin: 15
    } );
  }

  fractionsCommon.register( 'LabShapePanel', LabShapePanel );

  return inherit( Panel, LabShapePanel, {
    // TODO: doc ---- and when to call? Can we call it when our representationProperty changes?
    updateModelLocations: function( modelViewTransform ) {
      this.circleBox.updateModelLocations( modelViewTransform, this );
      this.barBox.updateModelLocations( modelViewTransform, this );
    }
  } );
} );
