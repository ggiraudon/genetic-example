import { Engine, Scene, DisplayMode, Color } from 'excalibur';
import { CONFIG } from './config';
import { Maze } from './maze';
import { Car, CarGenome } from './car';
import { GeneticAlgorithm } from './genetic-algorithm';
import { UIManager } from './ui';

export class Game {
  private engine: Engine;
  private maze: Maze;
  private cars: Car[] = [];
  private geneticAlgorithm: GeneticAlgorithm;
  private uiManager: UIManager;
  private generationStartTime: number = 0;
  private scene: Scene;
  private running: boolean = false;

  constructor() {
    this.engine = new Engine({
      canvasElementId: 'canvas',
      width: 800,
      height: 600,
      displayMode: DisplayMode.Fixed,
      backgroundColor: Color.Black,
    });

    this.maze = new Maze();
    this.geneticAlgorithm = new GeneticAlgorithm();
    this.uiManager = new UIManager();
    this.scene = new Scene();
    
    
    this.setupGame();
  }

  private setupGame(): void {
    // Add maze walls to scene
    const walls = this.maze.getWalls();
    for (const wall of walls) {
      this.scene.add(wall);
    }

    // Add scene to engine
    this.engine.addScene('main', this.scene);
    this.engine.goToScene('main');

    // Create initial population
    this.startNewGeneration();

    // Set up game loop
    this.engine.on('postupdate', () => {
      this.update();
    });

    // Set up rendering
    this.engine.on('postdraw', () => {
      this.drawSensors();
    });
  }

  private startNewGeneration(): void {
    // Remove old cars from scene
    for (const car of this.cars) {
      this.scene.remove(car);
    }

    // Create new population
    const carFactory = (genome: CarGenome) => {
      return new Car(this.maze.getStartPosition(), genome, this.maze);
    };

    if (this.geneticAlgorithm.getCurrentGeneration() === 0) {
      this.cars = this.geneticAlgorithm.createInitialPopulation(carFactory);
    } else {
      this.cars = this.geneticAlgorithm.evolvePopulation(carFactory);
    }

    // Add new cars to scene
    for (const car of this.cars) {
      this.scene.add(car);
    }

    this.generationStartTime = Date.now();
    
    const stats = this.geneticAlgorithm.getPopulationStats();
    this.uiManager.updateStats(stats);
    
    this.uiManager.showMessage(`Generation ${stats.generation} started!`);
    this.running = true;
  }

  private update(): void {

    if (!this.running) return;

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.generationStartTime;
    
    // Check if generation time limit exceeded or all cars are dead
    const carsAlive = this.cars.filter(car => car.isAlive).length;
    const timeUp = elapsedTime >= CONFIG.GENERATION_TIME_LIMIT;
    const allCarsDead = carsAlive === 0;

    if (timeUp || allCarsDead) {
      this.endGeneration();
      return;
    }

    // Update UI stats
    const stats = this.geneticAlgorithm.getPopulationStats();
    this.uiManager.updateStats(stats);
  }

  private endGeneration(): void {
    const stats = this.geneticAlgorithm.getPopulationStats();
    
    // Save generation data
    this.geneticAlgorithm.saveGeneration(stats);
    
    this.uiManager.showMessage(
      `Generation ${stats.generation} ended! Best fitness: ${Math.round(stats.bestFitness)}`
    );

    this.running = false;
    // Start next generation after the configured pause duration
    setTimeout(() => {
      this.startNewGeneration();
    }, CONFIG.GENERATION_PAUSE_DURATION);
  }

  private drawSensors(): void {
    // Draw sensors for alive cars
    for (const car of this.cars) {
      if (car.isAlive) {
        car.drawSensors(this.engine);
      }
    }
  }

  public async start(): Promise<void> {
    await this.engine.start();
  }
}
