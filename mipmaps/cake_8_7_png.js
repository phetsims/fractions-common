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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABTCAYAAAB+vzKIAAAAAklEQVR4AewaftIAAAvMSURBVO3BC5CV5XnA8f/zfu+57+7Z3QPIrrDIZUULorFAMSDYZmKmGpt2SkaNNVO11mpb28zYXKbVOu2giXWMNvYiJukEcWJaO+qYphOUaMcIxoSLSIzoiHJd2F3Y67l9l/fpXkZAhUDS3bg9fL8fsVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBabwDxiR5RKJW/FihWzH3nkkcNMcB6xI9Lp1O/f/9V71x7s7LqfCc4QO+LtnTtnpFLJiP8HDLERP1j//LTX9r10VcUvNf3ZF6/7NBOcR43a+fY7dXd9+e7wrlWrlFOQyXvXNy7suX720obM7t37C2/8eP8aJjCPGrXzxWe/8fJ/rP27eQsuaF375NOb/vmfHqzyc8w9/6zL2y9NLp/zkcnse23g9Z/+cO+jTGCGGmWFxCQbzGvp2/3Xq2/+zI6rL1782MOrH7qQEyj6fQ3W8wj8iKgs/UxwhhqlqqiCTVjyVs+Yk6xeuX3NP754w/LFz992y03XDpbLhmNUXTFvk4YoiEi4XA8TnKFGDVRDlHcpiNCQTqTPTAYrdNsLa7542Yrtn7380ns2bdlaYEiolXprPYIgImubDjHBWU4zipJNJ8kRnFtf7Dj3W3953XXXXrLkub6MmWSs4JciCvVTDzDBWU5TimKtRx6d1Ez105t6B/C8FoKKY1JT60EmOEMMRLC5BGIEdYat337srms/8Zv3v7Bhw1QmKI8aNeuMSSun5xLzEU7KiNDVosxaPJm+7grJDX3NBS0v2frM925ob2u76LM3/3nHuvXrdzGBWGKoKl7GQwTCisMAnvXIQ1OjBp/a+91HLrtxxeJNyZnta//2vgcfmtLcFPIh86hRM88orGzLJeYjnJQ66J/l0bagQPeeQbxNZaw1jBBIJTyv3nPTpGvfZT94/LE/aJ8z55x7V39z29o1a/r5kHjUqEJjfmV7PjkfEU5GHQzOtUz/tSY6dw6Q2uZjPOH9rPVIG23KR+VF25/7/vVnz2hbdtX1N3avf/5/3uIYO9/cnbv99ju45x++4hgnHjWqtdC4sj2fmo8IJxNFSuW8FK3tefbv6CP3eoAYTkiMkLaSbrLu7MM7Xv3M+bNnXrFo6dKGp/57/Su7Bl65Z+vg4w/9aN8TVz/whe888fDXVxcZBx41qrXQtLI9n5qPCCcjIvSnI+paMnRvPExDl4BwStIJa3JErR0H3rp0fempPz330twlM85rqs8207LhyTc6Xnph00uMA0sMMTDtVejfvIfWhEFFORmDMFAJ6KwLsBc3MHfhuRTOzDXahKFrb5E31nV13Xb1qm9/ddVqxoNHjWotNK1sz6fmI8IpETCegHBcgmAQytWIbt9n3zlQ/3uTmHtlG7MuLFDfnKbY7/Pq03tJrO3h3L5Ubsu6p3/nC197+L8effTRXsaYR41qLTStbM+n5iPCL0MQPDFEodJX8ekwVTrPt2R+u4npV7ZyzsdbmTqrnmTK0rl3kO3f34f/rS7mdqQpZFMkrUdz2hZee/H5i57auuMbX75rFWPJchoTBBFBAHWKH0YUg4gSEYONDm1P0zSnnsmzpnL2WXVk6xIYa1CnlAYD3vlxNx3PdtL6pnBBXZZEtgFrDJ5nMAIGoTXF4jtuuu5zwH2MIUuNqvgh5WqIiCFyikNxgFMlQvHFUUkpfrMgU5NkzkhTP7WOptYsZ7VkqW9KkUh5GE8YFoVKb1eZA2/2cWBzD9ktVaZrhpm5BqQZrDEYEYwIRhgiKEo6lSTdteeTwH2MIUuN8usN4R8XSKYSpFMGYw02YfCShkTaI9uQIJ1LkEx6eFYQI4gIw5xTAj+iv6dKb0eJ7rcH6d14mMnvGCYnU8zMZjF1OTwjeCIYIxgRhKOcKk6VyCm5TKaBMWapUZmGBIs+2YbneYCgKAKoMsI5xUVK4EeUegNK/T6lXp++/WX6dw4iOyrkDxkasMxOJcmmmpCC4BnBE8EYQQQMggAqgIJTxakSOiV0jt6yz+5SWGGMWWqUXwp5fWMnGoELFb8SEfkOFzj8Yki1s4ocDEgdUjJlQ8YZMsZjRjJBJpnGeBmkUTACnhGMCCKCERAEERAERVFliBKhRE4JnaMcRBwYKJFNeARVv5sxZqlRXm9E5oFDJDwPzwieMXgiGCN4xuB5OYwIkgRJgYggAkYEI4IBRAQREBEEEIaIMEIVBVRBUcJICZ2jGkZ0FStEztGYSREEPukzZ7wKWxhLlhqVb6gvn9mYw1oPRBBGCaNEBBEQBBEQQIQhggAiIAwT3qWAqqKqOMA5JVIlco6iH9JdrOBUySUTiIBTpRRELFh2yQb+/UnGkqVG1eXqKpmERzJhGSWMEEYIo4SjRAQUlKMURRUURRWcKpFTIlXCyNFf8emp+CSM0JBO4lRRVZwqw0JMZdHS5ZsZY5YaJQIpa7Cex6lQhinKEGWI4lRxCoriHDgUP3T0V3z6qz4opBOWSdkUoSqqCijKUZLM7l/86xceZIxZapggCB+kjFKGqKKAqqKAKqgqThUFgshR8kNKQUgpCBERsgmPQi6Nc4oqOFVQUN5LEErOdDAOLLVKIVJFVHmXMkxBQQFVhigKOFWCSPGjiLIfUgoiAhfhiSFpPdLWI5e0RKqogjpGKMdQQDlCULoHBroYB5Ya5VQpBSFepEQozilOwaniVAkjxY8igsihgIjiGYMVQ8oamrMpUMWhqIICThmlHENRhinDlKN8PyA3fearsJWxZqlRoXN0D1ZIJCwGQQwIghEwIqQThlzKIgiqikMZpsoIRVEU5fgURTlKOZaiQDmMmLfk4h/xnScYa5Ya5RlDPp0kkbAox6cKigLKBygnpByfMkqVEQFSXbRs+WbGgSGG8l7KianyHsow5Xgkmd2/ZNHCDsaBoUZlM5myovzylFOlvEtRRhmEktoOxomhRtXn8yVVZSwoo5T3UUABBVXeR+nu7+9mnBhip0Q5OVWO8IOQTOuM7YwTQ+wo5QjleJRjKe9S3q8chJy3dMUGxokh9vMpo5RRyhBllKKAcgxVFAgx1UXLlm9inBhivzAFlPdSRilgEA5Vg3DV6lvv3bNrb5ZxYIkdh/KLU4apwithL9lrJuVWLGy+5v7nbrbAVYwxS+wI5b2UD1KOUoYpw4wYestVtk4rc86n2miZ1UCpWHFhMXGQcWCJ/Z8IQhBEvO4G8D9Wx6KPzqZxSpqDu4qHdj1n7vm3u5+4h3FgqVHZTKZKlTGlyhECuNDxRnWAw0tSnL3sLAqtWRDlrZ/0bps5eMWNd95968uME0uNmjJlSq/u2ctYs0boLwfsqhQ5sNDj7OXTmHtWPcm04cDO/sF9m+Xx269c8yfTZrRUGUeWGqWoMAYUMCIEoWPfYJE38mWyv5VnxvlttLdkSddbOncN+Ls3+88sSP7uHXd8/pbND32+hfFmOU0pJyYIRoTBSsChcpW9pkz/R5LMWFjgojl5sg1JjIVD+wfdmy9VNzQdXPT3//KlVetgHb8qltOVMsKIIAJRpJSrIYcrVfa7MgdnQMOSeqbMauac6XXU5ZMks5byYIXOd4rd+14rb2wLl/7r/bfe+T1Yx6+apUYZwCIYhUiVMFIi5wid4ruIYhgxEAUcsgF9kxXTmqJuaprm6Y3MapvGgsYUiYyHTRiqlYCejlLQu81tHdief/qGy+98cMEt83vgGT4slhrVT8RTUw+Tyafxsh425ZHIWGzKkEinqCukyBfStDYkSWUtNmnwrMGzQhiE9BwoUdpD5+F91R09P/O2XjT7irW3/eFNLzPkgb95lA+bpUbVnZHmE1fPI5NJIwZEBBFBDIgIYgRVR7noU+ytUN4fhc43XYM9blfHtsrP5jd//D+vueyaZ9tWtFYZ8nW+y0RiqVFGTHB4fxHP+CoqFXVSVScVF0kpCin3dVUOd+8cPJSptP60fcpHf/Ib85dsWTDvgj1NU+odI9bxOf6KicpSo/7ij770zQ0/3LhxypSWnsaGxv66urpSfX1DkC/kHB/wGLFYLBaLxWKx2OnnfwH9PQ+OfRO4BAAAAABJRU5ErkJggg=="
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAQtSURBVO3BbWhVdRzA8e//4dxzd6+bU/fgxrQnUioltZWBhgqlQVpWRC+CaJXGxAoLQwiDEoIUNCgQCeyF9EYKKimpqBQhkuwBCjKWxlptOfW65/twzvn/ahPTLPCY42zU/XwoKysrKysrKyv739m06YVZzc1zNzDKLOPAgUMfrdDGzWOUaRLUsnDe5paVy5dynmtW+isXrattZpRpEjTZhHfW93bseWrJ3M9XL1vy5MDQkOIPlVNspro+PcQosyQockLG0ykPmZ8OTs5/fvktT7Qubv5AKZVFzHFGmWaMGK1J6+jKWhu2lvoKVwx05Sc+tHzpCkaRZhwwviFqH5jZMHjsraeXzPti9bJF67tzpzSXyJCg+ZfVrfWtruEc4kAvrCT4KY/fGRlPS2MmKtx2YPeuluunNV53T8vqwx/v25872vazt3Hjc2ze8pIQkyVBIsL5BEEKEe5kyBlaK9K46ekUj/bse/v+Bx6ee/D1Hx6b6aW8r4G7iEkzxrRWqO0nyLZFnKsQRPTNNHittZU3rLnsVnWqNC3c1T197969k4jJMsYUCsExFEaUpmhSszJkZk2g4apKtFHkvumh/5VOGvtT+DY15/COF3cCdxODJUGDczz8+gqUr9FpQ2qyh6328Ks9GmrSeL5hMFekv22A3t2/MeF7x3Q/hWcq0L5CBDwjNxKTJUFNd0ylpilLGDhcyRH0hbhTAaX2AXLtObwjIVXOMillsTqNqVQowCGEkaO3ENA9FATEZEmQ2XZCUhMGqNAKoxXGaIxSaKXQKo3JgFIKpRQighMhcI6+QkB/oYQA1touYrIkqLE6G9RlfUCBAsVZIiAiOBEiEfJBSH8hoBhFDLNGE4mjWIx+JSZLgrRSaKUYJoAICELkHIUgIh9GhJEjdA4BrNakMETOEYlDocgF/EhMlgTlhoogDuE0ESFyAgqM0litUEZjtMaJ4EQYJggCBGFIdsacz/j0IHFoEmS1JmUNvjX41uBbS0XKUuFZrNEIwhkiIIAgjBAI0UP3PdK6j5g0CTJGh1yAcA5hhAACOPTxm29q7icmTYKUUo5/IvyFIPxJAGGEKNPJRdCMW4IgCCCcdsLlo472Xzxi0owDwjBBOEs4Q4ic0DHDMXVD44KtH655nJgsCVIoIQ5hhAh0ZwOC2ytpmlE12NPptm9b9e5WYrIkyFgbgONCimHEsdqQaEGWmtm1rpTnUNv+0pYdz7z/JhfBMsY0isA5ekpF+hohvNYnM3sydVP8IMjLdx1fBTu3rdrzKv+CJUFd2RLpbISrULgKhdRYXJ1Hqi7FxKm11KBKEqn2vhPFL4+8k3nt5Wd3fcIlsCSoqrWeTJWKlNZFpXTeRa4/Cuga7Cl2Hz2Y/7ZpYPEb69auP8wosSTo6s4H721wTcWG+obepssbIv7mPcrK/uN+B9Nety9nYtmCAAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAHjSURBVO3Bv0uUcRzA8ff3x+np3eUlkl6WBNFkEBeJEEIgRCVBIQZBEOgShUST4FCBLk3R1BA0+R802A+kGmyItmhwSbAjCa0TPO9O7/k+309e5CIPZY9Lg68Xe/b8K8MuTU5OtJdKK6cWF78tsAOaGIb78heGL188xqZC5u3IiauZQXbIEkNWu6HkamForD8/a9rMevpgaokd0sQgIlit9jVqGdDz5cHV1z/O3OnvGV8qrij+QhHD7b7upy3JxAibfH+KcK6K/RoSiiqsZdTM/hu5ysTA9CgRDDH0dh24lLQmT918gKuEqHwTybPZllR3U77lXbX7fO5I4eXcwke2scRgr7XSmGtGBLRAq2jsYoB9s056w+C8Si0H7hwwxTaWGA4/d749XcNojdEKTYgA1cBSqgWUawFlpwpEsMTQYI03WuFFCFxIEAqBCwlFcN5T991k3hNBE4Pz4gMvOC944RetNQqFAE6oXL//YJoImhiMMSFbhN8EAUQghJXO9g5HBM0uCXVCnSCsdUEwklUPX906TQRLDNYmHHi2lE3IRr6B9aOJku1smlmYrd17MvbsExEsMRQHGqikcT6hqkFKF5vbkl+0kw/LL5ofP7oy9Zk/sMRwPHvzbq7j0HhP78kq/7ufsyO4+KbK2iMAAAAASUVORK5CYII="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADmSURBVM3Bv0sCYRwH4M973/d9ySNazFsKRYoIqjW6QdFAmhpaHNochWhuCRz6E/ofmlriNge3oCFqFheVaFOb7g7fH91wU/RuDj4P1k+zWd/DPzgcbmsn1wVB57ojk8EAN/iD4HBWLrV8QXdMmuOa3K6H3YPia3/8hhzBIWxXQv/IvxCCxGZ1Yz+YsVajuDPtD6efyHA4VEfSBN8SgEWqNBZxSvOlt0DOgwNjnlbGIlUGqTJQ1sZXD48vyHE4EHGNjGYWySGpuCLfnz56uwDGyHA4/Fz6k2TLRiaQX57g0f3pc4RV+AVyEEXcITc5bAAAAABJRU5ErkJggg=="
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