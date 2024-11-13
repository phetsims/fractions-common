/* eslint-disable */
/* @formatter:off */

import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,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' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,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' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAI5SURBVO3BT2jOcRzA8ffn+/39Hs/D5mn2eDQmF0sypBlTlMPa7jtY5CJkBxLJQXFxcVlyYhdqcnByUxvFWnLDZbUxm7a204bx7Pn//X5sB6nfgd9IOXi9+O+/v6qzo6OFP2SIaerDjM0eXLzad+d2+uShlhP8JiGGnmPdW1Oz706lTtX16N15jGhtriq9t4beXGaFhIgr1y9kJqbG65LTuUx9eeF4iG8zsN0aUuXuNImHCyxzXhfnK/ZM3/CrB6yAJaK9dVVvus3dTM58OpPKa5sVGowQssTvSGJHSiwzIolQ/N5sU/PA6MTkHDFZIrqyjf01k9V1weFa6/athoylNFfGFBQzWkRU+M4aSa+tFnZ1nbv4eHDwySIxBETM5YqFBknS+MxR9I5Cc4geaSCfUKriQQQDqIJHSaocLOaf3gc6iCEgQsXMLhTLmyrOU5sM2fjOYMYrqIJTxXnFe4+IEBiDMSJVTxMxBUQ456cITKsCxYqjVPWE1pAwBmsFI0JoLYriVClXHYWKX01MARFlMWNeFVVFgcAIAniWePCiCIoCqqCAQp6YDBH2dN22fKPgUZQlSgySIyZD1NTms0FXZvjrgYQ6VZSfUwWvmiMmS8SLJ69zzx+M3+u8tmdVcWdii6tnbeVzVRIFsEYQEYQfFOVLxY0NjE73E4PwCzeGus7XZGx77mOpyX5x621Z1+B8QkS8CyVfWWM+hjXhy0v7Hx0lBmGFxkbeB+8n39ZtyG782rJvd5F/3TfTRfAx9oV1ngAAAABJRU5ErkJggg==' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAD4SURBVM3BsUsCURwH8O/vved5IEhcDWokcY1NVoSLGBa2BUIQ9AdES9DY0P8QRUtzY0NDuBW0Bg2ugoNtioVRZKfv3v1aXstx0OLQ54P/Ybten8cfJGIO9/dmC9X3sw09c7C6kH97eul1kEDBOr2qXYTN4Zrst5e572alIJDiYmNr8/n2/mGAGAmrkcrdZFcyPpacNFyC8B0oPz2XK4nSY7N7jRgF6+tbv3otyhRdB0ooMBgEgmFeRwIBa7IoP0NmBKHBxEQwDOiIMTaRRgIBi3a8y1HF7Y7zxAzGr4h5hASEmPPW7lEwCMqpD+OxgNGe6pxU744xLT/4LFSwAbFGKgAAAABJRU5ErkJggg==' )
];

export default mipmaps;