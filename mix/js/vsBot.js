import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.149.0/build/three.module.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight, ambiLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;
var ballRotationSpd = { x: 0.2, y: 0, z: 0 }

// game-related variables
var score1 = 0, score2 = 0;
// you can change this to any positive whole number
var maxScore = 5;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

// Key
window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,

  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,

  isDown: function (keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function (event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function (event) {
    delete this._pressed[event.keyCode];
  }
};


function setupVsHuman() {
  // update the board to reflect the max score for match win
  //document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";

  // now reset player and opponent scores
  score1 = 0;
  score2 = 0;

  // set up all the 3D objects in the scene	
  createScene();

  // and let's get cracking!
  drawVsHuman();

}
window.setupVsHuman = setupVsHuman; // globalizeing function method 1



window.setupVsBot = () => { // globalizeing function method 2
  // update the board to reflect the max score for match win
  // document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
  var mainWindow = document.getElementById('main-window');;
  mainWindow.innerHTML = '<p>VS Bot Game Loaded</p>';
  // now reset player and opponent scores
  score1 = 0;
  score2 = 0;

  // set up all the 3D objects in the scene	
  createScene();

  // and let's get cracking!
  drawVsBot();

}

function createScene() {
  // set the scene size
  var WIDTH = 600,
    HEIGHT = 400;

  // set some camera attributes
  var VIEW_ANGLE = 90,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 1000;

  var c = document.getElementById("main-window");

  // create a WebGL renderer, camera and a scene
  renderer = new THREE.WebGLRenderer();
  camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

  scene = new THREE.Scene();

  // add the camera to the scene
  scene.add(camera);

  // set a default position for the camera
  camera.position.z = 320;




  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  c.appendChild(renderer.domElement);

  // set up the playing surface plane 
  var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 10;

  // create the paddle1's material
  var paddle1Material =
    new THREE.MeshLambertMaterial(
      {
        color: 0xffffff, // white
      });


  // create the paddle2's material
  var paddle2Material =
    new THREE.MeshLambertMaterial(
      {
        color: 0xFF4045, // red
      });

  // create the table's material	
  var planeMaterial =
    new THREE.MeshLambertMaterial(
      {
        // color: 0x4BD121, //green
        //color: 0x00BFFF, // blue
        color: 0xA020F0, // purple
        wireframe: true // the gridline
      });
  // create the plane's material
  var tableMaterial =
    new THREE.MeshLambertMaterial(
      {
        color: 0x111111
      });

  var groundMaterial =
    new THREE.MeshLambertMaterial(
      {
        //color: 0x888888,
        transparent: true,
        opacity: 0
      });

  // create the playing surface plane
  var plane = new THREE.Mesh(

    new THREE.PlaneGeometry(
      planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
      planeHeight,
      planeQuality,
      planeQuality),

    planeMaterial);

  scene.add(plane);
  plane.receiveShadow = true;

  var table = new THREE.Mesh(

    new THREE.BoxGeometry(
      planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
      planeHeight * 1.03,
      100,				// an arbitrary depth, the camera can't see much of it anyway
      planeQuality,
      planeQuality,
      1),

    tableMaterial);
  table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
  scene.add(table);
  table.receiveShadow = true;

  // // set up the sphere vars
  // increase 'segment' and 'ring' values will increase graphic quality
  var radius = 10,
    segments = 32,
    rings = 16;

  // // create the sphere's material
  var sphereMaterial =
    new THREE.MeshBasicMaterial(
      {
        map: new THREE.TextureLoader().load('./assets/moon.jpg'),
        transparent: true,
        opacity: 0.75
      });

  // Create a ball with sphere geometry
  ball = new THREE.Mesh(

    new THREE.SphereGeometry(
      radius,
      segments,
      rings),

    sphereMaterial);

  // // add the sphere to the scene
  scene.add(ball);

  ball.position.x = 0;
  ball.position.y = 0;
  // set ball above the table surface
  ball.position.z = radius;
  ball.receiveShadow = true;
  ball.castShadow = true;

  // // set up the paddle vars
  paddleWidth = 10;
  paddleHeight = 30;
  paddleDepth = 10;
  paddleQuality = 1;

  paddle1 = new THREE.Mesh(

    new THREE.BoxGeometry(
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleQuality,
      paddleQuality,
      paddleQuality),

    paddle1Material);

  // add the paddle to the scene


  scene.add(paddle1);
  paddle1.receiveShadow = true;
  paddle1.castShadow = true;

  paddle2 = new THREE.Mesh(

    new THREE.BoxGeometry(
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleQuality,
      paddleQuality,
      paddleQuality),

    paddle2Material);

  // // add the sphere to the scene
  scene.add(paddle2);
  paddle2.receiveShadow = true;
  paddle2.castShadow = true;

  // set paddles on each side of the table
  paddle1.position.x = -fieldWidth / 2 + paddleWidth;
  paddle2.position.x = fieldWidth / 2 - paddleWidth;

  // lift paddles over playing surface
  paddle1.position.z = paddleDepth;
  paddle2.position.z = paddleDepth;

  // finally we finish by adding a ground plane
  // to show off pretty shadows
  var ground = new THREE.Mesh(

    new THREE.BoxGeometry(
      1000,
      1000,
      3,
      1,
      1,
      1),

    groundMaterial);
  // set ground to arbitrary z position to best show off shadowing
  ground.position.z = -132;

  ground.receiveShadow = true;
  scene.add(ground);

  // create a point light
  pointLight =
    new THREE.PointLight(0xF8D898);

  // set its position
  pointLight.position.x = -1000;
  pointLight.position.y = 0;
  pointLight.position.z = 1000;
  pointLight.intensity = 2.9;
  pointLight.distance = 10000;
  // add to the scene
  scene.add(pointLight);

  ambiLight = new THREE.AmbientLight(0xffffff, 4);
  scene.add(ambiLight);


  // add a spot light
  // this is important for casting shadows
  spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 460);
  spotLight.intensity = 1.5;
  spotLight.castShadow = true;
  scene.add(spotLight);

  // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
  renderer.shadowMap.enabled = true;

  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();


}

