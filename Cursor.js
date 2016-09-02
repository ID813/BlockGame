var Cursor = function () {
  this.x = 0;
  this.y = 0;
  this.sizeX = 50;
  this.sizeY = 20;
  return this;
}

Cursor.prototype.onMouseMove = function (event) {
  var rect = event.target.getBoundingClientRect();
  main.cursor.x = event.clientX - rect.left;
  main.cursor.y = event.clientY - rect.top;
}

Cursor.prototype.onMouseMoveGame = function (event) {
  if (game.pause) {
    return ;
  }
  var rect = event.target.getBoundingClientRect();
  main.cursor.x = event.clientX - rect.left;
  main.cursor.y = event.clientY - rect.top;
  if (main.cursor.x - main.cursor.sizeX / 2 < main.canvas.width / 12) {
    main.cursor.x = main.canvas.width / 12 + main.cursor.sizeX / 2;
  } else if (main.cursor.x + main.cursor.sizeX / 2 > main.canvas.width * 11 / 12) {
    main.cursor.x = main.canvas.width * 11 / 12 - main.cursor.sizeX / 2;
  }
}

Cursor.prototype.onMouseDownTitle = function (event) {
  if (title.startbuttonX < main.cursor.x && main.cursor.x < title.startbuttonX + title.startbuttonXSize &&
      title.startbuttonY < main.cursor.y && main.cursor.y < title.startbuttonY + title.startbuttonYSize) {
         clearTimeout(title.drawTitleTimerID);
         main.canvas.removeEventListener("mousedown", main.cursor.onMouseDownTitle, false);
         main.canvas.removeEventListener("mousemove", main.cursor.onMouseMove, false);
         main.canvas.addEventListener("mousemove", main.cursor.onMouseMoveGame);
         gameStart();
  }
}

Cursor.prototype.onMouseDownGame = function (event) {
  game.pause = !game.pause;
}

Cursor.prototype.onMouseDownGameOver = function (event) {
  if (gameover.restartbuttonX < main.cursor.x && main.cursor.x < gameover.restartbuttonX + gameover.restartbuttonXSize &&
      gameover.restartbuttonY < main.cursor.y && main.cursor.y < gameover.restartbuttonY + gameover.restartbuttonYSize) {
         main.canvas.removeEventListener("mousedown", main.cursor.onMouseDownGameOver, false);
         gameStart();
  } else if (gameover.titlebuttonX < main.cursor.x && main.cursor.x < gameover.titlebuttonX + gameover.titlebuttonXSize &&
             gameover.titlebuttonY < main.cursor.y && main.cursor.y < gameover.titlebuttonY + gameover.titlebuttonYSize) {
         main.canvas.removeEventListener("mousedown", main.cursor.onMouseDownGameOver, false);
         main.canvas.removeEventListener("mousemove", main.cursor.onMouseMoveGame, false);
         mainStart();
  }
}
