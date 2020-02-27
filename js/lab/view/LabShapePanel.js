// Copyright 2018-2019, University of Colorado Boulder

/**
 * The top panel on the Lab screen which is two StackNodesBoxes and a toggle on the left to switch between them.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Fraction from '../../../../phetcommon/js/model/Fraction.js';
import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import BuildingRepresentation from '../../building/model/BuildingRepresentation.js';
import ShapePiece from '../../building/model/ShapePiece.js';
import ShapePieceNode from '../../building/view/ShapePieceNode.js';
import StackNodesBox from '../../building/view/StackNodesBox.js';
import FractionsCommonColorProfile from '../../common/view/FractionsCommonColorProfile.js';
import fractionsCommon from '../../fractionsCommon.js';

class LabShapePanel extends Panel {
  /**
   * NOTE: Adds permanent listeners, will leak if created many times.
   *
   * @param {BuildingLabModel} model
   * @param {function} pressCallback - function( {SceneryEvent}, {Stack} ) - Called when a press is started.
   */
  constructor( model, pressCallback ) {
    const shapeBox = new HBox( {
      spacing: 20
    } );

    super( shapeBox, {
      xMargin: 15,
      yMargin: 10
    } );

    const boxAlignGroup = new AlignGroup();

    const createBox = representation => {
      const stacks = model.shapeStacks.filter( shapeStack => {
        return shapeStack.representation === representation;
      } );
      const groupStacks = model.shapeGroupStacks.filter( shapeGroupStack => {
        return shapeGroupStack.representation === representation;
      } );
      return new StackNodesBox( stacks.concat( groupStacks ), pressCallback, {
        padding: 37
      } );
    };

    // @private {StackNodesBox}
    this.pieBox = createBox( BuildingRepresentation.PIE );
    this.barBox = createBox( BuildingRepresentation.BAR );

    const boxContainer = new Node( {
      children: [
        new AlignBox( this.pieBox, { group: boxAlignGroup } ),
        new AlignBox( this.barBox, { group: boxAlignGroup } )
      ]
    } );

    // @private {Property.<BuildingRepresentation>}
    this.representationProperty = model.topRepresentationProperty;

    const representationSelectionNode = new RadioButtonGroup( this.representationProperty, [
      {
        value: BuildingRepresentation.PIE,
        node: new ShapePieceNode( new ShapePiece( Fraction.ONE, BuildingRepresentation.PIE, FractionsCommonColorProfile.labPieFillProperty ), {
          scale: 0.3
        } )
      },
      {
        value: BuildingRepresentation.BAR,
        node: new ShapePieceNode( new ShapePiece( Fraction.ONE, BuildingRepresentation.BAR, FractionsCommonColorProfile.labBarFillProperty ), {
          scale: 0.3
        } )
      }
    ], {
      orientation: 'vertical',
      buttonContentXMargin: 6,
      buttonContentYMargin: 6,
      selectedLineWidth: 2,
      touchAreaXDilation: 5,
      touchAreaYDilation: 2.5,
      spacing: 5,
      selectedStroke: FractionsCommonColorProfile.radioStrokeProperty,
      baseColor: FractionsCommonColorProfile.radioBaseProperty
    } );

    shapeBox.children = [
      new AlignBox( representationSelectionNode, {
        rightMargin: 10
      } ),
      boxContainer
    ];

    // Does not need an unlink, since this type is permanent.
    this.representationProperty.link( representation => {
      this.pieBox.visible = representation === BuildingRepresentation.PIE;
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
    this.pieBox.updateModelLocations( modelViewTransform, this );
    this.barBox.updateModelLocations( modelViewTransform, this );
  }
}

fractionsCommon.register( 'LabShapePanel', LabShapePanel );
export default LabShapePanel;