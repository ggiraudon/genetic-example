
import { Actor, Color, Vector, Shape, CollisionType, CollisionGroupManager } from 'excalibur';
import { WallGroup, SensorGroup } from './genetic';

export class Sensor extends Actor {
  car: Actor;
  angle: number;
  distance: number;
  headingCorrection: number;
  speedCorrection: number;

  constructor(car: Actor, angle: number, distance: number, headingCorrection: number, speedCorrection: number) {
    super({ width: 2, height: 4, color: Color.Blue, collisionGroup: SensorGroup }); // invisible
    this.car = car;
    this.angle = angle;
    this.distance = distance;
    //this.rotation = angle;
    this.headingCorrection = headingCorrection;
    this.speedCorrection = speedCorrection;
    this.body.collisionType = CollisionType.Active;

    this.collider.set(Shape.Box(4, 4));
    // Invisible
    (this as any).graphics.opacity = 50;
  }

  onPreUpdate(_engine, _delta) {
    // Position sensor relative to car
    const carAngle = (this.car as any).heading || 0;
    const sensorAngle = carAngle + this.angle;
    const rad = sensorAngle * Math.PI / 180;
    this.pos.x = this.car.pos.x + Math.cos(rad) * this.distance;
    this.pos.y = this.car.pos.y + Math.sin(rad) * this.distance;
    //debugger;
    //this.rotation = rad;
  }

  detectCollision(): boolean {
    // Find the maze instance from the car's parent chain
    let parent = this.car.parent;
    while (parent && !(parent.constructor && parent.constructor.name === 'Maze')) {
      parent = parent.parent;
    }
    if (!parent || !parent.walls) return false;
    const walls = parent.walls;
    for (const wall of walls) {
      if (this.collider.collidesWith(wall.collider)) {
        console.log("Collision detected");
        return true;
      }
    }
    return false;
  }
}

