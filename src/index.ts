import { Engine, DisplayMode, Color } from 'excalibur';
import { Maze } from './maze';
import { GeneticAlgorithm } from './genetic';
import { UI } from './ui';

const engine = new Engine({
  width: 800,
  height: 600,
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.Black
});

const maze = new Maze();
const ga = new GeneticAlgorithm(maze);
const ui = new UI(ga);

engine.add(maze);
engine.add(ui);

ga.start(engine);

engine.start();
