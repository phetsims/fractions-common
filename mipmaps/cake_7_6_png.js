/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const mipmaps = [
  {
    "width": 219,
    "height": 166,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 110,
    "height": 83,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAS6SURBVO3BaYiVVRjA8f9z3nNXZ8b1lg6D2KIyWVpDOkZaYSAFGVhCBGFRBBKUEG3QhxZCMINsIehDXyqlqCyK+mJlUCRJmru5VOaAYzYz3rnd/X3PeXIaSsUib/oa1P39aGpqampqampq+s+b3T3z8aVL772CmFn+BZqpzvluYGsdWE+MLGfR4iu7VnbMuuple+2e6YX+quc1lhEjy1lyy5xZj3QkqvdF36xbnL6+I5NISUjMDGfBkcGCjA/qdwaBkaSR0S5y6dru8qx75nWv3PHt7hQxCTgLej5f++S5CbdQRFBV7Jw2wj2lbFtvbfbGD9fcNuOC80d//X3PZ5xhhpht3r4jc04QLTZG+I2CGCD0iAhp4yeN8cXHHpjXtWvJ/LlLOYMCYlbc8tXTuaS/TkQY4hUSV7dR2Vkk2acMERESouPSrjq/+7yOG6d1XlTbtPeHLZymgBi9tea9MQMbPn0pZaWV40QXJom2lUmWOIERkYRoezos39A9qWP+lKmdRz745It9kgmvXP/FhgM0KCBG2Z49z45L6TUiwu9EBNlcIVnmLxkR4zSayNRo4b7cuiUtnfm777/5uVdWr15VpAGWmCxf8UzHoQ9evUnEcBLhDwJ4r1SdozbOkLokS7azlfYpLQiSym8fnBB+XKp8+fNTi4AXaYAQg0efeKgrMXvbu+5gdWKYj3AlB05RryAQZAOCEQFBiyUxNkF6TIrsqCTJjOWXvirl/WWir4u07HSMTidJBoaa4+D0h5+d3H15V5lTZInB4C9H2s8tu4mZSSNItFgSqQAMiAhDopojrDpc2eEHQmrfF6j2hiT3Rox0lrFJizUpgjZBBFTB+6j9jRdWLADe5BRZYhBu3Dr3/INZnK8TOU/kPV45SgEhbQRrDMYIxgiBGIykMRkwIogIiuK8EnlPsRYyUKqSac8N0ABLDGbmMhePTCdRQJWjlBMJCAjHqIKq4lVx6qmGnkK1Ts05BEECW77pjru+XLbyeU6VJQbWJkZ4BREwwlGCcIwCCqiCokTeUwsdlcgROU/kPQpYY0gS4FVRL32XXzqjRAMsMegpVDTMCCKCAAIIQwREUQUFVMGpBwVrDIERJDAExuBVcaoMU1TMYRpkiYHRsJ5JZPmdcCJlmAKqBhQU8OpRjqOggAL1KPqJBhliEDlfpAEKKCdS5Q+CUCG5nwYZYlBTW+BUKH9KGaYoQ9R7DnuzlwYZYpB3piCcDgWUYUrVOZ25YNHHNMgQg95CsSo0TjlGGaYKKnYw09bWR4MMMchXqgWvSmOUkygcztbJ35od1dP+zioaZInBiPEdvaGrk7CWf6IeOg7lItzcFsZOy6mrsWH32vB5GmSJweRLZhyIftxAwvK3DFB3nkIYMjhBiaanyHSO4ZxcOgzLfnPv9mj1itvfX8k/YIlBqX3nZQcvTWH6IqTfYUoeiQCnDPGtBt9q0NYAP96Sak/TlkuTEwl9JN8NHq5t3veRef25B9/+kNNgicGEKdkgNyWx1RgZZYyM9N5nvfdWDChgxFSMMUUX+YqL+Kk0UDuw67PB3blS15rHHli+iTNEiNnPvQMmn89n+vr7s4g3/f19qc6p0w5dMHVSnaam/59fAXz6FPIs7aQEAAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAICSURBVO3By0tUYRjA4d938XgZR9FIazBLu0AQhGEF1qJFKGhRUC2EaikRge1atG8n0do/IKiIlkGIIdmNdlYqlS0MIcfJ0XScmXO+740WQYUTZ1pEC5+HDRv+mcOHOo8PDl5ppUyWv3DxSMeJRH/ydN69mQSGKIOmTItLy2wJ/M1NBXe+arXY+XpyylAGQ5lWxh/eqLVySu+utOptbt/E7XsXDra11D3/ODdGDIYy3L3/oDr9anTYalUvrRX42SJBgYYK3LGu9tS5zh3bbFf/mc/PnrzMUoKhDM1zU0MJS7dSCjUTYvKACEUjynZUN9X2JHuqmxcGjvr2x2NTM7OswxLT1WuX9zd2fRjQAgoQwItgBBrEYOdC7EhBJ4smkQ+4DvSxDktMLVMT3dvngqrIebyAUmC1RmuFwvPdWmhYKYRkC85QgiWmwJqmyAtaKwwggBOhGDkiJxQjhxPBeUGU/kQJmpiWcrk1J0LohdALoRciEZwHAbTWKBQC5Jy8pwRNTNnIZPid8BNBELz3slCz+SklaGKazCxnEWF9wg9f27RLXVJ7KMESU/2uvTORn8cawy9EWDWOwoGA/M5guSJVNTL9KBynBEtMqd7C1nRTMmMKUofzFqW8D3QuTKgvNY2VsyrixfyoGb519s40f6Ao07vJmYp0Jp1YXMzQd7I3y//uGzyH24PDGtpWAAAAAElFTkSuQmCC"
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADiSURBVM3BPUtCURgH8P+5z/HCHTRcKkcdyqYgsJfJfEGXxqDJb9EifYa2NsHBLcQIiiYHQSHI0aDGEFzUpSXvlXuep+UOdzhuDf1++F/KpeIeNnCwwfX5YfPoQm7fPz4VLAgW3YdHPR8POjqJ40n7vnGWzaROri4nr6M3HxGCxX59cefuUJU8gs666VTOK+2aZeVl+NVCRMMi3+cCIQGlFASCIDTq2w+2EKNhsTbMLjkQFhhmBCGDReaIcWAhIitEjBL4BxT+1LwpYjQsFo3k0F2zL44KeTsxU6Sfbk57z/gLv3WYTX1kqgO8AAAAAElFTkSuQmCC"
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;