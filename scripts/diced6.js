import Dice from "./dice.js";

export class DiceD6 extends Dice {
  constructor(
    diceSrc,
    place,
    template,
    diceValue,
    name,
    needImg,
    gameAlert,
    renderD30,
    pasivedice1,
    pasivedice2
  ) {
    super(diceSrc, place, template, diceValue, name);
    this.needImg = needImg;
    this.gameAlert = gameAlert;
    this.renderD30 = renderD30;
    this.pasivedice1 = pasivedice1;
    this.pasivedice2 = pasivedice2;
    this.img = document.createElement("img");
  }
  _rollDice(result, container) {
    console.log(this.result);
    super._rollDice(result, container);
    this.getResult();
    result.classList.remove("dice-green");
    console.log(this.result);
    if (this.result === "—") {
      console.log("тире выпало");

      console.log(result);
      setTimeout(() => {
        result.textContent = "";
        result.classList.add("dice-red");
      }, 500);
    } else if (this.result === "5") {
      setTimeout(() => {
        result.textContent = "";
        result.classList.add("dice-green");
      }, 500);
      setTimeout(() => {
        this.place.firstElementChild.remove();
        this.renderD30();
        this.needImg.classList.remove("blocked-dice");
        this.pasivedice1.classList.add("blocked-dice");
        this.pasivedice2.classList.add("blocked-dice");
      }, 800);
    }
    this.gameAlert.textContent = "";
  }
  _getRandomNum() {
    let random = Math.random().toFixed(2);
    console.log(random);
    if (random <= 0.08) {
      return "5";
    } else if (random <= 0.2) {
      return "6";
    } else if (random <= 0.4) {
      return "1";
    } else if (random <= 0.6) {
      return "2";
    } else if (random <= 0.8) {
      return "3";
    } else if (random <= 1) {
      return "4";
    }
  }
  getResult() {
    super.getResult();
  }
}
