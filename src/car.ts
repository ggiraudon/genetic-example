import { Actor, Color, Vector, CollisionType, Engine } from 'excalibur';
import { CONFIG } from './config';
import { Sensor, SensorGenes } from './sensor';
import { Maze } from './maze';

export interface CarGenome {
  sensorGenes: SensorGenes[];
}

export class Car extends Actor {
  public genome: CarGenome;
  public sensors: Sensor[] = [];
  public fitness: number = 0;
  public isAlive: boolean = true;
  public distanceTraveled: number = 0;
  private lastPosition: Vector;
  private speed: number = 2;
  private heading: number = 0; // degrees
  private maze: Maze;

  constructor(position: Vector, genome: CarGenome, maze: Maze) {
    super({
      pos: position.clone(),
      width: CONFIG.CAR_WIDTH,
      height: CONFIG.CAR_HEIGHT,
      color: Color.Blue,
      collisionType: CollisionType.Active,
    });

    this.genome = genome;
    this.maze = maze;
    this.lastPosition = position.clone();
    this.createSensors();

    // Set up collision detection
    this.on('collisionstart', (evt) => {
      if (evt.other.constructor.name === 'MazeWall') {
        this.kill();
      }
    });
  }

  private createSensors(): void {
    this.sensors = [];
    for (let i = 0; i < CONFIG.SENSOR_COUNT; i++) {
      const angle = CONFIG.SENSOR_ANGLES[i];
      const genes = this.genome.sensorGenes[i];
      this.sensors.push(new Sensor(angle, genes));
    }
  }

  public update(engine: Engine, delta: number): void {
    super.update(engine, delta);

    if (!this.isAlive) return;

    // Update sensors
    this.updateSensors();

    // Apply sensor corrections
    this.applySensorCorrections();

    // Move the car
    this.move();

    // Update fitness
    this.updateFitness();

    // Check if car hit a wall
    if (this.maze.isWall(this.pos.x, this.pos.y)) {
      this.kill();
    }
  }

  private updateSensors(): void {
    for (const sensor of this.sensors) {
      sensor.sense(this.pos, this.heading, this.maze);
    }
  }

  private applySensorCorrections(): void {
    let totalHeadingCorrection = 0;
    let totalSpeedCorrection = 1.0;
    let activeSensors = 0;

    for (const sensor of this.sensors) {
      if (sensor.isColliding) {
        totalHeadingCorrection += sensor.getHeadingCorrection();
        totalSpeedCorrection *= sensor.getSpeedCorrection();
        activeSensors++;
      }
    }

    if (activeSensors > 0) {
      this.heading += totalHeadingCorrection / activeSensors;
      this.speed *= totalSpeedCorrection;
    }

    // Keep speed within configured bounds
    this.speed = Math.max(CONFIG.MIN_CAR_SPEED, Math.min(CONFIG.MAX_CAR_SPEED, this.speed));
    
    // Normalize heading
    this.heading = this.heading % 360;
    if (this.heading < 0) this.heading += 360;
  }

  private move(): void {
    const radians = (this.heading * Math.PI) / 180;
    const direction = new Vector(Math.cos(radians), Math.sin(radians));
    const movement = direction.scale(this.speed);
    
    this.pos = this.pos.add(movement);
    
    // Update rotation for visual representation
    this.rotation = radians;
  }

  private updateFitness(): void {
    const distanceThisFrame = this.pos.distance(this.lastPosition);
    this.distanceTraveled += distanceThisFrame;
    
    // Fitness is based on distance traveled
    this.fitness = this.distanceTraveled;
    
    // Bonus for getting closer to finish
    const distanceToFinish = this.maze.getDistanceToFinish(this.pos);
    this.fitness += Math.max(0, 1000 - distanceToFinish);
    
    this.lastPosition = this.pos.clone();
  }

  public kill(): void {
    this.isAlive = false;
    this.color = Color.Red;
  }

  public drawSensors(engine: Engine): void {
    if (!this.isAlive) return;

    for (const sensor of this.sensors) {
      const line = sensor.getVisualizationLine(this.pos, this.heading);
      engine.graphicsContext.drawLine(line.start, line.end, line.color, 1);
    }
  }

  public static createRandomGenome(): CarGenome {
    const sensorGenes: SensorGenes[] = [];
    
    for (let i = 0; i < CONFIG.SENSOR_COUNT; i++) {
      sensorGenes.push({
        distance: 5 + Math.random() * 10, // 5-15 pixels
        headingCorrection: (Math.random() - 0.5) * 60, // -30 to +30 degrees
        speedCorrection: CONFIG.MIN_SPEED_CORRECTION + Math.random() * (CONFIG.MAX_SPEED_CORRECTION - CONFIG.MIN_SPEED_CORRECTION), // Use configured range
      });
    }

    return { sensorGenes };
  }

  public static crossover(parent1: CarGenome, parent2: CarGenome): CarGenome {
    const childGenes: SensorGenes[] = [];
    
    for (let i = 0; i < CONFIG.SENSOR_COUNT; i++) {
      const useParent1 = Math.random() < 0.5;
      const parentGene = useParent1 ? parent1.sensorGenes[i] : parent2.sensorGenes[i];
      childGenes.push({ ...parentGene });
    }

    return { sensorGenes: childGenes };
  }

  public mutate(mutationRate: number): void {
    for (const sensor of this.sensors) {
      sensor.mutate(mutationRate);
    }
    
    // Update genome to match mutated sensors
    this.genome.sensorGenes = this.sensors.map(sensor => ({ ...sensor.genes }));
  }
}
