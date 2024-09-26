/* eslint-disable */
import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,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' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAS/SURBVO3Bf4iUdR7A8ff3+3yfmWd2ZnNm1XX2l55Gau3d9UuxTeiioq6OypIuLjg7og6jriCD/KOgxETqjzy6O+LouD8KpSKIkAo6xNwiKqvNrutEyp+r+6N1d8fdZ2aeeZ7vpyzD3HZGk5jZYl4v6urq6urq6up+dF1dSx656ablN3CaNFOY157/ncwa+SWnSTNF7dr5mXf5ytnn/KIr3s5p0kxRW7a9Pl+74h3cOTrIBCvWLv3HHWuvW8ZJGKro5kWd/25JeR1UoBytlNL6/ef/FT9zTVal3i5ced8VS5ZynBzsHV+c7HQWAy9RgaGKenYf6Go7p2NBMm4oL+KowITYCNJBsDjuRnxXak+RcH6waOVvljz11BvvrKQMTRUVwog3PztIGAknNcMhLEa4WjORchWxuOEMXbo2N+5TjqbKDg0eZsfBLzgZPd0Q+hGOoziBgP11Am9ciGnb8uA9d15DGZoa2PF5L/uGx6ik4dOQ4sZBhBMNtluyi5to2F4g5igV5A63UoamRrb+bw+j+YBy3EjhDlq+Za0w1KnJ3tKG7c6R9g1WwE1lhilDUyM2DNm2q5dSZKlEBEanWUq3NtF2YyulVw+T3aUxWuOH4i+/7Y7/UIZDFaW92N1SCmZwTL5QJEDTnk6hFCcoRBH+2YbYDU20LmshHAowzwzTPOJitKYYRezLBfvvXbP+Mcow1NjOfYeYmfKY09TIeAbi5yZJLEzSelYjKMXIf0c58kQvLb6L63jgCMXQMjhWQDvOfiowTAFvfbqXoavmcP2jF1I4EuLv9Rl5vp/UJxEdXgzXSaDjikiEfBDRP+ZjRShiPqcCQxU5XkNg/TEmErHsfLePgdW7yWqP6TGD0XGcMxRKgYgQRJZcocSwX0SjsFbozRf3UYGmippaWp9BOZZJ2MN5TAFmNiZo9FwSroPRCitCrlii/0gePyhhtMKKkA8jZl07bQEVaKpoe0/P48m22e8oJteX89EKrBXypYjB8QL9uTx+EOI6Gq0VAliBfMIyc3aigwo0VZbtaF+nUhmfSQyM5RkYK9B3JM9IvohWiphxcJRCRBABEcGKEDY7KKWFCjRVtnVb9+aGTHozk0jGDMbReK4hZhyE44SviCCAFcGZEwfsCBVoauD2u+5e5U6f1ccEiZgB4TgBAQThKAGsQNFGNM5PMrpfd1OBpgZWrVp1IN3c/DQTJFzD9wkiIAJWQETI/cqQyjTsfmD53zZQgaZGPtjx8UPerPYevsMzDt8QREAQEL4mCCB8kQnJXtUc5of1Pxd2zg+oQFNDbXPnPuYk0wHHxI3DccJRAgjfGMyEpP+YRQKz6YnbXl3PSWhqaGt396Z4Ov06x8SNw2RCKxw409J0e6t1He+FdctfWcEp0NTYxZdcstqZNmNIgLhx+JYAIjDgBQz9IUn7LW1+OG7++vA1L/+eU+RQYz0ffTQwd968Vn9o4KJLF87GaE0QWg5lSoxe3UDTspkST8bf+/9rpb9sWLn5SX4AwxTw2pYt9y89/7zf9k8PF9gLXBo6MzTPiJdKefnw0Mf22cf/9NKTnAbFFHHZZV1/7rqncUN2XnrvyEDhg77t7nN/X/3iy/xcbNy4sY26urqfrC8BfK/qTkvAG6YAAAAASUVORK5CYII=' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAIUSURBVO3BT0hTcQDA8e/v997e/vg2p2mj2R9ECUGqi5ZQhw5F1CECs0PQoaBDHaQaRHQMOoRgdCg6FBJBENTFS12SkiBoBh4ihVSYf2LlcrHm2tve3i+LpMcID09v+fmwbp1bV9fuAz093e2sQLKG9pw1T2/Yl9/LCgQenOhoPx43/Z24CE0X0d76Q+kHC8lgjmy22Wnx7zBf3+192Y+LjgfvJqcPb2zbfKauxs9fJYpzBeq+WTs1KVDTNqWY1gn04yLxoFxxGJ6Yw7IruDkzFpoU/NYZIjprN50/2b0fF4lHC9kcydQXHKVYZiQtbE1RPmISNQxCaeH4QpEMLjqr8HHmM41mkOZ4LdquAP52E58UmMkiwVlFqlTJ3Lo38B4XHQ+kz3AcFvnlzXiKhmMdtDWG0YcswiVJqSJJFwoUypU0VSQeNGzZ9lCrieRYopQiO5ghPqKIlDTyls3XxSLlikNxux6hisSDkdHRYZ9pPuGP+fwPMosW360ytqMQQEUpVJNPUkXi0blLiYt6bX2KJeGAgSYlQgiUUjhAsUZhtoY+UEXiUSKRyAVro7eFL+CYhg9QKKVQQEl3EEej89iBG1SRrMLY1FSfbobfhgydZfmtAvtU/afQpsiFm2eevaKKzipFY7HrWkQ9znXooWKLkdPjwRcTz62rA9cGx/kHwRq4/OhgX6w1IiaHuH/nytMx/ms/AV7HvPReUAS5AAAAAElFTkSuQmCC' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAD2SURBVGOgO2BmIAJkTnGINXTQ4D63+84TBihgZMABjGTEYxyVxYrYWZgZGO25+f4e/vb1sxLjj6kzz5kzAAEzAw7AwvDfhYmBIV6Kn0uS4fMfIUYBJnEuLhYpXXWblacvXX3DxIADMDGx/L949ynDA64fDHz6fAxSEjwM7Lf/fZi6eOUNBiBgYsABRBWUNjBxcr94cPEdg/jl/wy/b/5k+Cjyj5EBCpgYcIAzFy7cZ+XmmcPGzPz/559/DH8Y/jMwaHLcZIACJgY84N7Ll7VSYryXfmgy//nhzXOEx0gknQEKWBgIAKl8hapfCnxMtVZrtzBQAwAAsRlIAhisAXIAAAAASUVORK5CYII=' )
];

export default mipmaps;