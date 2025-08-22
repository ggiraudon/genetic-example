import { Actor, Color, CollisionType, Vector } from 'excalibur';
import { CONFIG } from './config';

export interface MazeData {
  width: number;
  height: number;
  tiles: number[][];
  startPosition: Vector;
  finishPosition: Vector;
}

export class MazeWall extends Actor {
  constructor(x: number, y: number) {
    super({
      pos: new Vector(x, y),
      width: CONFIG.MAZE_TILE_SIZE,
      height: CONFIG.MAZE_TILE_SIZE,
      color: Color.Gray,
      collisionType: CollisionType.Fixed,
    });
  }
}

export class Maze {
  private walls: MazeWall[] = [];
  private mazeData: MazeData;

  constructor() {
    // Simple maze layout (1 = wall, 0 = empty, 2 = start, 3 = finish)
    this.mazeData = {
      width: 20,
      height: 15,
      startPosition: new Vector(40, 40), // 2nd row, 2nd column
      finishPosition: new Vector(576, 416), // Near bottom-right
      tiles: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      ]
    };

    this.createWalls();
  }

  private createWalls(): void {
    this.walls = [];
    for (let row = 0; row < this.mazeData.height; row++) {
      for (let col = 0; col < this.mazeData.width; col++) {
        if (this.mazeData.tiles[row][col] === 1) {
          const wall = new MazeWall(
            col * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
            row * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2
          );
          this.walls.push(wall);
        }
      }
    }
  }

  public getWalls(): MazeWall[] {
    return this.walls;
  }

  public getStartPosition(): Vector {
    return this.mazeData.startPosition.clone();
  }

  public getFinishPosition(): Vector {
    return this.mazeData.finishPosition.clone();
  }

  public isWall(x: number, y: number): boolean {
    const col = Math.floor(x / CONFIG.MAZE_TILE_SIZE);
    const row = Math.floor(y / CONFIG.MAZE_TILE_SIZE);
    
    if (row < 0 || row >= this.mazeData.height || col < 0 || col >= this.mazeData.width) {
      return true; // Out of bounds is considered a wall
    }
    
    return this.mazeData.tiles[row][col] === 1;
  }

  public getDistanceToFinish(position: Vector): number {
    return this.mazeData.finishPosition.distance(position);
  }
}
