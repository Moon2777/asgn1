// HelloPoint1.js
// Vertex shader program
var VSHADER_SOURCE =`
attribute vec4 a_Position;
uniform float u_Size;
void main() {
  gl_Position = a_Position;
  gl_PointSize = u_Size;
}`;

// Fragment shader program
var FSHADER_SOURCE =`
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}`;

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setUpWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  //gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function ConnectVariablesToGLS(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }

  // Get the storage location of attribute variable
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor variable
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if(!u_FragColor){
    console.log("Failed to get the location of u_FragColor");
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if(!u_Size){
    console.log("Failed to get the location of u_Size");
    return;
  }
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const ODDTRIANGLE = 3;

let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;

function addActionsForHtmlUI(){
  document.getElementById("green").onclick = function(){g_selectedColor = [0.0,1.0,0.0,1.0];};
  document.getElementById("red").onclick = function(){g_selectedColor = [1.0,0.0,0.0,1.0];};
  document.getElementById("clearButton").onclick = function(){g_shapeList = []; renderAllShapes();};

  document.getElementById("point").onclick = function(){g_selectedType = POINT};
  document.getElementById("triangle").onclick = function(){g_selectedType = TRIANGLE};
  document.getElementById("circle").onclick = function(){g_selectedType = CIRCLE};
  document.getElementById("drawing").onclick = function(){drawing()};

  document.getElementById("redSlider").addEventListener('mouseup', function(){g_selectedColor[0] = this.value/100;});
  document.getElementById("greenSlider").addEventListener('mouseup', function(){g_selectedColor[1] = this.value/100;});
  document.getElementById("blueSlider").addEventListener('mouseup', function(){g_selectedColor[2] = this.value/100;});

  document.getElementById("sizeSlider").addEventListener('mouseup', function(){g_selectedSize = this.value;});

}
function main() {
  //
  setUpWebGL();

  //
  ConnectVariablesToGLS();

  addActionsForHtmlUI();

 // Register function (event handler) to be called on a mouse press
 canvas.onmousedown = click;

 canvas.onmousemove = function(ev){if(ev.buttons == 1){click(ev)}};

 // Set the color for clearing <canvas>
 gl.clearColor(0.0, 0.0, 0.0, 1.0);

 // Clear <canvas>
 gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_shapeList = [];

function click(ev) {
  let [x,y] = covertCoordinateEventToGL(ev);

  let point;

  if(g_selectedType == POINT){
    point = new Point();
  }else if(g_selectedType == TRIANGLE){
    point = new Triangle();
  }else{
    point = new Circle();
  }

  point.position=[x,y];
  point.color=g_selectedColor.slice();
  point.size=g_selectedSize;
  g_shapeList.push(point);

 renderAllShapes();

}

function covertCoordinateEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

  // Store the coordinates to g_points array
  return([x, y]);
}

function renderAllShapes(){

  var startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapeList.length;
  for(var i = 0; i < len; i+=2) {
      g_shapeList[i].render();
  }

  var duration = performance.now() - startTime;
  sendTextToHtml("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), "numdot");
}

function sendTextToHtml(text, htmlID){
    var htmlElm = document.getElementById(htmlID);
    if(!htmlID){
      console.log('Failed to get ' + htmlID + "from HTML");
      return;
    }
    htmlElm.innerHTML = text;
}