function drawVsHuman() {
  // draw THREE.JS scene
  renderer.render(scene, camera);
  // loop draw function call
  requestAnimationFrame(drawVsHuman);

  ballPhysics();
  paddlePhysics();
  cameraPhysics();
  playerPaddleMovement();
  player2PaddleMovement(); // Vs Human

}

function drawVsBot() {
  // draw THREE.JS scene
  renderer.render(scene, camera);
  // loop draw function call
  requestAnimationFrame(drawVsBot);

  ballPhysics();
  paddlePhysics();
  cameraPhysics();
  playerPaddleMovement();
  opponentPaddleMovement(); // vs Bot

}

function ballPhysics() {
  // if ball goes off the 'left' side (Player's side)
  if (ball.position.x <= -fieldWidth / 2) {
    // CPU scores
    score2++;
    // update scoreboard HTML
    document.getElementById("scores").innerHTML = score1 + "-" + score2;
    // reset ball to center
    resetBall(2);
    matchScoreCheck();
  }

  // if ball goes off the 'right' side (CPU's side)
  if (ball.position.x >= fieldWidth / 2) {
    // Player scores
    score1++;
    // update scoreboard HTML
    document.getElementById("scores").innerHTML = score1 + "-" + score2;
    // reset ball to center
    resetBall(1);
    matchScoreCheck();
  }

  // if ball goes off the top side (side of table)
  if (ball.position.y <= -fieldHeight / 2) {
    ballDirY = -ballDirY;
  }
  // if ball goes off the bottom side (side of table)
  if (ball.position.y >= fieldHeight / 2) {
    ballDirY = -ballDirY;
  }

  // update ball position over time
  ball.position.x += ballDirX * ballSpeed;
  ball.position.y += ballDirY * ballSpeed;

  // limit ball's y-speed to 2x the x-speed
  // this is so the ball doesn't speed from left to right super fast

  if (ballDirY > ballSpeed * 2) {
    ballDirY = ballSpeed * 2;
  }
  else if (ballDirY < -ballSpeed * 2) {
    ballDirY = -ballSpeed * 2;
  }
}

