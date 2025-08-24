import { PopulationStats, TopCarInfo } from './genetic-algorithm';

export class UIManager {
  private generationElement: HTMLElement;
  private carsAliveElement: HTMLElement;
  private totalCarsElement: HTMLElement;
  private bestFitnessElement: HTMLElement;
  private bestTilesElement: HTMLElement;
  private topCarsListElement: HTMLElement;

  constructor() {
    this.generationElement = document.getElementById('generation')!;
    this.carsAliveElement = document.getElementById('cars-alive')!;
    this.totalCarsElement = document.getElementById('total-cars')!;
    this.bestFitnessElement = document.getElementById('best-fitness')!;
    this.bestTilesElement = document.getElementById('best-tiles')!;
    this.topCarsListElement = document.getElementById('top-cars-list')!;
    
    // Initialize with default values
    this.updateStats({
      generation: 0,
      averageFitness: 0,
      bestFitness: 0,
      worstFitness: 0,
      carsAlive: 0,
      bestTilesVisited: 0,
      topCars: [],
    });
  }

  public updateStats(stats: PopulationStats): void {
    this.generationElement.textContent = stats.generation.toString();
    this.carsAliveElement.textContent = stats.carsAlive.toString();
    this.totalCarsElement.textContent = '100'; // CONFIG.POPULATION_SIZE
    this.bestFitnessElement.textContent = Math.round(stats.bestFitness).toString();
    this.bestTilesElement.textContent = stats.bestTilesVisited.toString();
    
    // Update top cars display
    this.updateTopCarsDisplay(stats.topCars);
  }

  private updateTopCarsDisplay(topCars: TopCarInfo[]): void {
    this.topCarsListElement.innerHTML = '';
    
    if (topCars.length === 0) {
      const noDataMessage = document.createElement('div');
      noDataMessage.style.textAlign = 'center';
      noDataMessage.style.color = '#888';
      noDataMessage.style.fontStyle = 'italic';
      noDataMessage.style.padding = '20px';
      noDataMessage.textContent = 'No car data available yet...';
      this.topCarsListElement.appendChild(noDataMessage);
      return;
    }
    
    topCars.forEach(car => {
      const carSection = document.createElement('div');
      carSection.className = 'car-section';
      
      const carTitle = document.createElement('div');
      carTitle.className = 'car-title';
      carTitle.textContent = `#${car.rank} - Fitness: ${Math.round(car.fitness)} - Tiles Visited: ${car.tilesVisited}`;
      carSection.appendChild(carTitle);
      
      const sensorsGrid = document.createElement('div');
      sensorsGrid.className = 'sensors-grid';
      
      car.sensorGenes.forEach((sensor, index: number) => {
        const sensorInfo = document.createElement('div');
        sensorInfo.className = 'sensor-info';
        sensorInfo.innerHTML = `
          <div style="margin-bottom: 4px; color: #FFD700; font-weight: bold;">Sensor ${index + 1} (${sensor.angle}°)</div>
          <div><span class="sensor-label">Range:</span><span class="sensor-value">${sensor.distance.toFixed(1)}px</span></div>
          <div><span class="sensor-label">Turn:</span><span class="sensor-value">${sensor.headingCorrection.toFixed(1)}°</span></div>
          <div><span class="sensor-label">Speed:</span><span class="sensor-value">${sensor.speedCorrection.toFixed(2)}x</span></div>
        `;
        sensorsGrid.appendChild(sensorInfo);
      });
      
      carSection.appendChild(sensorsGrid);
      this.topCarsListElement.appendChild(carSection);
    });
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
