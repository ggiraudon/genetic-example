import { Actor, Color, Vector, Shape, Collider, CollisionType, CollisionGroupManager } from 'excalibur';
import { Sensor } from './sensor';
import { CarGroup } from './genetic';
// Define collision groups

export class Car extends Actor {
  sensors: Sensor[] = [];
  genome: number[];
  fitness: number = 0;
  speed: number;
  heading: number;
  alive: boolean = true;

  constructor(x: number, y: number, heading: number, speed: number, genome: number[]) {
    super({ x, y, width: 15, height: 20, rotation: heading, color: Color.Red, collisionGroup: CarGroup });
    this.heading = heading;
    this.speed = speed;
    this.genome = genome;
    this.body.collisionType = CollisionType.Active;
    this.collider.set(Shape.Box(15, 20));
    this.initSensors();

    this.on('collisionstart', (evt) => {
        if (evt.other !== this) {
          if (evt.other.constructor.name === 'Actor') {
            this.alive = false;
            this.speed = 0;
            //debugger;
          }
        }
    });

    this.sensors.forEach(sensor => {
      sensor.on('collisionstart', (evt) => {
        if (evt.other !== this) {
           // console.log('something collided with the sensor: ' + evt.other.constructor.name);

            if(evt.other.constructor.name === 'Actor') {
                this.heading += sensor.headingCorrection;
                this.speed += sensor.speedCorrection;
                // Clamp speed
                this.speed = Math.max(0, Math.min(this.speed, 10));
            }
        }
      });
    });
  }


  private initSensors() {
    // Initialize 5 sensors at -90, -50, 0, 45, 90 degrees
    const angles = [-90, -50, 0, 45, 90];
    for (let i = 0; i < 5; i++) {
      this.sensors.push(new Sensor(this, angles[i], this.genome[i * 3]+20, this.genome[i * 3 + 1], this.genome[i * 3 + 2]));
    }
  }

  onPreUpdate(_engine, _delta) {
    if (!this.alive) return;
    // Move car forward
    const rad = this.heading * Math.PI / 180;
    this.pos.x += Math.cos(rad) * this.speed;
    this.pos.y += Math.sin(rad) * this.speed;
/*
    // Check for collision with walls using Excalibur Collider
    let parent = this.parent;
    while (parent && !(parent.constructor && parent.constructor.name === 'Maze')) {
      parent = parent.parent;
    }
    if (parent && parent.walls) {
      for (const wall of parent.walls) {
        if (this.collider.collidesWith(wall.collider)) {
          console.log("Collision detected");
          this.speed = 0;
          this.alive = false;
          return;
        }
      }
    }

    // Update sensors and check for sensor-triggered corrections
    for (const sensor of this.sensors) {
      if (sensor.detectCollision()) {
        this.heading += sensor.headingCorrection;
        this.speed += sensor.speedCorrection;
        console.log("boom");
      }
    }
*/
    // Fitness: distance travelled
    this.fitness += this.speed;
  }
}
