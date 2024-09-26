/* eslint-disable */
import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,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' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAATmSURBVO3BW2xb9R3A8e///z/nJCexkzRN04aGrmkLDMKdqtLUbohboYyNatweuAhQEQgE0iZtQkhQhnjZA+IBTas2EAKtA8GmcWlLu00i6fpQNmgJSbq0aQIhadLaSZrE8bGP7XN+gBAo6rCTImEbyZ8PFRUVFRXftQ0b1j/IHMeGjluUEYtvKe35rL9y7a0P/X7jGa3t7jq0rHnuv/cIsJoyofgWHnzmhgca2oI7lM6tjx+ewZ0Uwi4PN6Ukp53Omkt/cv/Tzzx7hBJTnIb7frdpS8OK7CPp2fT5Qbenmjc1M759jEXHFXP5ASMzdvSJbf/494uUkGEBjh+Lm9TZB7arau/XyX2TLQ17fRWZUKiLXPyYT3VcmMvS1FUFmWsvW73yzPcGR3ZQIoZ5TMSm1JN/v2m3N564MbJ71iyeMhit+IKcW00uHeAMB5xKKyw7zK5d19a66YK16z784NDhUYrMMI/p5f95Pnly+ubmdzPUKou5gpU24mjs/gzfRCmFraTVSU5vvnDNqsz7g8PvUUSGAn521ZU31ZyTetzqnHUWic2psk0a1WRj9foUYjS1dpC5ym1cag2OneigSCwKiEpsKzpa25A0YPN/7H0pBA+UopBkJsf+gTHHiyxuo4gs8rhj4xV3NxBrD12LfLTic4pCxqY99vV9Ss5PE4ksppgs8mgMU5cvUlU64RoSLQp3nNMShELv2CQ9A8MoSkOTTybdUm0bzKE0dT9fgmcFLFQyk6Pj8Ai9A8MoSkeTh3aqYkYplnSFWDMBVVuWMt0QMp/RaY9dB/uJxScoNU0eA4nM0WwQUm0bGnekCYd9Wh5ZQeIaF4+AUwWh8NGxCTq6jpDzfcqBJo8fXX/jzthsKuRzUcemtTPAey1O00UNLH2qDf8Xdcw0CiKQ9HO8e3iE3oFhFOVDk8djW5/8IKOs8el0FhS4jsWKEw7RP0yReCNO7XIX55YmjmYT7Pqwn3h8gnJjUYgwmvSzzZZSNEWqcYyh2jXUDQmZgSR7Ph6hq+cTFOVJU4CXC2Io8IOAE4kU6WwOlKLKaLJBSFfPEIqFEcA4zgxFpCnAu9heKSIowNKKSc8nNpvCywZ8ejKBQlgIAapbV+3e8c9//ZIi0hQQXV3TlMmGhAKhgG00RsHJlE88mWYhBKhZedbO/d0917csW5ajiDR5xI5ParfespNhDhEBBEEQBMco6l2H+QhQt+a8N7uP9N8Qra0RikyTR/OyxrDKtab8xYpQIBQQ4Wu1tkUhAtSfff7fDh46tJkS0RRgO3a3uaSWUAQREED4kutYCN9MQOrPueD1Az09N1NCmgKmh5y/LLmwPjcTDRAEEQEBAVzbAqU4lYDUndX+yoHu7lspMU0B237z1nZC846zuZGUBHxB+JJjNDU1LnMJOoys+uGfD/b23k4Z0Mxj+fh1D9Uvj/zPv60eTwJE+NrSRXV8RZQJa36w+uWuvr67KBOGebyzc8/Mjy+9urO+PXOFf569ZHZglmjWoJRiIukzOj6FaDt0Wlqf7x0c3EIZMSzA3j3vxzZdfM8OOWOsPbKhri1mMorhLOlUjsEJL7Cbl/2pb2joAcqM4jQ9+upPf9u8pupeZaR1/wtHc11vz2zrGxp6mDJkOE37/trfsfXOl/7YE+toiI8GnXt39fyKioqKiorvsc8Avj4HbT5MIXAAAAAASUVORK5CYII=' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAIcSURBVO3BPWgTYRwH4N//vTd3+biEGEyTmliwuNVBohVBQasuGUREBBdxEBG0IujYRXESxFHdWhAd3ETEj6G2FSzxu1qN4WiLqdXUhsYmJrleevdqhMARxOGSwaHPg1XtRviH3u2bzyUH4py46LmYvH8MbUD4ixOXk73ecHXAzalPTxUD7k81QUJK/eBq/43HT1+hBRKanLq2+zgVioO+4Z8JxcsULKxAKYIkQlwxjQPbuuP6+MzX53BIgs3+vX2blEBpKDxe63CZBNNHIL8EljNRxwgqh7Uv0RXtSn3O3YMDHDYRyl/yGEpUIkId+2gAEAARGr6XKvKLL0s74RCHTSfJPaWIDJNqkASBCL8R6kxLIJ1bxDttFjy4Fk4x2EiMKlFNAIeDMCKEhrJRw5g2h/faLAitYbDJV2tZzzwQHVlBcFcIy4cCmCuV8XBiBrlcHu3AYaOvWFP5so5OyYvYsInFbwWMvtZAaEJkwiEGG32Pp8O0LBR1A4XqMqYWlkBo4g0UuOq/CocYbELdXleFTAgAQliQOYMdqcFFdV3s7Ifp6UE4xGAjuzxPsNUjLEtAAPC7ZTSQL5hXY/Ezb9Ppm2gBg82Vow+uu7cER6vrCUIAquzCHx7/gjcSOf1mcvI2WsTQhM9tPMIPhsdKO2QhKxKE2zfP14ROTmQyd9AGEpqMPXpZHrmlDSUvJNzlDZJPe6afz2Szd7Hqf/ULqre+a4mYQyYAAAAASUVORK5CYII=' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADtSURBVGOgCjAxN7Cp2+qdzkAEYGSAgoxGi3Z+Jsbk/5e/i7C8YTjzg5Elv2/vmeMMOAATAxAkO+vFc937WcR69oco619GRmYmBtPPX74sZcADWBiAQJqJ1eavFCvb/9c/GP7/+Mdw9cUHhktP3vMy4AFMDEDw+vvvW0LXGRi49XkYDt15xnDp1iMGRgaG/wx4ABMDEPwJ4mX9+O0nw8fjHxlePHvDwMDK8ZuRg2MxAx7AxAAEfKJ8e/9os31kZ2FmYGBh+8XMx99/69XrYgY8gJkBCI6vv/PUqVb//V+OfxpXTn+YffvN20qGQQcAKdBQggmHCeUAAAAASUVORK5CYII=' )
];

export default mipmaps;