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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAJHSURBVO3BTUgUUQAH8P97bz7ZcbQQt5RKkfwIElNxM4gkIbIy61TngkjQgupkUh3Cm4WgZXjIYwc7BB0qs1ORBhkhRGYlUoSGuuv6tbuzM6+Th8rdtZR1B97vB0EQhLI9u9uxDihSzOmzx4/sOuk5OvMzQLFGElKEfypAP4181m90nyurrtmesTkrw8EaMaSIH/rA9Wnvy4eml5XoaYpUXFo433v3xbvb7bcc/CeCFNBQU9Vo8lBL1La8gSKG7FovQgsRqKY2YYfxemrI6Opu7X2Gf8SwgfzBORIa7L9vInxFpkiXGQXJVaCkSaA9AcwOBYyQHC3WCqxT+07k7y/MLRl7PzDyDatEsEHO1Nf6NgUnO3RqVxBCsGyxWoeaLoM9CmLZAo9itlyBXmDMRBfUtq6Lfa1YBYIN0FBT1WTypRaFIgt/sGQOQgikCH7HgUnTAq82IzI12u409TUjAYYk8gfnSGiwv8dE+LJMYWIFzCGgNv5GACPCsDi+xNRStSK/KH9s+NXYMOIgSKKDBXlPszV+iBCKWBxwcM4RCwEBOZaOiefBDzc7Hvj2VlbOIwaCJCrNMD4qkflCrBM7Z+e9t6Oj5xEDhYtxzg3EQeFitqqMIg4Kl7I4+OG6uieIg8KlpMycmast194gDoYk2qIpjcyOZGIdOIpn/EJzcyfioHApomnfkQCFGxGApJlfkACFCzkc2HpAKkcCEpKI6J6vDqMOVkTAVM3CKsiSbPnqd0x3XnosbcvLjkIQBEEQBEEQBEEQhBTwC9RHsJA7BEr7AAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAEfSURBVO3BzysEYRwH4M/3fWc2WZu2qZVyoeEguRAbNw7cFK4c1okLrv4CBzk4clH+ALUXHMVlN9ZFidImJNta2rG18+Od10lNk5aGOZnnQeSnpleHNyqlN8I3OP7A2v7kZpvePHFwnC3kD68f0ADHL7xWDbi5o12Wr2ZMTbarRm1+cLZrKj2jUy5bPMcXCAEtjqdHWmV9SyE5QESw+lTELm0IKWH0ctvU43vbyycL8OEIYKynM6NxZ8d1RbfpCJi2gP1ooW47sBwBPNncahL9qUTSui2WT+GhIICX59Jo4b6WQiMX4LJFmwOwDg+GMDFegQ9DiKTC7+DDEBYCEE9cwUdBAKTG3qV0y/jEuCTGJbyI5NBKR/Js6QaRSOSf+wB2wmOp9x4dbgAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACKSURBVGOgGaha7+FdtNillQENMDLgAeVOBvnMDP+r/hqxi/z+9e/GF2XOuln5h9cyAAELAw5gIi4cf/fZmy5mJka2/9sYQEDry3WmdgYGhrUMQMDCgAP8/v5d+NHHt2wMSOD/M15mBihgYsAFmFn+/Gdm+/afhf3bf1aur/9Zub5yavG/YBgFhAEAZ0cqcBzRcAAAAAAASUVORK5CYII="
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