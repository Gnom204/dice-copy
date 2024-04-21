import Dice from "./dice.js";

export class DiceD30 extends Dice {
  constructor(
    diceSrc,
    place,
    template,
    diceValue,
    name,
    gameAlert,
    needImg,
    diceRender,
    pasivedice1,
    pasivedice2
  ) {
    super(diceSrc, place, template, diceValue, name);
    this.gameAlert = gameAlert;
    this.needImg = needImg;
    this.isRoll = true;
    this.diceRender = diceRender;
    this.canClick = true;
    this.pasivedice1 = pasivedice1;
    this.pasivedice2 = pasivedice2;
  }
  _rollDice(result, container) {
    if (this.canClick) {
      this.canClick = false;
      if (this.isRoll) {
        this.getResult();
        super._rollDice(result, container);
        this.isRoll = false;
      } else {
        this.place.firstElementChild.remove();
        this.diceRender();
        this.gameAlert.textContent = "";
        this.needImg.classList.add("blocked-dice");
        this.isRoll = true;
        this.pasivedice1.classList.remove("blocked-dice");
        this.pasivedice2.classList.remove("blocked-dice");
      }
      setTimeout(() => {
        this.canClick = true;
      }, 1000);
    }
  }
  getResult() {
    super.getResult();
    let res;
    console.log(res);
    let description = document.createElement("p");
    description.classList.add("description-ability");
    res = this._getDescription();
    setTimeout(() => {
      this.gameAlert.textContent = res.name;
      this.gameAlert.insertAdjacentElement("beforeend", description);
      description.textContent = res.description;
    }, 500);
  }
  _getDescription() {
    let res;
    switch (this.result) {
      case "1":
        res = {
          name: "Оглушение",
          description: "пропуск броска",
        };
        break;
      case "3":
        res = {
          name: "Оглушение (2)",
          description: "пропуск броска два раза подряд",
        };
        break;
      case "5":
        res = {
          name: "Назад дороги нет (5)",
          description:
            "невозможность ходить назад на протяжении пяти своих бросков",
        };
        break;
      case "7":
        res = {
          name: "Одноногий странник (2)",
          description:
            "каждый ход равен половине клетки на протяжении двух бросков",
        };
        break;
      case "9":
        res = {
          name: "Марионетка",
          description: "захват управления чужим броском и ходом",
        };
        break;
      case "11":
        res = {
          name: "Точка возврата",
          description: "возвращение назад на 15 клеток",
        };
        break;
      case "13":
        res = {
          name: "Занесенный странник",
          description:
            "отправление игрока на любую клетку в радиусе 10х10 клеток от него",
        };
        break;
      case "15":
        res = {
          name: "В минус один",
          description: "ход на одно значение меньше от выпавшего",
        };
        break;
      case "17":
        res = {
          name: "Один к одному",
          description:
            "ход на одну клетку в независимости от того, какое значение выпало",
        };
        break;
      case "19":
        res = {
          name: "Один к одному (3)",
          description:
            "ход три броска подряд на одну клетку в независимости от того, какое значение выпало",
        };
        break;
      case "21":
        res = {
          name: "Безвоздушная атака",
          description: "каждый ход наносит -10 ед. здоровья",
        };
        break;
      case "23":
        res = {
          name: "Принужденное отступление",
          description:
            "игрок ходит назад в зависимости от выпавшего значения того, кто наложил на игрока это отрицание",
        };
        break;
      case "25":
        res = {
          name: "Принужденное отступение (2)",
          description:
            "ход назад два броска подряд в зависимости от выпавшего значения того, кто наложил на игрока это отрицание",
        };
        break;
      case "27":
        res = {
          name: "Больная рулетка",
          description: "-50 ед. здоровья за каждый ход",
        };
        break;
      case "29":
        res = {
          name: "Жизнь или смерть",
          description:
            "от -100 до -400 ед. урона в зависимости от выпавшего значения (значение 1=100 ед. урона и т.д.)",
        };
        break;
      case "2":
        res = {
          name: "Режим скорости",
          description: "двойной бросок",
        };
        break;
      case "4":
        res = {
          name: "Диаго-шаг",
          description: "ход по диагонали",
        };
        break;
      case "6":
        res = {
          name: "Гиг-шаг",
          description: "ход через клетку",
        };
        break;
      case "8":
        res = {
          name: "Иммунитет свыше",
          description: "неуязвимость",
        };
        break;
      case "10":
        res = {
          name: "Целевой переброс",
          description:
            "перемещение в любую клетку в радиусе 10х10 клеток от себя",
        };
        break;
      case "12":
        res = {
          name: "Курс лечения",
          description: "+10 ед. здоровья в течение каждого хода",
        };
        break;
      case "14":
        res = {
          name: "В прошлое",
          description:
            "возвращение назад на столько клеток, сколько необходимо (но не более 10 клеток)",
        };
        break;
      case "16":
        res = {
          name: "Двойные действия",
          description:
            "применение одновременно двух усилений за бросок (не считая это усиление)",
        };
        break;
      case "18":
        res = {
          name: "Вынужденный привал",
          description: "возможность пропустить свой бросок",
        };
        break;
      case "20":
        res = {
          name: "Вынужденный привал(2)",
          description: "возможность пропустить два броска подряд",
        };
        break;
      case "22":
        res = {
          name: "Четыре икса",
          description: "выпавшие значения 1 и 2 умножаются на 4",
        };
        break;
      case "24":
        res = {
          name: "Безопасная дорога",
          description:
            "ход в любом направлении через любые препятствия (кроме стен)",
        };
        break;
      case "26":
        res = {
          name: "Дай пять",
          description: "ход на 5 клеток",
        };
        break;
      case "28":
        res = {
          name: "Дай пять(2)",
          description: "ход на пять клеток два броска подряд",
        };
        break;
      case "30":
        res = {
          name: "Реабилитация",
          description: "мгновенно +250 ед. здоровья",
        };
        break;
    }
    console.log({ res });
    return res;
  }
}
