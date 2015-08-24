// Individual Neuron
function Neuron(numInputs)									
{
	this.numInputs = numInputs;
	this.vecWeight = [];

	//we need an additional weight for the bias hence the +1
	for (var i=0; i<numInputs+1; ++i)
	{
		//set up the weights with an initial random value
		this.vecWeight.push(Math.random() * 2 - 1);
	}
}

// One Layer off Neuron
function NeuronLayer(numNeurons, numInputsPerNeuron)
{
	this.numNeurons = numNeurons;
	this.vecNeurons = [];

	for (var i=0; i<numNeurons; ++i)
	{
		this.vecNeurons.push(new Neuron(numInputsPerNeuron));
	}
}

// The full NeuralNet (brain)
function NeuralNet() 
{
	this.numInputs           = Params.numInputs;
	this.numOutputs          = Params.numOutputs;
	this.numHiddenLayers     = Params.numHidden;
	this.neuronsPerHiddenLyr = Params.neuronsPerHiddenLayer;
	this.vecLayers           = [];

	this.createNet();
}

// this method builds the ANN. The weights are all initially set to 
// random values -1 < w < 1
NeuralNet.prototype.createNet = function()
{
	//create the layers of the network
	if (this.numHiddenLayers > 0)
	{
		//create first hidden layer
		this.vecLayers.push(new NeuronLayer(this.neuronsPerHiddenLyr, this.numInputs));

		for (var i=0; i<this.numHiddenLayers-1; ++i)
		{
			this.vecLayers.push(new NeuronLayer(this.neuronsPerHiddenLyr, this.neuronsPerHiddenLyr));
		}

		//create output layer
		this.vecLayers.push(new NeuronLayer(this.numOutputs, this.neuronsPerHiddenLyr));
	}
	else
	{
		//create output layer
		this.vecLayers.push(new NeuronLayer(this.numOutputs, this.numInputs));
	}
}

// returns a array containing the weights
NeuralNet.prototype.getWeights = function()
{
	//this will hold the weights
	weights = [];
	
	//for each layer
	for (var i=0; i<this.numHiddenLayers + 1; ++i)
	{
		//for each neuron
		for (var j=0; j<this.vecLayers[i].numNeurons; ++j)
		{
			//for each weight
			for (var k=0; k<this.vecLayers[i].vecNeurons[j].numInputs; ++k)
			{
				weights.push(this.vecLayers[i].vecNeurons[j].vecWeight[k]);
			}
		}
	}

	return weights;
}

// given a vector of doubles this function replaces the weights in the NN
// with the new values
NeuralNet.prototype.putWeights = function(weights)
{
	var cWeight = 0;

	//if(!weights[0]) console.log(weights[0]);
	
	//for each layer
	for (var i=0; i<this.numHiddenLayers + 1; ++i)
	{
		//for each neuron
		for (var j=0; j<this.vecLayers[i].numNeurons; ++j)
		{
			//for each weight
			for (var k=0; k<this.vecLayers[i].vecNeurons[j].numInputs; ++k)
			{
				this.vecLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];
			}
		}
	}

	return;
}

// returns the total number of weights needed for the net
NeuralNet.prototype.getNumberOfWeights = function()
{
	var weights = 0;
	
	//for each layer
	for (var i=0; i<this.numHiddenLayers + 1; ++i)
	{
		//for each neuron
		for (var j=0; j<this.vecLayers[i].numNeurons; ++j)
		{
			//for each weight
			for (var k=0; k<this.vecLayers[i].vecNeurons[j].numInputs; ++k)
			{
				weights++;
			}
		}
	}

	return weights;
}

// given an input vector this function calculates the output vector
NeuralNet.prototype.update = function(inputs)
{
	//stores the resultant outputs from each layer
	var outputs = [];
	var cWeight = 0;
	
	//first check that we have the correct amount of inputs
	if (inputs.length != this.numInputs)
	{
		//just return an empty vector if incorrect.
		return outputs;
	}
	
	//For each layer....
	for (var i=0; i<this.numHiddenLayers + 1; ++i)
	{		
		if ( i > 0 )
		{
			inputs = outputs;
		}

		// clear
		outputs = []; 
		cWeight = 0;

		//for each neuron sum the (inputs * corresponding weights).Throw 
		//the total at our sigmoid function to get the output.
		for (var j=0; j<this.vecLayers[i].numNeurons; ++j)
		{
			var netinput = 0;
			var	numInputs = this.vecLayers[i].vecNeurons[j].numInputs;
			
			//for each weight
			for (var k=0; k<numInputs - 1; ++k)
			{
				//sum the weights x inputs
				netinput += this.vecLayers[i].vecNeurons[j].vecWeight[k] * inputs[cWeight++];
			}

			//add in the bias
			netinput += this.vecLayers[i].vecNeurons[j].vecWeight[numInputs-1] * Params.bias;

			//we can store the outputs from each layer as we generate them. 
			//The combined activation is first filtered through the sigmoid function
			outputs.push(this.sigmoid(netinput, Params.activationResponse));

			cWeight = 0;
		}
	}

	return outputs;
}

//sigmoid
NeuralNet.prototype.sigmoid = function(netinput, response)
{
	return ( 1 / ( 1 + Math.exp(-netinput / response)));
}