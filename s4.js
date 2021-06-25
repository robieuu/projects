function cgol() {
  window.addEventListener('mousedown', spawn, false);
  window.addEventListener('keydown', input, false);

  var mouse = {x : 0, y : 0},
      scale = 7

  canvas.addEventListener("mousemove", function (evt) {
      mouse = MousePos(canvas, evt);
  }, false);

  function input(key) {
    if (key.key == 'Enter') {
      update();
    }
  }

  function MousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
  }

  var grid = new Array(Math.ceil(canvas.width / 7));
  for (var i = 0; i < grid.length; i ++) {
    grid[i] = new Array(grid.length);
    for (var j = 0; j < grid.length; j ++) {
      grid[i][j] = 0;
    }
  }

  /*for (var y = 0; y < grid.length; y ++) {
    for (var x = 0; x < grid.length; x ++) {
      grid[y][x] = Math.floor(Math.random() * 2);
    }
  }*/

  main();

  var a = 0;

  function main() {
    a ++
    if (s.cg)requestAnimationFrame(main);
    if (a % 1 == 0) {
      render();
      c.font = "15px sans-serif";
      c.fillStyle = "black";
      c.fillText("Enter : Next Frame        Mousedown : Create Cell", 1, 15);
    }
  }

  function update() {
    for (var y = 0; y < grid.length; y ++) {
      for (var x = 0; x < grid.length; x ++) {
        if (x > 0 && x < grid.length - 1 && y > 0 && y < grid.length - 1) {
          var surround = 0;
          if (grid[y - 1][x - 1] > 0) {
            surround ++;
          }
          if (grid[y - 1][x] > 0) {
            surround ++;
          }
          if (grid[y - 1][x + 1] > 0) {
            surround ++;
          }
          if (grid[y][x - 1] > 0) {
            surround ++;
          }
          if (grid[y][x + 1] > 0) {
            surround ++;
          }
          if (grid[y + 1][x - 1] > 0) {
            surround ++;
          }
          if (grid[y + 1][x] > 0) {
            surround ++;
          }
          if (grid[y + 1][x + 1] > 0) {
            surround ++;
          }
          if (grid[y][x] == 1) {
            if (surround < 2 || surround > 3) {
              grid[y][x] = 2;
            }
          }
          if (grid[y][x] == 0) {
            if (surround == 3) {
              grid[y][x] = -1;
            }
          }

        }
      }
    }
    for (var y = 0; y < grid.length; y ++) {
      for (var x = 0; x < grid.length; x ++) {
        if (grid[y][x] == -1) {
          grid[y][x] = 1;
        }
        else if (grid[y][x] == 2) {
          grid[y][x] = 0;
        }
      }
    }
  }

  function spawn() {
    if (grid[clamp(Math.floor(mouse.y / scale), grid.length, 0)][clamp(Math.floor(mouse.x / scale), grid.length, 0)] == 0) {
      grid[clamp(Math.floor(mouse.y / scale), grid.length, 0)][clamp(Math.floor(mouse.x / scale), grid.length, 0)] = 1;
    }
    else {
      grid[clamp(Math.floor(mouse.y / scale), grid.length, 0)][clamp(Math.floor(mouse.x / scale), grid.length, 0)] = 0;
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

  function render() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var y = 0; y < grid.length; y ++) {
      for (var x = 0; x < grid.length; x ++) {
        if (grid[y][x] == 0) {
          c.fillStyle = "silver";
        }
        else {
          c.fillStyle = "black";
        }
        c.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      }
    }
  }
}
