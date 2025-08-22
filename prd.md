# Project Specification: Genetic Algorithm Car Maze Game

## Overview

Develop a TypeScript application using Excalibur.js as the game engine. The application will simulate a genetic algorithm where multiple cars (represented as rectangles) attempt to navigate through a maze. The goal is for the cars to evolve over generations to successfully complete the maze using sensor-based navigation.

## Requirements
1. Game Engine
Use Excalibur.js for rendering and game loop management.
Follow the official Excalibur.js installation instructions.
The installation instructions of Excalibur.js are located in https://excaliburjs.com/docs/installation
The project should include vite as a web server to serve the application during development.

2. Car Model
Each car is a rectangle: 20px tall x 15px wide.
Properties:
x, y coordinates (position)
heading (direction in degrees or radians)
speed (pixels per frame or similar unit)

3. Sensors
Each car has 5 sensors at relative angles: -90°, -50°, 0°, 45°, 90° from the car's current heading.
Each sensor detects collisions with maze walls.
On collision, each sensor can:
Apply a heading correction (change direction)
Apply a speed correction (change speed)
Each sensor is defined by:
distance from the car (how far it can sense)
headingCorrection (degrees/radians to adjust heading)
speedCorrection (amount to adjust speed)

4. Genetic Algorithm
Each car's "genome" encodes its sensor parameters and possibly its initial behavior.
At the end of each generation (simulation run), cars are evaluated based on their progress through the maze.
The best-performing cars are selected to "reproduce" (crossover and mutate their genomes) to form the next generation.

5. Maze
The maze is a 2D map with walls and a defined start and finish.
The maze is static.
Cars start at the same position and attempt to reach the finish.

6. Code structure
Modularize code. 
Separate classes for car, sensor, maze, genetic algorithm, UI.

## Development Strategy
### Set Up Project

Initialize a TypeScript project.
Install and configure Excalibur.js.
Set up basic rendering and game loop.

### Implement Maze

Design a simple maze layout.
Implement wall collision detection.
Use a simple data structure like a tilemap for the maze to optimize collision checks.

### Implement Car and Sensors

Create the car entity with required properties.
The car visual representation should rotate based on its current heading.
Implement sensor logic and collision detection.
Visualize sensors for debugging.
Sensors should be represented as lines coming from the center of the car and extending in the correction direction based on their angle and the angle of the car.

### Detect Collisions
Use the Colliders and ColliderGroups from the Excalibur framework to detect collisions between sensor and walls as well as between cars and walls.
Cars should not collide with each other.


### Genetic Algorithm

Define the genome structure.
Implement selection, crossover, and mutation.
Evaluate fitness (distance traveled, progress, etc.).
There are 100 cars per generation. That value should be stored in a config file and easily accessible.
The fitness function is the distance travelled by the car.
The sensor parameters are the only genes.

### Simulation Loop

Run multiple cars in parallel.
At the beginning of each generation, store the genes of the whole population in a json file which is named gen_N.json where N is the generation number.
At the end of each generation, evolve the population.
A maximum of 30 seconds should be allowed for each generation.


### UI and Visualization

Display cars, sensors, and maze.
Show generation count, number of cars and number of cars still alive in a panel below the maze.

### Testing and Optimization

Test for bugs and edge cases.
Optimize performance for many cars.

## Task List
Project setup (TypeScript, Excalibur.js)
Maze design and wall collision logic
Car entity and movement logic
Sensor implementation and collision response
Genetic algorithm (genome, selection, crossover, mutation)
Simulation management (generations, fitness evaluation)
UI/UX improvements (visualization, stats)
Testing and debugging
Documentation


