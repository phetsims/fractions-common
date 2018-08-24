// Copyright 2018, University of Colorado Boulder

/**
 * ScreenView for all intro-based screens that use sets of containers.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AdjustableFractionNode = require( 'FRACTIONS_COMMON/intro/view/AdjustableFractionNode' );
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/BeakerSceneNode' );
  const CakeSceneNode = require( 'FRACTIONS_COMMON/intro/view/CakeSceneNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/CircularSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/NumberLineSceneNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Panel = require( 'SUN/Panel' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/RectangularSceneNode' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const RepresentationRadioButtonGroup = require( 'FRACTIONS_COMMON/intro/view/RepresentationRadioButtonGroup' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class ContainerSetScreenView extends ScreenView {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model ) {
      super( {
        preventFit: true
      } );

      // @protected {ContainerSetModel}
      this.model = model;

      // @protected {AlignGroup}
      this.topAlignGroup = new AlignGroup( { matchHorizontal: false } );

      const representationPanel = new Panel( new AlignBox( new RepresentationRadioButtonGroup( model.representationProperty, model.representations ), {
        group: this.topAlignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        xMargin: 10,
        yMargin: 10
      } );

      const bucketContainer = new Node();
      const viewContainer = new Node();

      this.addChild( representationPanel );
      this.addChild( bucketContainer );
      this.addChild( viewContainer );

      // @private {Node|null} the visual representation of the container set
      this.currentView = null;

      // present for the lifetime of the simulation
      model.representationProperty.link( representation => {
        // Finish all animations
        model.completeAllPieces();

        if ( this.currentView ) {
          viewContainer.removeAllChildren();
          bucketContainer.removeAllChildren();
          this.currentView.dispose();
        }

        // TODO: fractor out, clearn erp
        const getBucketLocation = () => {
          assert && assert( this.currentView.bucketNode );
          return this.currentView.bucketNode.getUniqueTrail().getMatrixTo( this.currentView.getUniqueTrail() ).timesVector2( Vector2.ZERO );
        };

        // Should this be a switch statement? TODO: yes. cleanup
        this.currentView = null;
        if ( representation === Representation.CIRCLE ) {
          this.currentView = new CircularSceneNode( model, getBucketLocation, {
            verticalOffset: 10
          } );
        }
        else if ( representation === Representation.VERTICAL_BAR ) {
          this.currentView = new RectangularSceneNode( model, getBucketLocation, {
            rectangleOrientation: 'vertical'
          } );
        }
        else if ( representation === Representation.HORIZONTAL_BAR ) {
          this.currentView = new RectangularSceneNode( model, getBucketLocation, {
            rectangleOrientation: 'horizontal',
            maxHorizontalContainers: 3,
            verticalOffset: 40
          } );
        }
        else if ( representation === Representation.BEAKER ) {
          this.currentView = new BeakerSceneNode( model, getBucketLocation );
        }
        else if ( representation === Representation.CAKE ) {
          this.currentView = new CakeSceneNode( model, getBucketLocation, {
            verticalOffset: 30,
            horizontalSpacing: -20
          } );
        }
        else if ( representation === Representation.NUMBER_LINE ) {

          // TODO: find a more general way to lay out the numberLine than reversing the action of the container
          this.currentView = new NumberLineSceneNode(
            model.numeratorProperty,
            model.denominatorProperty,
            model.containerCountProperty,
            new NumberProperty( 1 ), { x: 25 - this.layoutBounds.centerX, y: 60 }
          );
        }
        if ( this.currentView ) {
          // add the chosen visual representation to the scene graph
          viewContainer.addChild( this.currentView );
          if ( this.currentView.pieceLayer ) {
            // TODO: egad, why are we doing this? Also when do pieces need to be behind?
            viewContainer.addChild( this.currentView.pieceLayer );
          }
          if ( this.currentView.bucketNode ) {
            bucketContainer.addChild( this.currentView.bucketNode );
          }
        }
      } );

      this.addChild( new AlignBox( new AdjustableFractionNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty ), {
        alignBounds: this.layoutBounds,
        xAlign: 'right',
        margin: MARGIN
      } ) );

      // @protected {Node}
      this.resetAllButton = new ResetAllButton( {
        listener() {
          model.reset();
        },
        right: this.layoutBounds.right - MARGIN,
        bottom: this.layoutBounds.bottom - MARGIN
      } );
      this.addChild( this.resetAllButton );

      // Layout
      this.layoutRepresentationPanel( representationPanel );
      this.layoutViewContainer( viewContainer, representationPanel );
      bucketContainer.translation = new Vector2( representationPanel.centerX, this.layoutBounds.bottom - 120 );
    }

    /**
     * Steps forward in time.
     *
     * @param {number} dt - time step
     * @public
     */
    step( dt ) {
      this.currentView.step( dt );
    }

    /**
     * Subclasses should position the representation panel properly.
     * @protected
     *
     * @param {Node} representationPanel
     */
    layoutRepresentationPanel( representationPanel ) {
      throw new Error( 'abstract' );
    }

    /**
     * Subclasses should position the view container properly.
     * @protected
     *
     * @param {Node} viewContainer
     * @param {Node} representationPanel
     */
    layoutViewContainer( viewContainer, representationPanel ) {
      throw new Error( 'abstract' );
    }
  }

  return fractionsCommon.register( 'ContainerSetScreenView', ContainerSetScreenView );
} );
