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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAOTSURBVO3BSWxUZQDA8f/3vfdm6TZLO9TRMmAACVGs3sSYKEXrEqIEDiZqooloQjy5xBiU1HjwQlQOhGhiiEtUlsSLEgJqUrBaRToJtqiFard0m850m+mbzvY+LYKpNTNgTdqHeb8fDofD4XA4/u7exrubuApIFmDaGr9n646GR7A5yQLc/3Ld6uq1uS3YnGQBNEMlKwLuamxOchnbdze88vhLm7cxl9Jingo9gM0JSth014bbV22TR6aOJkaXJd3dXOR9NLBWBHRfem/slEIwl5BSCCElcwgBQ8k0vcpzrLUtuptFolPCNTK1z1IV/rpp3e91izVclD5v4r7DR5VLNiKYRwEFLlCQMDN0j07QNzCMd8WaARaRThGPNW58wk9sveXVmS/Xl8Hvd5EsWLh0yXwFSzE8adI5lGBibAwBCBafThFBK31nQLhl0quRDAu8cf5SPgZT7w3j0iRzpbN5+idSdPbFyM2YCECwdHSKyc6EPRUG5k8zVD0YwvxglLK8xixNCLSBAgguGDcz9MQn6e4fRiiLWYKlp1OEdLljUihCZyzGIwV4spapQzGqxiWzCpYiljQ5NzRGIp5AAAJ70Sni12S2K6RrVHoMgp/PkGgowOYAQ/tHMCcy/NI/SsZMIQCBPekUseGBh46MfHG4qdJjyHKXjtFc4NPfzhPvGkHyJ4G9SYrY2fRqW1bo8cl0jlk/DsQZ6xpBcvXQKUUxmMrmllkoTnX2cLWRlGDmCzEhIFewEIL/xBKa5SqviLOIJCWYtxgrlVJoUhD0+1gIxR+C4a6qdfUvfNsWfZ5FJCmhclVZTTZnoSxFdWUZ/4YCVFVo1LP6xj3H2qLrvotG32KRSYqIDY9Jr083pq08FlDldXGlLK/flOGVh7c+/dRtbR1nn70uHM6zBAQlPPfhpr7EocHldaabiXSG5ujPCIqzdG9eD9V+E4pEXv/qxMnjLDGdEgyX0a7dWr5cteQpcxkoQPBPFqBVX3u2OrJiz9etre/S3YMd6JQw2Wt8HKr3NU6dielBU0fTDVQ+xyUKEIHawbKa0P7T7R27GBjETiQlvP3iZx9R0I66tgTJoggGfFxilfmnXJEb3n9t3zs3n27v2IUNaVzGwxufabEiA/elIiIUbxsnldGyWk34y+vr128/8f0Pew8ePJDGpgRXYOebO26aCZ07kOjOzPQe543mlpZP+D+Jx8YlDofD4XA4bON3PupVT9S2V5oAAAAASUVORK5CYII="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAG0SURBVO3BPWsTYQDA8f/z5C6XhLSXtDZWiiLFqRUKolC6VKrYIZPgJPgBFPwADi4OnbQ4qYjiVLCLrsWlioPgS420vkYbKpbmpddEjrumyeXOOAgPog7XTJLfj67/1+TJ8Uunz0+N0WEafzF9OTO6/sFOAG/oIIHixPHxA/sn/Bu9T3eWk2f7Rzzhx+pz1SXahIwIIRC0rdmN0sNXK7OEoKEY1pzrsYaRNQ2RbSxWiR5LYhjiFG1B0MJydihUaqzb3ntglhA0FIMietjeG6UlmuhWQPDYptXy2fjukC9uUbOqCECaewhLQxGRwh3MB1SySbwHVTZKDvlvFZrbLj8Jdk9Dsbnd/HqoqI1ZSyVeLH9G0HkSRd3zv1ScOi/fFRD8g5QeIUkU9al4xvcDUimTPwn0RIN05lF839AFQtJQ9A0ndPeZS39vgpq1xS+B1ALRk8pF033XXn/8NEexTFgaiqgeW/SOxs/0WK6gLQBEMr2mm6nbudXCDOVNdkuiuHpu4aZxJPVEjsYgblblwNCtK3fujeRWCzN0SITfTE5ML7QOukmnPHDx+crbu/Pz95t0dSl+AA7NnB+YdV9CAAAAAElFTkSuQmCC"
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAC2SURBVM3BPQ/BQAAG4PcuR9pqTQwM7BKzRUiIXew2i80khv4LP8DfsCARo00QNTYSX8P5qIo2zg1WjY3nwW+1ehUTXyKQGuVs3UiHOkpKUcjY4Xf/SRZbzvuWXcIHDFKShgtejGXcEcfmeMXaPsAn7IgADNLB9Sw2uWE4XYLgTTUEAlBIfs0IXR4eCABBqBBqdI6IbiIAgxSNG4NLzmmLle5QTevNdnsTpzO+0uwWq4V8PoG/9QLObTuhb7+4aQAAAABJRU5ErkJggg=="
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