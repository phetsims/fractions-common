// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for all intro-based screens that use sets of containers.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var BeakerSceneNode = require( 'FRACTIONS_COMMON/intro/view/BeakerSceneNode' );
  var CakeSceneNode = require( 'FRACTIONS_COMMON/intro/view/CakeSceneNode' );
  var CircularSceneNode = require( 'FRACTIONS_COMMON/intro/view/CircularSceneNode' );
  var fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  var FractionWithSpinners = require( 'FRACTIONS_COMMON/intro/view/FractionWithSpinners' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberLineSceneNode = require( 'FRACTIONS_COMMON/intro/view/NumberLineSceneNode' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var RectangularSceneNode = require( 'FRACTIONS_COMMON/intro/view/RectangularSceneNode' );
  var Representation = require( 'FRACTIONS_COMMON/intro/model/Representation' );
  var RepresentationPanel = require( 'FRACTIONS_COMMON/intro/view/RepresentationPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {ContainerSetModel} model
   */
  function ContainerSetScreenView( model ) {

    var self = this;

    ScreenView.call( this, {
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
    model.representationProperty.link( function( representation ) {
      // Finish all animations
      model.completeAllPieces();

      if ( self.currentView ) {
        self.viewContainer.removeAllChildren();
        self.bucketContainer.removeAllChildren();
        self.currentView.dispose();
      }

      // TODO: fractor out, clearn erp
      function getBucketLocation() {
        assert && assert( self.currentView.bucketNode );
        return self.currentView.bucketNode.getUniqueTrail().getMatrixTo( self.currentView.getUniqueTrail() ).timesVector2( Vector2.ZERO );
      }

      // Should this be a switch statement? TODO: yes. cleanup
      self.currentView = null;
      if ( representation === Representation.CIRCLE ) {
        self.currentView = new CircularSceneNode( model, getBucketLocation, {
          verticalOffset: 10
        } );
      }
      else if ( representation === Representation.VERTICAL_BAR ) {
        self.currentView = new RectangularSceneNode( model, getBucketLocation, {
          rectangleOrientation: 'vertical'
        } );
      }
      else if ( representation === Representation.HORIZONTAL_BAR ) {
        self.currentView = new RectangularSceneNode( model, getBucketLocation, {
          rectangleOrientation: 'horizontal',
          maxHorizontalContainers: 3,
          verticalOffset: 40
        } );
      }
      else if ( representation === Representation.BEAKER ) {
        self.currentView = new BeakerSceneNode( model, getBucketLocation );
      }
      else if ( representation === Representation.CAKE ) {
        self.currentView = new CakeSceneNode( model, getBucketLocation, {
          verticalOffset: 30,
          horizontalSpacing: -20
        } );
      }
      else if ( representation === Representation.NUMBER_LINE ) {

        // TODO: find a more general way to lay out the numberLine than reversing the action of the container
        self.currentView = new NumberLineSceneNode(
          model.numeratorProperty,
          model.denominatorProperty,
          model.containerCountProperty,
          new NumberProperty( 1 ), { x: 25 - self.layoutBounds.centerX, y: 60 }
        );
      }
      if ( self.currentView ) {
        // add the chosen visual representation to the scene graph
        self.viewContainer.addChild( self.currentView );
        if ( self.currentView.pieceLayer ) {
          // TODO: egad, why are we doing this? Also when do pieces need to be behind?
          self.viewContainer.addChild( self.currentView.pieceLayer );
        }
        if ( self.currentView.bucketNode ) {
          self.bucketContainer.addChild( self.currentView.bucketNode );
        }
      }
    } );

    // @protected {Node}
    this.fractionWithSpinners = new FractionWithSpinners( model.numeratorProperty, model.denominatorProperty, model.containerCountProperty );
    this.addChild( this.fractionWithSpinners );

    // @protected {Node}
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );
    this.addChild( this.resetAllButton );
  }

  fractionsCommon.register( 'ContainerSetScreenView', ContainerSetScreenView );

  return inherit( ScreenView, ContainerSetScreenView, {
    /**
     * Steps forward in time.
     *
     * @param {number} dt - time step
     * @public
     */
    step: function( dt ) {
      this.currentView.step( dt );
    }
  } );
} );
