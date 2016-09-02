var Title = function () {
  this.count = 0;
  this.drawTitleTimerID = -1;
  this.startbuttonXSize = 250;
  this.startbuttonYSize = 100;
  this.startbuttonX = main.canvas.width / 2 - this.startbuttonXSize / 2;
  this.startbuttonY = main.canvas.height * 3 / 4 - this.startbuttonYSize / 2;
  return this;
}

Title.prototype.drawTitle = function () {
  main.ctx.clearRect(0, 0, main.canvas.width, main.canvas.height);

  main.ctx.font = "40px 'MSゴシック'";
  main.ctx.textBaseline = "middle";
  main.ctx.fillStyle = "rgb(255, 255, 255)";
  main.ctx.textAlign = "right";
  main.ctx.fillText("ブロック", this.count, main.canvas.height * 1 / 4);
  main.ctx.textAlign = "left";
  main.ctx.fillText("ゲーム", main.canvas.width - this.count, main.canvas.height / 2);
  main.ctx.textAlign = "center";
  main.ctx.fillText("Game Start", main.canvas.width / 2, main.canvas.height * 3 / 4);
  main.ctx.font = "20px 'MSゴシック'";
  main.ctx.textAlign = "right";
  main.ctx.fillText("制作 ID", main.canvas.width - 10, main.canvas.height - 20);

  main.ctx.beginPath();
  main.ctx.strokeStyle = "rgb(255, 255, 255)";
  main.ctx.strokeRect(this.startbuttonX, this.startbuttonY, this.startbuttonXSize, this.startbuttonYSize);
  main.ctx.stroke();

  if (this.count < main.canvas.width / 2) {
    this.count += 3;
  }
}
