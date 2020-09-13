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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAARHSURBVO3BW4jUZRjA4d/7fd9/dnZnZ8fVxUNrZ9HCLjS9EYnQFsqK1UBCKQgVQyhvhCiQ1Avpwq4qiBTKSKSbvDAJD4nZhdSi5YKW5gGyTcc9NLsze5jj/3tbt5QNuhhzm91onoeqqqqqqqqqqqr/vCVLlrzCBGAYY+3t7XVhKdfKBGAZYx2c3PLIc9E18x9YevbUN+3n+NP6p5ZumDV18uIfOpJtVIhjjFlvB+9+eBJtJ36d/sXBQ40HdmzdHJfSs0Hht9kFlT1UkGOMJdxdnYqnLtmz+viON7Y1GW0SEUAwvhSlggxjaO2yJ9bWnr2yTr1QL6XFUUuTiDBeHHeo7dR3sd2vb9wc1/zyINf9UFHU+JJCrYEBxpXjH9q0Yf2jhfPfb/rstXUtTUaniRHA4NUTFj0mZqBbGc3gHRXkuA3bjy7/tj+Vo3NnciDy08lFMUcdI4SbrBFKhRCcAMpogndUkKNMb65/cV7+8M8z4y0NzVO230fP6T4yX6eJdYG1wk3GCENvX6MhBEQYT44yTUt17KxNm+bB93vpngP1jyW4Z+tU+nvyZC70kz0zgD+XI5oXos6iwrhzlOHj3R/Nzh74cEHEBkTqaohfUQqXB+i2KUoLo9TPjdG8qImamGMoU2SgJ0cpXaTYW6TYV8TnPRSUwlUC2qgYRxnq4g2DVwZz3hpj6wJHrTPUBpa4BoSnleKpQfrzfXTFPX52BGmOEEwOiN4fI1LvMIHBOMFdyAi7qBhHGZ5fufLq9mcW9aSGcjMGrKWxNkJtxBGxFnEgCIloBK9KeEHx5z1e83jNUQo9oVdCVSQ9RCU5yuRVOwNrZlgDqWyBIF+kJrA01ESIWIM1ghODQUC4RRmmyg250FNJjjIVSz6JlXmqELEGawRV6BnMYY3gjCGwhrqIo8YaRAQjgmGYCDcYMVSSo0yDBJcbKaH8VdRZjBFEGJHJFghVMSIYARFBAAF6s3kqyVGmTLT+TBimcNagKKiAgAIKCCBAxFlEQBBEuEUAZw2VZChTy+o1BwuhlpRhCsooCigoE4uhTKtWr+pQG3QzTFH+njKaMr4MZdr/+f4phTDMoIxQFGViM5SpLfzgHb8hMacrXmSEAgqqTFiGMk355fHNNbHol42vNvuOxZa0lrhJAeUPyijKuLKU6ciho+mv9lzYs6Bllp02P/GgLI41XCdLMZkn5i3GCCIgIoiAcIMgwggB+nLFS8cuXt1LhVhu04l9F49ve+mTXWe7jidmLJg0LbokManzXkibIoO9BWwWotaCMEwQYYQAfbnipWMXr+6lQoQ7MJAeki2fvvDyzIVmZU2dnSvWTy9kvWSSWbS7gHSVsKkQ8orJKcnr2UPv7ju9jAoRxshQf56t7218Mjr3WuukGZFZ0Xo31TrTJIa49xoFH3T8mD781oojT1Mhwr+svzdLZ1dnzfXOZCKV6ratK1qTVFX9f/0Of/CrYeHhI8sAAAAASUVORK5CYII="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAGuSURBVO3BO2hTURzA4d955CZSiW2zZFJBUPEFVUSbLkakDoKOThHFpXUVhC5Ogripg+AkWNFNoQVRbFCcpJsO4iOKFMUHSGrT5N54zz1/61quWC6tIPT7WLVqxVSr1f0sA80SbRj+eW707KkdLKgdqBwlI8sSbR7qK3+69GJs7ODAYOzbXWCCDCx/MXJo6HAx6Yx2G53ta5QbtFrhvLwhI0uKC1PHznyd/r6pZ6pdMTK/WxsVyJxD9SiI+E2TkSXF2lvNk6aS3xudzuNnunSn57GTP8izQClAFBlZFhkfv1lu3b2+p/RYE0lCuC2HHC/TCcApDygIneYJmVgWqdVOfLl4ZN+s876/WMjR+1Zj3jlEwIvgvNDuxmRlSaHgm0B/GCdEzpMzmsBojFYYpbBGk5UmhRf5LCIIYJRCAV4g8RB7IfaerDQpYvRHQVgJmhRupLfUqgQSe0FYXoYUT+80bg+fHyhEO4P1SYl1cdMRhGC0QimF83528uXMFTIw/EH9xuv6xLXnl5/5+81CtZg0d+WkvcXqcKs1rY16rn7v/VX+hcarD+bhg0d9/C9+ATMlp1rgNeuEAAAAAElFTkSuQmCC"
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAC3SURBVM3BvQ7BUBgG4LdHNR0qTWyGrgYLiYVBoouRxd8tSCSmXoDEDZht3IRBXEN3SyPpJET8Vp2ez3ImoV0Mngf/wbZtCwkYPih3MXbqpQViqJAmq1blOPcbms+btL0XweiEGCokc7YfZQpG/5qPEDJCZBsK1vhKhXQ5h8J0BSxdQ5oxPIVQEEOFxAkbToQHj0ApQBAhDoMUDrLeraZ7j5wCAiGJgjdTtz0MdkGVHbjm9JYd/NoLEfo+IRDRtv8AAAAASUVORK5CYII="
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