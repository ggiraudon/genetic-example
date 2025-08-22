export interface GameConfig {
  readonly POPULATION_SIZE: number;
  readonly GENERATION_TIME_LIMIT: number;
  readonly CAR_WIDTH: number;
  readonly CAR_HEIGHT: number;
  readonly SENSOR_COUNT: number;
  readonly SENSOR_ANGLES: number[];
  readonly MAZE_TILE_SIZE: number;
  readonly MAX_CAR_SPEED: number;
  readonly MIN_CAR_SPEED: number;
  readonly MAX_SPEED_CORRECTION: number;
  readonly MIN_SPEED_CORRECTION: number;
  readonly GENERATION_PAUSE_DURATION: number;
}

export const CONFIG: GameConfig = {
  POPULATION_SIZE: 100,
  GENERATION_TIME_LIMIT: 30000, // 30 seconds in milliseconds
  CAR_WIDTH: 5,
  CAR_HEIGHT: 5,
  SENSOR_COUNT: 5,
  SENSOR_ANGLES: [-90, -50, 0, 45, 90], // degrees relative to car heading
  MAZE_TILE_SIZE: 32,
  MAX_CAR_SPEED: 5.0, // Maximum speed in pixels per frame
  MIN_CAR_SPEED: 0.5, // Minimum speed in pixels per frame
  MAX_SPEED_CORRECTION: 2.0, // Maximum speed correction multiplier
  MIN_SPEED_CORRECTION: 0.1, // Minimum speed correction multiplier
  GENERATION_PAUSE_DURATION: 1000, // 1 seconds pause between generations in milliseconds
};
