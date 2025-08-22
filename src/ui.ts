import { Label, Color, Vector, Actor } from 'excalibur';
import { GeneticAlgorithm } from './genetic';

export function createUIActors(ga: GeneticAlgorithm) {
  // Panel background (under maze)
  const panel = new Actor({
    x: 400, // center
    y: 630, // below 600px maze
    width: 800,
    height: 60,
    color: Color.Orange,
    z: 100
  });

  const genLabel = new Label({
    text: 'Generation: 0',
    pos: new Vector(20, 620),
    color: Color.Black,
    z: 101
  });
  const carsLabel = new Label({
    text: 'Cars: 0',
    pos: new Vector(250, 620),
    color: Color.Black,
    z: 101
  });
  const aliveLabel = new Label({
    text: 'Alive: 0',
    pos: new Vector(450, 620),
    color: Color.Black,
    z: 101
  });

  // Update function to be called in engine's preupdate
  function updateUI() {
    genLabel.text = `Generation: ${ga.generation}`;
    carsLabel.text = `Cars: ${ga.population.length}`;
    const alive = ga.population.filter(car => car.alive).length;
    aliveLabel.text = `Alive: ${alive}`;
  }

  return { actors: [panel, genLabel, carsLabel, aliveLabel], updateUI };
}
