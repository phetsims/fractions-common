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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAMoSURBVO3BW2hbZQDA8f93zpecZE2TJu1crbVWmVomQxBRw4pDYkGY0yCCL4oPDkHFB68UqRURBUEm3Rw+6MOcWBEnw5c+TBBtGUIvPgy6WbxRa9Ou0VxPLk3OOZ8dKFthydzQmOD5/XC5XC7Xvykavf3Q2NjYTpqYxmUa2GsMzOWODtPEJJdp+x1hrZSrXksT07gE+96457Gn3h16mQ3lYiWjeVSEJqbzN/x+JqOVrp8dxyi8UJlO74yGr9le6fa0hXp8/V8eWXibJiW4iHymyPDHe46byfxQeLJMO5Kzsu02nU/02tnXV39WurZYcvQFq6vnxOPDo5/fdustBZqA4CKePBh7L5/O7Nv2VQW/pvMX07YIj/RhvraEIXXOsm0bS0jTgWVbaYum0k/rvdd9/fTIqxM3Ddy4ToMJ6rh3950P9Txove9MZAJXVr2cz3IUzi4/+okSuiaoxbIc8hbZpVwpkTJCH0zNzL5Jg0jqCPnTw7YKBMJFHTxsIjUB35RBE5wjWLcszHKVfLlCulBmLZWlWiqEBIQ8fTfsoIEkNTyyZ+jRjmriZtuvA4oLqdoOhXWLfLlCplhmLZWjZOYRKBSbKRpPUkPATN3daRgiYVqU+yXeJUWxYpErVciV1klm8+QyWYRyUGymaA6SGrzKCmtCUvg2y1K6xJmZZZRdRQCKcxTNS1JDRVGc/mmF5akE51O0DkkNJ031fTGxQivTqGHX7ru+cJSmaGEaNbw4+sqksbUnRQvTqKErEnEUrNLCNOpQXu+q4J8h2rtM6fOt0UCSOq4Y3NK78gmXTACO7rdkR2RRGL5T/kh46tmXRg7H4/EkDSSpo3tHcFsCHYFNPQKwFUqGu5PC4/1OCwRmB2Ox8f0HDs7xp8l4nEaT1LEl5EEFDIRZ5EJE+1ZTM3w/CMN38qr+vokPPzv2aUcw6LBhev4U/zVBHc8cif0y89HC1YWpXxGAo/st2dG5KAxj3h+JTD03Mnr4/vv2/kaTEtTx8Ej0WLVcif54NLmgtbXNDsZi4/sPvDNHi5DUcej54w8IoQi+FVRsmJ4/jcvlcrlcLpfL9X/0B41KOPc1gF18AAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAFtSURBVO3BvUsCYRwH8O/v7jENLbUXNSghTGwIWypaDNoaIlybHRsam4Jagv6A6G1pCxoisoaIlqAXpIaarIgso0RQ0zPuLrUrh+ApguB6WfLzQcWfGh7rm8EPY/hEaGqgy2gv1Ta6DX5M40eJ+GBktj9EmdySZVca0poNdd05m6fT67XNrqxFFxfmn/FNBM5gX8DvDMhbzsOCSyRCodcEYV+GQEAJJGmgu6eiFjt7UA42T6KT0IGB01T9MGFSjS6RCGXigQy5UEReKSArqzVpSfalUhkfma1uAJPQgYHjKBk64o8q0kkJmbyCZDqLkipDw3sC9GPgHF8n1cTeLX6TAE5KwQ1+mQCOxsRLwteIMQU6CeC0DTsaNBB4hFdV5ifBUn8u2l2rxtb20fGZuQB0YuA4PBbxwl2L5/ijRmbrPTEWJWN1pMnrWQ5v75yi7C6BYDAIvRg46Stlw9XTkpOspvBu5Ggdb2IxVFT8Hy9SHntydgRKbQAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAC9SURBVGOgCogst/NnIBIwM0BBRoNFu4QQc5jRb9Ffk9dsuTp71sz/DHgAIwMQJLvpxglIsczm+MbA9uPFL4YP339/fvL+2/Wdd56YM+AALAxAwPzxj931b+/Z3t34yPDjy2cGIOBl4OBVYsADWBiA4NzzL3f+vHrCgAIYGf8x4AEsDECgny/HdK7j9f//v1lfMzIy3WJkYzvDJiq6muH9NQZcgIUBCH6+/7td3En1wY6Vl5cxwMDL1wzDBAAABztCbdjMU1EAAAAASUVORK5CYII="
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