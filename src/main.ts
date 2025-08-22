import { Game } from './game';
import './test'; // Run basic tests

async function main() {
  try {
    console.log('Starting Genetic Algorithm Car Maze Game...');
    const game = new Game();
    await game.start();
    console.log('Game started successfully!');
  } catch (error) {
    console.error('Failed to start game:', error);
  }
}

// Start the game when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
