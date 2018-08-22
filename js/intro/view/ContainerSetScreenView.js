// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for all intro-based screens that use sets of containers.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/BeakerSceneNode' );
  const CakeSceneNode = require( 'FRACTIONS_COMMON/intro/view/CakeSceneNode' );
  const CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/CircularSceneNode' );
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const FractionWithSpinners = require( 'FRACTIONS_COMMON/intro/view/FractionWithSpinners' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/NumberLineSceneNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/RectangularSceneNode' );
  const Representation = require( 'FRACTIONS_COMMON/common/enum/Representation' );
  const RepresentationPanel = require( 'FRACTIONS_COMMON/intro/view/RepresentationPanel' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Vector2 = require( 'DOT/Vector2' );

  class ContainerSetScreenView extends ScreenView {
    /**
     * @param {ContainerSetModel} model
     */
    constructor( model ) {
      super( {
        preventFit: true
      } );

      // @protected {Node}
      this.representationPanel = new RepresentationPanel( model.representationProperty, model.representations );
      this.addChild( this.representationPanel );

      // @protected {Node}
      this.bucketContainer = new Node();
      this.addChild( this.bucketContainer );

      // @protected {Node}
      this.viewContainer = new Node();
      this.addChild( this.viewContainer );

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
      this.fractionWithSpinners = new FractionWithSpinners( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty );
      this.addChild( this.fractionWithSpinners );

      // @protected {Node}
      this.resetAllButton = new ResetAllButton( {
        listener() {
          model.reset();
        }
      } );
      this.addChild( this.resetAllButton );
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
