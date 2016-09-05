game = null;
gameover = null;

var gameStart = function () {
  game = new Game();
  main.canvas.addEventListener("mousedown", main.cursor.onMouseDownGame);
  game.drawCountDown();
}

var Game = function () {
  this.point = 0;
  this.missNum = 0;
  this.pause = true;
  this.startCount = 3;

  this.timerID = -1;

  this.block = new Array();
  this.blockFactory = new BlockFactory();
  this.effect = new Array();
  this.effectFactory = new EffectFactory();
  return this;
}


Game.prototype.move = function () {

  for (var i = 0; i < game.effect.length; i++) {
    game.effect[i].move();
    if (!game.effect[i].flag) {
      game.effect.splice(i, 1);
      i--;
    }
  }

  for (var j = 0; j < game.block.length; j++) {
    game.block[j].move();
    if (!game.block[j].flag) {
      game.block.splice(j, 1);
      j--;
    }
  }
}

Game.prototype.update = function () {
  if (this.pause) {
    this.drawPause();
    return;
  }

  if (game.missNum == 12) {
    clearTimeout(game.timerID);
    gameover = new GameOver();
    setTimeout("gameover.drawGameOver()", 16.6666666);
    main.canvas.removeEventListener("mousedown", main.cursor.onMouseDownGame, false);
    main.canvas.addEventListener("mousedown", main.cursor.onMouseDownGameOver);
    return ;
  }

  this.blockFactory.makeBlock();
  this.move();
  this.draw();
}

Game.prototype.draw = function () {
  main.ctx.clearRect(0, 0, main.canvas.width, main.canvas.height);

  main.ctx.font = "20px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.textAlign = "right";
  main.ctx.fillText(this.point, main.canvas.width * 11 / 12 - 10, main.canvas.height - 20);

  main.ctx.beginPath();
  main.ctx.fillRect(main.cursor.x - main.cursor.sizeX / 2, main.canvas.height * 11 / 12,
                    main.cursor.sizeX, main.cursor.sizeY);
  main.ctx.stroke();

  for (var blockNO = 0; blockNO < game.block.length; blockNO++) {
    main.ctx.beginPath();
    main.ctx.fillRect(game.block[blockNO].x, game.block[blockNO].y, game.block[blockNO].size, game.block[blockNO].size);
    main.ctx.stroke();
  }

  for (var effectNO = 0; effectNO < game.effect.length; effectNO++) {
    main.ctx.beginPath();
    game.effect[effectNO].draw();
    main.ctx.stroke();
  }

  main.ctx.beginPath();
  main.ctx.fillRect(0, main.canvas.height * (12 - game.missNum) / 12,
                    main.canvas.width / 12, main.canvas.height - main.canvas.height * (12 - game.missNum) / 12);
  main.ctx.fillRect(main.canvas.width * 11 / 12, main.canvas.height * (12 - game.missNum) / 12,
                    main.canvas.width / 12, main.canvas.height - main.canvas.height * (12 - game.missNum) / 12);
  main.ctx.stroke();

  main.ctx.strokeStyle = "rgb(255, 255, 255)";
  main.ctx.moveTo(main.canvas.width / 12, 0);
  main.ctx.lineTo(main.canvas.width / 12, main.canvas.height);
  main.ctx.stroke();
  main.ctx.moveTo(main.canvas.width * 11 / 12, 0);
  main.ctx.lineTo(main.canvas.width * 11 / 12, main.canvas.height);
  main.ctx.stroke();
}

Game.prototype.drawPause = function () {
  main.ctx.font = "40px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.textAlign = "center";
  main.ctx.fillText("PAUSE", main.canvas.width / 2, main.canvas.height / 4);
}

Game.prototype.drawCountDown = function () {
  this.draw();

  main.ctx.font = "40px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.textAlign = "center";
  main.ctx.fillText(this.startCount, main.canvas.width / 2, main.canvas.height / 4);

  this.startCount--;
  if (this.startCount > 0) {
    setTimeout("game.drawCountDown()", 1000);
  } else {
    setTimeout("game.drawGameStart()", 1000);
  }

}

Game.prototype.drawGameStart = function () {
  this.draw();

  main.ctx.font = "40px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.textAlign = "center";
  main.ctx.fillText("START", main.canvas.width / 2, main.canvas.height / 4);

  setTimeout( function () {
    game.pause =false;
    game.timerID = setInterval('game.update()', 16.6666666);
  }, 1000);
}
