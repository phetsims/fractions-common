/* eslint-disable */
import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,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' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAPrSURBVO3Bb0yUdQDA8e/v9zx393DccSDIIWaolWITIZO2bPSiaYvNtGmulTZdNd2abr1p+qoavWhNe2HTra02e5O9spVLJecLA2ea2lKmQ5gnBIL8Ue6A4/4+v1/5qmTcabIdV3s+HxwOh8PhcMyMF1evfpdpkOSpxtcbVo1Fw2uZBkmeqnxav/3C+6VPMQ2SPOWb5S71z/ZMMA2SPOUNWD6UGGEKm5ue3f/Oxy+v5z4EObRy8eMHlwf980wpyUSaphQgzK2+GiMlEvFvxjq4h9Z9TyRWFD9ZdG3P1mPP+P1+TQaCHKoO+NqLC8zFNfPKCRZ5EYIpCQTJt0pQHTE8p2NM1u9OIFYFcB/RXx44dW4bGUhyLDwSpvVyBz9f62F4PM5UlNK4/C7Sg0mmIkyByzLwiuSaweE7kgwMcqjMcu8gnSzjLxMTMbpuDRNJa4oKPFgug79pbEMhryQwlOAeGkbr3fiEgXU96Tvb2X2q9ZdzXUxBMsNu9g1w4sJVLnYPMp5Ic5cQAvNMDHdKMNnQI4qKFaV4zyfwmIYIXf5tKRlI8kTojz6On79K283bxFI2kymlubPUoGLTXFRrhJK4ia00C2vrO8hAkk+0oj3Uw7EL7bQPhEnairsifkVqSwmVr8wh+eMdKjolhpTEbCYaN7x6lgwMcqjMcu8gnSzjPrRSDN4OExoaRRomYv0sikwT17cjBCMuTClJ2jY9Y/GenR99socMJHksFY9xqbOLsx/+jv9wlCAWbsNAacXQeBwhzR6ykPwH2PEYLZ29GEKQtG0GxmMoNAmM62QhySHp9UV4SKGefnojUQbHYggEtq3pjcZvkIUkh7bt2r3BnFN1DNOyeQhpW+EyJFpr4mmbinVFy8jCIIeam5tHB8ORQ1XVSxK2TS3xaCEPyG1ZLF8wB6UhZWtGXClKGspGzv0QOkgGkhlwsa3t0wV1dY1m5fxWQPMAyksCCEBrjdKadLmBYUhBFpIZcvSnExfbbnQ971tUswdv8agguzJ/AUqDBpTWGI96UNoOk4Vkhl1oa9tVUbPsNTl77iWy8FtuQKM1JJTCt6iQyA3XSbKQ5IFTLS3Np69cXV6wsPorCgIxplDocaEBpTVjdSa+Em/3e+v2fkEWgjzTsHLlG8Oh6016ZOAx/mH9c3UUuk36i5IENgft8X5z977tx/eShSTPtJ45c+izg1/Xm5XzvxOWP8VdQuJ1mQwF0hS/GURq69C+7cf3ch+CPFZfW7tz/Fb/bisVrWzYsoTZa8q1TrkPf/DS9xt5AAZ5rG9g4NeNmzYdTcyPLgk2FAdJe/Y1rT2yjf+b/Z8fqMLhcDgcjn/nT4wrgeLre7z8AAAAAElFTkSuQmCC' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAHfSURBVO3Bz0uTYQAH8O/7PK/Pux/v1kuL+YuGSIZaRh0U3IogOkQEXTpEx04dokChU4iHoHIQEkX0L4TUxXBBhxx1EmIjsLFsCSqb9VrLLfdu7/u8TwUWL0MQ3g1P+3zQ0uJ06vToGHZB0EQnbwSvYBcyXBg9fOjScGdwmEj4j1CZUBuBsbMjcfzxo4f3siH13dOb8w/gQOGC36yOV4zK9ZCvLaZ5aEwhIsbAo+ZBEvJmKlEGHiVlc0Bo5MjL5x+m41P38Q+FCwcUdrFULJ7I5XX8soGAl4HJBJJugVQE/qqNeKCu8MCLmdfJVCa7jG0EDVpeKSCx8BHpVR1GvgaLCpjnVWiMwb8u2d19A6twIGgGIZD9soa5hQxSnhK0JY5wSqBU4/qdqfgnOBC4IDHFxA5sbiE3l0Mh/RPft6rYsngedQhcuHZ74hYNdTyTmK+GHWxWTZjchtFH96EOhQuJRKL6rVye6Y5ENmxLHIdpBOEwGOkAkynKR9nm+/m1aTgQNCC99PlJ+9CxM2R/+yvICsc2H5NhBATUXv8i6hA06E0ymV0srJ9j4c5JyRvcgCShzSuDXNB021Duog5Fk3wtFpM9/f1vlbA8GLnaRdUubfze5dlZ7IVHDx9raNkrvwGjk6a7IJJ0twAAAABJRU5ErkJggg==' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADYSURBVGMYnCB/jkslAxpgZMABtEWFY4xkBYtkBXkY/ttyCzAe+fbhozLj7/rWPeZiIkIMzAw4gCALo8vTpy/jfzAwSvJ/YBRkk2KV5OJikdqy7ujys5evvmViwAEYmVn+MQDBvYfPGXYcuc7w4s0XBvY7/z7MXLbyFgMQMDHgAJn1TdOZ+YSWMLKw//z//x/D2/tfGT4K/2NkgAJmBhxgx44df998/75eXEzs+f9/DPqKEvwCPHYCF4/tezyHAQhYGAiAa8+ezzXR19/N6stWx2csNoVhwAAAnHFGxlMyLZIAAAAASUVORK5CYII=' )
];

export default mipmaps;