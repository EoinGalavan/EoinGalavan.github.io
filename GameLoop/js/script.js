// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// Setup image
var image = new Image();
image.src = "./img/wood.jpg";

// Input to be added
function input(event) {
    console.log("Input ...");
	
	console.log("Keycode: " + event.keyCode);
	if (event.type === "keydown") {
		switch (event.keyCode) {
            case 37: // Left Arrow
                onClickX();
                break; //Left key
			case 38: // Left Arrow
                onClickY();
                break; //Left key
            case 39: // Right Arrow
                onClickB();
                break; //Right key
			case 40: // Left Arrow
                onClickA();
                break; //Left key
            default:
                //No Input
        }
	}
}

// Update to be added
function update() {
    console.log("Update ...");
	var r1 = {x:run, y:runUp, width:256, height:256};
	var r2 = {x:(goalX + goalRad + 32), y:(goalY - 10), width:goalRad, height:(goalRad - 32)};
	if(RectsColliding(r1, r2))
	{
		interacted = true;
	}
	else
	{
		interacted = false;
	}
}

function draw() {
    // Draw image
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
	context.save();
    animate();

}

// Total Frames
var frames = 8;

// Current Frame
var currentFrame = 0;

// Sprite
var sprite = new Image();
sprite.src = "./img/walk.png"; // Frames 1 to 8
var spriteBack = new Image();
spriteBack.src = "./img/walkback.png"; // Frames 1 to 8
var run = 64;
var runUp = 0;
var right = true;

// goal vars
var goalX = 614;
var goalY = 394;
var goalRad = 80;

var interacted = false;

// X axis to Draw from
var sprite_x = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 100) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	
	// Draw the goal
	context.beginPath();
	context.arc(goalX, goalY, goalRad, 0, 2 * Math.PI);
	if(interacted)
	{
		context.fillStyle = "green";
	}
	else
	{
		context.fillStyle = "red";
	}
	context.fill();
	

    // Draw sprite frame
	context.scale(0.8, 1)
	if(right == true)
		{
			context.drawImage(sprite, (sprite.width / 8) * currentFrame, 0, 64, 96, run, runUp, 256, 256);
		}
		else
		{
			context.drawImage(spriteBack, (spriteBack.width / 8) * currentFrame, 0, 64, 96, run, runUp, 256, 256);
		}
		context.restore();
    context.font = '36pt Orbitron';
    context.fillText(currentFrame, 320, 100);
}

function gameloop() {
    //input();
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

function RectsColliding(r1,r2){
    return !(
        r1.x>r2.x+r2.width || 
        r1.x+r1.width<r2.x || 
        r1.y>r2.y+r2.height || 
        r1.y+r1.height<r2.y
    );
}

function onClickB(){
	run += 64;
	right = true;
}

function onClickX(){
	run -= 64;
	right = false;
}

function onClickA(){
	runUp += 64;
}

function onClickY(){
	runUp -= 64;
}

window.requestAnimationFrame(gameloop);

window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);