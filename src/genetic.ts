import { Car } from './car';
import { Maze } from './maze';

export class GeneticAlgorithm {
  population: Car[] = [];
  maze: Maze;
  generation: number = 0;

  constructor(maze: Maze) {
    this.maze = maze;
    this.initPopulation();
  }

  private initPopulation() {
    // Initialize population from config
    // ...to be implemented...
  }

  start(engine: any) {
    // Start simulation loop
    // ...to be implemented...
  }
}
