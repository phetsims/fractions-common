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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAALSSURBVO3BW2xLcRwH8O/v33Paru2qa81YlsjGBJGQhblEJHjx4EG8iHgQEQkTwYsHwoMXiRC3B+ISYQnFElvCHvCwuCQzl+naudSy2jJdNw5rqzvtaU//JktcXmSHptv4fz4QhP9AdXX13gMH9i/CGCAhx2autsx/h6apAJoxyiTk2PTFLqca0xwYAwg55L1yrdRfcKkWjE92TSoIZLO62+Zbvn1Hza4gRoGEv3DFWzvlmerdNrFCWkgmVL6OXyzNxDSLBEK0OTE71ZtEd1vjCgBBjAIJf6Dm6Ooad6W+3p+tnUuDqcJI4yAQSMI2yKDPM0OaYwfdjsMKoETr3wrgDEYBwYBNW9Ytkma/P1vgpDnptgRZfRocJhkgfBcvAwqWToDkjeKbjK7zUNq6z/uw5RDyzAQDHFn58OePvSsdTUmaoBBssgwi/MIc5SB/EkSEbxhjZOaZ8qsPnp4+cexYFnlkwgg9f+FzXz9y6KIW+sT6PnxCZ7gfof4oYloGalqHns2CMYJsMoGI8DOZeNHN6zdsbd3hO8gjhhGqmFYxILs8cQzhGJZJqQiHe/HybSce+9/g7hM/7rQG0drVh3cfo1C+qEilM2CMoZilN5w+d6EEeUQwoKp0cicfiJRjhAgAB2C1F6K4qBD9FvfJZn9gJ/KEwQDZbu+DARzDkok4enrCSKU0F/KIwYC0qn7AOMJggLW4pIswfjAYwHUtxDF+MBjgqSx26hg/GAxwzcpYJU9ZB5ftacLYZ4IBbfe77/XGYqc279rd0KUMxCDbNGa2W/RkwsHACb9BGOL0+CKKUo88IeTA+rVrVnW0v1zDVXUez6Qr9YGImwHg+IEA8LIZl1uDwY3IExNyIPDqdUdYUW6Fo7HzjwLtx5tanoVSZE6QxQ4wswPaoJkwxOnxRRSlHv+Kurq6Scuq5+9ZML2iYUlV1UEIgiAIgiAIgiAIgvCP+goL/BCOQGiDSgAAAABJRU5ErkJggg=="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAE3SURBVO3BzysEUQAH8O97b97M7mp2KEot7d1NlJKWi92b68ZBUYrTXvwde5GrkpKUHJTc5OIi+VG7yl7MECM7Ybcd+2tmxEXppW3aLYf5fPBvpVLJJNqAokVDc+4K2oDgD9s7W2pB212m3B2zX+vj/M2x9SNtfnNv/xQ+EQgsLKUHw8NPa6H3ZoKbjR6Sr8OdikA5rqLScA+yJ1cz8IlBQCqWspXcyyzN1cJ4dsAJhaw7IISAEcTjsYGLa+OxAB8kCHhOs8u6NWHhR1iNoq9bhRZRQh7lqwAO4YMEASLLBn75KJdglEv4pvb2wycKAR7VbtAhFAKxCQ2eErXRAQwC+TPjcjGT2bh7MC0wuQopxACmwqkzfFEiRbNir8MHghalJhMjlq6nvVp1FFx2zo37aQQCgUArPgEVTGPQEhIZ7AAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACgSURBVGPABtzd3VQZCABmBiSwbMViNv20Xxmiyr8LlJkMDl28fuMjAw7AzAAFpkoKwR//nN7LfPBzKOvDXyqcr94JHX3wcgMDDsDCAAX/fv+Wubz8ihgDEHDz8zPw8nK7MeABTAxQIGomff0/M/tfBiD4+vEjw/PXn1kZ8ABmBii4c/3pXQUV1UP//jF8ZmBi/cPIyvrvxbfv0xhGAekAANq+NJTOrES2AAAAAElFTkSuQmCC"
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