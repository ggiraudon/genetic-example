
import { Color, Engine, DisplayMode, Scene } from 'excalibur';
import { Maze } from './maze/maze';
import { Simulation } from './genetic/simulation';
import { UI } from './ui/ui';
import { CONFIG } from './config';

const game = new Engine({
  width: CONFIG.MAZE_WIDTH * CONFIG.MAZE_TILE_SIZE,
  height: CONFIG.MAZE_HEIGHT * CONFIG.MAZE_TILE_SIZE + 100,
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.Blue
});

const mainScene = new Scene();
const maze = new Maze();
const simulation = new Simulation(maze);
const ui = new UI(simulation);

// Add maze walls to the scene
for (const wall of maze.walls) {
  mainScene.add(wall);
}

// Add simulation cars to the scene
for (const car of simulation.cars) {
  mainScene.add(car);
}

// Add UI labels to the scene
mainScene.add(ui);

game.add('main', mainScene);
game.goToScene('main');
game.start();

