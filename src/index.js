import './css/style.css';

import favicon from './img/favicon.ico';

 import './js/app.js';

const fav = document.createElement('link');
fav.setAttribute('rel', 'shortcut icon');
fav.setAttribute('href', `.${favicon}`);
fav.setAttribute('type', 'image/x-icon');
document.head.appendChild(fav);

/* const ws = new WebSocket('ws://localhost:7070/ws');
ws.binaryType = 'blob'; // arraybuffer
ws.addEventListener('open', () => {
  console.log('connected');
  // After this we can send messages
  ws.send('hello!');
});
ws.addEventListener('message', (evt) => {
// handle evt.data
  console.log(evt.data);
});
ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
// After this we can't send messages
});
ws.addEventListener('error', () => {
  console.log('error');
});
 */