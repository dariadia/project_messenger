class Message {
  constructor(elementId) {
    this.elementId = elementId;
    this.text = "";
    this.variants = [];
    this.patterns = [];
    this.matches = [];
    this._init();
  }

  // message patterns to be analysed [message template]
  createPatterns(...text) {
    this.patterns = text;
  }

  // variants for a pattern [message variants]
  createVariants(...variants) {
    this.variants = variants;
  }

  // searches if any variant is present in the currently displayed text
  analyseText() {
    this.setMatches(
      this.variants.map(variant =>
        variant.item.map(e => this.searchTextForPattern(e))
      )
    );
  }

  searchTextForPattern(pattern) {
    let regex = new RegExp(pattern, "g");
    return this.text.match(regex);
  }

  setMatches(arr) {
    this.matches = arr.toString().match(/[^,]+/gi);
  }

  _init() {
    document.getElementById(this.elementId).addEventListener("input", () => {
      this.text = document.getElementById(this.elementId).value;
      this.createPatterns(
        `Hello!
          I'm Tim, manager of the betting site 22BET.
          We offer our referral program.
          We pay up to 40% and high CPA.
          Interested?`,

        `Hello!
          I'm Tim, manager of the betting site 22BET.
          Lorem ipsum dolor sit amet 
          consectetur adipisicing elit.
          Interested?`
      );
      this.createVariants(
        { item: ["Hello", "Hi", "Hi there"] },
        { item: ["I'm Tim", "My name's Tim"] }
      );

      this.analyseText();
    });
  }
}

let message = new Message("input_message");
document.getElementById("info").innerHTML = `Highlighting these:
    { item: ["Hello", "Hi", "Hi there"] },
    { item: ["I'm Tim", "My name's Tim"] }`;
