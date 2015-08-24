var Params = {
  debug: false,
  cameraZoom: 0.75,

  // Brain
  numInputs: 6,
  numHidden: 1,
  neuronsPerHiddenLayer: 9,
  numOutputs: 2,
  activationResponse: 1,
  bias: -1,

  // Invader
  maxTurnRate: 0.3,
  maxSpeed: 3,
  lifeTime: 600,

  // Invasion
  sweeperScale: 15,
  numSweepers: 15,
  generationLifeTime: 10,
  numFrame: 600,
  minInvasionRadius: 500,
  maxInvasionRadius: 600,
  spawnRate: 30,

  // Mutation
  crossoverRate: 0.7,
  mutationRate: 0.1,
  maxPerturbation: 0.3,
  numElite: 4,
  numCopiesElite: 1,
  generationAcceleration: 10000,

  // Scoring
  scoreCrash: 10,
  scoreTime: 0.001,
  scoreDistance: 0.1,

  // Player
  playerFireRate: 30,
  playerSpeed: 3,
  playerAcceleration: 0.2
};
