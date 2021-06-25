function sandsim() {
  window.addEventListener('keydown', input, false);
  class particle {
    constructor(id) {
      this.id = id;
      this.updated = false;
    }
  }

  var mousePos = {x : 0, y : 0},
      size = 10,
      scale = 4;

  canvas.addEventListener("mousemove", function (evt) {
      mousePos = MousePos(canvas, evt);
  }, false);

  function MousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
  }

  function input(key) {
    var p = 0;
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        if (key.key == "0") {
          p = 0;
        }
        else if (key.key == "1") {
          p = 1;
        }
        else if (key.key == "2") {
          p = 2;
        }
        else if (key.key == "3") {
          p = 3;
        }
        else if (key.key == "4") {
          p = 4;
        }
        else if (key.key == "5") {
          p = 5;
        }
        map[clamp(Math.floor(mousePos.y / scale) + i - size / 2, map.length - 1, 0)][clamp(Math.floor(mousePos.x / scale) + j - size / 2, map[0].length - 1, 0)] = new particle(p);
      }
    }
  }

  var map = new Array(Math.floor(canvas.height / scale + 1));
  for (var i = 0; i < map.length; i ++) {
    map[i] = new Array(Math.floor(canvas.width / scale + 1));
  }
  for (var y = 0; y < map.length; y ++) {
    for (var x = 0; x < map[0].length; x ++) {
          map[y][x] = new particle(0);
      }
  }

  main();

  var a = 0;

  function main() {
    a ++
    if (s.ss)requestAnimationFrame(main);
    if (a % 1 == 0) {
      update();
      render();
    }
  }

  function clamp(n, max, min) {
    if (n > max) {
      return max;
    }
    else if (n < min) {
      return min;
    }
    else {
      return n;
    }
  }

  function update() {
    for (var y = 0; y < map.length; y ++) {
      for (var x = 0; x < map[0].length; x ++) {
        if (map[y][x].id == 1) {
          updateSand(x, y);
        }
        else if (map[y][x].id == 2) {
          updateWater(x, y);
        }
        else if (map[y][x].id == 3) {
          updateGas(x, y);
        }
        else if (map[y][x].id == 5) {
          updateAcid(x, y);
        }
      }
    }
    for (var y = 0; y < map.length; y ++) {
      for (var x = 0; x < map[0].length; x ++) {
        map[y][x].updated = false;
      }
    }
  }

  function updateSand(x, y) {
    var r = Math.floor(Math.random() * 2) - 1;
    var r2 = Math.floor(Math.random() * 5);
    if (r == 0) {
      r = 1;
    }

    if (!map[y][x].updated && y < map.length - 1) {
      if (map[y + 1][x].id == 3) {
        map[y + 1][x] = map[y][x];
        map[y][x] = new particle(3);
        map[y + 1][x].updated = true;
      }
      else if (y < map.length - 1 && map[y + 1][x].id == 2 && !map[y + 1][x].updated && r2 == 1) {
        map[y + 1][x] = map[y][x];
        map[y][x] = new particle(2);
        map[y + 1][x].updated = true;
        map[y][x].updated = true;
      }
      else if (x > 0 && x < map[0].length - 1 && map[y][x + r].id == 2 && !map[y][x + r].updated && r2 == 3) {
        map[y][x + r] = map[y][x];
        map[y][x] = new particle(2);
        map[y][x + r].updated = true;
        map[y][x].updated = true;
      }
      else if (map[y + 1][x].id == 0) {
        map[y + 1][x] = map[y][x];
        map[y][x] = new particle(0);
        map[y + 1][x].updated = true;
      }
      else if (x > 0 && x < map[0].length - 1 && map[y + 1][x + r].id == 0) {
        map[y + 1][x + r] = map[y][x];
        map[y][x] = new particle(0);
        map[y + 1][x + r].updated = true;
      }
    }
  }

  function updateWater(x, y) {
    var r = Math.floor(Math.random() * 2) - 1;

    if (r == 0) {
      r = 1;
    }

    if (!map[y][x].updated) {
      if (y < map.length - 1 && map[y + 1][x].id == 0) {
        map[y + 1][x] = map[y][x];
        map[y][x] = new particle(0);
        map[y + 1][x].updated = true;
      }
      else if (y < map.length - 1 && x > 0 && x < map[0].length - 1 && map[y + 1][x + r].id == 0) {
        map[y + 1][x + r] = map[y][x];
        map[y][x] = new particle(0);
        map[y + 1][x + r].updated = true;
      }
      /*else {
        for (var i = 0; i < Math.abs(r); i ++) {
          if (x > 0 && x < map.length - 1 && map[y][x + r].id == 0) {
            map[y][x + r] = map[y][x];
            map[y][x] = new particle(0);
            map[y][x + r].updated = true;
          }
        }
      }*/
      else if (x > 0 && x < map[0].length - 1 && map[y][x + r].id == 0) {
        map[y][x + r] = map[y][x];
        map[y][x] = new particle(0);
        map[y][x + r].updated = true;
      }
    }
  }

  function updateGas(x, y) {
    var r = Math.floor(Math.random() * 2) - 1;
    if (r == 0) {
      r = 1;
    }

    var r2 = Math.floor(Math.random() * 10);

    if (!map[y][x].updated) {
      if (y > 0 && map[y - 1][x].id == 0) {
        map[y - 1][x] = map[y][x];
        map[y][x] = new particle(0);
        map[y - 1][x].updated = true;
      }
      else if (y > 0 && x > 0 && x < map[0].length - 1 && map[y - 1][x + r].id == 0) {
        map[y - 1][x + r] = map[y][x];
        map[y][x] = new particle(0);
        map[y - 1][x + r].updated = true;
      }
      /*else {
        for (var i = 0; i < Math.abs(r); i ++) {
          if (x > 0 && x < map.length - 1 && map[y][x + r].id == 0) {
            map[y][x + r] = map[y][x];
            map[y][x] = new particle(0);
            map[y][x + r].updated = true;
          }
        }
      }*/
      else if (x > 0 && x < map[0].length - 1 && map[y][x + r].id == 0) {
        map[y][x + r] = map[y][x];
        map[y][x] = new particle(0);
        map[y][x + r].updated = true;
      }
      else if (y > 0 && y < map.length - 1 && map[y - 1][x].id == 2 && r2 == 0) {
        map[y - 1][x] = new particle(3);
        map[y][x] = new particle(2);
        map[y - 1][x].updated = true;
        map[y][x].updated = true;
      }
      else if (y > 0 && y < map.length - 1 && map[y - 1][x].id == 2 && r2 == 1) {
        map[y][x] = new particle(2);
        map[y][x].updated = true;
      }
      else if (y > 0 && y < map.length - 1 && x > 0 && x < map[0].length - 1 && map[y][x + r].id == 2 && r2 == 1) {
        map[y][x] = new particle(2);
        map[y][x].updated = true;
      }
    }
  }

  function updateAcid(x, y) {
    var r = Math.floor(Math.random() * 2) - 1;
    var r2 = Math.floor(Math.random() * 100);
    if (r == 0) {
      r = 1;
    }

    if (!map[y][x].updated) {
      if (r2 < 5) {
        if (y < map.length - 1 && map[y + 1][x].id != 5) {
          map[y + 1][x] = map[y][x];
          map[y][x] = new particle(0);
          map[y + 1][x].updated = true;
        }
        else if (y > 0 && y < map.length - 1 && map[y - 1][x].id != 5 && map[y - 1][x].id != 0) {
          map[y - 1][x] = new particle(0);
          map[y - 1][x].updated = true;
        }
        else if (y < map.length - 1 && x > 0 && x < map[0].length - 1 && map[y + 1][x + r].id != 5 && map[y + 1][x + r].id != 0) {
          map[y + 1][x + r] = map[y][x];
          map[y][x] = new particle(0);
          map[y + 1][x + r].updated = true;
        }
        /*else {
          for (var i = 0; i < Math.abs(r); i ++) {
            if (x > 0 && x < map.length - 1 && map[y][x + r].id == 0) {
              map[y][x + r] = map[y][x];
              map[y][x] = new particle(0);
              map[y][x + r].updated = true;
            }
          }
        }*/
        else if (x > 0 && x < map[0].length - 1 && map[y][x + r].id != 5 && map[y][x + r].id != 0) {
          map[y][x + r] = map[y][x];
          map[y][x] = new particle(0);
          map[y][x + r].updated = true;
        }
      }
      else {
        if (y < map.length - 1 && map[y + 1][x].id == 0) {
          map[y + 1][x] = map[y][x];
          map[y][x] = new particle(0);
          map[y + 1][x].updated = true;
        }
        else if (y < map.length - 1 && x > 0 && x < map[0].length - 1 && map[y + 1][x + r].id == 0) {
          map[y + 1][x + r] = map[y][x];
          map[y][x] = new particle(0);
          map[y + 1][x + r].updated = true;
        }
        /*else {
          for (var i = 0; i < Math.abs(r); i ++) {
            if (x > 0 && x < map.length - 1 && map[y][x + r].id == 0) {
              map[y][x + r] = map[y][x];
              map[y][x] = new particle(0);
              map[y][x + r].updated = true;
            }
          }
        }*/
        else if (x > 0 && x < map[0].length - 1 && map[y][x + r].id == 0) {
          map[y][x + r] = map[y][x];
          map[y][x] = new particle(0);
          map[y][x + r].updated = true;
        }
      }
    }
  }

  function render() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var y = 0; y < map.length; y ++) {
      for (var x = 0; x < map[0].length; x ++) {
        if (map[y][x].id == 0) {
          c.fillStyle = "silver";
        }
        else if (map[y][x].id == 1) {
          c.fillStyle = "#CC9900";
        }
        else if (map[y][x].id == 2) {
          c.fillStyle = "blue";
        }
        else if (map[y][x].id == 3) {
          c.fillStyle = "grey";
        }
        else if (map[y][x].id == 4) {
          c.fillStyle = "black";
        }
        else if (map[y][x].id == 5) {
          c.fillStyle = "green";
        }
        c.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    c.font = "15px sans-serif";
    c.fillStyle = "black";
    c.fillText("0 : Clear   1: Sand    2: Water    3: Smoke    4: Wall    5: Acid", 1, 15);
  }
}
