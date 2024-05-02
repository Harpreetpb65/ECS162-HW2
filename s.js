const blockSize = 25;
const totalRows = 17;
const totalCols = 17;
let board;
let context;

let gameOver = false;
let gameLoop; // Will be used to reference the game loop interval
let gameSpeed = 8;


class Snake {
  constructor() {
    this.body = [[5 * blockSize, 5 * blockSize]];
    this.xSpeed = blockSize; // Start moving to the right
    this.ySpeed = 0;
  }

  draw() {
    context.fillStyle = "white";
    for (let segment of this.body) {
      context.fillRect(segment[0], segment[1], blockSize, blockSize);
    }
  }

  update() {
    const head = [this.body[0][0] + this.xSpeed, this.body[0][1] + this.ySpeed];
    this.body.unshift(head);

    if (head[0] === food.x && head[1] === food.y) {
      food.place();
    } else {
      this.body.pop();
    }

    this.checkCollision();
  }

  checkCollision() {
    const [headX, headY] = this.body[0];

    if (headX < 0 || headX >= totalCols * blockSize || headY < 0 || headY >= totalRows * blockSize) {
      gameOver = true;
      return;
    }

    for (let i = 4; i < this.body.length; i++) {
      if (headX === this.body[i][0] && headY === this.body[i][1]) {
        gameOver = true;
        return;
      }
    }
  }

  changeDirection(newXSpeed, newYSpeed) {
    if (this.xSpeed !== 0 && newXSpeed !== 0) return;
    if (this.ySpeed !== 0 && newYSpeed !== 0) return;

    this.xSpeed = newXSpeed;
    this.ySpeed = newYSpeed;
  }
}

class Food {
  constructor() {
    this.place();
  }

  draw() {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, blockSize, blockSize);
  }

  place() {
    this.x = Math.floor(Math.random() * totalCols) * blockSize;
    this.y = Math.floor(Math.random() * totalRows) * blockSize;
  }
}

let snake = new Snake();
let food = new Food();

window.onload = function () {
  board = document.getElementById("snakeGame");
  board.height = totalRows * blockSize;
  board.width = totalCols * blockSize;
  context = board.getContext("2d");

  // Control buttons event listeners
  document.getElementById('up').addEventListener('click', () => snake.changeDirection(0, -blockSize));
  document.getElementById('down').addEventListener('click', () => snake.changeDirection(0, blockSize));
  document.getElementById('left').addEventListener('click', () => snake.changeDirection(-blockSize, 0));
  document.getElementById('right').addEventListener('click', () => snake.changeDirection(blockSize, 0));
  document.getElementById('restart').addEventListener('click', restartGame);
  document.getElementById('easy').addEventListener('click', function() { setDifficulty(15); });
  document.getElementById('medium').addEventListener('click', function() { setDifficulty(10); });
  document.getElementById('hard').addEventListener('click', function() { setDifficulty(5); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") snake.changeDirection(0, -blockSize);
    if (e.key === "ArrowDown") snake.changeDirection(0, blockSize);
    if (e.key === "ArrowLeft") snake.changeDirection(-blockSize, 0);
    if (e.key === "ArrowRight") snake.changeDirection(blockSize, 0);
  });

  gameLoop = setInterval(updateGame, 1000 / 10);
};

function updateGame() {
  if (gameOver) {
    clearInterval(gameLoop); // Stop the game loop
    displayGameOver();
    return;
  }

  context.fillStyle = "green";
  context.fillRect(0, 0, board.width, board.height);

  food.draw();
  snake.update();
  snake.draw();
}

function displayGameOver() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Game Over", board.width / 2 - 50, board.height / 2);
}

function restartGame() {
  gameOver = false;
  snake = new Snake();
  food = new Food();
  
  if (gameLoop) {
    clearInterval(gameLoop);
  }
  gameLoop = setInterval(updateGame, 1000 / gameSpeed);
  document.getElementById('startGame').disabled = false;
}

function setDifficulty(speed) {
    gameSpeed = speed;
    restartGame(); // Restart the game with the new speed
  }
