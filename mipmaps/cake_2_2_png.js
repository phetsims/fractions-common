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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAVuSURBVO3B+49cZRnA8e/zvu85Z2ZnZ/be7dKWil2NSWktQtI0kBgErDURBWsQMRETQkwaSdTERI2WRP8CJGpEEyMVRdj4g1yqolsMpKkhsdCV1hYUhdCdGfc2tzPnzJzzuFsDXnC2XdTpbtzPh3Xr1q1bdwGEFdi79/pbKpXqyNGjx+7l33j4oYfHfnb8gX2DO6MdQ1v8saDHDnuBy4rRHlX1Tx0tHr7nk09+ji5xrEBhnPG43LyOo9zLou/df9+W49FP7tgw7u0Rq+PPVb+zafPuxJeqUvlNlXY5pj3XJq0kSKScfmX2ObrIsQJvvSYY3TW6dcc7dm/51PDb0tt+nzy0y7Wi3uLjDdJnQ3pCwXcWBATwAI+/EYSeKl3lWIE/PjMfX76vMKTBwjdmnmhKcCKm1ziywiIHHquK4wKUirPm7on9h6JmY79xRvwHF+gLPLCO1cxwHjOleTk4cfPhxkzl1p5Hqx6JkmRZMUVxxtJNhvP4wqGb7quWqzcMT0YMiEe7niBjjjfDGaGbDMv4wHXv+XBqmh/NHGuQNRYF4hcaOGNYCxzLyKelg2ryuYG6BY9z7GNV8qwNhg4+/t5rbx90uj3IWNYqQwcDafjuQQITZB3VMWEtMnQSN8eynsWdDMnfOEzDJaw1hg6sH5SMCCPPKq6S4t8xykJ/ylpi6ODFavxCO0nJOMvQI0305YiNd11K9fosDRLeDKG7DB3sef8HHy3VwhSBvO+x+cmE8Mdlhnb1M/rVy4huLlAZUpJEWa0sHfzyyJGz79p6yQHfkMv5jsBZCjWLOdZgvtwguyPP5pvGYHeOcMxQ1zbNmRiJFc8YEN5grhFNnZiem6BLHMtQ5dVa1NrgRBjpzeA7S+BZCn9S4hdrlO0s7asy9F6eY9OeYYKco7HQojbTpLXQoj3XojXXIo1TiJX4TBOO0zWOZTTaSanft0RJwnQ1ZCSXIed7eM6Q9Sx59Uh+q7SeqVON5inmU/TtPrLZJxjwyF6Ww9/pMM5gPUPzmAeHTtEtjmWE7/TeoqcTBHBGmG1E1OM2A1mfrO/wrCVwIAh9GZ9UleS0kp5KSTUi1SbtJCVJlVQVU5yjmxzL6N2WHY5/VyHjIFXwrMEYmA1jvKhF4FkKgY9vDdYITgwGAeF1qixSRIRiPaSbDB2Up2dtts959bRNqoqyREHBtwZnDarwl3qTYi2kVGsy24hotNskaUqqyhIjYEQwIlgRusnQwcjGwSTT481HQ4IqqCqqoCxRXhM4S+AszgpLKmHMdDWkWA0pVhsUayGlWkip1mA+jOgmwzKc507YK3KkqqiCAoqigCqvU/7Od5Ye35H1HBnPETiL7yyBtVhj6CbDMip/9h8Y2dnXruQTVBVVUAWUf6aAskj5R8rFZVjGtz7/0x+Q2sf9Dw0SkgDKEkVZoqxuhvPYVH7fgcIlvaeatxSoa4Iq5yjKElU6Uy4qw3ncdeCzL7efv/Qjw9v6TqZ3DlEutFAFFFDeQFk9DBfga5/55lRw/Op9QU/wi4EDm9JXrrEsaIvXKIryr5SLzXKBfn74iYXJQ6fvv/KGcTt6Rd82uTpXmNaQ1tmIXGoxRhABEUEEhCWCCOcIUKyFU0+9VJygSywr9PTEmSN3f+L7354qTfZvvHJgQ+baQn9xKyyYFvW5GBtCxloQFgkinCNAsRZOPfVScYIuEf4DtYWGfOWHt925+SqzP+ix28WmG+MwkcrZEC23kFIbO5tAU7GxcuYPcz/67mMnb6VLhP+SRjXi4Nc/vTez/dUb+8f88Uyvt8E6GRZDPk01I5J6zz9dfPCe23/9MbpE+B+rzoUUS8WgVJ7um5z8lXzpy18ssm7d/6+/AnO2SGv2BUP+AAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAIKSURBVO3BzUsUYRzA8e/zzOy0bm+2ma6EHsSQsFcKok5KQSehiPDUQYIgIugfiA526BJ0KLtlF4lOgUHUwUw79IKXSMjKsKwOwdriy87M7szz/AJPk9hl1CDo8+G/1aZYxomeY12lUrG159SFO1P5wXOOZw+Zn1Gz8k1exeSCcvXLtUvPD5OCyzIK+2T7zqb6i28n+i+7Y9EWxit4aFAsiqrxHCm5LHG+r+Os+TbbK1JTl3vqs0hpVosmoeto567w6/zVba+iOlOO+ROlSE2T0ECxd0NEQStFdjhgLWgSCtprdxo8jBLWiibB1covfAQ5XUu1QbEWXBKKQTS940dmb+5ZzEJHnsp6sNMVKq8XyMwKWitWyiUhiO2nYjmk0cnRNGwIxRC0Z5DuAr4HsbKAQvwYRsZJwyUh7KypNy8qzIVVYmPZmM3Q+EHjTMaIgBUhNsJCNSItTUK+JZfxlUEAQQgjw4xfoRRU8aOYyFq0Blcr0tIkeF52mIM1Yq1gBQRwlEIBVsBYiKwQGUtamoTrZx7fXnegdjRoUogIAgirS7NE5ntrt3OybnT+iCextfxOWCmHJUafjJVHBibvHr+yPxvu9prNVjZHpRgvAEcrlFJExs48fDd9kxQc/mCo//3QYN+bGy/to1K2c5Mp7XGl3JbRQZvrzLVQGnowdYu/YXLis3Nv4H4t/4pfUEzhSKqsvpoAAAAASUVORK5CYII="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAD1SURBVK3BsUrDQACA4f8ul9iCRVEotiAuCopgRxFEBPsACkInEYmCSGd9AGcHNx/FDoqrWzehiy4uFoux1Jr0cucNnYRGEb+PvxIMbR9Ul6K3zvTmcaliXuKK6Wrv/OQuZATFUHGue7g4nz+Kr54L3jtoY16BkBEUTri1sj/+mNS9ZBDILiAAQSaJU5b+er48FhAZfkvhtPuD1sKDj1qdpKdSEmGxqYVbRlI4eqfgR40PZpqS2VyALyWD1JBF4kwUCzd6OYi0scQ6JUkN2lqySJyLvet7VZ06623knuKSwGL5ieCby+Zu/bPdXxMdrU5rjRr/7QtlOFUiv9sSGgAAAABJRU5ErkJggg=="
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