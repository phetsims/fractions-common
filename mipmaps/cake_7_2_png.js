/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 219,
    "height": 166,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAACmCAYAAABTP/pfAAAAAklEQVR4AewaftIAABHWSURBVO3BC7RddX3g8e/vt//neR+5j3MfeRJIjASQp9qqqANBVCSjVREaIDwGxrpElktdUGfGqbpca2i1Wi0Wp6UMWkCmdVYpVWimQCtIig8ihAAhPJLcJDf3fW/u69xzzt77PwmuSbkGNCHJ3id3/T4f8d5jjDn6FGNMIhRjTCIUY0wiFGNMIhRjTCIUY0wiFGNMIhRjTCIUY0wiFDOnee+ZmJjIee8FkyrFzGnr169/8yknr9y8bt26czCpUsyc9vyWLScODexauvHJJ96KSZVi5rSxsbFW5xyiGmJSpZg5bWx0rCWKY6IwxqRLMXPWD++79/z/fe/3/qC5oZW7fnD7Nf/22PqzMKlRzJx12523fHbZe9yCMz4yn663ld/43bv/8jpMahxmzmrtavAnfPAEFp5QYtuzfbChYwKTGoeZmyIgiF0cQVSLqVUiNIwFkxrFzEmTk2UdGR7ucC7Ae/AxeO8FkxrFzF2yD4gI1UpIXJMqJjWKmbNE8CLCPmE1oquzuxeTGsXMXSIgvMx7EBFMehQzZ2WyiqiA98SxB49JkcPUFw/VmZA4BgFqtVowM1PJ8GtEwHtepqpxsVioigr7BEFAFMaSb3CiKiBCVIsJw9hjUuMwqdm0adOKB3/8TxeMjo90SRDlhkYH5gc5MpPlsQ6Xl0xjSy6emppqGB0bbVVVL8JegssqLqvMTITEPpaMy9RKpdLg1FjV1yoxquLjcma0Z7Dn+DfnTmIfJeDpjc+88d57/vG8YkPDVHPDvLGOzs6B1pbW8camYs3lFHN0OUxqrrj0qu90nTd0znlXngQeSsUMmYySzWdRp2ggBEEzqi0gIOwlggjgwbOX98TeE9Wi5VGUx0cx6pRdz42x7TshIOwTkGNPx+PXPhy+eG15e8TMHh+GU27El3NjBW3ZmWdeX3tz97bWps5d3R0Lty9ZsHTrosWLd3R0tE9kCw5z+BwmNWHNi5McK9+0mMmpKj72xN7jY4jjGB9BFEHoAQ/ee7z3xN6zj4qgKogIiEMFNCO4jNLQ2IAGyss8hNWIJStLnPPRFcxUQvDehWHUWauFneXJyorpiQEmR3fQOzrDlqEak+vjsDaWG8iGLdtasvO3LGg//ukl85c9d9zi4184fukJ2zu626ZFMYfAYVKTL+Rmdr24i5//eCeTwxUq0yFxNaYyGUItJqp5apUI7z0+hjiKyajiRMFD1cfE4tFAyOQCXDYgEo/LKFNjVaLQo4Hg2Utg9/YJnn96GDxk8wGZbEDGCblsgUJnkY75gqogCnjvarVowfTkzILx4R1vH+l7jq19M4z/SxSGo4WdTSzYdFzHysdWLj/t5ye98ZRNS49fsjvfkPWY1+QwqXjggQfO/uWG9e/73XI3L3zpRSTyUPXkVCH05J1DgSiMeSWnilPBA2EcE8WefTQQUGG6FoII4USF4AyHqCACtVpMzz19xI9P4fMKTUpmXoZMiyPfmiXXnKE4L0u+0VFsylJocGTzAS6To2N+nq5F7Wgg7OWqlerSseGppYM9D11437Yf8rcbZDw70/5cKbd0w/lnf+iO913w3p9gDuAwqdj01FNvEqAyUmbFooXE6iEH3oMIeA8eEGEWD3g8+wiC8Cve87L2Yg4VoegDyk3g+ZUwjFlWK/CGsSKVKCKMY6pRjSoVKkwwFngGMp5aDnyT4koZsp1Z8h05mjpyNLblKDZlaWjMkC865s1rou3Meax8qxDHcXN5cuYtD//gkbd88S//6eKFC3/4ljeddvILmFkcJhXl6elGB2wb2sOW4T2s6GyhGka8zPPvPK/J4/l1sQcnMFmrEfoAVfCAj4EAyAoaKzmUvAgCCHt5wENc9UT9MdXemHJcZopJBnKengLEzUq5CIWFebqXNdGxqJF5bXkamrNMDEe0tLSw5KRsoVatKeYADpMW74EAeHzrbpa2NyMC3nMECGHk8ewj4D3ee17JA957ZhEgAAmUvChFMpTYK4Z4xhNNe4anZtj92CjPyAAzjRB0Z2lb3kiumCFXFF766eTo6Ll7GjEHcJhUuQAGx6d4dvcIpy0qUQ0jjgQREBVE2EsIqzESew6W9xDheZkADgShK1dkQakBH3sqlYjJ/hrDPTM8OdTLwNQEjNW6r3p89f+95Y47L/7AhasfxOynmFS4jKsJv+IEnuzpp1wLURGOGAEEEE9YjlAvHK7Ie6pRTCyQL2bQfMDA+Djx6B5ap2uUChDsmWj/oxv/8I8rtZpg9lNMKrrnL9gt/EqgMDZZ5qldQ2QC5UhxmQARwXtwIuQCxeM5HCpCzgVMVEIefX4HP/zF07y0c4DYR0gAMVDIweC250964YUXTsDs5zCpEBHPK2QUNvb0s6KrjaacI4o9h8sHoAVFA2G6HFLwvG4iQiZQpqshT+zoZ8uufiozIdkAxDGLCFTLtcL4nvFWzH4OkwrvvfAKqjA9U2PjzgHe/YZFRHHE6xX5mO7WIjM/m2bDt15AVCg8VqajpUDkPYdCgIwLqEQxm3YN8syOfqamZsgGkHO8JlF84IIaZj+HSUUmk6nwa7IBPLNrkJXz22kv5gnjmNfDe8hkAk50Tcw8UsF76C42Eil47zlYmUCJPDw/MMZT23vZMz5NRiHn+I3iGPINhcnW1tYRzH4Ok4ru+fP7hb08ILxMBKrViMe39/Pek5ZyOLz3hIArBuwT4sFzUJwqIsKO0Qk29uxmcGQcJ5BzHJQ4hkJj03hbW9sYZj+HSYWI8GoyAbzUP0zvog4WNBepRTFJCVQIVOkbn+apnj52DY2isScXcEhiD7licSqfL1Qw+zlMWoRXIQJx6PnF1t2sPm0ZSVARXKCMTlfYuKOfbX1DEMZkHRBwyKIIWksdg8VCvorZz2FSIaKxAJ4DZRzsGBpj6/A4J7Q3U4tijgYRIRMoE5Uaz2zv4/ldA4TVkGwAOF63CGhtLw0K5pUcJhWlUmmoWMiUfbVWkIADediwrY/jWpsQwHPkiEAmCCjXIp7uHWDzjj7K5SrZALKOwxYBTfNaxjCzOEwqVDUWUc9ryASwe3SC5wZGOWV+O5Uw4kjIBEoYw+a+ETb17GZ8okxWIec4IgSIgVJnRz9mFodJhfdePJ7fxAn8cns/y0otOBVi73m9MoESI2wfGWfj9l6GxyZxQN5xxIVAR9f8fswsDpOKINBIRGMPCK8uUBgen+aZvmHOWtxJJYw4VIEKqkrv2BRP9exm99AYAZALOKraSu1DmFkcJhXtpdJIsbFxvDw900jAa8oqPLm9nxWdreRdQOw9ByMQIQiUoakZnurpo6d/GGJPLuCoE6C9vTSEmcVhUqEiHhHPb6EKE9MVntw5yNnLFlAJI34TFcEFyp6ZKpteGmBr3yBhNSLrgICjz4MAnV3dg5hZHCYtAggHIRPA0zsHOGl+O835DFHs+XUikAkCpmshT+4c4Lmd/VRnamQCyDoS4z3kim5mXsu8PZhZHCYl4gW857dTgZlKyIaefs47cQlRHPH/CZBxAZUwZlPvEM/27GZyqkI2gKwjcXEM2cbiVHNT8zhmFsWkoqGhYaq11DEYeQ5KNoAtu4foHZ/GqbJPJlBUlecHxrjvief42bPbqJQr5ByIkArvIV9smGxpbRnHzOIwqVBV75wLPQdHBGq1mA3b+1h96jJEhJ1jk2zc3svAyDgOyDtSF0bQ0dY+XCgUyphZHCYlHu+9CAcv66BncJQndg4xMj7Btv5hNPbkAupG7KFpXstoJggwszlMOkQQkdhziLzn4We30qyQDYCAuhIBzW1tw5gDKCYVTpW2Umkg4hAJZBQyAXVHgAjo7OruwxxAManRwMXMMRHQVioNYg6gmDR55pgYaCuVhjEHUEwqXnxp66InfvnLM3PCnCJAZ1d3H+YAiknF2OhoS9/A4HwNmFMEaC+VhjEHUEwqFi5a2Nve3jYQRswdHjTAt7a2jWEOoJhUdHd1jbz7P5zz44pnzohjKDQWJltbW0cxB1BMai657PLbI/byzAlxDLli455581rGMAdQTGre//73PfCGk1ZuqNSYE4IARsaHF3zhKzd8dWJiooCZRTGpyedy0ccuX/vdKUA49sURNHYVdXN53cfXrVu3CjOLYlJ1yZo1f9ve3jIQhhzz4gi639hEY6FlfMXylc9gZlFMqpYuWdL3ntUf/MFkzDFNgFhgarwWXfKOz33i1NNPfgkzi2JSt2btFXcIe3mOSephpAy+q6vn85+65cLLLrriLswBHCZ1q84559/OfMfbH3zq0fWrClmOGQJEIfTW4N0XvP/vvvWd//mp4xYv7se8KoepC2uuuPK2Tz+6flUR8NQ/BcbLUC3mx7/41Zs+e/2nrr9VVTCvzWHqwod+78M/+pMvfXHb5K7epS5L3RLAx9BbgRPPPOPRm2+97Zozzzh9M+a3Ukxd6Ci171l90cfumgCE+qTATAX6qhL+p89+5sv//MhPVp15xumbMQdFMXXjsrVX/E0+F5TjmLqjHgbLkFm0eMvf/OhH5331a3/6Rw3FYgVz0Bymbpx5xumb37Hqvfc/fN99H27MUhcECGuwK4T3f+TD3/vGt2/59PyuzlHMIXOYunL51Vf/9YP33fdh8eCFVCkwVgbmNQ997Wt/ev2111zzfczr5jB15YILLvjn5SeueLJ385bTcllSIYCPYFcVTn/72x64+dbb/vPJK0/cijksiqkrxUKh9pE1l90xDQjJU2B6BvrjoHL9f//Cjff/y7++7+SVJ27FHDbF1J01l172/abmxpEoJFHiob8MjcuXbfrBAw+980tf+vKf5LPZCHNEOEzdWXbC8bvOX/3B//P3d9557TyOPhWoVGEwhN9be/ktX/uzb97Y3to6gTmiHKYuXX7V1d/9hzvvvBYPCEeNAiPTkCm19377m9/6xKVr1tyLOSocpi6tWnXuo6f8zlsf3vzTn72rkOWIEyCOYGcV3rbqnH+8+a9u+4Nlxy/txRw1DlOXBLjk8rW33/DTn72rCHiOHAUmylDO5yb/yx9/+cbPfu5zfxGoYo4uxdStj1500T0L5nf31GocEQJIDLvL0HHKyT+/918ffscNN9zwF4Eq5uhTTN3q7uwcvfCij9014UE4PApUqtBbIb7suk/e9ND6x971u7/z1o2YxCimrl22du0duYxW4pjXTYGhMtDVve1/3XPPe7/55zd/vrmpcQaTKIepa28+66yn337ue+5/dN26DzVkOSQChCH01uDc1Rfe/c1bvnP94oULBzGpcJi6t+bKK29/aN26DzVy8BQYL0OtsWH0K1+/6TPXXXfd7ZhUOUzdW736P95/whuWPz3w/Asnuyy/kQA+ht4KrHzLWY98+9bbrjn91FO3YFKnmLrX2FCsfvTSy743BQivTYFyBfpCrX78xhu/8OAjj557+qmnbsHUBcUcE37/0kvvbmpuGI1CXpV6GChDfslxz9113/2r/sdNN30ln8uFmLrhMMeEFcuX96z6wOq//4fv3311C/9OgFoNBkL4wMUfu+3rf37zZ7o6OvZg6o7DHDMuXXvl9+75/t1X43mZAqNlkJbmgW9848+uu+rKq/4OU7cc5phx/vnv+fEpbz7rJy/+4vGzmwR6q3DWO89ed/Otf/3xE1es2I6paw5zzAhU+f21V9z+6V88frZ6V/7Ml7/w3/7w8//16xkXYOqfwxxTLrn44nsefuihd37ik5/8q/POO+9RzDFDvPcYY44+xRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTCMUYkwjFGJMIxRiTiP8Hxi56fIJkkTsAAAAASUVORK5CYII="
  },
  {
    "width": 110,
    "height": 83,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAALTSURBVO3BT2hbdQDA8e/vl/dekhfTP0vSuM6hruqG2INrmagdKM6JXoRO6MXrxoSdPKqXDURw3kQ0wmQHZQgqRvGmK7gtc+LmZuZkMCpd07Rpm3ZJkyZ5yctPRSMqjFn6fi2M9/ng863O3r1PP4lmkg3w5VfpWMNpHEQzyQb46Iv3Rne/bD+BZpIN0HBr4UiP5aKZQKNdOx99buzd/lcjvWbYdd2gUggphTs3UTUDQbEl2hs8U6+oQu6Xct7KD2TGntl/8pHHhqt4RKDR8NDw60ODzit3tAK0620kAiVh2XDZPLaZ1qUqRtzASlg0QxAIWcsopi6kF49+/s7Z46yRgUaBgIzkzi6yc2scEHQ4IaClML6tooAGv1NQdlrRrFF6cGZSvQgcZ40MNHKazebFiWnuS3TRFbLoiDgC53QJkz8pBTPlKpcmCyyXysho7F48YKBRfWXFRSl+yi8ysu1OOqy2hKzDHxYqdbJT88wvFOkwbbsERdbKQCOnWqkr4Or1WXYke4lHgnSUag5X8kWm8gX+y7DtMh4w0MiQYoW//Dg1z57td7HSbHF1dolrk9PcTG1pqYoHDDSKJxLlcj6HAK7PLvCdZZCbmUe1XW5GAOFNmxYozLFWEo0cRYh/mMjNotout2LYdhEPSDSKdvf8Ksywyyo1apUGHpBodHJ8PB1JJC6zCm1htuODdg8ekGjWHYul+R8EILrii9H7dxz+5uOLL+EBiWapYx+8acX6CtxCILn1h+QD20fPZ7NH8EgAzd5PpZr9/VuG6jeKDxkCAoJ/C3fX7LsHjp37+crz+w8cmMRDgnXwwr7Rx8+Nj39tVpZCpuBvoic5kRgYeO1UJnMCDSTr4JNPPzsTjEQu0GHZLbP/nvQbqdSuU5nMCTQRrJPdIyOHpr8//Xawt2/O7ksePZ/NvsXt5OHBwQ+f3fPUMD6fz+fz+Xw+n8/n8/luQ78BCYL+gAgIjuoAAAAASUVORK5CYII="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAE3SURBVO3Bvy8DUQAH8O97915dW9UXtCEooyaaJqJGhKWx8A8w+RcsZkkjsYjBYpH4A4hIGhuLX5FU0AVRGpfW4PpT2tTdmSRYek9ikNzng39jb3/XMz4xNg9JFL+0tbM+Nbnkm4YkAgkjw7GZ+ELrBlfAazUDLb0qQc3ULME1o2EdLs8mE2iCQQYxux43n7oH2n0wqYn3iBtI1Tvy5bfIRVmPAkigCQYJJV2vnxde0OP3wgWKwkkJ6edXZLU8mAiYsIFBgsfFivliBemcDsMwcJvR8MkyjCpsYJDg9osqKLNSd1miEnxDmFKBDRQSjk/PDlxC3OMHwj0NHlRvYAOFJK66k/iCekWOB4OLl1fZOdhAISk6GltVvG0FUG4pInDUORiOXz9k1vCXwv2h7aFQ3wocDofDjg+61mDIxPNXwAAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACfSURBVGPABxwc7Y0YcABGBizAxNBEyyuNt/4fD5M4Myfzhb8sTBtaAnYcYEACLAxYwK/fP+Sez/8UJiTNyXD37if7q58/izMwMBxgQAIsDFgAGzPj+5MPXv5nufeP8fPHzwws/MKfGdAAEwMWcObi5ZMffvx/9PnjZwYmTt57bBKcexjQAAsDDsDGyb6NiUVASlRNI/PIiRPPGUYB8QAA11kwnkwT2NwAAAAASUVORK5CYII="
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