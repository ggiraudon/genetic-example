# Genetic Algorithm Car Maze Game

A TypeScript-based genetic algorithm simulation where cars learn to navigate through a maze using sensor-based navigation.

## Features

- **Genetic Algorithm**: 100 cars per generation evolve over time
- **Sensor-based Navigation**: Each car has 5 sensors with configurable parameters
- **Real-time Visualization**: Watch cars navigate and evolve in real-time
- **Generation Tracking**: Save population data for each generation
- **Interactive UI**: Live statistics display

## Project Structure

- `src/config.ts` - Configuration constants
- `src/maze.ts` - Maze implementation with wall collision detection
- `src/sensor.ts` - Sensor system for car navigation
- `src/car.ts` - Car entity with movement and genetics
- `src/genetic-algorithm.ts` - Evolution logic (selection, crossover, mutation)
- `src/game.ts` - Main game loop and scene management
- `src/ui.ts` - User interface management
- `src/main.ts` - Application entry point

## How It Works

1. **Population**: 100 cars start at the maze entrance
2. **Sensors**: Each car has 5 sensors that detect walls and apply corrections
3. **Fitness**: Cars are evaluated based on distance traveled
4. **Evolution**: Best performers reproduce to create the next generation
5. **Mutation**: Random variations keep the population diverse

## Controls

The simulation runs automatically. Watch the statistics panel to see:
- Current generation number
- Number of cars still alive
- Best fitness score achieved

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies

- **TypeScript** - Type-safe JavaScript
- **Excalibur.js** - 2D game engine
- **Vite** - Fast development server and build tool

## Genetic Algorithm Parameters

- **Population Size**: 100 cars per generation
- **Generation Time**: 30 seconds maximum
- **Mutation Rate**: 10% chance per gene
- **Elite Percentage**: 20% of best performers carry over
- **Sensor Genes**: Distance, heading correction, speed correction

The cars will gradually improve their maze navigation skills over successive generations!