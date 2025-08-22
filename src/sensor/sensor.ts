import { Actor, Color, Vector, Engine, Line, CollisionType } from 'excalibur';
import { CONFIG } from '../config';
import { Car } from '../car/car';

export class Sensor {
  private car: Car;
  private angle: number;
  private headingCorrection: number;
  private speedCorrection: number;
  private distance: number;
  constructor(car: Car, angle: number, headingCorrection: number, speedCorrection: number) {
    this.car = car;
    this.angle = angle;
    this.headingCorrection = headingCorrection;
    this.speedCorrection = speedCorrection;
    this.distance = CONFIG.SENSOR_DISTANCE;
  }

  update(engine: Engine) {
    // Calculate sensor endpoint
    const rad = this.car.rotation + (this.angle * Math.PI / 180);
    const start = this.car.pos;
    const end = new Vector(
      start.x + Math.cos(rad) * this.distance,
      start.y + Math.sin(rad) * this.distance
    );
    // Visualize sensor
    engine.currentScene.draw((ctx) => {
      ctx.save();
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.restore();
    });
    // Collision detection with maze walls
    for (const actor of engine.currentScene.actors) {
      if (actor.collisionType === CollisionType.Fixed) {
        if (this.lineIntersectsRect(start, end, actor)) {
          // Apply corrections
          this.car.rotation += this.headingCorrection * Math.PI / 180;
          // Clamp speed
          // @ts-ignore
          this.car.speed = Math.max(0.5, Math.min(5, (this.car.speed || 2) + this.speedCorrection));
        }
      }
    }
  }

  // Simple line-rectangle intersection
  private lineIntersectsRect(start: Vector, end: Vector, rect: Actor): boolean {
    const left = rect.pos.x - rect.width / 2;
    const right = rect.pos.x + rect.width / 2;
    const top = rect.pos.y - rect.height / 2;
    const bottom = rect.pos.y + rect.height / 2;
    // Check if line crosses any of the 4 edges
    return (
      this.lineIntersectsLine(start, end, new Vector(left, top), new Vector(right, top)) ||
      this.lineIntersectsLine(start, end, new Vector(right, top), new Vector(right, bottom)) ||
      this.lineIntersectsLine(start, end, new Vector(right, bottom), new Vector(left, bottom)) ||
      this.lineIntersectsLine(start, end, new Vector(left, bottom), new Vector(left, top))
    );
  }

  private lineIntersectsLine(a1: Vector, a2: Vector, b1: Vector, b2: Vector): boolean {
    const det = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x);
    if (det === 0) return false;
    const lambda = ((b2.y - b1.y) * (b2.x - a1.x) + (b1.x - b2.x) * (b2.y - a1.y)) / det;
    const gamma = ((a1.y - a2.y) * (b2.x - a1.x) + (a2.x - a1.x) * (b2.y - a1.y)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}
