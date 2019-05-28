export default class Message {
  constructor(parent, name, mess) {
    this.parent = parent;
    this.name = name;
    this.mess = mess;
    this.messageConteiner = null;
    this.author = null;
    this.text = null;
  }

  create() {
    this.messageConteiner = document.createElement('div');
    this.author = document.createElement('div');
    this.text = document.createElement('div');

    this.messageConteiner.setAttribute('class', 'messageConteiner');
    this.author.setAttribute('class', '.author');
    this.text.setAttribute('class', 'text');

    this.parent.appendChild(this.messageConteiner);
    this.messageConteiner.appendChild(this.author);
    this.messageConteiner.appendChild(this.text);

   // this.author.innerHTML = `${this.mess.name}, ${this.mess.time}`;
    this.text.innerHTML = this.mess.message;

    if(this.name === this.mess.name){
      this.author.innerHTML = `You, ${this.mess.time}`;
      this.messageConteiner.classList.add('right')
      this.author.style.color = 'red';
    } else{
      this.author.innerHTML = `${this.mess.name}, ${this.mess.time}`;
      this.messageConteiner.classList.add('left')
      this.author.style.color = 'black';
    }


  }
  
}
