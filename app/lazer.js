function Lazer(position, direction, length, owner, color)
{
	this.position = position;
	this.direction = direction;
	this.length = length;
	this.owner = owner;
	this.destination = new Vector(this.position.x + this.direction.x * this.length, this.position.y + this.direction.y * this.length);

	this.color = color || "#ffff00";

	this.ticks = 0;
	this.lifeTime = 24;

	this.fire();
}

Lazer.prototype.update = function()
{
	if(this.ticks >= this.lifeTime)
		Destroy(this);

	this.ticks++;
};

Lazer.prototype.draw = function()
{
	if(this.ticks < 3 || this.ticks > 6){
		context.save();
		context.beginPath();
		context.lineWidth = 1 / Camera.zoom;
		context.moveTo(this.position.x, this.position.y);
		context.lineTo(this.destination.x, this.destination.y);
		if(this.ticks > 6){
			var dash = ((this.ticks - 6) / (this.lifeTime - 6));
			context.setLineDash([30 - dash * 30, dash * 40]);
			context.globalAlpha = 1-dash;
		} 
		context.strokeStyle = this.color;
		context.stroke();
		context.closePath();
		context.restore();
	}
};

Lazer.prototype.fire = function()
{
	for(var i = 0, length = colliders.length; i < length; ++i)
	{
		if(this.ray(colliders[i].collider))
		{
			if(!colliders[i].dead && colliders[i].spawned)
			{
				this.owner.addScore(1);
				colliders[i].kill();
			}
		}
	}
};

Lazer.prototype.ray = function(collider)
{
	// compute the triangle area times 2 (area = area2/2)
	var area2 = Math.abs( (this.destination.x-this.position.x)*(collider.owner.position.y-this.position.y) - (collider.owner.position.x-this.position.x)*(this.destination.y-this.position.y) );

	// compute the AB segment length
	var LAB = Math.sqrt( Math.pow(this.destination.x-this.position.x, 2) + Math.pow(this.destination.y-this.position.y, 2));

	// compute the triangle height
	var h = area2/LAB;

	// if the line intersects the circle
	return ( h < collider.radius);
};