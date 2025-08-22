import { Actor, Color, Vector } from 'excalibur';
import { Sensor } from './sensor';

export class Car extends Actor {
  sensors: Sensor[] = [];
  genome: number[];
  fitness: number = 0;
  speed: number;
  heading: number;

  constructor(x: number, y: number, heading: number, speed: number, genome: number[]) {
    super({ x, y, width: 15, height: 20, color: Color.Red });
    this.heading = heading;
    this.speed = speed;
    this.genome = genome;
    this.initSensors();
  }

  private initSensors() {
    // Initialize 5 sensors at -90, -50, 0, 45, 90 degrees
    const angles = [-90, -50, 0, 45, 90];
    for (let i = 0; i < 5; i++) {
      this.sensors.push(new Sensor(this, angles[i], this.genome[i * 3], this.genome[i * 3 + 1], this.genome[i * 3 + 2]));
    }
  }

  onPreUpdate() {
    // Update car position and sensors
    // ...to be implemented...
  }
}
