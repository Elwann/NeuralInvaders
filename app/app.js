var canvas, affichage, scoreDisplay, menu, music, intro, accelerateGeneration, context, player, invasion, earth, gameObjects = [], colliders = [];

var Key = {
	SPACE: 32,
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	S: 83
};

var Input = {
	mouse: {
		x: 0,
		y: 0
	},
	keys: {
		down: [],
		up: [],
		press: []
	},
	update: function(){
		Input.keys.down = [];
		Input.keys.up = [];
	},
	keyDown: function(key){
		return (Input.keys.down.indexOf(key) >= 0);
	},
	keyUp: function(key){
		return (Input.keys.up.indexOf(key) >= 0);
	},
	keyPress: function(key){
		return (Input.keys.press.indexOf(key) >= 0);
	}
};

window.onkeydown = function(e){
	if(!Input.keyDown(e.keyCode)) Input.keys.down.push(e.keyCode);
	if(!Input.keyPress(e.keyCode)) Input.keys.press.push(e.keyCode);
};

window.onkeyup = function(e){
	Input.keys.up.push(e.keyCode);
	var index = Input.keys.press.indexOf(e.keyCode);
	if(index >= 0) Input.keys.press.splice(index, 1);
};

var Time = {
	last: performance.now(),
	trueDeltaTime: 0,
	deltaTime: 0,
	timeScale: 1,
};

var Camera = {
	rotation: 0,
	position: new Vector(0, 0),
	shake: new Vector(0, 0),
	zoom:1,
	screenShake: function(intensity, reduction){
		Camera.shake.x = Math.random()*intensity;
		Camera.shake.y = Math.random()*intensity;
		
		if(intensity < 1){
			Camera.shake.x = 0;
			Camera.shake.y = 0;
		} else {
			window.requestAnimationFrame(function(){
				Camera.screenShake((0-intensity)*(reduction*Time.trueDeltaTime)+intensity, reduction);
			});
		}
	},
	draw: function(){
		context.translate((Camera.position.x + Camera.shake.y + canvas.width/2), (Camera.position.y + Camera.shake.y + canvas.height/2));
		context.rotate(Camera.rotation + Math.PI / 2);
		context.scale(Camera.zoom, Camera.zoom);
	}
};

var States = {
	INIT: 0,
	MENU: 1,
	PLAY: 2,
	GAMEOVER: 3
};

var state = States.INIT;

window.onmousemove = function(e)
{
	Input.mouse.x = e.pageX;
	Input.mouse.y = e.pageY;
};

// Create a gameObject
function Instantiate(object)
{
	// Object mus
	if(!object.draw || !object.update){
		if(debug) console.log("Instantiate: Only use Instantiate for objects with at least a update() and draw() function");
		return null;
	}
	
	gameObjects.push(object);
	if(object.init){
		object.init();
	}
	return object;
}

// Destroy a gameObject
function Destroy(object){
	var index = gameObjects.indexOf(object);
	if(index == -1){
		if(debug) console.log("Destroy: this object is not in gameObjets[] table");
		return false;
	}
	
	gameObjects.splice(index , 1);
	return true;
}

// Create a collision
function AddCollider(object)
{
	// Object mus
	if(!object.collider){
		if(debug) console.log("AddCollider: Only use AddCollider for objects with at least a collider attached");
		return null;
	}
	
	colliders.push(object);
	return object;
}

// Destroy a collision
function RemoveCollider(object){
	var index = colliders.indexOf(object);
	if(index == -1){
		if(debug) console.log("RemoveCollider: this object is not in colliders[] table");
		return false;
	}
	
	colliders.splice(index , 1);
	return true;
}

function deltaTime()
{
	var time = performance.now();
	Time.trueDeltaTime = (time-Time.last)/1000;
	Time.deltaTime = Time.trueDeltaTime * Time.timeScale;
	Time.last = time;
}

function clear()
{
	context.clearRect(0, 0, canvas.width*0.26, canvas.height);
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function update()
{
	var frame = 1;

	if(Input.keyDown(Key.S))
		accelerateGeneration = !accelerateGeneration;

	if(accelerateGeneration)
		frame = Params.generationAcceleration;
	
	for(var f = 0; f < frame; ++f){
		for(var i = gameObjects.length-1; i>=0; i--){
			gameObjects[i].update();
		}
	}

	if(state == States.INIT && Input.keyDown(Key.SPACE))
		start();
}

function render()
{
	context.save();
	
	Camera.draw();
	
	for(var i = gameObjects.length-1; i>=0; i--){
		gameObjects[i].draw();
	}
	
	context.restore();
}

function loop()
{
	deltaTime();
	clear();
	update();
	render();
	Input.update();

	requestAnimationFrame(loop);
}

function animateZoom(destination, speed)
{
	Camera.zoom = Camera.zoom + Time.trueDeltaTime * speed * (destination - Camera.zoom);
	if(Math.round(Camera.zoom * 100) / 100 == destination){
		Camera.zoom = destination;
	} else {
		window.requestAnimationFrame(function(){ animateZoom(destination, speed); });
	}
}

function init()
{
	Camera.zoom = 1;

	canvas = document.getElementById("canvas");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	context = canvas.getContext("2d");

	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	affichage = document.getElementById("affichage");
	scoreDisplay = document.getElementById("score");
	menu = document.getElementById("menu");
	
	music = new Audio("app/assets/sound/amb-ni-space-loop.mp3");
	intro = new Audio("app/assets/sound/amb-ni-space-intro.mp3");

	music.volume = 1;
	music.loop = true;
	music.play();

	Instantiate(new Stars(new Vector(), canvas.height, canvas.height / 10));

	accelerateGeneration = false;

	if(canvas.width < 768)
		Params.cameraZoom = Params.cameraZoom * 0.65;
	
	state = States.INIT;

	loop();
}

function start(){
	menu.innerHTML = "";
	Camera.zoom = 0.1;

	Camera.position.y = canvas.height / 4;

	gameObjects = [];

	player = Instantiate(new Player(new Vector(0, 0)));
	earth = Instantiate(new Earth(new Vector(), 100));
	
	invasion = Instantiate(new Invasion());

	Instantiate(new Stars(new Vector(), canvas.width + canvas.height, (canvas.width + canvas.height) / 10));

	animateZoom(Params.cameraZoom, 1.5);
	intro.play();
	
	state = States.PLAY;
}

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

window.onclick = function(){
	if(state == States.INIT)
		start();
};