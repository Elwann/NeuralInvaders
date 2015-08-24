function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

Vector.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

Vector.prototype.multiply = function (vec) {
	this.x *= vec.x;
	this.y *= vec.y;
	return this;
};

Vector.prototype.divide = function (vec) {
	this.x /= vec.x;
	this.y /= vec.y;
	return this;
};

Vector.prototype.distance = function (vec) {
	return Math.sqrt(this.sqrDistance(vec));
};

Vector.prototype.sqrDistance = function (vec) {
	var dx = this.x - vec.x;
		dy = this.y - vec.y;

	return dx * dx + dy * dy;
};

Vector.prototype.sqrMagnitude = function () {
	return this.x * this.x + this.y * this.y;
};

Vector.prototype.magnitude = function () {
	return Math.sqrt(this.sqrMagnitude());
};

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

Vector.prototype.copy = function() {
	return new Vector(this.x, this.y);
};

Vector.prototype.lookAt = function(rotation)
{
	this.x = Math.cos(rotation);
	this.y = Math.sin(rotation);
	return this;
}