function Invader()
{
	//the Invader's neural net
	this.brain = new NeuralNet();

	this.position;
	this.rotation;
	//direction sweeper is facing
	this.lookAt; 

	this.speed = 0;
	this.maxSpeed = Params.maxSpeed;
	this.size = Params.sweeperScale;

	this.collider = new CircleCollider(this.size * 1.8, this);
	AddCollider(this);

	//to store output from the ANN
	this.lTrack = 0.16;
	this.rTrack = 0.16;

	//the sweeper's fitness score 
	this.fitness;
	this.color = "#ff0000";

	//the scale of the sweeper when drawn
	this.scale = Params.sweeperScale;

	this.dead;
	this.spawned;

	this.lifeTime;
	this.fireTime;
	this.fireRate = 60;

	this.cibleDistance = 999999;

	this.reset();
}

// resets the sweepers position, fitness and rotation
Invader.prototype.reset = function()
{
	//reset the sweepers positions
	this.position = randomDonut(earth.position, Params.minInvasionRadius, Params.maxInvasionRadius);
	this.rotation = Math.random() * Math.PI * 2;
	this.lookAt = new Vector(this.rotation);

	//and the fitness
	this.fitness = 0;

	this.lifeTime = 0;
	this.outTime = 0;

	this.cibleDistance = 999999;

	this.spawned = false;
	this.dead = false;

	return;
};

// First we take sensor readings and feed these into the sweepers brain.
//
// The inputs are:
// A vector to the earth (x, y)
// The sweepers 'look at' vector (x, y)
// A vector to represent player aim direction (x, y)
//
// We receive two outputs from the brain.. lTrack & rTrack.
// So given a force for each track we calculate the resultant rotation 
// and acceleration and apply to current velocity vector.

Invader.prototype.update = function()
{
	// Don't update if not spawned or dead
	if(this.dead || !this.spawned) return;

	this.lifeTime++;
	
	// this will store all the inputs for the NN
	var inputs = [];

	// add direction of the earth
	var destination = new Vector(earth.position.x - this.position.x, earth.position.y - this.position.y).normalize();
	inputs.push(destination.x);
	inputs.push(destination.y);

	// add look at vector
	inputs.push(this.lookAt.x);
	inputs.push(this.lookAt.y);

	// add player aim
	var aim = new Vector(player.position.x - earth.position.x, player.position.y - earth.position.y).normalize();
	inputs.push(aim.x);
	inputs.push(aim.y);

	// update the brain and get feedback
	var output = this.brain.update(inputs);

	// make sure there were no errors in calculating the output
	if (output.length < Params.numOutputs)
	{
		return false;
	}

	// assign the outputs to the sweepers left & right tracks
	this.lTrack = output[0];
	this.rTrack = output[1];

	// calculate steering forces
	var rotForce = this.lTrack - this.rTrack;

	// clamp rotation
	rotForce = Math.clamp(rotForce, -Params.maxTurnRate, Params.maxTurnRate);

	this.rotation += rotForce;
	
	this.speed = (this.lTrack + this.rTrack);

	// update Look At 
	this.lookAt.lookAt(this.rotation);

	// update position
	this.position.x += this.lookAt.x * this.speed * this.maxSpeed; // * Time.deltaTime;
	this.position.y += this.lookAt.y * this.speed * this.maxSpeed; // * Time.deltaTime;

	// Kill if his life time is over
	if(this.lifeTime > Params.lifeTime)
	{
		this.fitness -= 10;
		this.kill();
	}

	// Get distance to earth
	this.cibleDistance = this.position.distance(earth.position);

	// If crashed on eath
	if(this.cibleDistance < earth.radius){
		//kill himself and hit player
		this.fitness += Params.scoreCrash;
		player.hit();
		this.kill();
	}

	return true;
};

Invader.prototype.draw = function()
{
	// Don't draw if not spawned or dead
	if(this.dead || !this.spawned) return;

	context.save();

	context.lineWidth = 1 / Camera.zoom;

	context.save();

	context.translate(this.position.x, this.position.y);
	context.rotate(this.rotation + Math.PI / 2);

	context.beginPath();
	context.moveTo(0, 0 - this.size);
	context.lineTo(0 - this.size, 0 + this.size);
	context.lineTo(0 + this.size, 0 + this.size);
	context.closePath();

	context.strokeStyle = this.color;
	context.stroke();

	context.restore();

	var destination = new Vector(earth.position.x - this.position.x, earth.position.y - this.position.y);

	context.beginPath();
	context.strokeStyle = "rgba(255,255,255,0.1)";
	context.moveTo(this.position.x, this.position.y);
	context.lineTo(this.position.x + destination.x, this.position.y + destination.y);
	context.stroke();
	context.closePath();

	if(Params.debug)
	{
		var aim = new Vector(player.position.x - earth.position.x, player.position.y - earth.position.y);

		context.beginPath();
		context.strokeStyle = "#ffff00";
		context.moveTo(earth.position.x, earth.position.y);
		context.lineTo(earth.position.x + aim.x, earth.position.y + aim.y);
		context.stroke();
		context.closePath();

		context.beginPath();
		context.strokeStyle = "#00ff00";
		context.moveTo(this.position.x, this.position.y);
		context.lineTo(this.position.x + this.lookAt.x * 100, this.position.y + this.lookAt.y * 100);
		context.stroke();
		context.closePath();
	}

	context.restore();
};

// Increment fitness
Invader.prototype.incrementFitness = function()
{
	this.fitness++;
};

// Change brain configuration
Invader.prototype.putWeights = function(w)
{
	this.brain.putWeights(w);
};

// Get brain configuration
Invader.prototype.getNumberOfWeights = function(w)
{
	this.brain.getNumberOfWeights(w);
};

// Kill player
Invader.prototype.kill = function()
{
	if(this.dead && !this.spawned) return;

	// Add fitness based on life time
	this.fitness += this.lifeTime * Params.scoreTime;

	// Add fitness based on the inverse of the distance from earth (avoid fleeing away ?)
	this.fitness += (Params.maxInvasionRadius - this.cibleDistance) * Params.scoreDistance;

	// Clamp fitness to avoid errors with the genetic algorithm
	this.fitness = Math.clamp(this.fitness, 0, 100);

	this.dead = true;
};