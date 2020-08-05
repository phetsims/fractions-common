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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAALaSURBVO3BXWhbVQDA8f85OblJbszaLklLO4cfdTrEPriWidqB4pzoi1CFvvg6puCTj+qLggjONxGNMNmDMgQVo/imK7gtc+LmXHSyBytd07Rpk9ak+bzJzXHqior4UXpPC+P+fvh863PgwIP3Y5hkC3zyaTreclpPYphkC7z78ZsT+56x78MwyRZouY1ItNdyMUxg0N49dz8y+cbQc9G+YMR13ZDWCCmFuzhdCwZCYkesL3SqWdWF3A+VvJUfzkw+dPD4XfeM1fCIwKCx0bGXRkecZ6/rBOg2u0gEWsKqchmcHKTzbQ2VUFhJi3YYAmFrFc3sufTy4Y9eP32UDVIYFAjIaO70Mnt2JgHJGicMdDTqizoaaHGF1lScTiyryrfPz+gngKNskMIgp91un5+e45ZkD9vCFmuijsQ5WSbI77TWzFdqXJgpsFquIGLxm/CAwqBmve6iNRfyJcZvHmSN1ZWQbfOrYrVBdnaJYrGEAAQQtO0ylNgohUFOrdrUwKXLC+we6CMRDbOm3GhxMV8ily8gAMEflG1X8IDCICVFnau+mV1i/23XU293uLSwwo8zcwhA8HeNlZUaHlAYlEgmK5V8DgFcXijypaWYm1+Crovgn0W2by9SWGSjJAY5mjB/Mp1bgK7Lf1G2XcIDEoNiPb0/iWDEZR000GpUW3hAYtDxqal0NJn8jnXoimA3MWL34gGJYT3xeJr/a1tiObZr9wufv3f+KTwgMSx15O1XrHh/gX+hATmw8+v+XbdOnM1mX8QjAQx7K5VqDw3tGG3+XLpDCVCCv9CRnkbkhuEjZ76/+OjBQ4dm8JBgEzz+2MS9Z6amPgtWV8IhwW80V/QOTCeHh58/kckcwwDJJnj/gw9PhaLRc1ylLbujhm5Mv5xK7T2RyRzDEMEm2Tc+/vTcVydfC/X1L9r9A4fPZrOvci25c2TknYf3PzCGz+fz+Xw+n8/n8/l8vmvQL9eBA5UtjKBAAAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAE4SURBVO3Bv0pCUQAH4N859xxTb+YhUYrKGhOSIrKxohZpqReoqVdoaQ4kaImGlpagBygikLZa+gdhVE4JhnjRoNTUUOzc2yot3hM0BPf78G+cnB57Z+dmVqGI4pcOjnYX5jd8i1BEoGBqMrYUX+ve4xp4oyHRNegmaJiGJbghW9b55nIygQ4YVBCz72U/1z/S64NJTXxFm0CqGShWP6N31dI4gAQ6YFDwUSo1b8uvGPDrcIGifFVFOv+GvFGEJoImbGBQ4HWxSrFSQ7rwDiklMlkDBAABYElZhw0MCjx+UQdlVuo5R3QCELRhWg02UCi4vL45cwmRwU/c2+Ih9xNsoFDE3Z4k2umioAVD6/cPuRXYQKFoYjq2rek9ZYtyCyJ4ERiNxB+z2R38pchw+HAsPLQFh8PhsOMbOUliuA7VIMUAAAAASUVORK5CYII="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACfSURBVGPABxwc7Y0YcABGBizA2NBEyzuNt/4fD5M4Myfzhb8sTBtaAnYcYEACLAxYwO/fP+Sez/8cJiTNyXDv7kf7q5+/iDMwMBxgQAIsDFgAGzPj+5MPXvxnvfeP8dvHzwwM/MKfGdAAEwMWcObi5ZMffvx/9O3jZwYGTt57rJKcexjQAAsDDsDGyb7tP4uAlIiaRuaREyeeM4wC4gEAESExnYLyfJgAAAAASUVORK5CYII="
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