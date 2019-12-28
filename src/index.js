import './css/style.css';
import favicon from './img/favicon.ico';
import './js/app.js';

const fav = document.createElement('link');
fav.setAttribute('rel', 'shortcut icon');
fav.setAttribute('href', `.${favicon}`);
fav.setAttribute('type', 'image/x-icon');
document.head.appendChild(fav);