// Handles CPU paddle movement and logic
function opponentPaddleMovement() {
  // Lerp towards the ball on the y plane
  paddle2DirY = (ball.position.y - paddle2.position.y) * difficulty;

  // in case the Lerp function produces a value above max paddle speed, we clamp it
  if (Math.abs(paddle2DirY) <= paddleSpeed) {
    paddle2.position.y += paddle2DirY;
  }
  // if the lerp value is too high, we have to limit speed to paddleSpeed
  else {
    // if paddle is lerping in +ve direction
    if (paddle2DirY > paddleSpeed) {
      paddle2.position.y += paddleSpeed;
    }
    // if paddle is lerping in -ve direction
    else if (paddle2DirY < -paddleSpeed) {
      paddle2.position.y -= paddleSpeed;
    }
  }
}



// Handles player's paddle movement
function playerPaddleMovement() {
  // move left
  if (Key.isDown(Key.A)) {
    // if paddle is not touching the side of table
    // we move
    if (paddle1.position.y < fieldHeight * 0.45) {
      paddle1DirY = paddleSpeed * 0.5;
    }
    // else we don't move and stretch the paddle
    // to indicate we can't move
    else {
      paddle1DirY = 0;
      paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
    }
  }
  // move right
  else if (Key.isDown(Key.D)) {
    // if paddle is not touching the side of table
    // we move
    if (paddle1.position.y > -fieldHeight * 0.45) {
      paddle1DirY = -paddleSpeed * 0.5;
    }
    // else we don't move and stretch the paddle
    // to indicate we can't move
    else {
      paddle1DirY = 0;
      paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
    }
  }
  // else don't move paddle
  else {
    // stop the paddle
    paddle1DirY = 0;
  }

  paddle1.scale.y += (1 - paddle1.scale.y) * 0.2;
  paddle1.scale.z += (1 - paddle1.scale.z) * 0.2;
  paddle1.position.y += paddle1DirY;
}


// Handles player's paddle movement
function player2PaddleMovement() {
  // move left
  if (Key.isDown(Key.Left)) {
    // if paddle is not touching the side of table
    // we move
    if (paddle2.position.y < fieldHeight * 0.45) {
      paddle2DirY = paddleSpeed * 0.5;
    }
    // else we don't move and stretch the paddle
    // to indicate we can't move
    else {
      paddle2DirY = 0;
      paddle2.scale.z += (10 - paddle2.scale.z) * 0.2;
    }
  }
  // move right
  else if (Key.isDown(Key.Right)) {
    // if paddle is not touching the side of table
    // we move
    if (paddle2.position.y > -fieldHeight * 0.45) {
      paddle2DirY = -paddleSpeed * 0.5;
    }
    // else we don't move and stretch the paddle
    // to indicate we can't move
    else {
      paddle2DirY = 0;
      paddle2.scale.z += (10 - paddle1.scale.z) * 0.2;
    }
  }
  // else don't move paddle
  else {
    // stop the paddle
    paddle2DirY = 0;
  }

  paddle2.scale.y += (1 - paddle2.scale.y) * 0.2;
  paddle2.scale.z += (1 - paddle2.scale.z) * 0.2;
  paddle2.position.y += paddle2DirY;
}



// Handles camera and lighting logic
function cameraPhysics() {
  // we can easily notice shadows if we dynamically move lights during the game
  spotLight.position.x = ball.position.x * 2;
  //spotLight.position.y = ball.position.y * 2;

  // move to behind the player's paddle
  //camera.position.x = paddle1.position.x - 100;
  // camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
  // camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
  camera.position.x = paddle2.position.x - 500;
  camera.position.y += (paddle2.position.y - camera.position.y) * 0.05;
  camera.position.z = paddle2.position.z + 100 + 0.04 * (-ball.position.x + paddle2.position.x);

  // rotate to face towards the opponent
  camera.rotation.x = -0.01 * (ball.position.y) * Math.PI / 180;
  camera.rotation.y = -60 * Math.PI / 180;


  // perpenticulr or horizontal
  camera.rotation.z = -90 * Math.PI / 180;

  // ball rotation
  ball.rotation.x += ballRotationSpd.x;
  ball.rotation.y += ballRotationSpd.y;
  ball.rotation.z += ballRotationSpd.z;
}

