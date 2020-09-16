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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAOvSURBVO3BW2hbZQAH8P93zneSk5MmvYu92K6lViZbkc0NLVoHLWo2KoJjFS8ole59L3alOsQXZSLsQahzm0LBCoJMGayCshutbNiauXZ2VvfQNEuz3HuSnNy/z5VSQW3OLsw0gfP7wWAwGAz/l2e6nh5CCRBwD5iceL73tZ4XUeQE3APHcEN75SOpXhQ5EXdh4IPd/T0Dm0YZy7akvGlbh6mNfHHy1JWjIyNZFCGCOxCNxDE41jvGSXpvdkqVqndWIhVMQ/kxjjQXQzmQ2WUiX3ji5Tc/G9i/fxFFguA2bnr84vvf9Z2OB9RnK84nYQNFutsKViFC/kbFGs450ozEcxB+j+XIRXvHztGPPhm5hA0k4ja0FufRaDCy74FzaVgJxYqUFZDaFIjOJNYQQkAFmCSB11lFvoN5XW90tja+sq25/sktj22H89r8HApMhA5HV9depT15SDwflaq4hDVJLQv6qALBmQAI1iUKRKSE11gE3mHRIvtaa6v6yxtb5IUbngkUCIWOSjH0LhFtSoUmAhL+ZosJ4CdCgIC8cowjrKXgUzW4vEGSTsSbzM3tm1FAFHm87uh51Z7xbOUWEQDBvxEB/5HJMYTiKXiXY1hcCoBlUiBYRVB4FHnYE8vP1VCZqDJFtB6w+LGuZCaHYCyJpUgUHm8AYFkQrCLYWBR5CLlUjayYoV1NQHFUI3rcD5tJwop4KoNALAl3SEXQHwDhHCsIigtFHkyUIiIhqJ3huKZFwDrN8I2H4fJHoIbDELCKoHhR5OFKsLkGC4FJFOEb92HR7QHBKgGlQUAeT73w0qmb0QSbuRGA2+0BQekRkMfg8DuXM4T6XUEVpUqADgayVK7IKFUCdGiZrK9MNuF+YKayjKQoPhQQhY7UdnNz+VQGHADB3eO4xVYTpBWVFx5sbDj2/Zlz4yggCh3WTXItndbAQUDAcacYkRitrftNtJWdfu/wxx/u2e0IY/4PFBpBHmpYIwe/dqhszF82PetCRotBDwfAy6pVarP/VF5fP3p2YvIrbDACHQdGuxeWv/U2eX4NwuvxYj05gEu1D/3JzeYf+vrfOnxwaGgBRYJCh2Sic2Srpck+L8OLf2LWKk1UlJ9rmpq/PDsxeQy3OIeGUEwodCxfN31evcXeHZwMUVwHGAChsm6RKMqZzl27jnx6/MRluNwoViJ0TJ+Zv/q4o3WHpU1ucU+z6fKHNx8Zv3ip78DbgyenfnF6Uepmrsxahg8NboPBYDAYDAaD4T74CxySZ/nj8p7tAAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAGaSURBVO3Bv2sTcRjA4c97970k10RtQq0Rl4iZNLhUdFCraJcObuLkJLjUxUkcOrmIUHAQG3BxLfgPCB0ytArSgFp/Cwq1oWqOxLRJ75K79E5ECocUhDMtDnke+nbM6bHjNy5cHjtMj2ls4ert8WNnr2cuDefaE88XXyl6SPjDteK5KxsrrTsplyG9E6AtejUfed32Zc44cuLB1P3iMv9ACBkfHS1kT9mz+5952Y20oAoDaPM2m7o+6z68X2p6j2cW3kwSgSLkgFG/ZbqJrC6C3oBgzgYBPwhYc1yspp2sWKsj674aACaJQBGSlVihudeg67sI8MPuYK05LFfrtFsthN9k9xBRKUKUrjnGU5uXssq3chW/47BJ6A1FSM3xlt6+Wzlaq1psF40Quxt80jWNv9J1j4gUIe55czj5KMZWAtECSaU/i2nO7svn7/L1O1EoQgZzpuEMKsKC+C6HeKJspNMz5Q8fp/nlS4WoFCGxWLyUOrnnYvACkWSmgpkoZXIH75XmnyxQtdgWE8UzD0fyh27WGw2hr+9/8BNavY53VL2dpwAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADFSURBVGOgCrBzM3dkIBIwM0BBRoNFu5ISc4Udg7C+saLsj5P3n91lwAOYGYAgyUk3jvff/3b2F39Fmb/+M/z180eUBA9XwM03H2cy4AAsDEAgzcxq++7vH7Znlz8yPHn9keHz+w/MjBy8sgx4AAsDELz5/ufWpd2PGL5++MAAAowMQMDI+J8BD2BiAII/QbysHDxsDCDwn437w39uga1MAgIZDHgACwMQ8Iny7OWxFgp9u+PfQSE19Z79R44+YXj3gWGYAAAzoD5JOA2PPAAAAABJRU5ErkJggg=="
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