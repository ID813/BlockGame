var BlockFactory = function () {
  this.count = 0;
  this.level = 1;
  this.flag = true;
  this.time = 1500;
  this.speed = 2;
  return this;
}

BlockFactory.prototype.makeBlock = function () {

  if (this.flag) {

    if (this.count > 50) {
      if (this.level == 5) {
        this.level = 1;
        this.speed += 0.5;
        this.time /= 1.2;
        this.count = 0;
        this.flag = false;
        setTimeout("game.blockFactory.setFlag()", 2000);
        return ;
      }

      this.level++;
      this.count = 0;
      this.flag = false;
      setTimeout("game.blockFactory.setFlag()", 2000);
      return ;
    }

    if (this.level == 1) {
      this.count++;
      var x = Math.floor(Math.random() * main.canvas.width * 9 / 12) + main.canvas.width / 12;
      game.block.push(new Block(x, -10, 90));
      setTimeout("game.blockFactory.setFlag()", this.time);
    } else if (this.level == 2) {
      this.count++;
      var x = Math.floor(Math.random() * main.canvas.width * 9 / 12) + main.canvas.width / 12;
      var dir = Math.floor(Math.random() * 120) + 30;
      game.block.push(new Block(x, -10, dir));
      setTimeout("game.blockFactory.setFlag()", this.time);
    } else if (this.level == 3) {
      this.count += 2;
      var x = Math.floor(Math.random() * main.canvas.width * 9 / 12) + main.canvas.width / 12;
      var dir = Math.floor(Math.random() * 120) + 30;
      makeConsecutiveBlock(x, -10, dir, 5, 0);
      setTimeout("game.blockFactory.setFlag()", this.time * 3);
    } else if (this.level == 4) {
      this.count++;
      var x = Math.floor(Math.random() * main.canvas.width * 9 / 12) + main.canvas.width / 12;
      var dir = Math.floor(Math.random() * 120) + 30;
      makeDoubleBlock(x, -10, dir);
      setTimeout("game.blockFactory.setFlag()", this.time * 1.5);
    } else if (this.level == 5) {
      this.count++;
      var x = Math.floor(Math.random() * main.canvas.width * 9 / 12) + main.canvas.width / 12;
      var y = Math.floor(Math.random() * main.canvas.height * 2 / 12) + main.canvas.height / 12;
      game.effectFactory.makeEffect(1, x, y);
      setTimeout("game.blockFactory.setFlag()", this.time * 0.5);
    }

    this.flag = false;
  }
}

var makeConsecutiveBlock = function (x, y, dir, count, distanceX) {
  if (game.pause) {
    return ;
  }
  count--;
  game.block.push(new Block(x, y, dir));
  if (count > 0) {
    setTimeout("makeConsecutiveBlock(" + (x + distanceX) + "," + y + "," + dir + "," + count + "," + distanceX + ")", 300);
  }
}

var makeDoubleBlock = function (x, y, dir) {
  game.block.push(new Block(x - main.cursor.sizeX / 2, y, dir));
  game.block.push(new Block(x + main.cursor.sizeX / 2, y, dir));
}

var makeDoubleConsecutiveBlock = function (x, y, dir, count, distanceX) {
  if (game.pause) {
    return ;
  }
  count--;
  makeDoubleBlock(x, y, dir);
  if (count > 0) {
    setTimeout("makeDoubleConsecutiveBlock(" + (x + distanceX) + "," + y + "," + dir + "," + count + "," + distanceX + ")", 300);
  }
}

BlockFactory.prototype.setFlag = function () {
  if (game.pause) {
    setTimeout("game.blockFactory.setFlag()", 1000);
    return ;
  }
  this.flag = true;
}

var Block = function (x, y, dir) {
  this.x = x;
  this.y = y;
  this.size = 20;
  this.flag = true;
  this.speed = game.blockFactory.speed;

  var rad = dir * Math.PI / 180;
  this.moveX = Math.cos(rad) * this.speed;
  this.moveY = Math.sin(rad) * this.speed;

  return this;
}

Block.prototype.move = function () {
  this.x += this.moveX;
  this.y += this.moveY;

  if (main.cursor.x - main.cursor.sizeX / 2 < this.x + this.size &&
      this.x < main.cursor.x + main.cursor.sizeX / 2 &&
      main.canvas.height * 11 / 12 < this.y + this.size &&
      this.y < main.canvas.height * 11 / 12 + main.cursor.sizeY) {
        game.effectFactory.makeEffect(0, this.x + this.size / 2, this.y + this.size / 2);
        game.point += 100;
        this.flag = false;
        return ;
  }

  if (this.x < main.canvas.width / 12) {
    this.x = main.canvas.width / 12;
    this.moveX = -this.moveX;
  } else if(this.x + this.size > main.canvas.width * 11 / 12) {
    this.x = main.canvas.width * 11 / 12 - this.size;
    this.moveX = -this.moveX;
  }

  if (this.y > main.canvas.height + this.size) {
    game.missNum++;
    this.flag = false;
  }
}
