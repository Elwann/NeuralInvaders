function Player(position)
{
	var that = this;
	this.center = position || new Vector();
	this.distance = 140;
	this.position = new Vector(this.center.x, this.center.y - this.distance);

	this.velocity = 0;
	this.speed = Params.playerSpeed;
	this.acceleration = Params.playerAcceleration;
	this.fireRate = Params.playerFireRate;
	this.ticks = Params.playerFireRate;
	this.size = 15;
	this.color = "#ffff00";

	this.crash = new Audio("app/assets/sound/sfx-ni-player-hit.mp3");
	this.lazer = new Audio("app/assets/sound/sfx-ni-tir.mp3");
	this.lazer.volume = 0.6;

	this.score = 0;

	this.rotation = 0;

	this.pressstart = new Vector();
	this.presscurrent = new Vector();
	this.touch = false;

	document.ontouchstart = function(e)
	{
		e.preventDefault();
		that.touch = true;
		that.pressstart.x = e.touches[0].clientX;
		that.pressstart.y = e.touches[0].clientY;
		that.presscurrent.x = e.touches[0].clientX;
		that.presscurrent.y = e.touches[0].clientY;
	};

	document.ontouchmove = function(e)
	{
		e.preventDefault();
		that.presscurrent.x = e.touches[0].clientX;
		that.presscurrent.y = e.touches[0].clientY;
	};

	document.ontouchend = function(e)
	{
		e.preventDefault();
		if(that.pressstart.distance(that.presscurrent) < 10)
			that.fire();

		that.touch = false;
		that.pressstart.x = 0;
		that.pressstart.y = 0;
		that.presscurrent.x = 0;
		that.presscurrent.y = 0;
	};
}

Player.prototype.update = function()
{
	// Fire
	this.ticks++;

	if(Input.keyPress(Key.SPACE))
		this.fire();

	this.velocity *= 0.85;

	// Movements
	if(Input.keyPress(Key.LEFT))
	{
		this.velocity -= this.acceleration;
	}
	else if(Input.keyPress(Key.RIGHT))
	{
		this.velocity += this.acceleration;
	}

	if(this.touch)
	{
		this.velocity = (this.pressstart.x - this.presscurrent.x) / 100;
	}

	this.velocity = Math.clamp(this.velocity, -this.speed, this.speed);


	this.rotation = (this.rotation + this.velocity) % 360;

	Camera.rotation = -(this.rotation / 180 * Math.PI + Math.PI);

	var direction = new Vector().lookAt(this.rotation / 180 * Math.PI);

	this.position.x = this.center.x + direction.x * this.distance;
	this.position.y = this.center.y + direction.y * this.distance;

	//if(this.position.x < 0) this.position.x = canvas.width;
	//if(this.position.x > canvas.width) this.position.x = 0;
};

Player.prototype.draw = function()
{
	context.save();

	context.translate(this.position.x, this.position.y);
	context.rotate(this.rotation / 180 * Math.PI + Math.PI / 2);
	context.lineWidth = 1 / Camera.zoom;
	
	context.beginPath();
	context.moveTo(0, 0 - this.size);
	context.lineTo(0 - this.size, 0 + this.size);
	context.lineTo(0 + this.size, 0 + this.size);
	context.closePath();
	context.strokeStyle = this.color;
	context.stroke();
	context.restore();
};

Player.prototype.fire = function()
{
	if(this.ticks > this.fireRate)
	{
		Camera.screenShake(20, 5);
		Instantiate(new Lazer(this.position.copy(), new Vector(this.position.x - this.center.x, this.position.y - this.center.y).normalize(), 1000, this));
		this.lazer.pause();
		this.lazer.currentTime = 0;
		this.lazer.play();
		this.ticks = 0;
	}
};

Player.prototype.hit = function()
{
	Camera.screenShake(40, 2);
	this.addScore(-10);
	this.crash.pause();
	this.crash.currentTime = 0;
	this.crash.play();
};

Player.prototype.addScore = function(s)
{
	this.score += s;
	scoreDisplay.innerHTML = "Score : "+this.score;
};