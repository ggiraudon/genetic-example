import { Car } from './car';
import { Maze } from './maze';

export class GeneticAlgorithm {
  population: Car[] = [];
  maze: Maze;
  generation: number = 0;
  carsPerGeneration: number = 100;

  constructor(maze: Maze) {
    this.maze = maze;
    this.loadConfig();
    this.initPopulation();
  }

  private loadConfig() {
    // Placeholder: load config from file or set default
    this.carsPerGeneration = 100;
  }

  private initPopulation() {
    // Initialize population with random genomes
    for (let i = 0; i < this.carsPerGeneration; i++) {
      const genome = Array.from({ length: 15 }, () => Math.random() * 10);
      this.population.push(new Car(50, 50, 0, 2, genome));
    }
  }

  start(engine: any) {
    // Add cars to engine
    for (const car of this.population) {
      engine.add(car);
    }
  }
}
