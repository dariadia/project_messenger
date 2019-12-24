class Message {
  constructor(elementId) {
    this.elementId = elementId;
    this.text = "";
    this._init();
  }

  _init() {
    document.getElementById(this.elementId).addEventListener("input", () => {
      this.text = document.getElementById(this.elementId).value;
    });
  }
}

let message = new Message("input_message");
