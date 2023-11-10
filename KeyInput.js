class KeyInput {
    constructor(){
        this.keys = {};
        window.addEventListener("keydown", this.down.bind(this));
        window.addEventListener("keyup", this.up.bind(this));
    }

    isPressed() {}
    down(e) {
        this.keys[e.keyCode] = true;
    }
    up() {}
}

const KeyInput = new KeyInput();

export default KeyInput;