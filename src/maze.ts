import { Actor, Color } from 'excalibur';

export class Maze extends Actor {
  walls: Actor[] = [];

  constructor() {
    super();
    this.createMaze();
  }

  private createMaze() {
    // Example: create a border and a few walls
    // ...add wall actors to this.walls...
  }
}
