import { Scene, Engine } from 'excalibur';
import { Car, CarGenome } from '../car/car';
import { GeneticAlgorithm } from './genetic';
import { CONFIG } from '../config';
import { Maze } from '../maze/maze';

export class Simulation extends Scene {
  public cars: Car[] = [];
  public generation: number = 0;
  public aliveCount: number = 0;
  public maze: Maze;
  private timer: number = 0;
  private population: { genome: CarGenome; fitness: number; }[] = [];

  constructor(maze: Maze) {
    super();
    this.maze = maze;
    this.startGeneration();
  }

  startGeneration() {
    this.cars = [];
    this.population = [];
    for (let i = 0; i < CONFIG.NUM_CARS; i++) {
      const genome = GeneticAlgorithm.randomGenome();
      const car = new Car(
        genome,
        CONFIG.START_POS.x * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        CONFIG.START_POS.y * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        0
      );
      this.cars.push(car);
      this.add(car);
      this.population.push({ genome, fitness: 0 });
    }
    this.generation++;
    this.timer = 0;
    this.aliveCount = CONFIG.NUM_CARS;
    // TODO: Save population to gen_N.json
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.timer += delta;
    this.aliveCount = 0;
    for (let i = 0; i < this.cars.length; i++) {
      const car = this.cars[i];
      if (car.alive) {
        // Check collision with walls
        for (const wall of this.maze.walls) {
          if (car.collides(wall)) {
            car.kill();
          }
        }
        // Check finish
        const finishX = CONFIG.FINISH_POS.x * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2;
        const finishY = CONFIG.FINISH_POS.y * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2;
        if (
          Math.abs(car.pos.x - finishX) < CONFIG.MAZE_TILE_SIZE / 2 &&
          Math.abs(car.pos.y - finishY) < CONFIG.MAZE_TILE_SIZE / 2
        ) {
          car.kill();
        }
        this.population[i].fitness = car.distanceTravelled;
        if (car.alive) this.aliveCount++;
      }
    }
    if (this.timer > CONFIG.GENERATION_TIME || this.aliveCount === 0) {
      this.evolve();
    }
  }

  evolve() {
    // Select top 20% as parents
    const parents = GeneticAlgorithm.select(this.population, Math.floor(CONFIG.NUM_CARS * 0.2));
    const newPopulation: CarGenome[] = [];
    while (newPopulation.length < CONFIG.NUM_CARS) {
      const a = parents[Math.floor(Math.random() * parents.length)];
      const b = parents[Math.floor(Math.random() * parents.length)];
      let child = GeneticAlgorithm.crossover(a, b);
      child = GeneticAlgorithm.mutate(child);
      newPopulation.push(child);
    }
    // Remove old cars
    for (const car of this.cars) {
      this.remove(car);
    }
    // Spawn new cars
    this.cars = [];
    this.population = [];
    for (let i = 0; i < CONFIG.NUM_CARS; i++) {
      const car = new Car(
        newPopulation[i],
        CONFIG.START_POS.x * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        CONFIG.START_POS.y * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        0
      );
      this.cars.push(car);
      this.add(car);
      this.population.push({ genome: newPopulation[i], fitness: 0 });
    }
    this.generation++;
    this.timer = 0;
    this.aliveCount = CONFIG.NUM_CARS;
    // TODO: Save population to gen_N.json
  }
}
