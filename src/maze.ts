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
    this.mazeData = this.createInitialMazeData();
    //this.generateMaze();
    this.createWalls();

  }

  private createInitialMazeData(): MazeData {
    return {
      width: CONFIG.MAZE_WIDTH,
      height: CONFIG.MAZE_HEIGHT,
      startPosition: new Vector(CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2, CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2),
      finishPosition: new Vector(
        (CONFIG.MAZE_WIDTH - 2) * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        (CONFIG.MAZE_HEIGHT - 2) * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2
      ),
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
  }

  private generateMaze(): void {
    this.mazeData.tiles = this.createMazeTiles();
    this.createWalls();
  }

  private createMazeTiles(): number[][] {
    // Create a default maze pattern that scales with the configured dimensions
    const tiles: number[][] = [];
    
    for (let row = 0; row < CONFIG.MAZE_HEIGHT; row++) {
      const tileRow: number[] = [];
      for (let col = 0; col < CONFIG.MAZE_WIDTH; col++) {
        // Border walls
        if (row === 0 || row === CONFIG.MAZE_HEIGHT - 1 || col === 0 || col === CONFIG.MAZE_WIDTH - 1) {
          tileRow.push(1);
        }
        // Start position
        else if (row === 1 && col === 1) {
          tileRow.push(2);
        }
        // Finish position
        else if (row === CONFIG.MAZE_HEIGHT - 2 && col === CONFIG.MAZE_WIDTH - 2) {
          tileRow.push(3);
        }
        // Create some internal walls for complexity
        else if (row % 3 === 0 && col % 4 === 0 && !(row === CONFIG.MAZE_HEIGHT - 2 && col === CONFIG.MAZE_WIDTH - 2)) {
          tileRow.push(1);
        }
        else if (col % 6 === 0 && row % 2 === 1 && row > 2 && row < CONFIG.MAZE_HEIGHT - 3) {
          tileRow.push(1);
        }
        else {
          tileRow.push(0);
        }
      }
      tiles.push(tileRow);
    }
    
    return tiles;
  }

  public randomizeMaze(): void {
    this.mazeData.tiles = this.generateRandomMaze();
    this.setRandomStartPosition();
    this.createWalls();
  }

  private setRandomStartPosition(): void {
    // Find all non-wall tiles
    const nonWallTiles: { row: number; col: number }[] = [];
    
    for (let row = 1; row < CONFIG.MAZE_HEIGHT - 1; row++) {
      for (let col = 1; col < CONFIG.MAZE_WIDTH - 1; col++) {
        if (this.mazeData.tiles[row][col] === 0 || this.mazeData.tiles[row][col] === 2) {
          nonWallTiles.push({ row, col });
        }
      }
    }
    
    // Select a random non-wall tile
    if (nonWallTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * nonWallTiles.length);
      const selectedTile = nonWallTiles[randomIndex];
      
      // Clear the old start position if it exists
      for (let row = 0; row < CONFIG.MAZE_HEIGHT; row++) {
        for (let col = 0; col < CONFIG.MAZE_WIDTH; col++) {
          if (this.mazeData.tiles[row][col] === 2) {
            this.mazeData.tiles[row][col] = 0;
          }
        }
      }
      
      // Set the new start position
      this.mazeData.tiles[selectedTile.row][selectedTile.col] = 2;
      this.mazeData.startPosition = new Vector(
        selectedTile.col * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2,
        selectedTile.row * CONFIG.MAZE_TILE_SIZE + CONFIG.MAZE_TILE_SIZE / 2
      );
    }
  }

  private generateRandomMaze(): number[][] {
    const tiles: number[][] = [];
    
    for (let row = 0; row < CONFIG.MAZE_HEIGHT; row++) {
      const tileRow: number[] = [];
      for (let col = 0; col < CONFIG.MAZE_WIDTH; col++) {
        // Border walls
        if (row === 0 || row === CONFIG.MAZE_HEIGHT - 1 || col === 0 || col === CONFIG.MAZE_WIDTH - 1) {
          tileRow.push(1);
        }
        // Finish position
        else if (row === CONFIG.MAZE_HEIGHT - 2 && col === CONFIG.MAZE_WIDTH - 2) {
          tileRow.push(3);
        }
        // Random internal structure (30% chance of wall)
        else {
          tileRow.push(Math.random() < 0.3 ? 1 : 0);
        }
      }
      tiles.push(tileRow);
    }
    
    // Ensure there's always a clear path around the edges
    this.ensurePathFromEdges(tiles);
    
    return tiles;
  }

  private ensurePathFromEdges(tiles: number[][]): void {
    // Clear some paths around the edges to ensure connectivity
    for (let col = 1; col < Math.min(4, CONFIG.MAZE_WIDTH - 1); col++) {
      tiles[1][col] = 0;
      tiles[CONFIG.MAZE_HEIGHT - 2][col] = 0;
    }
    for (let row = 1; row < Math.min(4, CONFIG.MAZE_HEIGHT - 1); row++) {
      tiles[row][1] = 0;
      tiles[row][CONFIG.MAZE_WIDTH - 2] = 0;
    }
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
