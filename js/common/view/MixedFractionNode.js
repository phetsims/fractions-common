// Copyright 2018, University of Colorado Boulder

/**
 * Capable of displaying a mixed-fraction display with three spots
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const fractionsCommon = require( 'FRACTIONS_COMMON/fractionsCommon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class MixedFractionNode extends HBox {
    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      super( {
        spacing: 5
      } );

      options = _.extend( {
        // {number|null} - Empty if null
        whole: null,
        numerator: null,
        denominator: null
      }, options );

      // @private {Text}
      this.wholeText = new Text( '1', {
        font: new PhetFont( 50 )
      } );
      this.numeratorText = new Text( '1', {
        font: new PhetFont( 30 )
      } );
      this.denominatorText = new Text( '1', {
        font: new PhetFont( 30 )
      } );

      // @private {Line}
      this.lineNode = new Line( 0, 0, 10, 0, {
        stroke: 'black',
        lineWidth: 2
      } );

      // @private {VBox}
      this.vbox = new VBox( {
        children: [ this.numeratorText, this.lineNode, this.denominatorText ],
        spacing: 1
      } );

      // @private {number|null}
      this._whole = options.whole;
      this._numerator = options.numerator;
      this._denominator = options.denominator;

      this.update();
    }

    /**
     * Updates the view of the fraction when something changes.
     * @private
     */
    update() {
      const hasWhole = this._whole !== null;
      const hasNumerator = this._numerator !== null;
      const hasDenominator = this._denominator !== null;

      this.children = [
        ...( hasWhole ? [ this.wholeText ] : [] ),
        ...( hasNumerator || hasDenominator ? [ this.vbox ] : [] )
      ];
      this.wholeText.text = hasWhole ? this._whole : ' ';
      this.numeratorText.text = hasNumerator ? this._numerator : ' ';
      this.denominatorText.text = hasDenominator ? this._denominator : ' ';

      this.lineNode.x2 = Math.max( this.numeratorText.width, this.denominatorText.width ) + 2;
    }

    /**
     * Sets the whole-number part of the mixed fraction.
     * @public
     *
     * @param {number|null} value
     */
    set whole( value ) {
      if ( this._whole !== value ) {
        this._whole = value;

        this.update();
      }
    }

    /**
     * Returns the current whole-number part of the the mixed fraction.
     * @public
     *
     * @returns {number|null}
     */
    get whole() {
      return this._whole;
    }

    /**
     * Sets the numerator part of the mixed fraction.
     * @public
     *
     * @param {number|null} value
     */
    set numerator( value ) {
      if ( this._numerator !== value ) {
        this._numerator = value;

        this.update();
      }
    }

    /**
     * Returns the current numerator part of the the mixed fraction.
     * @public
     *
     * @returns {number|null}
     */
    get numerator() {
      return this._numerator;
    }

    /**
     * Sets the denominator part of the mixed fraction.
     * @public
     *
     * @param {number|null} value
     */
    set denominator( value ) {
      if ( this._denominator !== value ) {
        this._denominator = value;

        this.update();
      }
    }

    /**
     * Returns the current denominator part of the the mixed fraction.
     * @public
     *
     * @returns {number|null}
     */
    get denominator() {
      return this._denominator;
    }
  }

  return fractionsCommon.register( 'MixedFractionNode', MixedFractionNode );
} );
