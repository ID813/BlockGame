var GameOver = function () {
  this.count = 0;

  this.restartbuttonXSize = 100;
  this.restartbuttonYSize = 100;
  this.restartbuttonX = main.canvas.width / 4 - this.restartbuttonXSize / 2;
  this.restartbuttonY = main.canvas.height * 3 / 4 - this.restartbuttonYSize / 2;

  this.titlebuttonXSize = 100;
  this.titlebuttonYSize = 100;
  this.titlebuttonX = main.canvas.width * 3 / 4 - this.titlebuttonXSize / 2;
  this.titlebuttonY = main.canvas.height * 3 / 4 - this.titlebuttonYSize / 2;

  return this;
}

GameOver.prototype.drawGameOver = function () {
  main.ctx.beginPath();
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.fillRect(0, 0, main.canvas.width, this.count);
  main.ctx.stroke();

  if (this.count < main.canvas.height) {
    this.count += 8;
    setTimeout("gameover.drawGameOver()", 16.6666666);
  } else {
    setTimeout("gameover.drawGameOverMessage()", 16.6666666);
  }
}

GameOver.prototype.drawGameOverMessage = function () {
  main.ctx.font = "40px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(0, 0, 0)";
  main.ctx.textAlign = "center";
  main.ctx.fillText("Game Over!", main.canvas.width / 2, main.canvas.height * 1 / 4);
  main.ctx.font = "20px 'MSゴシック'";
  main.ctx.fillText(game.point + " points", main.canvas.width / 2, main.canvas.height / 2);
  main.ctx.fillText("もう一回", this.restartbuttonX + this.restartbuttonXSize / 2, this.restartbuttonY + this.restartbuttonYSize / 2);
  main.ctx.fillText("タイトルへ", this.titlebuttonX + this.titlebuttonXSize / 2, this.titlebuttonY + this.titlebuttonYSize / 2);

  main.ctx.beginPath();
  main.ctx.strokeStyle = "rgb(0, 0, 0)";
  main.ctx.strokeRect(this.restartbuttonX, this.restartbuttonY, this.restartbuttonXSize, this.restartbuttonYSize);
  main.ctx.stroke();

  main.ctx.beginPath();
  main.ctx.strokeStyle = "rgb(0, 0, 0)";
  main.ctx.strokeRect(this.titlebuttonX, this.titlebuttonY, this.titlebuttonXSize, this.titlebuttonYSize);
  main.ctx.stroke();
}
