import { Actor, Vector } from 'excalibur';

export class Sensor {
  car: Actor;
  angle: number;
  distance: number;
  headingCorrection: number;
  speedCorrection: number;

  constructor(car: Actor, angle: number, distance: number, headingCorrection: number, speedCorrection: number) {
    this.car = car;
    this.angle = angle;
    this.distance = distance;
    this.headingCorrection = headingCorrection;
    this.speedCorrection = speedCorrection;
  }

  detectCollision(): boolean {
    // Placeholder: always return false (to be replaced with real maze collision logic)
    return false;
  }
}
