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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAOTSURBVO3BSWhcZQDA8f/3vfdmyzYzyTSOpmOkixSt0ZsVQZtqXCha2oOggoLVQz25oFAtEQ9eitpDKQpSXFC7gBctpVUhrdFo7QzUpGpsNBvZJjPZJnkzmeV7Gm0ltsy0Rkhe5P1+OBwOh8Ph+Kd7mu5qZhmQLMCMGr97647Gh7E5yQLc91Ld6uq1uS3YnGQBNMNKlQfc1dic5DK27258+bEXN29jPkuLe8r1ADYnKGHTnRtuW7VNHpk6mhxdkXJ3c573kcD1IqBXpffGT1kI5hNSCiGkZB4hYCiVptfyHGuLxnazSHRKuEpO71NWub9uxvB73XIN56XPmbhvr6LSJZsQgksp/mRB0szQPTpB38Awnvo1AywinSIebdr4uJ/4euXVuViubxa/30WqoHDpGhcrKMXwpEnnUJKJsTEEIFh8OkUEVfqOgHDLlFcjFQZvgr+VjQmm3h3GpUnmS2fz9E+k6OyLk8uYCECwdHSKyWbCnnID88cMlQ+EMN8fxZfXmaMJgTagQAjmjJsZehKTdPcPIyzFHMHS0ylCutxxKSxCZxTjkQI8UcvUoTiV4xpzCsoinprhl6ExkokkAhDYi04Rv6ayXSFdo8JjEPwsQ7KxAJsDDO0fwZyY5ef+UWbNaQQgsCedIjbc/+CRkc8PN1d4DFnm0jFaCnzy2zkSXSNI/iKwN0kRO5tfiWaFnphM55jzw0CCsa4RJMuHTikWg9PZ3AqFxanOHpYbSQlmvhAXAnIFhRD8J0poyu0rT7CIJCWYNxv1lmWhSUHQX8VCWPwhGO6qXNfw/DfR2HMsIkkJFat8NdmcwlIW1RU+/g0LsCpDo57VN+w5Fo2t+zYWe5NFJilidHhMeqt0Y0blUUCl18WVUl6/KcP1h7c+9eSt0Y6zz1wTDudZAoISnv1gU1/y0ODKOtPNRHqWlthPCIpTujdvhGq/rolEXvvyxMnjLDGdEgyX0a7dUrbSas3jcxlYgOBSCtCqrz5bHbl2z1dtbe/Q3YMd6JQw2Wt8FGqoapo6E9eDpo6mG1j5HBdYgAjUDvpqQvtPt3fsYmAQO5GU8NYLn35IQTvq2hIki0UwUMUFyuefckXWvvfqvrdvOt3esQsb0riMhzY+3aoiA/dOR0QoER1nelbLajXhL65rWL/9xHff7z148EAamxJcgZ1v7LgxE+o8kOyezfQe5/WW1taP+T9JxMclDofD4XA4bON3zetUVBQLxFYAAAAASUVORK5CYII="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAGzSURBVO3BPWsTYQDA8f9zeZJLYtpcahsrhSLq1AoFUShdKkFUyCZOgl+g4AdwcHHopMVJRRSngl10LS5VHARfaqT1NdpQsTQvvSaS3PVILnfGQXgQu1wzSX4/ev5f06cnr5yfyUzQZZJdnL2aHt/4VI8D7+gigSJzanJ0dMq71f/cWUlcHBxzhRd15reX6RCaFEIg6FivN0uP36zOEYBEcURaN6NNPZvUQ9nmUpXIyQS6HjpDh+97mJZDoVJjo+F+BOYIQKIYFpFj9QMR2sImbIL/tEG77bH50yJfNKmZVQQgjEGCkihCmrCH8z6V7D7cRzU2Sw3yPyq0dmx+E+ydRLG10/p+tCgnzOUSr1a+Iug+DYXjet8qlsPrDwUEuxNCcwlIQ+FkYmnP8zGMJP/ih+NNUukn8YMjMwQkUQwcjoftFzb7++PUzG3+8DXpiz4jF0kN3Hj7+cs8xTJBSRSRcHTJPRG70Gfagg4fEInUejhp3M2tFWYpb7FXGorrlxZv68eNZ9p4FGLJqjY0cufavQdjubXCLF0S4i/TU+cW24eshFUeuvxy9f39hYWHLXp6FL8Ah5KbIyt8d7AAAAAASUVORK5CYII="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAC2SURBVM3Bvw7BQAAH4N9drlIXZWFgYJeYLU0lxC52m8VmEkPfwgP0NSxIxGgTBKNIUENp/IlWzg1WTTe+D7/VtqomQiKQmpVCQ8spXTWrqmR8cx7+iyz2jtNfb8v4gkHK0IjhJVn+Pjpjd3Kx2drwCTshAINk3701m9wwnC5B8ME1gQAUkl/XFPfpgQAQhAoRjc8Jj5kIwCAlUtrgUrx2xCp2pZxbs8PRxPmCUFq9Us3Q9TT+1hvPtjuiIbun0wAAAABJRU5ErkJggg=="
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