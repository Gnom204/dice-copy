export default class Paint {
  constructor(template, place) {
    this.template = template;
    this.place = place;
    this.isMobile = false;
    this.drawing;
    this.isDraw = false;
    this.lastTime = true;
    this.time;
    this.times = [500, 1000, 1500, 2000, 2500, 3000];
    this.lineWid;
    this.lineInterval;
    this.downInterval;
    this.upperInterval;
  }
  _createPaint() {
    let width = window.innerWidth;
    if (width < 700) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.clone = this.template.content.cloneNode(true);
    this.canvas = document.createElement("canvas");
    this.canvas.width = 300;
    this.canvas.height = 250;
    this.container = this.clone.querySelector(".paint-container");
    this.ctx = this.canvas.getContext("2d");

    this.timer = this.clone.querySelector(".timer");
    this.second = this.clone.querySelector(".second");
    this.milSecond = this.clone.querySelector(".milsecond");
    this.reset = this.clone.querySelector(".reset");

    this._getRandomTime(this.times);
    let endTime = Date.now() + this.time;
    let remainingTime = endTime - Date.now();
    let futseconds = Math.floor(remainingTime / 1000);
    let futmilliseconds = remainingTime % 1000;

    this.second.textContent = `0${futseconds}`;
    this.milSecond.textContent = futmilliseconds;

    this.reset.addEventListener("click", () => this._reset());

    this.canvas.addEventListener("mouseup", (e) => this._stopDrawing(e));
    this.canvas.addEventListener("mousedown", (e) => this._startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this._draw(e));
    this.canvas.addEventListener("touchstart", (e) => this._startDrawing(e));
    this.canvas.addEventListener("touchmove", (e) => this._draw(e));
    this.canvas.addEventListener("touchend", (e) => this._stopDrawing(e));
    document.addEventListener("mouseup", (e) => {
      e.stopPropagation;
      if (this.isDraw) {
        this._stopDrawing(e);
      }
    });
    return this.clone;
  }
  renderPaint() {
    this.paint = this._createPaint();
    this.timer.insertAdjacentElement("afterend", this.canvas);
    this.place.appendChild(this.paint);
  }
  _draw(e) {
    e.preventDefault();
    if (!this.drawing) {
      return;
    }
    if (!this.lastTime) {
      return;
    } else {
      if (this.isMobile) {
        this.x =
          e.touches[0].pageX -
          this.canvas.parentNode.parentNode.offsetLeft -
          30;
        this.y =
          e.touches[0].pageY - this.canvas.parentNode.parentNode.offsetTop - 80;
      } else {
        this.x = e.pageX - this.canvas.parentNode.parentNode.offsetLeft;
        this.y = e.pageY - this.canvas.parentNode.parentNode.offsetTop - 98;
      }
      this._setLineWidth(e);
      console.log({ x: e.movementX, y: e.movementY });
      this.isDraw = true;
      this.ctx.lineTo(this.x, this.y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWid;
      this.ctx.moveTo(this.x, this.y);
    }
  }
  _startDrawing(e) {
    if (this.isMobile) {
      this.x =
        e.touches[0].clientX - this.canvas.parentNode.parentNode.offsetLeft;
      this.y =
        e.touches[0].clientY - this.canvas.parentNode.parentNode.offsetTop;
    } else {
      this.x = e.clientX - this.canvas.parentNode.parentNode.offsetLeft;
      this.y = e.clientY - this.canvas.parentNode.parentNode.offsetTop;
    }
    this.lineWid = 1;
    if (!this.isDraw) {
      this._countdownTimer(this.time);
      this.timerset = setTimeout(() => {
        this.lastTime = false;
      }, this.time);
    }

    this.drawing = true;
  }

  _countdownTimer(milliseconds) {
    console.log({ milliseconds });
    let endTime = Date.now() + milliseconds;

    this.timerInterval = setInterval(() => {
      let remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(this.timerInterval, this.lineInterval);
        this.second.textContent = "00";
        this.milSecond.textContent = "00";
        this.drawing = false;
      } else {
        let seconds = Math.floor(remainingTime / 1000);
        let milliseconds = remainingTime % 1000;
        this.second.textContent = seconds;
        this.milSecond.textContent = milliseconds;
      }
    }, 1); // Проверяем каждую миллисекунду
  }
  _getRandomTime(items) {
    this.time = 5000;
  }
  _reset() {
    this._getRandomTime(this.times);
    let endTime = Date.now() + this.time;
    let remainingTime = endTime - Date.now();
    let futseconds = Math.floor(remainingTime / 1000);
    let futmilliseconds = remainingTime % 1000;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lastTime = true;
    this.isDraw = false;
    this.drawing = false;

    clearInterval(this.timerInterval);
    clearInterval(this.upperInterval, this.downInterval, this.lineInterval);
    clearTimeout(this.timerset);
    this.second.textContent = `0${futseconds}`;
    this.milSecond.textContent = futmilliseconds;
  }

  again() {
    this.drawing = false;
    this.lastTime = true;
  }

  _stopDrawing() {
    this.drawing = false;
    if (this.lastTime) {
      this.lastTime = false;
      clearInterval(this.timerInterval);
      clearInterval(this.lineInterval);
      this.second.textContent = "00";
      this.milSecond.textContent = "00";
      this.drawing = false;
      this.ctx.fillStyle = "#d461618b";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.beginPath();
    this._getInfo();
  }
  _setLineWidth(e) {
    let { movementX, movementY } = e;
    if (movementX > 8 || movementY > 8 || movementX < -8 || movementY < -8) {
      // if (this.lineWid < 5) {
      //   this.lineWid += 0.5;
      // }
      // console.log("cashe больше линии");
      if (this.lineWid < 5) {
        this.lineWid += 0.3;
      }
      // this.upperInterval = setInterval(() => {
      //   if (this.lineWid < 5) {
      //     this.lineWid += 1;
      //   } else if (this.lineWid > 1) {
      //     this.lineWid -= 1;
      //   } else {
      //     clearInterval();
      //   }
      // }, 200);
    } else {
      if (this.lineWid > 1) {
        this.lineWid -= 0.3;
      }
      // if (this.lineWid > 1) {
      //   this.lineWid -= 0.5;
      // }
    }
  }
  _getInfo() {
    console.log({
      lastTime: this.lastTime,
      drawing: this.drawing,
      isDraw: this.isDraw,
    });
  }
  _getRundNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
