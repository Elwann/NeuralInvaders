function Genome(weights, fitness)
{
	this.vecWeights = weights || [];
	this.fitness = fitness || 0;
}

// sets up the population with random floats
function Genetics(popsize, mutRat, crossRat, numweights)
{
	this.popSize = popsize;
	this.mutationRate = mutRat;
	this.crossoverRate = crossRat;
	this.chromoLength = numweights;
	this.totalFitness = 0;
	this.generation = 0;
	this.fittestGenome = 0;
	this.bestFitness = 0;
	this.worstFitness = 99999999;
	this.averageFitness = 0;

	this.vecPop = [];

	//initialise population with chromosomes consisting of random
	//weights and all fitnesses set to zero
	for (var i=0; i<this.popSize; ++i)
	{
		this.vecPop.push(new Genome());

		for (var j=0; j<this.chromoLength; ++j)
		{
			this.vecPop[i].vecWeights.push(Math.random() * 2 - 1);
		}
	}
}

// mutates a chromosome by perturbing its weights by an amount not 
// greater than Params.maxPerturbation
Genetics.prototype.mutate = function(chromo)
{
	//traverse the chromosome and mutate each weight dependent
	//on the mutation rate
	for (var i=0; i<chromo.length; ++i)
	{
		//do we perturb this weight?
		if (Math.random() < this.mutationRate)
		{
			//add or subtract a small value to the weight
			chromo[i] += (Math.random() * 2 - 1) * Params.maxPerturbation;
		}
	}
};

// returns a chromo based on roulette wheel sampling
Genetics.prototype.getChromoRoulette = function()
{
	//generate a random number between 0 & total fitness count
	var slice = Math.random() * this.totalFitness;

	//this will be set to the chosen chromosome
	var theChosenOne;
	
	//go through the chromosones adding up the fitness so far
	var fitnessSoFar = 0;
	
	for (var i=0; i<this.popSize; ++i)
	{
		fitnessSoFar += this.vecPop[i].fitness;
		
		//if the fitness so far > random number return the chromo at 
		//this point
		if (fitnessSoFar >= slice)
		{
			theChosenOne = this.vecPop[i];
			break;
		}
		
	}

	return theChosenOne;
};
	
// given parents and storage for the offspring this method performs
// crossover according to the GAs crossover rate
Genetics.prototype.crossover = function(mum, dad, baby1, baby2)
{
	//just return parents as offspring dependent on the rate
	//or if parents are the same
	var i = 0;
	if ((Math.random() > this.crossoverRate) || (mum == dad)) 
	{
		for (i=0; i<mum.length; ++i)
		{
			if(!mum[i]) console.log("mum error");
			if(!dad[i]) console.log("dad error");
			baby1.push(mum[i]);
			baby2.push(dad[i]);
		}

		return;
	}

	//determine a crossover point
	var cp = randomBetweenInt(0, this.chromoLength - 1);

	//create the offspring
	for (i=0; i<cp; ++i)
	{
		baby1.push(mum[i]);
		baby2.push(dad[i]);

		if(!mum[i]) console.log("mum error");
		if(!dad[i]) console.log("dad error");
	}

	for (i=cp; i<mum.length; ++i)
	{
		baby1.push(dad[i]);
		baby2.push(mum[i]);

		if(!mum[i]) console.log("mum error");
		if(!dad[i]) console.log("dad error");
	}

	return;
};

// takes a population of chromosones and runs the algorithm through one cycle.
// Returns a new population of chromosones.
Genetics.prototype.epoch = function(oldPop)
{
	//assign the given population to the classes population
	this.vecPop = oldPop.slice();

	//reset the appropriate variables
	this.reset();

	//sort the population (for scaling and elitism)
	this.vecPop.sort(function(a, b){ return a.fitness - b.fitness; });

	//calculate best, worst, average and total fitness
	this.calculateBestWorstAvTot();

	//create a temporary vector to store new chromosones
	var vecNewPop = [];

	//Now to add a little elitism we shall add in some copies of the
	//fittest genomes. Make sure we add an EVEN number or the roulette
	//wheel sampling will crash
	if (!(Params.numCopiesElite * Params.numElite % 2))
	{
		this.grabNBest(Params.numElite, Params.numCopiesElite, vecNewPop);
	}

	//now we enter the GA loop

	//repeat until a new population is generated
	while (vecNewPop.length < this.popSize)
	{
		//grab two chromosones
		var mum = this.getChromoRoulette();
		var dad = this.getChromoRoulette();

		//create some offspring via crossover
		var baby1 = [];
		var baby2 = [];

		this.crossover(mum.vecWeights, dad.vecWeights, baby1, baby2);

		if(mum.vecWeights.length == 0) console.log("mum empty");
		if(dad.vecWeights.length == 0) console.log("dad empty");
		if(baby1.length == 0) console.log("baby1 empty");
		if(baby2.length == 0) console.log("baby2 empty");

		//now we mutate
		this.mutate(baby1);
		this.mutate(baby2);

		//now copy into vecNewPop population
		vecNewPop.push(new Genome(baby1, 0));
		vecNewPop.push(new Genome(baby2, 0));
	}

	//finished so assign new pop back into this.vecPop
	this.vecPop = vecNewPop;

	return this.vecPop;
};

// This works like an advanced form of elitism by inserting NumCopies
// copies of the NBest most fittest genomes into a population vector
Genetics.prototype.grabNBest = function(nBest, numCopies, pop)
{
	//add the required amount of copies of the n most fittest 
	//to the supplied vector
	while(nBest--)
	{
		for (var i=0; i<numCopies; ++i)
		{
			var g = this.vecPop[(this.popSize - 1) - nBest];
			pop.push(new Genome(g.vecWeights.slice(), g.fitness));
		}
	}
};

// calculates the fittest and weakest genome and the average/total 
// fitness scores
Genetics.prototype.calculateBestWorstAvTot = function()
{
	this.totalFitness = 0;
	
	var highestSoFar = 0;
	var lowestSoFar  = 9999999;
	
	for (var i=0; i<this.popSize; ++i)
	{
		//update fittest if necessary
		if (this.vecPop[i].fitness > highestSoFar)
		{
			highestSoFar = this.vecPop[i].fitness;
			this.fittestGenome = i;
			this.bestFitness = highestSoFar;
		}
		
		//update worst if necessary
		if (this.vecPop[i].fitness < lowestSoFar)
		{
			lowestSoFar = this.vecPop[i].fitness;
			this.worstFitness = lowestSoFar;
		}
		
		this.totalFitness += this.vecPop[i].fitness;
		
	} //next chromo
	
	this.averageFitness = this.totalFitness / this.popSize;
};

// resets all the relevant variables ready for a new generation
Genetics.prototype.reset = function()
{
	this.totalFitness   = 0;
	this.bestFitness    = 0;
	this.worstFitness   = 9999999;
	this.averageFitness = 0;
};

Genetics.prototype.getChromos = function()
{
	return this.vecPop;
};

Genetics.prototype.getAverageFitness = function()
{
	this.averageFitness = this.totalFitness / this.popSize;
	return this.averageFitness;
};

Genetics.prototype.getBestFitness = function()
{
	return this.bestFitness;
};