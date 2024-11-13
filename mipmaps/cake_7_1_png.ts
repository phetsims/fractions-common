/* eslint-disable */
/* @formatter:off */

import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,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' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAIvSURBVO3BT0hTcQAH8O/v93vb29zb9DBCG4JNnEkQ/bUaSYOEFLM8FNGlQwiZmIcuwfpzCqFDEqijKII6WIdO0UEyunQosqJAdDa0RCH/lIc1/2xv7/0qgghyb4vJfA9+nw8EQRB+aWxsqEeeKEzo7r07ZYuLiVbkicKEBsfuXwh2FgWRJwqTab/RdLx0s62+ZIMzOT35RUIeCEyk/dTJXfj2sZuEbHXFATcoZTNaEi+/vlNu3u569BT/icEEIr09Pv/yfESJz3a5dR6AXwb9riH+YE5ZsaVrHAH1RLClsq66YuunD6/GppAjhnU0PBqVyehQ99LIUI9C9X2MEhk/8e1O8IU0lM86iqY0pN8nWFxSK101esuOgwHpzcDEC+SAYJ2crQ9eVrSV0zLVKggh+FvyqBv68BKc4xr+4MCsRwUPeVI2qlyPnBsMIwuCAjtzKNTmTsU7ZKJtoZRgVRy/EfxjTlbhOOZdno+y1v5rz/thgKCA9lf5H5fLWpPEGEUGOjg458iEgIAcLsbMs/jI1d6He/bW1iaQAUEBbStRovZUohprRPNV3Xobi7UhAwoL45wrMEBhYZpsj8EAhUWpHLyhuXkABigsSvL6Fi5euvIaBhgKqNRh72Bayos1oNtdk53hcB8MUFgUcTimkQWFFRGAuD3jyILCgnQOlB2QdiILCQVEnK4JnVEdqyJgskNFDiQ7we4jvkTf+SdS+aaNaQiCIAiCIAiCIAiCYAI/AKdqp9z2CWf4AAAAAElFTkSuQmCC' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAEYSURBVO3BzysEUQAH8O/7wag1WyJKSjRFDhKSg9LW3hwkFxc/yslJnFzcHFxFDpLalHL1L3BRKymllLaxiexk1do0b97b56SmSatmdy7M54M/j6FOjjKH5nuxOGfbjzeogqJOsuWTzdSGmcYvGGq0v7eb7P982eGGWlKoDI1MdU+Pz1rk8ix3hR8Q1GA9NbplELnICbrksAEUJEheojTAPNdKHB+sni8jgCGECatnId3bccogZzypkq5UEHkXwhEQUgHPHhNNarDdbBEPOecCPhwhlAqvk7dP5T5Ucw2mm1vnAWzDhyJKlL0hgCJCmjMbARRRIQAS5h0COEIgDY0fWlccfKNME8o0/CgwttbZll25RywW++e+AGtQWDXls3PGAAAAAElFTkSuQmCC' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACGSURBVGOgKSic71rGgAYYGfCAIkcTNw7GPxV/zNht/nz7e/uLMmfdrPzDaxmAgIUBBzASE4578OzFdFZmRq7/mxhAQOvLdaZ2BgaGtQxAwMKAA/z98V3kycO3XAxI4P8zXmYGKGBiwAWYWf78Z2b79p+F/dt/Vq6v/1m5vnJp879kGAWEAQCqIyipsXqZBAAAAABJRU5ErkJggg==' )
];

export default mipmaps;