function CircleCollider(radius, owner)
{
	this.radius = radius;
	this.owner = owner;
}

CircleCollider.prototype.collide = function(position)
{
	return (this.owner.position.distance(position) < this.radius + 5);
}