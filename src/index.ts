import { Engine, DisplayMode, Color } from 'excalibur';
import { Maze } from './maze';
import { GeneticAlgorithm } from './genetic';
import { createUIActors } from './ui';

const engine = new Engine({
  width: 800,
  height: 600,
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.White
});

const maze = new Maze();
const ga = new GeneticAlgorithm(maze);
ga.start(engine);

const { actors: uiActors, updateUI } = createUIActors(ga);

engine.add(maze);
for (const actor of uiActors) {
  engine.add(actor);
}

ga.start(engine);

engine.on('preupdate', updateUI);
engine.start();
