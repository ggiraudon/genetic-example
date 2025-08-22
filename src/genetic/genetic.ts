import { CarGenome } from '../car/car';
import { CONFIG } from '../config';

export class GeneticAlgorithm {
  static randomGenome(): CarGenome {
    return {
      sensors: CONFIG.SENSOR_ANGLES.map(() => ({
        headingCorrection: (Math.random() - 0.5) * 60, // -30 to +30 deg
        speedCorrection: (Math.random() - 0.5) * 1, // -0.5 to +0.5
      })),
    };
  }

  static crossover(parentA: CarGenome, parentB: CarGenome): CarGenome {
    return {
      sensors: parentA.sensors.map((gene, i) =>
        Math.random() < 0.5 ? gene : parentB.sensors[i]
      ),
    };
  }

  static mutate(genome: CarGenome, rate = 0.1): CarGenome {
    return {
      sensors: genome.sensors.map(gene => ({
        headingCorrection: Math.random() < rate ? (Math.random() - 0.5) * 60 : gene.headingCorrection,
        speedCorrection: Math.random() < rate ? (Math.random() - 0.5) * 1 : gene.speedCorrection,
      })),
    };
  }

  static select(population: { genome: CarGenome; fitness: number; }[], num: number): CarGenome[] {
    // Sort by fitness descending
    const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
    return sorted.slice(0, num).map(p => p.genome);
  }
}
