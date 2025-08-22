import { Actor, Color, Shape, CollisionType, CollisionGroup } from 'excalibur';
import { WallGroup } from './genetic';

export class Maze extends Actor {
  walls: Actor[] = [];

  constructor() {
    super({ collisionGroup: WallGroup });
    this.createMaze();
  }

  private createMaze() {
    // Maze dimensions
    const width = 800;
    const height = 600;
    const wallThickness = 20;

    // Border walls
    // Top
  const topWall = new Actor({ x: width / 2, y: wallThickness / 2, width: width, height: wallThickness, color: Color.Black, collisionGroup: WallGroup });
  topWall.body.collisionType = CollisionType.Fixed;
  topWall.collider.set(Shape.Box(width, wallThickness));
  this.walls.push(topWall);
    // Bottom
  const bottomWall = new Actor({ x: width / 2, y: height - wallThickness / 2, width: width, height: wallThickness, color: Color.Black, collisionGroup: WallGroup });
  bottomWall.body.collisionType = CollisionType.Fixed;
  bottomWall.collider.set(Shape.Box(width, wallThickness));
  this.walls.push(bottomWall);
    // Left
  const leftWall = new Actor({ x: wallThickness / 2, y: height / 2, width: wallThickness, height: height, color: Color.Black, collisionGroup: WallGroup });
  leftWall.body.collisionType = CollisionType.Fixed;
  leftWall.collider.set(Shape.Box(wallThickness, height));
  this.walls.push(leftWall);
    // Right
  const rightWall = new Actor({ x: width - wallThickness / 2, y: height / 2, width: wallThickness, height: height, color: Color.Black, collisionGroup: WallGroup });
  rightWall.body.collisionType = CollisionType.Fixed;
  rightWall.collider.set(Shape.Box(wallThickness, height));
  this.walls.push(rightWall);

    // Internal walls (example layout)
  const wall1 = new Actor({ x: 200, y: 100, width: 400, height: wallThickness, color: Color.Black, collisionGroup: WallGroup });
  wall1.body.collisionType = CollisionType.Fixed;
  wall1.collider.set(Shape.Box(400, wallThickness));
  this.walls.push(wall1);
  const wall2 = new Actor({ x: 400, y: 300, width: wallThickness, height: 300, color: Color.Black, collisionGroup: WallGroup });
  wall2.body.collisionType = CollisionType.Fixed;
  wall2.collider.set(Shape.Box(wallThickness, 300));
  this.walls.push(wall2);
  const wall3 = new Actor({ x: 600, y: 500, width: 300, height: wallThickness, color: Color.Black, collisionGroup: WallGroup });
  wall3.body.collisionType = CollisionType.Fixed;
  wall3.collider.set(Shape.Box(300, wallThickness));
  this.walls.push(wall3);

    // Add all wall actors as children of the maze
    for (const wall of this.walls) {
      this.addChild(wall);
    }
  }
}
