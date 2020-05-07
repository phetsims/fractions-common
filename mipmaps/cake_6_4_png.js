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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABTCAYAAAB+vzKIAAAAAklEQVR4AewaftIAAAtJSURBVO3BC2xV933A8e/vf865b/va2GDzCpiAk0CarAlJSLoGoohsTNmmLotSNdOmSkvXaY80mtYGtVO3Vuoi2m5rsmpau1VJ+trStZtoqkBNeJgEiE2hLQ9DMDY2GIxt/LrXvq9z/r/xWLPRksS+mLHZ5/MhFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQv8HZDIZ99FHf/vjxWJRCJXFcB20tx+f0/rGa59taWlpIFQWw3WwZElDXzJZObpn955GQmVxuA4On2l9ruQNvv9k9vCvfflzL37nm9/6xjChSXG5DhLzxhd96M9+yXT8uL+m82THMqCT0KQYrgOTT/Q4LiTTEY51Hr6R0KQZroPZiUUdhZxPPOXR09/RQGjSDFMgP14UJqFh7vKj+fES0WSEodyZBYQmzXCVnvrURx75o394sOP3nn74n5mgxsXL24tjFi/q4KWkhtCkuVylgUjbk9WzZHHboeO/tfuN1s8aI8q7yI8V8zYj465rEqnqZGrvvv3zgyBwuYIgCEx/X1+ViDAZnuuMr1u37ijTlHAVHlxz3580flA25Eb9WO/Gs3qzJmygCO9CA6veH9aZpXfPkVe/ckQXtgRquTJBOc8wQQYYyhU4UIi27zvctoxpyqVMf/rh33ns5JE9n0tU3xDrPznG4iAmFcmowwSIQt9QEeMI8eqIVEQDEUe4WkaE7sEMu46eJHXDEsM05lKmsY6jT1ZUuSnHMeSzJaKOw0SJCLn+AmIgXhnBD8bwHIerYVXZd7KPIyd6EKY/Qxk+/8xf318RjK0MkoLrGbyogyBMmEBwtoiIEKtwKVpLuQQYK5TYfOgER0/0IMwMLmVo3fhvT96ciHjjgwUQSNXEyPojVOAxEaqK0x9gVYlVeBSspRxGhK7BDK+3daKBz0xiKENdRaLBdRwqApdCzmfOwhR9VT6GiVHAzShBoMTTEUpqmSyrSmvXWXYeOIYGPjONYZKGRjPGKeXqRYTqaJTBYxkqa6Kk3lfFUK7IRNVqhI6XTjH0ch/VsSgTJUC2UGLzwRO82dWDCDOSYZKOtrXNDwq5WiPgeobkthy+tSy5vYbumyw2sExExHVINeeZdURxHcNEGBG6hzJ8/0dHGB4eZiYzTFImMxoHdYwIBlgQidPz2jlS1VGW/8ZCDtfnUatMhALKxFhVWrt62XmgHQKfmc4wSSvec1uXG4kNcp4xgusaFrUqXfvPUV0f55bHFtG2oECxFDAVBMgWSmw62MmbXacRIXSewyR98QufD1bdvOzxJH69ZwxGhIjj4BzKMzBPmbs0zezllbRrDns0R8pzUcpjBLqGMmz5STuFXI7JiFbXDvUOnHuWacpQhp6R7KCiIOAYwTVCdSJG8hujHNnZSzwd4c6HFxL56Bza0uOM50sYYVKsKi1dZ3ntQDtYn9DlDGXoL+nx0VwBaxVBMEZwHWFOMsbiTT4Hvn6CILAsfW8td/35zYw9nuaIN0ah6GN4ZwJkCyU2HejkWNdpRAhdgaEMq9c+tKNneIxAFYtiRHDF4DmGirjHbe1Rjm/o4MSBIWIpl9vWzOOOv7iFzAcrOVqbZyhXAKsIlxOBE4MZvr/3CCMjI4TenqEMqx9a93qAlAbHCwRWucAYwTWGiGuIeg7v0Uqqnh9h35fa6e3MkK6Jcfva+dz3yeWkP7GArvc7nLDj+IHlAmuV1hNnef1gO1if0DtzKMMLLzw/fPeyJR+2pUJ11HWIOA6OCI4xOEZwxGCMEI+41GcjZHcMc6h7gCBmSM+JUzsvSX1jml63SH9Xhnje8GpbF6fPDiDClIhW1w71Dpx7lmnKpUw5vJ6aSKmhL5Mj6hiMuDgiGBGMERwEV8Eay/x0kvoTloGDg+xPnCaytopUXQwv6vDmuSz7DnZigxKhiXMp00gue2puXElFPc5kxqmvSGCighgHFzAiYAB1cI0SqGFu2qFO44y/4nNqrI9XT3bByVFECE2SoUxL33v3nlyhhKpSEY0wMJZnJFekFFh8q1gUQXCM4DmGqOMQ8xxirkN1KsroWAE5NYoIoTIYyrR63cPb8latBawqqajHWMmnd3ScQhDgB4qiXCAiGCO4xuA5hmyhxNaftnONCdOYoUzGdYo5PwhUFRRUlZjrEHEdTg2PMTReoOhbSlaxqqCKABHHYf+pAQyWa8UCkVTFQaYxQ5m+u/0fn8jNUY/zFAUFBQxQnYhQDCzdw1ky+SJF31KySqBKyVp+1NHDtWKBysZbN//Hyy8/xjTmUqZIXf4ut5BEDypWQTlPFRVBFSKuIRFxGC0UGRjLUxWPkI5FyZd8MtkxjDDlLFB7650btzY3fyCVTFqmMZcyxZJuZb42SqmUx3UMCiiXKJdYhWTEpSJiyAcB3cMZSoFFmXoWqL31zo1bm3d+IJVMWKY5lzIZL5jlxAzjvk9MXVQVVUE5TwFRQEBBxRJ1DXE3Rs4PMMaAWqZKoDD3jnu+17R126PJRMIyAxjK0N876BmjyWjKZTwIsKoo/0WVC5RLFFAuUZS45xCLRZkqgcKiVfd/e9eeNx5JJhKWGcJQhtn1s0pi3KFEKkJGfC5QVRRFAUVBQfkflIscEdLJOFMhUFh07+pvbW9u/hAzjKFMQdH0R+MO2bRygQKqoFyinKfKldRWJLhagcLi+9Z8ffuOHY8zAxnKNNKfHYmlPFLLUxRLAapcoooqb1Eup6rMSsW5Gr6FpavX/tO27dt/lxnKUKZF8Tv+3fdL1N+U5pxfRFVRVZT/ppynXMYqpGMRVCmLb2HZmrVfbWpqeoIZzFCmP3j06Rf9ca+7Zm6CgUWAggKqoIAqFyk/T0lGXCyTI4Bv0WVr1n6lqanpI8xwDmX627/7or/87oZ7Zt/o3WojhvzBLEnXwxHBCBgRRMCIIICIgHCRVdjfeRojTIgAJYtdtmbtc01NTX9MCMNVuKv2kS+M9heHF95SxbmVHiXfoigKKArKWxTlZ2Keg+MYJkKAosUuW7P22aampo8RusjhKry88QdnGhtXVNcstb+crI1zvH2QumIEEcEYwYggAkYEERAEEXAdw09O9uP7Pu9EgKI1QePqB59r2rLlKUJvcbhKP9755pYV993wq/MaUwuocek6MMgciWJEEBEMghFBBARBBFxjONY/QnY8x9sRoKheqeHe923Yum3bxwldxjAFGu3DHxs+W+i7YXk1cx6fywFG+BkFlF9UU5Hg7QhQxCs1rLp3w/bm5k8S+gUOU+CVH2zuubNxTRe1ww/ULU4lbJ3H8YMD1BPDGMEgiIAgiHDRcK5Ed985fp4ABYmUltxz74btzc2fInRFDlNkz479h+9f+VBHUDX4QH1DRdJZEuNAzwCzhgwxz0EEBEGE84TxUomjp/oR4S0CFL1kfuFtt//lztd3fYbQ23KYQs2bW9vuX/krHblY3+p5N1amam6q5Ahj5I6OURuNoSiIcEExsPy0uxcjXCRA0Uvm569Y8Ve73mh5htA7cphiO15pafv1lb+/p2vo0F11S5J1c29Mk1lgaOsapHLUkPRcFFCFfZ2nMQICFCOp3LzlKz6zu6XlGULvyuEa+OGmLd3ffXb31zZu2rgwWResWLCsyqm9vYqeuoDO08NUjhiSUZe9nWcQVfxUTXZe403rd7e0/A2hCRGusSeefuSjc1aNr59/S+IGz/PIDhfoPjTM2LZBdn7nCPlIKlu/ZMn63a2tf09owhyusX2vte392qd/+NWXvrmxwkuXGmoWxpP1DZXkKoXu9kImnV6wfndr65cJTYrwv2jXzpbZz+/+9IaGVe5v7n3lFF5Pw1P/8uL3XiD0/8O/fvulxqc/sf4BQqFQKBQKhUKhUCgUCoVCoVDokv8EmiOzndL3GbkAAAAASUVORK5CYII="
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAQuSURBVO3BW2xTZQDA8f/3nXPatVsv7MYmE7lNDEgAH0ww3pBAFIkSAX3wbvZAYjSRxEuMCWp8412JGhOMtygmCmxAIHEQjBoCY3TD3ckYbNJ1sPW2np6e8wlRCQzaDR66mvT3o6ioqKioqOh6sVhMbtq08UEKmOQW9fT0lvZ0db5JAdO4RSMl7Vvq17gaNm/YunP3rl0RCpDkFvmNisicpUHXr8cOLKdASSbRsO2R9158e90GJrh34ZqjXDKU6FpIgRLksOrhFffN3yAbo3tHhqtj7tNcTUHNR7ev6txxLhToccL8S0gphJCSCdK2TUtS7v/t2PFt5IlODjUy/rGjyoJ1CSPocct6rqYgncjg94plAbfkWg5XS6QtTvQNkfJVnCOPdLJ4bs3Kl4KElzgenRsS4MQzyBk6YJHN0FiCIx1nsMwUfl8F+aSTRbkz/tAM4ZYxj0asFjwRrmOdTqGZihuxHYf2oQu09Q4wXSTZpFO1JYaGdiqF/4kqknqGifSDCUpbMkyUSFs0d56lrXeA6STJQrrcYSkEVa0OetTG3TCTsaDNZAbHEjS1dHN+eITpJsmiN5buydgOJYZG+Z4UzoBJ7euzia0uIUmGiWzH4eS5CM2tXVimSSGQZLFi7ZON4fi4wyU+t0HdIZvk98NULg0y88O5mE/5iJY7KKVImBa/dJ6lrXeAQiLJ4t2t7x9LCz0ylrK4zOPSmX3ehe+TUWI/DVM6y4N7UyXt8VGaTnQTHh6h0OjkohhMmFa1LgSVZSW4NI0Sj4a/X5HuTbCva4CTnf0UKkkOyYwdRoBp25yPjZOyMiAEbk1i2Q4nO89wM6ThipJHkhySy4w5SikEoEvBhaRJOD5O0rI5czEGKKaqpG7evj0HDr5BHkly8M33VqYtB0eBo8DQJJqAi+Mmw4kUU+WdU9/4R6htbW1NTYY8kmQx/NcF6QnoRsLJoJQCFApQgEsTBDwupsK/YNHPoa7udWWlXkWeSbKoqil33B591KwQOAocBUop/lNq6EwmcOfdP7acOrWeaSLJwXAZIW15KY5SKAUKUPzD49LJQQUWLvnheFvbRqaRJIexfuObqqWBTNRno1AopUCBAjyGDkJwA8pfv/jb46HQ00wzSQ7b39r9Nba217W+nHFlc5lCcZlLk3i9Hq4lnbJ5d33V0t7+LAVAMolZkUdfDcwq+9N8JkBS2SjFFTNn+LlCaI73jvlftnZ0vECB0JjE3sb90QfuWX0osDi90lxkVMV74/gsDSEEIwmTwcgoSMNx1dZ93t7X10AB0ZiCw/uPhh9b9vIeddvQ4rL7/XPDWlowYGGOZ+gbSdpGdc1nHf39mykwgpv0znePf1C9wP2K0FTd71/0ZFp3Rbd39Pe/RgHSuElHdnY3b31+x6ft4eZgeNA5dLgptIWioqKiov+xvwESEruF4bzUgAAAAABJRU5ErkJggg=="
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAHhSURBVO3BPWsTYQAH8P/z3HOveWlSqkZrCyrdRCFVEUUp3aSTg+DiIAoiRQX7BfwAEpx004Lo4Oami7YRCr5Ao6EmmLZCpDFHr02beMn1krvHVBAeIjhcMoj098OO/9uJ46NX0GMUf3H2dvzy5NTVJHqIQTA+dnJ4+JR/P/rGyaItqjN9rfjh+s0zRyxCGSEEBG0brm9Oz2VSCIBBcIjZ9zRXnehTpQm0tT7/wIBBk5pKAHBsK1dtZFY2cwBSCIBBkCDK4doeBR6pQ+IE/oID2cEvnu8jV17Hx8I3yPEBBMUgkCipJwoc1Qt9cGdrUEwPEgDbbeLd1zJKZQvdYhBYjWZxxJSPGjMt2GNxbHhNmA9LePulhK16Hb3AIHBa/pJlO9grGRh85WHtewXpzCL+RDwERCFwxvXdnu+j6rioNLawtLqJTtSIVlg4kkJAFIL+g4ZcJx44AM45VEYhksKx9ci+wVsLy8uPEBCFQJG11zimc9/n4AAimoLfaChmhfcP3ZjP5R6jCxSCu5dePNBGY7ONIQLOOcKKjG1Uj6waicTkfDb7FF2i6MBWRi6y87vStdMKV1QJRAuZcrz/2qd8/hl6QEKH9Mv39syTwvS5O0nNPsBCi3ONqXyx+Bw7/lU/Acg3r0tBHdMgAAAAAElFTkSuQmCC"
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADRSURBVGMYWJA907EoqyhZioEIwMgABCnOurG88qwVPJIcbD+uffvK+onx3/13nz8sP3/HiQEHYGEAAikmNru/4qxa/67+YGD5xsBw4/lbhktP3r9hwAOYGIDg9ffft4SuMzBwa3IxHLz+mOHCrUcMQPCfAQ9gYgCCP0G8rB+//WT4ePwjw4vnbxkYWDl+M3FwLGbAA5gYgIBflHfvH222j+wszAwMLGy/WPj4+2+9el3MgAcwMwDBsfV3njrV6r//y/FP4+rpD7PvvHlbyTDoAAC/R0iRS+pfIgAAAABJRU5ErkJggg=="
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