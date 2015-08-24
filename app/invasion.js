
function Invasion()
{
	this.ticks = 0;

	this.fastRender = false;
	this.numSweepers = Params.numSweepers;
	//this.numMines = Params.numMines;

	this.vecSweepers = [];
	//this.vecMines = [];

	//let's create the mine sweepers
	for (var i=0; i<this.numSweepers; ++i)
	{
		this.vecSweepers.push(new Invader());
	}

	//TODO: Genetic

	//get the total number of weights used in the sweepers
	//NN so we can initialise the GA
	this.numWeightsInNN = this.vecSweepers[0].brain.getNumberOfWeights();

	//initialize the Genetic Algorithm class
	this.genetic = new Genetics(this.numSweepers, Params.mutationRate, Params.crossoverRate, this.numWeightsInNN);

	//Get the weights from the GA and insert into the sweepers brains
	this.vecThePopulation = this.genetic.getChromos();
	for (i=0; i<this.numSweepers; i++)
	{
		this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
	}

	this.vecAvFitness = [];
	this.vecBestFitness = [];
	this.generation = 0;

	//initialize mines in random positions within the application window
	/*for (i=0; i<this.numMines; ++i)
	{
		// TODO Mine class
		this.vecMines.push(new Vector(Math.random() * canvas.width, Math.random() * canvas.height));
	}*/
}

Invasion.prototype.update = function()
{
	//this.ticks += Time.deltaTime;
	this.ticks++;
	test = 0;

	//run the sweepers through CParams::iNumTicks amount of cycles. During
	//this loop each sweepers NN is constantly updated with the appropriate
	//information from its surroundings. The output from the NN is obtained
	//and the sweeper is moved. If it encounters a mine its fitness is
	//updated appropriately,
	var dead = 0;
	//if (this.ticks < Params.numFrame)
	//{
		for (var i=0; i<this.numSweepers; ++i)
		{
			this.vecThePopulation[i].fitness = this.vecSweepers[i].fitness;

			if(!this.vecSweepers[i].spawned)
			{
				if(this.ticks < Params.spawnRate)
				{
					continue;
				} else {
					this.vecSweepers[i].spawned = true;
					this.ticks = 0;
				}
			}
			
			if(this.vecSweepers[i].dead){
				dead++;
				continue;
			}

			//update the NN and position
			if (!this.vecSweepers[i].update(/*this.vecMines*/))
			{
				//error in processing the neural net
				console.log("Wrong amount of NN inputs!");
				return false;
			}
/*
			//see if it's found a mine
			var grabHit = this.vecSweepers[i].checkForMine(this.vecMines, Params.mineScale);

			if (grabHit >= 0)
			{
				//we have discovered a mine so increase fitness
				this.vecSweepers[i].incrementFitness();

				//mine found so replace the mine with another at a random 
				//position
				this.vecMines[grabHit] = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
			}

			//update the chromos fitness score
*/
		}
	//}

	//Another generation has been completed.

	//Time to run the GA and update the sweepers with their new NNs
	//else
	if(dead == this.numSweepers) // si tous mort, on regen
	{
		//update the stats to be used in our stat window
		this.vecAvFitness.push(this.genetic.getAverageFitness());
		this.vecBestFitness.push(this.genetic.getBestFitness());

		//increment the generation counter
		++this.generation;

		//reset cycles
		this.ticks = 0;

		//run the GA to create a new population
		this.vecThePopulation = this.genetic.epoch(this.vecThePopulation);

		//insert the new (hopefully)improved brains back into the sweepers
		//and reset their positions etc
		for (var i=0; i<this.numSweepers; ++i)
		{
			this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
			this.vecSweepers[i].reset();
		}
	}

	affichage.innerHTML = "Generation : " + (this.generation + 1) + ", Average : " + (Math.round(this.genetic.getAverageFitness()*100)/100) + ", Best : " + (Math.round(this.genetic.getBestFitness()*100)/100);
};

Invasion.prototype.draw = function() {
	for(var i = 0, ls = this.vecSweepers.length; i < ls; ++i){
		this.vecSweepers[i].draw();
	}
/*
	for(var j = 0, lm = this.vecMines.length; j < lm; ++j){
		context.beginPath();
		context.arc(this.vecMines[j].x, this.vecMines[j].y, 2, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
      	context.fill();
	}
	*/
};