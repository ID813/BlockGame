var EffectFactory = function () {
  return this;
}

EffectFactory.prototype.makeEffect = function (type, x, y) {
  if (type == 0) {
    game.effect.push(new Effect(x, y));
  } else if (type == 1) {
    game.effect.push(new Effect2(x, y, 200));
  }
}

var Effect = function (x, y) {
  this.x = new Array();
  this.y = new Array();

  for (var i = 0; i < 4; i++) {
    this.x[i] = x;
    this.y[i] = y;
  }

  this.size = 5;
  this.flag = true;

  this.count = 0;
  this.speed = 2;

  return this;
}

Effect.prototype.move = function () {
  this.count++;

  this.x[0] += this.speed;
  this.y[0] += this.speed;
  this.x[1] += this.speed;
  this.y[1] -= this.speed;
  this.x[2] -= this.speed;
  this.y[2] += this.speed;
  this.x[3] -= this.speed;
  this.y[3] -= this.speed;

  if (this.count == 10) {
    this.flag = false;
  }
}

Effect.prototype.draw = function () {
  for (var i = 0; i < 4; i++) {
    main.ctx.fillRect(this.x[i], this.y[i], this.size, this.size);
  }
}

var Effect2 = function (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.speed = 3;
  this.flag = true;

  return this;
}

Effect2.prototype.move = function () {
  this.r -= this.speed;

  if (this.r < 0) {
    this.r = 0;
    this.flag = false;
    game.block.push(new Block(this.x - 10, this.y - 10, 90));
  }
}

Effect2.prototype.draw = function () {
  main.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
}
