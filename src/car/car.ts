import { Actor, Color, Vector, CollisionType, Engine } from 'excalibur';
import { Sensor } from '../sensor/sensor';
import { CONFIG } from '../config';

export interface CarGenome {
  sensors: { headingCorrection: number; speedCorrection: number; }[];
}

export class Car extends Actor {
  public sensors: Sensor[] = [];
  public genome: CarGenome;
  public alive: boolean = true;
  public distanceTravelled: number = 0;
  private speed: number = 20;
  constructor(genome: CarGenome, x: number, y: number, heading: number) {
    super({
      pos: new Vector(x, y),
      width: 20,
      height: 15,
      color: Color.Red,
      collisionType: CollisionType.Passive,
      rotation: heading,
    });
    this.genome = genome;
    for (let i = 0; i < CONFIG.SENSOR_ANGLES.length; i++) {
      this.sensors.push(
        new Sensor(this, CONFIG.SENSOR_ANGLES[i], genome.sensors[i].headingCorrection, genome.sensors[i].speedCorrection)
      );
    }
  }

  onPreUpdate(engine: Engine, delta: number) {
    if (!this.alive) return;
    // Move forward
    const dx = Math.cos(this.rotation) * this.speed;
    const dy = Math.sin(this.rotation) * this.speed;
    this.pos.x += dx;
    this.pos.y += dy;
    this.distanceTravelled += Math.sqrt(dx * dx + dy * dy);
    // Update sensors
    for (const sensor of this.sensors) {
      sensor.update(engine);
    }
  }

  kill() {
    this.alive = false;
    this.color = Color.Gray;
  }
}
