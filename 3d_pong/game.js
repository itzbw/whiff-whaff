import * as THREE from 'three';

//Variables

// scene object
var renderer, scene, camera, pointLight, spotLight;

// canvas 
var canvasWidth = 640;
var canvasHeight = 400;
//todo: responsive

//paddles
var paddleWidth, paddleHeight, paddleDepth, paddleTexture;
var paddle1, paddle2;
var paddle1DirY = 0;
var paddle2DirY = 0;
var paddleSpeed = 3;

//ball
var ball;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

//Score
var score1 = 0, score2 = 0
var winningScore = 5;

// set difficulties (0 - easy , 1 - hard)
var difficulty = 0.2;




// game setup
function setup() {
    createScene();
    draw();
}



function createScene() {
    //set the scene size
    var WIDTH = 640;
    var HEIGHT = 400;

    // set the camera attribution

    var VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    var canvas = document.getElementById("gameCanvas")

    // render() call is made each frame to the renderer in order to draw the Three.js scene.
    renderer = new THREE.WebGLRenderer();

    camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

    scene = THREE.Scene();


    // add the camera to the scene
    scene.add(camera);

    // set default position for the camera (for shadow rendering also)
    camera.position.z = 320;





    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element (the gameCanvas)

    canvas.appendChild(renderer.domElement);
    // Perspective VS Orthographic cameras, Perspective camera is the best choice
    // set camera attribution




    // adding a ball
    //set up shere vars
    var radius = 5, segments = 6, rings = 6;
    // create the phere material
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xD43001
    });

    // create a ball with sphere geometry
    var ball = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            segments,
            rings),
        sphereMaterial);

    // add the phere to the scene
    scene.add(ball);

    ball.position.x = 0;
    ball.position.y = 0;
    ball.position.z = radius; // above table surface
    ball.receiveShadow = true;
    ball.castShadow = true;

}

//The draw() function will be run every frame and will handle all the rendering and game logic.
function draw() {

    // draw three.js scene
    renderer.render(scene.camera);
    //loop the draw()
    requestAnimationFrame(draw);

    //
}
