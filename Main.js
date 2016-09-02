main = null;
title = null;

var mainStart = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  main = new Main(canvas, ctx);

  main.canvas.addEventListener("mousemove", main.cursor.onMouseMove);
  main.canvas.addEventListener("mousedown", main.cursor.onMouseDownTitle);

  title = new Title();
  title.drawTitleTimerID = setInterval('title.drawTitle()', 16.6666666);
}

var Main = function (canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.cursor = new Cursor();
  return this;
}
