// Vector 2D class
function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

// Add vector to this vector
Vector.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

// Suctract vector from this vector
Vector.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

// Multiply vector to this vector
Vector.prototype.multiply = function (vec) {
	this.x *= vec.x;
	this.y *= vec.y;
	return this;
};

// Divide vector to this vector
Vector.prototype.divide = function (vec) {
	this.x /= vec.x;
	this.y /= vec.y;
	return this;
};

// Get distance from another vector
Vector.prototype.distance = function (vec) {
	return Math.sqrt(this.sqrDistance(vec));
};

// Get square distance from another vector
Vector.prototype.sqrDistance = function (vec) {
	var dx = this.x - vec.x;
		dy = this.y - vec.y;

	return dx * dx + dy * dy;
};

// Get square magnitude of this vector
Vector.prototype.sqrMagnitude = function () {
	return this.x * this.x + this.y * this.y;
};

// Get magnitude of this vector
Vector.prototype.magnitude = function () {
	return Math.sqrt(this.sqrMagnitude());
};

// Normalize this vector
Vector.prototype.normalize = function () {
	var length = this.magnitude();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(new Vector(length, length));
	}

	return this;
};

// Return a copy of this vector
Vector.prototype.copy = function() {
	return new Vector(this.x, this.y);
};

// Change this vector to a vector of magnitude 1 from gived rotation (need to change this to a better solution)
Vector.prototype.lookAt = function(rotation)
{
	this.x = Math.cos(rotation);
	this.y = Math.sin(rotation);
	return this;
}