// Copyright 2018-2019, University of Colorado Boulder

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
  const IntroRadioButtonGroup = require( 'FRACTIONS_COMMON/intro/view/IntroRadioButtonGroup' );
  const IntroRepresentation = require( 'FRACTIONS_COMMON/intro/model/IntroRepresentation' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/numberline/NumberLineSceneNode' );
  const Panel = require( 'SUN/Panel' );
  const RectangularOrientation = require( 'FRACTIONS_COMMON/intro/view/RectangularOrientation' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/rectangular/RectangularSceneNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const MARGIN = FractionsCommonConstants.PANEL_MARGIN;

  class ContainerSetScreenView extends ScreenView {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model, options ) {
      super( {
        preventFit: true
      } );

      options = merge( {
        // {boolean} - Passed to AdjustableFractionNode
        spinnersOnRight: true
      }, options );

      // @protected {ContainerSetModel}
      this.model = model;

      // @protected {AlignGroup}
      this.topAlignGroup = new AlignGroup( { matchHorizontal: false } );

      const representationRadioButtonGroup = new IntroRadioButtonGroup( model.representationProperty, [
        {
          value: IntroRepresentation.CIRCLE,
          node: CircularSceneNode.getIcon()
        },
        {
          value: IntroRepresentation.HORIZONTAL_BAR,
          node: RectangularSceneNode.getIcon( RectangularOrientation.HORIZONTAL )
        },
        {
          value: IntroRepresentation.VERTICAL_BAR,
          node: RectangularSceneNode.getIcon( RectangularOrientation.VERTICAL )
        },
        {
          value: IntroRepresentation.BEAKER,
          node: BeakerSceneNode.getIcon()
        },
        {
          value: IntroRepresentation.CAKE,
          node: CakeSceneNode.getIcon()
        },
        {
          value: IntroRepresentation.NUMBER_LINE,
          node: NumberLineSceneNode.getIcon()
        }
      ].filter( item => _.includes( model.representations, item.value ) ) );

      // @protected {Node}
      this.representationPanel = new Panel( new AlignBox( representationRadioButtonGroup, {
        group: this.topAlignGroup
      } ), {
        fill: FractionsCommonColorProfile.introPanelBackgroundProperty,
        xMargin: FractionsCommonConstants.PANEL_MARGIN,
        yMargin: FractionsCommonConstants.PANEL_MARGIN
      } );

      // @protected {Node}
      this.bucketContainer = new Node();
      this.viewContainer = new Node();

      // @private {Node|null} the visual representation of the container set
      this.currentView = null;

      // Returns the current bucket location
      const getBucketLocation = () => {
        assert && assert( this.currentView.bucketNode );
        return this.currentView.bucketNode.getUniqueTrail().getMatrixTo( this.currentView.getUniqueTrail() ).timesVector2( Vector2.ZERO );
      };

      // present for the lifetime of the simulation
      model.representationProperty.link( representation => {
        // Finish all animations
        model.completeAllPieces();

        if ( this.currentView ) {
          this.viewContainer.removeAllChildren();
          this.bucketContainer.removeAllChildren();
          this.currentView.dispose();
        }

        this.currentView = null;

        switch ( representation ) {
          case IntroRepresentation.CIRCLE:
            this.currentView = new CircularSceneNode( model, {
              getBucketLocation: getBucketLocation
            } );
            break;
          case IntroRepresentation.VERTICAL_BAR:
            this.currentView = new RectangularSceneNode( model, {
              getBucketLocation: getBucketLocation,
              rectangularOrientation: RectangularOrientation.VERTICAL
            } );
            break;
          case IntroRepresentation.HORIZONTAL_BAR:
            this.currentView = new RectangularSceneNode( model, {
              getBucketLocation: getBucketLocation,
              rectangularOrientation: RectangularOrientation.HORIZONTAL
            } );
            break;
          case IntroRepresentation.BEAKER:
            this.currentView = new BeakerSceneNode( model, {
              getBucketLocation: getBucketLocation
            } );
            break;
          case IntroRepresentation.CAKE:
            this.currentView = new CakeSceneNode( model, {
              getBucketLocation: getBucketLocation
            } );
            break;
          case IntroRepresentation.NUMBER_LINE:
            this.currentView = new NumberLineSceneNode( model );
            break;
          default:
            // Don't have a current view. May happen on startup
        }
        if ( this.currentView ) {
          // add the chosen visual representation to the scene graph
          this.viewContainer.addChild( this.currentView );
          if ( this.currentView.pieceLayer ) {
            this.viewContainer.addChild( this.currentView.pieceLayer );
          }
          if ( this.currentView.bucketNode ) {
            this.bucketContainer.addChild( this.currentView.bucketNode );
          }
        }
      } );

      // @protected {Node}
      this.adjustableFractionNode = new AdjustableFractionNode( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty, {
        spinnersOnRight: options.spinnersOnRight
      } );

      // @protected {Node}
      this.resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput();
          model.reset();
        },
        right: this.layoutBounds.right - MARGIN,
        bottom: this.layoutBounds.bottom - MARGIN
      } );

      this.children = [
        this.representationPanel,
        this.adjustableFractionNode,
        this.resetAllButton,
        this.bucketContainer,
        this.viewContainer
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
