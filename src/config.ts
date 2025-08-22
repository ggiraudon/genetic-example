// Configuration file for the genetic algorithm car maze game
export const CONFIG = {
  NUM_CARS: 100,
  GENERATION_TIME: 30000, // ms
  SENSOR_ANGLES: [-90, -50, 0, 45, 90],
  SENSOR_DISTANCE: 60,
  MAZE_TILE_SIZE: 40,
  MAZE_WIDTH: 20,
  MAZE_HEIGHT: 15,
  START_POS: { x: 2, y: 7 },
  FINISH_POS: { x: 17, y: 7 },
  GENES_DIR: 'genes',
};