// Handles paddle collision logic
function paddlePhysics() {
  // ball rotation once hit the paddle

  const onCollide = () => {
    if (ballRotationSpd.x) {
      ballRotationSpd.y = ballRotationSpd.x;
      ballRotationSpd.x = 0;
    } else if (ballRotationSpd.y) {
      ballRotationSpd.z = ballRotationSpd.y;
      ballRotationSpd.y = 0;
    } else if (ballRotationSpd.z) {
      ballRotationSpd.x = ballRotationSpd.z;
      ballRotationSpd.z = 0;
    }

    ballSpeed += 0.1;
  }

  // PLAYER PADDLE LOGIC

  // if ball is aligned with paddle1 on x plane
  // remember the position is the CENTER of the object
  // we only check between the front and the middle of the paddle (one-way collision)
  if (ball.position.x <= paddle1.position.x + paddleWidth
    && ball.position.x >= paddle1.position.x) {
    // and if ball is aligned with paddle1 on y plane
    if (ball.position.y <= paddle1.position.y + paddleHeight / 2
      && ball.position.y >= paddle1.position.y - paddleHeight / 2) {
      // and if ball is travelling towards player (-ve direction)
      if (ballDirX < 0) {
        onCollide()

        // stretch the paddle to indicate a hit
        //paddle1.scale.y = 15;
        // switch direction of ball travel to create bounce
        ballDirX = -ballDirX;
        // we impact ball angle when hitting it
        // this is not realistic physics, just spices up the gameplay
        // allows you to 'slice' the ball to beat the opponent
        ballDirY -= paddle1DirY * 0.7;
      }
    }
  }

  // OPPONENT PADDLE LOGIC	

  // if ball is aligned with paddle2 on x plane
  // remember the position is the CENTER of the object
  // we only check between the front and the middle of the paddle (one-way collision)
  if (ball.position.x <= paddle2.position.x + paddleWidth
    && ball.position.x >= paddle2.position.x) {
    // and if ball is aligned with paddle2 on y plane
    if (ball.position.y <= paddle2.position.y + paddleHeight / 2
      && ball.position.y >= paddle2.position.y - paddleHeight / 2) {
      // and if ball is travelling towards opponent (+ve direction)
      if (ballDirX > 0) {
        onCollide()

        // stretch the paddle to indicate a hit
        //paddle2.scale.y = 15;
        // switch direction of ball travel to create bounce
        ballDirX = -ballDirX;
        // we impact ball angle when hitting it
        // this is not realistic physics, just spices up the gameplay
        // allows you to 'slice' the ball to beat the opponent
        ballDirY -= paddle2DirY * 0.7;
      }
    }
  }
}

function resetBall(loser) {
  // position the ball in the center of the table
  ball.position.x = 0;
  ball.position.y = 0;

  // if player lost the last point, we send the ball to opponent
  if (loser == 1) {
    ballDirX = -1;
  }
  // else if opponent lost, we send ball to player
  else {
    ballDirX = 1;
  }

  // set the ball to move +ve in y plane (towards left from the camera)
  ballDirY = 1;
}

var bounceTime = 0;
// checks if either player or opponent has reached 5 points
function matchScoreCheck() {
  // if player has 5 points
  if (score1 >= maxScore) {
    // stop the ball
    ballSpeed = 0;
    // write to the banner
    document.getElementById("scores").innerHTML = "Player wins!";
    document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    // make paddle bounce up and down
    // bounceTime++;
    //paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
    // enlarge and squish paddle to emulate joy
    // paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
    // paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
  }
  // else if opponent has 5 points
  else if (score2 >= maxScore) {
    // stop the ball
    ballSpeed = 0;
    // write to the banner
    document.getElementById("scores").innerHTML = "CPU wins!";
    document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    // make paddle bounce up and down
    bounceTime++;
    paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
    // // enlarge and squish paddle to emulate joy
    paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
    paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
  }
}

