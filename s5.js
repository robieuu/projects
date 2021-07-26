function render3d() {
  var cx = canvas.width / 2,
      cy = canvas.height / 2,
      dist = 1000,
      objects = [],
      sens = 0.1;

  window.addEventListener('keydown',input,false);

  class model {
    constructor(v, f) {
      this.vertices = v;
      this.faces = f;
    }
  }

  class Vertex {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  var objects = []
  objects.push(new model(loadModel(car).v, loadModel(car).f))
  objects.push(new model(loadModel(wolf).v, loadModel(wolf).f))
  objects.push(new model(loadModel(monkey).v, loadModel(monkey).f))


  var x1 = 0, y1 = -0.5, z1 = -10;
  var m = 1;

  main();

  function main() {
    if (s.td)requestAnimationFrame(main);
    console.log('a')
    c.clearRect(0, 0, innerWidth, innerHeight)
    if (m == 3){renderFace(objects[2]);}
    if (m == 2){renderFace(objects[1]);}
    if (m == 1){renderFace(objects[0]);}
    c.font = "15px sans-serif";
    c.fillStyle = "black";
    c.fillText("1 / 2 / 3 : Models     WASD : Move      Arrow Keys : Rotate", 1, 15);
  }

  function loadModel(model) {
    var values = model.split("\n"),
        vertices = [],
        faces = [],
        swap = false;
    for (var i = 0; i < values.length; i ++) {
      var v = values[i].split(" ");
      if (v[0] == "v") {
        vertices.push(new Vertex(parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])));
      }
      else if (v[0] == "f") {
        if (v.length == 4) {
          faces.push([parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])]);
        }
        else if (v.length == 5) {
          faces.push([parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3]), parseFloat(v[4])]);
        }
      }
    }
    return {v : vertices, f : faces};
  }

  function input(key) {
    var dist = 10,
        rotx = 0

    if (key.key == 1) {
      m = 1
    }
    if (key.key == 2) {
      m = 2
    }
    if (key.key == 3) {
      m = 3
    }

    if (key.key == "w") {
      z1 -= 0.1;
    }
    if (key.key == "s") {
      z1 += 0.1;
    }
    if (key.key == "a") {
      x1 += 0.1;
    }
    if (key.key == "d") {
      x1 -= 0.1;
    }
    for (var o = 0; o < objects.length; o ++) {
      for (var i = 0; i < objects[o].vertices.length; i ++) {
        if (key.key == "ArrowUp") {
          var y = objects[o].vertices[i].y,
              z = objects[o].vertices[i].z;
          objects[o].vertices[i].z = z * Math.cos(0.1) - y * Math.sin(0.1);
          objects[o].vertices[i].y = z * Math.sin(0.1) + y * Math.cos(0.1);
        }
        if (key.key == "ArrowDown") {
          var y = objects[o].vertices[i].y,
              z = objects[o].vertices[i].z;
          objects[o].vertices[i].z = z * Math.cos(-0.1) - y * Math.sin(-0.1);
          objects[o].vertices[i].y = z * Math.sin(-0.1) + y * Math.cos(-0.1);
        }
        if (key.key == "ArrowLeft") {
          var x = objects[o].vertices[i].x,
              z = objects[o].vertices[i].z;
          objects[o].vertices[i].x = x * Math.cos(0.1) - z * Math.sin(0.1);
          objects[o].vertices[i].z = x * Math.sin(0.1) + z * Math.cos(0.1);
        }
        if (key.key == "ArrowRight") {
          var x = objects[o].vertices[i].x,
              z = objects[o].vertices[i].z;
          objects[o].vertices[i].x = x * Math.cos(-0.1) - z * Math.sin(-0.1);
          objects[o].vertices[i].z = x * Math.sin(-0.1) + z * Math.cos(-0.1);
        }
      }
    }
  }

  function renderVertex(object) {
    for (var i = 0; i < object.vertices.length; i ++) {
      var v = object.vertices[i]
      c.beginPath();
      c.arc(Math.ceil(v.x * dist / v.z) + cx, Math.ceil(v.y * dist / v.z) + cy, 1, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    }
  }

  function renderEdge(object1) {
    var object = new Cube();
    for (var i = 0; i < object1.vertices.length; i ++) {
    var x = object1.vertices[i].x + x1,
        z = object1.vertices[i].z + z1,
        y = object1.vertices[i].y + y1;

    //object.vertices[i].x = x * Math.cos(rz) - y * Math.sin(rz);
    //object.vertices[i].y = x * Math.sin(rz) + y * Math.cos(rz);

    object.vertices[i].x = x * Math.cos(ry) - z * Math.sin(ry);
    object.vertices[i].z = x * Math.sin(ry) + z * Math.cos(ry);

    object.vertices[i].z += z * Math.cos(rx) - y * Math.sin(rx);
    object.vertices[i].y = z * Math.sin(rx) + y * Math.cos(rx);

    }
    for (var i = 0; i < object.edges.length; i ++) {
      var v1 = object.vertices[object.edges[i][0]],
          v2 = object.vertices[object.edges[i][1]]
      c.beginPath();
      c.moveTo(Math.ceil((v1.x + x1) * dist / (v1.z + z1))  + cx, Math.ceil(v1.y * dist / (v1.z + z1)) + cy);
      c.lineTo(Math.ceil((v2.x + x1) * dist / (v2.z + z1))  + cx, Math.ceil(v2.y * dist / (v2.z + z1)) + cy);
      c.stroke();
    }
  }

  function renderFace(object) {
    for (var i = 0; i < object.faces.length; i ++) {
      var v1 = object.vertices[object.faces[i][0] - 1],
          v2 = object.vertices[object.faces[i][1] - 1],
          v3 = object.vertices[object.faces[i][2] - 1]
      if (object.faces[i].length == 4) {
        var v4 = object.vertices[object.faces[i][3] - 1];
      }
      else if (object.faces[i].length == 5) {
        var v5 = object.vertices[object.faces[i][4] - 1];
      }
      if (i == 0)c.fillStyle = "red"
      if (i == 1)c.fillStyle = "green"
      if (i == 2)c.fillStyle = "blue"
      if (i == 3)c.fillStyle = "orange"
      if (i == 4)c.fillStyle = "yellow"
      if (i == 5)c.fillStyle = "purple"
      c.beginPath();
      c.moveTo(Math.ceil((v1.x + x1) * dist / (v1.z + z1))  + cx, Math.ceil((v1.y + y1) * dist / (v1.z + z1)) + cy);
      c.lineTo(Math.ceil((v2.x + x1) * dist / (v2.z + z1))  + cx, Math.ceil((v2.y + y1) * dist / (v2.z + z1)) + cy);
      c.lineTo(Math.ceil((v3.x + x1) * dist / (v3.z + z1))  + cx, Math.ceil((v3.y + y1) * dist / (v3.z + z1)) + cy);
      if (object.faces[i].length == 4) {
        c.lineTo(Math.ceil((v4.x + x1) * dist / (v4.z + z1))  + cx, Math.ceil((v4.y + y1) * dist / (v4.z + z1)) + cy);
      }
      if (object.faces[i].length == 5) {
        c.lineTo(Math.ceil((v5.x + x1) * dist / (v5.z + z1))  + cx, Math.ceil((v5.y + y1) * dist / (v5.z + z1)) + cy);
      }
      c.lineTo(Math.ceil((v1.x + x1) * dist / (v1.z + z1))  + cx, Math.ceil((v1.y + y1) * dist / (v1.z + z1)) + cy);
      c.stroke();
    }
  }
}
