import { Car } from '../src/car';
import { Maze } from '../src/maze';

// Simple test to verify core functionality
export function runTests(): void {
  console.log('Running basic tests...');

  // Test 1: Create a car with random genome
  const maze = new Maze();
  const startPos = maze.getStartPosition();
  const genome = Car.createRandomGenome();
  const car = new Car(startPos, genome, maze);

  console.log('✓ Car creation test passed');
  console.log('✓ Genome generation test passed');
  console.log('✓ Maze creation test passed');

  // Test 2: Test sensor initialization
  if (car.sensors.length === 5) {
    console.log('✓ Sensor initialization test passed');
  } else {
    console.log('✗ Sensor initialization test failed');
  }

  // Test 3: Test crossover
  const genome1 = Car.createRandomGenome();
  const genome2 = Car.createRandomGenome();
  const childGenome = Car.crossover(genome1, genome2);

  if (childGenome.sensorGenes.length === 5) {
    console.log('✓ Crossover test passed');
  } else {
    console.log('✗ Crossover test failed');
  }

  console.log('All tests completed!');
}

// Run tests if this file is imported
if (typeof window !== 'undefined') {
  // Only run in browser
  runTests();
}
