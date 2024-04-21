class Dice {
  constructor(diceSrc, place, template, diceValue, name) {
    this.template = template;
    this.diceSrc = diceSrc;
    this.diceValue = diceValue;
    this.place = place;
    this.name = name;
    this.result;
    this.dice;
    this.isEvent;
    this.resultNode;
    this.cooldown = true;
    // this.objSymbols = objSymbols;
  }
  _createDice() {
    const clone = this.template.content.cloneNode(true);
    const container = clone.querySelector(".dice-container");
    container.id = this.name;
    const img = clone.querySelector(".dice-img");
    img.src = this.diceSrc;
    img.alt = "Кубик";

    const result = clone.querySelector(".dice-result");
    this.resultNode = result;
    result.textContent = "";
    container.addEventListener("click", () => {
      this._rollDice(result, container);
    });

    return clone;
  }
  renderDice() {
    this.dice = this._createDice();
    this.place.appendChild(this.dice);
    console.log({ place: this.place, dice: this.dice });
  }
  _rollDice(result, container) {
    if (this.cooldown) {
      this.cooldown = false;
      container.classList.add("dice-active");
      result.textContent = "";
      result.classList.remove("dice-red");
      result.classList.remove("dice-green");
      let randomNum = this._getRandomNum(1, this.diceValue.length + 1);
      let resValue = this.diceValue[randomNum - 1];
      this.result = resValue;
      this.getResult();
      setTimeout(() => {
        container.classList.remove("dice-active");
        result.textContent = resValue;
        setTimeout(() => {
          this.cooldown = true;
        }, 200);
      }, 500);
    }
  }

  _getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  getResult() {
    return this.result;
  }
  getDice() {
    return this.dice;
  }
  setResult(res) {
    this.result = res;
  }
}

export default Dice;
