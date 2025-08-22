import { Vector, Color } from 'excalibur';
import { Maze } from './maze';
import { CONFIG } from './config';

export interface SensorGenes {
  distance: number;
  headingCorrection: number; // degrees
  speedCorrection: number; // speed multiplier
}

export class Sensor {
  public genes: SensorGenes;
  public angle: number; // relative to car heading in degrees
  public lastHitDistance: number = 0;
  public isColliding: boolean = false;

  constructor(angle: number, genes: SensorGenes) {
    this.angle = angle;
    this.genes = { ...genes };
  }

  public sense(carPosition: Vector, carHeading: number, maze: Maze): boolean {
    const absoluteAngle = carHeading + this.angle;
    const radians = (absoluteAngle * Math.PI) / 180;
    
    const direction = new Vector(Math.cos(radians), Math.sin(radians));
    
    // Cast ray from car position in sensor direction
    const stepSize = 2;
    let currentDistance = 0;
    
    while (currentDistance < this.genes.distance) {
      currentDistance += stepSize;
      const testPosition = carPosition.add(direction.scale(currentDistance));
      
      if (maze.isWall(testPosition.x, testPosition.y)) {
        this.lastHitDistance = currentDistance;
        this.isColliding = true;
        return true;
      }
    }
    
    this.lastHitDistance = this.genes.distance;
    this.isColliding = false;
    return false;
  }

  public getHeadingCorrection(): number {
    return this.isColliding ? this.genes.headingCorrection : 0;
  }

  public getSpeedCorrection(): number {
    return this.isColliding ? this.genes.speedCorrection : 1.0;
  }

  public getVisualizationLine(carPosition: Vector, carHeading: number): { start: Vector, end: Vector, color: Color } {
    const absoluteAngle = carHeading + this.angle;
    const radians = (absoluteAngle * Math.PI) / 180;
    const direction = new Vector(Math.cos(radians), Math.sin(radians));
    
    const endDistance = this.isColliding ? this.lastHitDistance : this.genes.distance;
    const end = carPosition.add(direction.scale(endDistance));
    
    return {
      start: carPosition,
      end: end,
      color: this.isColliding ? Color.Red : Color.Green
    };
  }

  public clone(): Sensor {
    return new Sensor(this.angle, { ...this.genes });
  }

  public mutate(mutationRate: number): void {
    if (Math.random() < mutationRate) {
      this.genes.distance += (Math.random() - 0.5) * 20;
      this.genes.distance = Math.max(10, Math.min(200, this.genes.distance));
    }
    
    if (Math.random() < mutationRate) {
      this.genes.headingCorrection += (Math.random() - 0.5) * 20;
      this.genes.headingCorrection = Math.max(-45, Math.min(45, this.genes.headingCorrection));
    }
    
    if (Math.random() < mutationRate) {
      this.genes.speedCorrection += (Math.random() - 0.5) * 0.5;
      this.genes.speedCorrection = Math.max(CONFIG.MIN_SPEED_CORRECTION, Math.min(CONFIG.MAX_SPEED_CORRECTION, this.genes.speedCorrection));
    }
  }
}
