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
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/beaker/BeakerSceneNode' );
  const CakeSceneNode = require( 'FRACTIONS_COMMON/intro/view/cake/CakeSceneNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/circular/CircularSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionsCommonColorProfile = require( 'FRACTIONS_COMMON/common/view/FractionsCommonColorProfile' );
  const FractionsCommonConstants = require( 'FRACTIONS_COMMON/common/FractionsCommonConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineSceneNode' );
  const Panel = require( 'SUN/Panel' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/enum/RectangularOrientation' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularSceneNode' );
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

      // @protected {Node}
      this.representationPanel = new Panel( new AlignBox( new RepresentationRadioButtonGroup( model.representationProperty, model.representations ), {
        group: this.topAlignGroup
      } ), {
        fill: FractionsCommonColorProfile.panelBackgroundProperty,
        xMargin: 10,
        yMargin: 10
      } );

      // @protected {Node}
      this.bucketContainer = new Node();
      this.viewContainer = new Node();

      // @private {Node|null} the visual representation of the container set
      this.currentView = null;

      // present for the lifetime of the simulation
      model.representationProperty.link( representation => {
        // Finish all animations
        model.completeAllPieces();

        if ( this.currentView ) {
          this.viewContainer.removeAllChildren();
          this.bucketContainer.removeAllChildren();
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
          this.currentView = new CircularSceneNode( model, {
            getBucketLocation
          } );
        }
        else if ( representation === Representation.VERTICAL_BAR ) {
          this.currentView = new RectangularSceneNode( model, {
            getBucketLocation,
            rectangularOrientation: RectangularOrientation.VERTICAL
          } );
        }
        else if ( representation === Representation.HORIZONTAL_BAR ) {
          this.currentView = new RectangularSceneNode( model, {
            getBucketLocation,
            rectangularOrientation: RectangularOrientation.HORIZONTAL
          } );
        }
        else if ( representation === Representation.BEAKER ) {
          this.currentView = new BeakerSceneNode( model, {
            getBucketLocation
          } );
        }
        else if ( representation === Representation.CAKE ) {
          this.currentView = new CakeSceneNode( model, {
            getBucketLocation
          } );
        }
        else if ( representation === Representation.NUMBER_LINE ) {
          this.currentView = new NumberLineSceneNode( model );
        }
        if ( this.currentView ) {
          // add the chosen visual representation to the scene graph
          this.viewContainer.addChild( this.currentView );
          if ( this.currentView.pieceLayer ) {
            // TODO: egad, why are we doing this? Also when do pieces need to be behind?
            this.viewContainer.addChild( this.currentView.pieceLayer );
          }
          if ( this.currentView.bucketNode ) {
            this.bucketContainer.addChild( this.currentView.bucketNode );
          }
        }
      } );

      // @protected {Node}
      this.adjustableFractionNode = new AdjustableFractionNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty );

      // @protected {Node}
      this.resetAllButton = new ResetAllButton( {
        listener() {
          model.reset();
        },
        right: this.layoutBounds.right - MARGIN,
        bottom: this.layoutBounds.bottom - MARGIN
      } );

      this.children = [
        this.representationPanel,
        this.bucketContainer,
        this.viewContainer,
        this.adjustableFractionNode,
        this.resetAllButton
      ];
    }

    /**
     * Sets up the initial layout of the screen view. Should be done once all initialization is complete.
     * @protected
     */
    initializeLayout() {

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
  }

  return fractionsCommon.register( 'ContainerSetScreenView', ContainerSetScreenView );
} );
