// Copyright 2018, University of Colorado Boulder

/**
 * Capable of displaying a mixed-fraction display with three spots
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Bounds2 = require( 'DOT/Bounds2' );
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
        denominator: null,

        // {number|null} - If provided, it will ensure that spacing is provided from 0 up to the specified number for
        // that slot
        maxWhole: null,
        maxNumerator: null,
        maxDenominator: null,

        // {ColorDef}
        wholeFill: 'black',
        numeratorFill: 'black',
        denominatorFill: 'black',
        separatorFill: 'black'
      }, options );

      // @private {Text}
      this.wholeText = new Text( '1', {
        font: new PhetFont( 50 ),
        fill: options.wholeFill
      } );
      this.numeratorText = new Text( '1', {
        font: new PhetFont( 30 ),
        fill: options.numeratorFill
      } );
      this.denominatorText = new Text( '1', {
        font: new PhetFont( 30 ),
        fill: options.denominatorFill
      } );

      const maxTextBounds = ( textNode, maxNumber ) => {
        return _.reduce( _.range( 0, maxNumber + 1 ), ( bounds, number ) => {
          textNode.text = number;
          return bounds.union( textNode.bounds );
        }, Bounds2.NOTHING );
      };

      // @private {Node}
      this.wholeContainer = options.maxWhole ? new AlignBox( this.wholeText, {
        alignBounds: maxTextBounds( this.wholeText, options.maxWhole )
      } ) : this.wholeText;
      this.numeratorContainer = options.maxNumerator ? new AlignBox( this.numeratorText, {
        alignBounds: maxTextBounds( this.numeratorText, options.maxNumerator )
      } ) : this.numeratorText;
      this.denominatorContainer = options.maxDenominator ? new AlignBox( this.denominatorText, {
        alignBounds: maxTextBounds( this.denominatorText, options.maxDenominator )
      } ) : this.denominatorText;

      // @private {Line}
      this.vinculumNode = new Line( 0, 0, 10, 0, {
        stroke: options.separatorFill,
        lineWidth: 2
      } );

      // @private {VBox}
      this.vbox = new VBox( {
        children: [ this.numeratorContainer, this.vinculumNode, this.denominatorContainer ],
        spacing: 1
      } );

      // @private {number|null}
      this._whole = options.whole;
      this._numerator = options.numerator;
      this._denominator = options.denominator;

      this.update();

      this.mutate( options );
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
        ...( hasWhole ? [ this.wholeContainer ] : [] ),
        ...( hasNumerator || hasDenominator ? [ this.vbox ] : [] )
      ];
      this.wholeText.text = hasWhole ? this._whole : ' ';
      this.numeratorText.text = hasNumerator ? this._numerator : ' ';
      this.denominatorText.text = hasDenominator ? this._denominator : ' ';

      this.vinculumNode.x2 = Math.max( this.numeratorContainer.width, this.denominatorContainer.width ) + 2;
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
     * Returns the current whole-number part of the mixed fraction.
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
     * Returns the current numerator part of the mixed fraction.
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
     * Returns the current denominator part of the mixed fraction.
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
