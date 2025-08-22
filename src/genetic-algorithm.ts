import { Car, CarGenome } from './car';
import { CONFIG } from './config';

export interface PopulationStats {
  generation: number;
  averageFitness: number;
  bestFitness: number;
  worstFitness: number;
  carsAlive: number;
}

export class GeneticAlgorithm {
  private generation: number = 0;
  private population: Car[] = [];
  private mutationRate: number = 0.1;
  private elitePercentage: number = 0.2;

  constructor() {}

  public createInitialPopulation(carFactory: (genome: CarGenome) => Car): Car[] {
    this.population = [];
    
    for (let i = 0; i < CONFIG.POPULATION_SIZE; i++) {
      const genome = Car.createRandomGenome();
      const car = carFactory(genome);
      this.population.push(car);
    }
    
    this.generation = 1;
    return this.population;
  }

  public evolvePopulation(carFactory: (genome: CarGenome) => Car): Car[] {
    // Sort population by fitness (descending)
    this.population.sort((a, b) => b.fitness - a.fitness);

    // Calculate elite count
    const eliteCount = Math.floor(CONFIG.POPULATION_SIZE * this.elitePercentage);
    
    // Create new population
    const newGenomes: CarGenome[] = [];

    // Keep elite (best performers)
    for (let i = 0; i < eliteCount; i++) {
      newGenomes.push(this.cloneGenome(this.population[i].genome));
    }

    // Create offspring through crossover and mutation
    while (newGenomes.length < CONFIG.POPULATION_SIZE) {
      const parent1 = this.tournamentSelection();
      const parent2 = this.tournamentSelection();
      
      const childGenome = Car.crossover(parent1.genome, parent2.genome);
      this.mutateGenome(childGenome);
      
      newGenomes.push(childGenome);
    }

    // Create new population from genomes
    this.population = [];
    for (const genome of newGenomes) {
      const car = carFactory(genome);
      this.population.push(car);
    }

    this.generation++;
    return this.population;
  }

  private tournamentSelection(): Car {
    const tournamentSize = 5;
    let best = this.population[Math.floor(Math.random() * this.population.length)];
    
    for (let i = 1; i < tournamentSize; i++) {
      const competitor = this.population[Math.floor(Math.random() * this.population.length)];
      if (competitor.fitness > best.fitness) {
        best = competitor;
      }
    }
    
    return best;
  }

  private cloneGenome(genome: CarGenome): CarGenome {
    return {
      sensorGenes: genome.sensorGenes.map(gene => ({ ...gene }))
    };
  }

  private mutateGenome(genome: CarGenome): void {
    for (const gene of genome.sensorGenes) {
      if (Math.random() < this.mutationRate) {
        gene.distance += (Math.random() - 0.5) * 20;
        gene.distance = Math.max(10, Math.min(200, gene.distance));
      }
      
      if (Math.random() < this.mutationRate) {
        gene.headingCorrection += (Math.random() - 0.5) * 20;
        gene.headingCorrection = Math.max(-45, Math.min(45, gene.headingCorrection));
      }
      
      if (Math.random() < this.mutationRate) {
        gene.speedCorrection += (Math.random() - 0.5) * 0.5;
        gene.speedCorrection = Math.max(CONFIG.MIN_SPEED_CORRECTION, Math.min(CONFIG.MAX_SPEED_CORRECTION, gene.speedCorrection));
      }
    }
  }

  public getPopulationStats(): PopulationStats {
    const fitnesses = this.population.map(car => car.fitness);
    const carsAlive = this.population.filter(car => car.isAlive).length;
    
    return {
      generation: this.generation,
      averageFitness: fitnesses.reduce((sum, f) => sum + f, 0) / fitnesses.length,
      bestFitness: Math.max(...fitnesses),
      worstFitness: Math.min(...fitnesses),
      carsAlive: carsAlive,
    };
  }

  public saveGeneration(stats: PopulationStats): void {
    const data = {
      generation: this.generation,
      stats: stats,
      genomes: this.population.map(car => car.genome),
    };

    const dataStr = JSON.stringify(data, null, 2);
    
    // In a browser environment, we'll log the data instead of saving to file
    // In a real implementation, you'd want to send this to a server or use File API
    console.log(`Generation ${this.generation} data:`, dataStr);
    /*
    // You could also download it as a file:
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gen_${this.generation}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    */
  }

  public getCurrentGeneration(): number {
    return this.generation;
  }
}
