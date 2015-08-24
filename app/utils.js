Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
};

function randomBetweenInt(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}

function randomCircle(center, radius) {
	// create random angle between 0 to 360 degrees
	var ang = Math.random() * Math.PI * 2;
	var dir = new Vector().lookAt(ang);
	dir.x = dir.x * radius;
	dir.y = dir.y * radius;
	return new Vector(center.x + dir.x, center.y + dir.y);
}

function randomDonut(center, minRadius, maxRadius) {
	// create random angle between 0 to 360 degrees
	var ang = Math.random() * Math.PI * 2;
	var dir = new Vector().lookAt(ang);
	var radius = Math.random() * (maxRadius - minRadius) + minRadius
	dir.x = dir.x * radius;
	dir.y = dir.y * radius;
	return new Vector(center.x + dir.x, center.y + dir.y);
}