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
    pasivedice2,
    d30CanClick
  ) {
    super(diceSrc, place, template, diceValue, name);
    this.needImg = needImg;
    this.gameAlert = gameAlert;
    this.renderD30 = renderD30;
    this.pasivedice1 = pasivedice1;
    this.pasivedice2 = pasivedice2;
    this.d30CanClick = d30CanClick;
    this.canClick = true;
    this.img = document.createElement("img");
  }
  _rollDice(result, container) {
    if (this.canClick) {
      this.canClick = false;
      this._playSoundD6();
      super._rollDice(result, container);
      this.getResult();
      result.classList.remove("dice-green");
      result.classList.remove("dice-red");
      console.log(this.result);
      let can = setTimeout(() => {
        this.canClick = true;
      }, 1000);
      if (this.result === "—") {
        console.log("тире выпало");
        setTimeout(() => {
          result.textContent = "";
          result.classList.add("dice-red");
        }, 500);
      } else if (this.result === "5") {
        this.d30CanClick();
        clearTimeout(can);
        setTimeout(() => {
          result.textContent = "";
          result.classList.add("dice-green");
        }, 500);
        setTimeout(() => {
          this.canClick = true;
          this.place.firstElementChild.remove();
          this.renderD30();
          this.needImg.classList.remove("blocked-dice");
          this.pasivedice1.classList.add("blocked-dice");
          this.pasivedice2.classList.add("blocked-dice");
        }, 1800);
      }
      this.gameAlert.textContent = "";
    }
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
  _playSoundD6() {
    var audio = new Audio("../source/sounds/D6.mp4");
    audio.play();
  }
  getResult() {
    super.getResult();
  }
}
