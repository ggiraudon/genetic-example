import { Actor, Color, Engine, Scene, Vector, Shape, CollisionType } from 'excalibur';
import { CONFIG } from '../config';

export class Maze extends Scene {
  public walls: Actor[] = [];
  constructor() {
    super();
    this.createMaze();
  }

  createMaze() {
    // Simple hardcoded maze layout: 0 = empty, 1 = wall
    const layout = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
      [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[y].length; x++) {
        if (layout[y][x] === 1) {
          const wall = new Actor({
            pos: new Vector(
              x * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
              y * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2
            ),
            width: CONFIG.MAZE_TILE_SIZE,
            height: CONFIG.MAZE_TILE_SIZE,
            color: Color.Black,
            collisionType: CollisionType.Fixed,
          });
          this.walls.push(wall);
          this.add(wall);
        }
      }
    }
  }
}
