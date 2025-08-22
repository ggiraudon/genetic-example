import { Actor, Color, Vector } from 'excalibur';
import { Sensor } from './sensor';

export class Car extends Actor {
  sensors: Sensor[] = [];
  genome: number[];
  fitness: number = 0;
  speed: number;
  heading: number;
  alive: boolean = true;

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

  onPreUpdate(_engine, _delta) {
    if (!this.alive) return;
    // Move car forward
    const rad = this.heading * Math.PI / 180;
    this.pos.x += Math.cos(rad) * this.speed;
    this.pos.y += Math.sin(rad) * this.speed;
    // Update sensors and check for collisions
    for (const sensor of this.sensors) {
      if (sensor.detectCollision()) {
        this.heading += sensor.headingCorrection;
        this.speed += sensor.speedCorrection;
      }
    }
    // Clamp speed
    this.speed = Math.max(0, Math.min(this.speed, 10));
    // Fitness: distance travelled
    this.fitness += this.speed;
  }
}
