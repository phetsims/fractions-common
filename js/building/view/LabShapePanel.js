// Copyright 2018, University of Colorado Boulder

/**
 * The top panel on the Lab screen which is two StackNodesBoxes and a toggle on the left to switch between them.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const BuildingRepresentation = require( 'FRACTIONS_COMMON/building/enum/BuildingRepresentation' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const ShapePiece = require( 'FRACTIONS_COMMON/building/model/ShapePiece' );
  const ShapePieceNode = require( 'FRACTIONS_COMMON/building/view/ShapePieceNode' );
  const StackNodesBox = require( 'FRACTIONS_COMMON/building/view/StackNodesBox' );

  class LabShapePanel extends Panel {
    /**
     * NOTE: Adds permanent listeners, will leak if created many times.
     *
     * @param {BuildingLabModel} model
     * @param {function} pressCallback - function( {Event}, {Stack} ) - Called when a press is started.
     */
    constructor( model, pressCallback ) {
      const shapeBox = new HBox( {
        spacing: 20
      } );

      super( shapeBox, {
        xMargin: 15
      } );

      const createBox = representation => {
        const stacks = model.shapeStacks.filter( shapeStack => {
          return shapeStack.representation === representation;
        } );
        const groupStacks = model.shapeGroupStacks.filter( shapeGroupStack => {
          return shapeGroupStack.representation === representation;
        } );
        return new StackNodesBox( stacks.concat( groupStacks ), pressCallback, {
          // TODO: Is there a better way where this is not needed or hardcoded?
          maxHeightOverride: 113,

          padding: 37
        } );
      };

      // @private {StackNodesBox}
      this.circleBox = createBox( BuildingRepresentation.PIE );
      this.barBox = createBox( BuildingRepresentation.BAR );

      const boxContainer = new Node( {
        children: [
          this.circleBox,
          this.barBox
        ]
      } );

      // @private {Property.<BuildingRepresentation>}
      this.representationProperty = model.topRepresentationProperty;

      // TODO: Move all this code out to a named panel?
      const representationSelectionNode = new MutableOptionsNode( RadioButtonGroup, [ this.representationProperty, [
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

      shapeBox.children = [
        new AlignBox( representationSelectionNode, {
          rightMargin: 10
        } ),
        boxContainer
      ];

      this.representationProperty.link( representation => {
        this.circleBox.visible = representation === BuildingRepresentation.PIE;
        this.barBox.visible = representation === BuildingRepresentation.BAR;
      } );
    }

    /**
     * Sets the model positions of our model objects corresponding to their displayed (view) positions.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     */
    updateModelLocations( modelViewTransform ) {
      this.circleBox.updateModelLocations( modelViewTransform, this );
      this.barBox.updateModelLocations( modelViewTransform, this );
    }
  }

  return fractionsCommon.register( 'LabShapePanel', LabShapePanel );
} );
