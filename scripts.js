import {
  generateQueryConstructor,
  randomNumber,
  randomInArray,
} from "./app/utils.js";
import matrixCharacters from "./characters/matrixCharacters.string.js";

class MatrixEffect {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }
  get ctx(){
    return this.canvas.getContext('2d');
  }
  build() {
    this.#buildCanvas();
    this.#buildSymbols();
    this.#buildAnimation();
  }
  #buildCanvas() {
    const { canvas, settings } = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.totalColumns = Math.round(canvas.width / settings.columnSize);
  }
  #buildSymbols() {
    this.symbols = [...new Array(this.totalColumns)].map((_, index) => {
      const randomY = randomNumber(
        0,
        Math.round(this.canvas.height / this.settings.columnSize)
      );
      const matrixSymbolSettings = {
        matrixEffect: this,
        text: randomInArray(matrixCharacters),
        x: index,
        y: randomY,
      };
      return new MatrixSymbol(matrixSymbolSettings);
    });
  }
  #buildAnimation() {}
}

class MatrixSymbol {
  constructor() {
     generateQueryConstructor.call(this, ...arguments);
  }
  draw(){
    const {canvas, ctx, settings: {columnSize, symbolsColors}} = this.matrixEffect;
    ctx.fillStyle = randomInArray(symbolsColors);
    const xPos = this.x * columnSize;
    const yPos = this.y * columnSize;

    ctx.fillText(this.text, xPos, yPos);
    this.#resetText();
    this.#resetYPos({yPos, canvas});
  }
  #resetText(){
    this.text = randomInArray(matrixCharacters);
  }
  #resetYPos({yPos, canvas}){
    const delayCondition = Math.random() > 0.98;
    this.y = (yPos > canvas.height && delayCondition) ? 0 : this.y + 1;
  }
}

class MatrixAnimate {
  constructor() {
    //generateQueryConstructor.call(this, ...arguments);
  }
}

const canvas = document.getElementsByTagName("canvas")[0];

const matrixEffect = new MatrixEffect({
  canvas,
  settings: {
    columnSize: 15,
    symbolsColors: ['lightgreen'],
  },
});

matrixEffect.build();

console.log(matrixEffect.symbols);
