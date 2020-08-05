/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 219,
    "height": 166,
    "url": "data:image/png;base64,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SiFEJDQxtFSumEyHzZ1yTg+BQ4hIaGLoxJOPf/q0lZd8cqlcoWtVIzZAiGWniakP/enffPz3m69633Q5PTUZABYUQiwfQ1wp+MD7P/CFCy686JufvO7aj959263vThQr6WwanEKII04Tc6t6eka/dMu//MXdP3l47Zq3nHfncAmKJdAIcWRpxEFrTz1l+1333nfpv9933/qutaf+aLAIlQpohDgyDOJZ3nLeeQ+88eyzz9i8efMlN15/zTXDA/te2ZYEY8AixOEziN+QTCTCd1111R0XX3LJ3TfdsOnP/vVzN3ykPDXblvdBeeAQ4oXz+vr6EL9dyveD9evPePCCd1y+eaqw4D32i62rg1KYSBtQisgpoBxAvndV/4aNV9yOqCka8bx6Vq4Yu/lL//zBex96ZO26P3zL14dLuEIJNEIcOo04ZKeuXr3jm3ff+8ebv/Pd07tfvfaBwSJUKqAR4vkZxAt23pvO+dFZZ5155m233nrxDddfc+3w7r3HtyXBGLAI8dsZxGFJGmPfeeWV37jo4ovv+fyNN77nKzd+9urS5Ex73gflgUOIZ/P6+voQhy/l+9XTTz/9oQvecdnmicX5xONPbF0dlG0ibUApjigFlAPI967q37DxitsRNUUjjoielSvGvvjlW95/z0OPrFn71jd/Y7iMLZRAI8QvacQRteaUU3b85z3f+qOv3vftM7rWrfnhYBEqS6ARcWcQy+LN5577w7POPOvM22677eIbru+7ZnjP08e3JcEYsIg4Mohl4ycT4VXvvPLrF1180T2f/9yN7/nKps9evTQ925bzQXngEHHi9fX1IZZXyveD009f/9CFl13+1aliwTz2xJbVQSlMpA0oxSFTQDmAfO+q/g0br7gdUVM0IjJHrVgx/oUvfumD9z780zWvfttb7xheIlwsgUbEgUZE7tSTT37qzv+65+23fvt761e+Zt39g0WoLIFGvJwZxIvm3HPe+OMzzzjjrK997faLNl3Xd+3wroFXtSYgkQCLeLkxiBdVMmHsFRs33nnBhRfee/NNN/3JLZs+c/XM5ExH3gflgUO8XHh9fX2IF1/K96tveMMbHr7osg1fnSkV1aNPbFldKYXJtAGlOEgB5QDyvav6N2y84nZETdGIl5SV3V0TN938T39538M/O/V157/tayNLhIsl0Iha5/X19SFeejra26Yvffs7vnnK60//3pb+Hb27BoZW+RZCB7neVf0bNl5xO6KmGMRL2jlnn/Xg+vU/PvuO/7jjgk3X/t11A/17TjzWYRA1xyBe8pLGuA2XX3bX+eef/+1Pf+qT7w+CSgJRcwyiZjQ21Jeuv/76f0DUJI0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCREIjhIiERggRCY0QIhIaIUQkNEKISGiEEJHQCCEioRFCROL/AGGRyjtf6grpAAAAAElFTkSuQmCC"
  },
  {
    "width": 110,
    "height": 83,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAKHSURBVO3BzUuTcQAH8O/v9zx7tx7dcuzN0rJAyTqtkqhLSXTvVtQpCiKhi4eoLhH0H2jQISE8lIdBVBhBl075lkvUUtHpdC/u2au4PW77PbFbEUXwbM+G/D4fcNzv+i5euIo6o6iBhbnv5lQ+cnN5acWIOqKogcRWcn/fgOfc4uIPD+qIogZ8Xl/aYKC7a5urDtQRQRWNvh51j30duew4WegxNrHbJpP5S4vXLBKiWgEYgx/TI4N3xp5AJyI0mJyYsg1P3h/wdJl7VcI6g7nnXt/pspFuq1BKFNEP6+dTuwQsWwZRVMRSZhd0JEKDu/237nVeKj+iqyLK0zuw5imMogBCANLfCjqrwAIDKggILAozQkciNMguh25MP03goNeF9lYJRpsBFSoA5eUWbKoIENSNCA0I2C5UhrXwJkLhTTTb7TjqdsAlWWFKUoAQ1JMIDUzN9qSSSaCCAMgkk5hIJiGYLDjW5kSbfR+sRgMqVAACKxmgIxEaFLLZHMGfykoe80shzBECn8eFjlYJB2wWEMYE6EiEBla7PZpPRfE3RFWxsRFBeCOC/S0tsDnd0BOFBmVBlPEfCIBcKoVovgQ9UWhgJmydoXFRaGDvtbSraFwUGri8vs8Gp/cbQ2MSoMHUp4X5WCY32N59nJVU4Yia35YI/kFyzMRlOQCdUFTBeHD28fC7992mw11DapMjiQYhoEqeDQ0VI1uJt1euX3uzHpXdjJFDpFgw4FeSYyYuywHoRECVjU9MJWLpzKsev3+ywGhbWSn6CCtSVEiOmbgsB6ATATWyElpbjqXTL7r8/rBSZB1sJ+ckkiMYl+UA9ppTJ3oenO098xAcx3Ecx3Ecx3Ecx+1RPwG1/evcIErcnwAAAABJRU5ErkJggg=="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAEzSURBVO3Bv0sCUQAH8O+7e56XHFQEZaamUE5BoxBBLS2NDf0B/QHS1iRN/QkOrW3R2N5cUA1B/iDBCtR6qBXls8537yraX/JsaLjPB/9WuVih2eXFHIZkYEDt1pO9tjO9jiERKFycX4aO2e62EZJZr+MmXSHn7R56Lvdv9nInK9BAobC1uZHPLIXzybqFiEEhFyjEtRjrS9KGJgoF4nkT5aMKqvYI5uKTSLgOrLAFwCfQRKFi0ia+iPceytU7lAgwE4tianzUgCYKBctxahwAwQ/iA436A+qvAroMKCRWR13YThd/yIRC6ey+mMxkTj1JEr6QcSKFiW/hSItxXoAGE79oMFZjb92DeDp9K2Gk/H4/CstuMc4L0GBiQM1254p1+X5sNvUBSu3H55dDBAKBwCA+AXSWbYuT47LBAAAAAElFTkSuQmCC"
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACBSURBVGPABsxt9K0YCABmBiRw9sw5JungJ1ny+hxpji4K9ge33N/MgAMwMyCBk7u2p34/92o6963fKsyXfskevv+imwEHYGFAAsxs7C/vnrnNcJeRgUFMQoKRAQ9gYkACih7i9xi4+M4xMLL8e/X+KwPJQFdSvFRHVOQYwyggDwAA81ojQxObvJMAAAAASUVORK5CYII="
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