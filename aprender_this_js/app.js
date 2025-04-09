class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor() {
        const btn = document.querySelector('button');
        this.names = ['Antonio', 'Myriam', 'Valentina'];
        this.currentName = 0;
        btn.addEventListener('click', this.addName.bind(this));
    }

    addName() {
        const name = new NameField(this.names[this.currentName]);
        this.currentName++;
        if (this.currentName >= this.names.length) {
            this.currentName = 0;
        }
    }
}

const gen = new NameGenerator();