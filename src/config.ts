export interface GameConfig {
  readonly POPULATION_SIZE: number;
  readonly GENERATION_TIME_LIMIT: number;
  readonly CAR_WIDTH: number;
  readonly CAR_HEIGHT: number;
  readonly SENSOR_COUNT: number;
  readonly SENSOR_ANGLES: number[];
  readonly MAZE_TILE_SIZE: number;
  readonly MAZE_WIDTH: number;
  readonly MAZE_HEIGHT: number;
  readonly RANDOMIZE_MAZE_AFTER_GENERATIONS: number;
  readonly MAX_CAR_SPEED: number;
  readonly MIN_CAR_SPEED: number;
  readonly MAX_SPEED_CORRECTION: number;
  readonly MIN_SPEED_CORRECTION: number;
  readonly GENERATION_PAUSE_DURATION: number;
  readonly RECENT_TILES_MEMORY: number;
  readonly ENABLE_CAR_COLLISIONS: boolean;
  readonly LINEAR_ACCELERATION: number;
}

export const CONFIG: GameConfig = {
  POPULATION_SIZE: 100,
  GENERATION_TIME_LIMIT: 10000, // 10 seconds in milliseconds
  CAR_WIDTH: 5,
  CAR_HEIGHT: 5,
  SENSOR_COUNT: 5,
  SENSOR_ANGLES: [-90, -50, 0, 45, 90], // degrees relative to car heading
  MAZE_TILE_SIZE: 32,
  MAZE_WIDTH: 20,
  MAZE_HEIGHT: 15,
  RANDOMIZE_MAZE_AFTER_GENERATIONS: 0, // 0 to disable maze randomization
  MAX_CAR_SPEED: 5.0, // Maximum speed in pixels per frame
  MIN_CAR_SPEED: -1.0, // Minimum speed in pixels per frame
  MAX_SPEED_CORRECTION: 2.0, // Maximum speed correction multiplier
  MIN_SPEED_CORRECTION: -0.5, // Minimum speed correction multiplier
  GENERATION_PAUSE_DURATION: 1000, // 1 seconds pause between generations in milliseconds
  RECENT_TILES_MEMORY: 5, // Number of recent tiles to remember for fitness calculation
  ENABLE_CAR_COLLISIONS: false, // Whether cars can collide with each other
  LINEAR_ACCELERATION: 0.1, // Acceleration applied when no sensor collisions detected
};
