import { PopulationStats } from './genetic-algorithm';

export class UIManager {
  private generationElement: HTMLElement;
  private carsAliveElement: HTMLElement;
  private totalCarsElement: HTMLElement;
  private bestFitnessElement: HTMLElement;

  constructor() {
    this.generationElement = document.getElementById('generation')!;
    this.carsAliveElement = document.getElementById('cars-alive')!;
    this.totalCarsElement = document.getElementById('total-cars')!;
    this.bestFitnessElement = document.getElementById('best-fitness')!;
    
    // Initialize with default values
    this.updateStats({
      generation: 0,
      averageFitness: 0,
      bestFitness: 0,
      worstFitness: 0,
      carsAlive: 0,
    });
  }

  public updateStats(stats: PopulationStats): void {
    this.generationElement.textContent = stats.generation.toString();
    this.carsAliveElement.textContent = stats.carsAlive.toString();
    this.totalCarsElement.textContent = '100'; // CONFIG.POPULATION_SIZE
    this.bestFitnessElement.textContent = Math.round(stats.bestFitness).toString();
  }

  public showMessage(message: string): void {
    // Create a temporary message overlay
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.background = 'rgba(0, 0, 0, 0.8)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '20px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontSize = '18px';
    messageDiv.style.zIndex = '1000';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 3000);
  }
}
