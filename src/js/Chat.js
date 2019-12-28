import Message from './message.js';

export default class Chat {
  constructor(parent) {
    this.parent = parent;
    this.name = null;
    this.divName = null;
    this.divMes = null;
    this.divChat = null;
    this.divMesForm = null;
    this.form = null;
    this.input = null;
    this.regMes = null;
    this.regForm = null;
    this.regInput = null;
    this.regLabel = null;
    this.regButton = null;
    this.ws = null;
    this.mes = null;
    this.mesForm = null;
    this.mesLabel = null;
    this.mesButtonOk = null;
    this.mesButtonCanc = null;
  }

  registration() {
    this.regMes = document.createElement('div');
    this.regForm = document.createElement('form');
    this.regInput = document.createElement('input');
    this.regLabel = document.createElement('label');
    this.regButton = document.createElement('button');
    this.regMes.setAttribute('class', 'regMes');
    this.regForm.setAttribute('class', 'regForm');
    this.regInput.setAttribute('class', 'regInput');
    this.regLabel.setAttribute('class', 'regLabel');
    this.regButton.setAttribute('class', 'regButton');
    document.body.appendChild(this.regMes);
    this.regMes.appendChild(this.regForm);
    this.regForm.appendChild(this.regLabel);
    this.regForm.appendChild(this.regInput);
    this.regForm.appendChild(this.regButton);
    this.regLabel.innerHTML = 'Выберите имя';
    this.regButton.innerHTML = 'Продолжить';
    this.regListeener();
  }

  regListeener() {
    this.regButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.regInput.value !== '') {
        this.name = this.regInput.value;
        this.regInput.value = '';
        this.regMes.parentNode.removeChild(this.regMes);
        this.wsCreate();
      } else {
        this.regInput.value = 'Введите имя';
      }
    });
  }

  chat() {
    console.log('Начать Чат');
    this.divName = document.createElement('div');
    this.divMes = document.createElement('div');
    this.divChat = document.createElement('div');
    this.divMesForm = document.createElement('div');
    this.form = document.createElement('form');
    this.input = document.createElement('input');

    this.divName.setAttribute('class', 'divName');
    this.divMes.setAttribute('class', 'divMes');
    this.divChat.setAttribute('class', 'divChat');
    this.divMesForm.setAttribute('class', 'divMesForm');
    this.form.setAttribute('class', 'chatForm');
    this.input.setAttribute('class', 'chatInput');

    this.parent.appendChild(this.divChat);
    this.divChat.appendChild(this.divName);
    this.divChat.appendChild(this.divMesForm);
    this.divMesForm.appendChild(this.divMes);
    this.divMesForm.appendChild(this.form);
    this.form.appendChild(this.input);

    this.inputEventListener();
    this.ws.send(JSON.stringify({ type: 'messageAll' }));
  }

  inputEventListener() {
    this.input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.input.value != '') {
          this.ws.send(JSON.stringify({ type: 'message', name: this.name, message: this.input.value }));
          this.input.value = '';
        }
      }
    });
  }

  wsCreate() {
    this.ws = new WebSocket('ws://chat11-server.herokuapp.com/ws');
    this.ws.binaryType = 'blob'; // arraybuffer
    this.ws.addEventListener('open', () => {
      console.log('connected');
      this.ws.send(JSON.stringify({ type: 'input', name: this.name }));
    });
    this.ws.addEventListener('message', (evt) => {
      const message = JSON.parse(evt.data);
      if (message.type === 'input') {
        if (message.name) {
          this.chat();
        } else {
          this.mess();
        }
      } else if (message.type === 'message') {
        const mess = new Message(this.divMes, this.name, message);
        mess.create();
      } else if (message.type === 'messageAll') {
        const messages = message.message;
        for (const mess of messages) {
          const messOld = new Message(this.divMes, this.name, mess);
          messOld.create();
        }
      } else if (message.type === 'online?') {
        this.ws.send(JSON.stringify({ type: 'online', name: this.name }));
      } else if (message.type === 'online') {
        this.divName.innerHTML = '';
        for (const name of message.message) {
          const nameOnline = document.createElement('p');
          nameOnline.innerHTML = name;
          nameOnline.style.marginLeft = '10px';
          if (name === this.name) {
            nameOnline.innerHTML = 'You';
            nameOnline.style.color = 'red';
          }
          this.divName.appendChild(nameOnline);
        }
      }

      this.divMes;
    });
    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });
    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  mess() {
    this.mes = document.createElement('div');
    this.mesForm = document.createElement('form');
    this.mesLabel = document.createElement('label');
    this.mesButtonOk = document.createElement('button');
    this.mesButtonCanc = document.createElement('button');
    this.mes.setAttribute('class', 'regMes');
    this.mesForm.setAttribute('class', 'regForm');
    this.mesLabel.setAttribute('class', 'regLabel');
    this.mesButtonOk.setAttribute('class', 'regButton');
    this.mesButtonCanc.setAttribute('class', 'regButton');
    document.body.appendChild(this.mes);
    this.mes.appendChild(this.mesForm);
    this.mesForm.appendChild(this.mesLabel);
    this.mesForm.appendChild(this.mesButtonOk);
    this.mesForm.appendChild(this.mesButtonCanc);
    this.mesLabel.innerHTML = 'Пользователя с таким именем не существует. Добавить?';
    this.mesButtonOk.innerHTML = 'Добавить';
    this.mesButtonCanc.innerHTML = 'Отмена';
    this.mesListener();
  }

  mesListener() {
    this.mesButtonOk.addEventListener('click', (event) => {
      event.preventDefault();
      this.mes.parentNode.removeChild(this.mes);
      this.ws.send(JSON.stringify({ type: 'registration', name: this.name }));
    });

    this.mesButtonCanc.addEventListener('click', (event) => {
      event.preventDefault();
      this.mes.parentNode.removeChild(this.mes);
    });
  }
}
