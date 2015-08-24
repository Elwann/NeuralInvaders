// Single star init at random position within a star field
function Star(position, radius){
	this.position = new Vector(position.x + ((Math.random() * 2 - 1) * radius), position.y + ((Math.random() * 2 - 1) * radius));
	this.radius = Math.random() + 0.5;
}

// Star field
function Stars(position, radius, number){
	this.position = position;
	this.radius = radius;
	this.stars = [];

	// Init n stars
	for(var i = 0; i < number; ++i){
		this.stars.push(new Star(this.position, this.radius));
	}
}

// Make some stars die and spawn at random for a small "blick effect"
Stars.prototype.update = function() {
	if(Math.random() < 1/60){
		this.stars[randomBetweenInt(0, this.stars.length-1)] = new Star(this.position, this.radius);
	}
};

// Draw all stars
Stars.prototype.draw = function() {
	for(var i = 0, length = this.stars.length; i < length; ++i){
		var star = this.stars[i];

		context.save();
		context.beginPath();
		context.lineWidth = 1 / Camera.zoom;
		context.arc(star.position.x, star.position.y, star.radius, 0, 2 * Math.PI, false);
		context.strokeStyle = '#999999';
		context.stroke();
		context.closePath();
		context.restore();
	}
};