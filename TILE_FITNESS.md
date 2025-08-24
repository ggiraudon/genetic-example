# Tile-Based Fitness Function Implementation

## Overview
Modified the fitness function to count unique maze tiles visited instead of distance traveled, with a constraint that prevents counting tiles that were visited in the past 5 tiles.

## Changes Made

### 1. Updated Configuration (`config.ts`)
- Added `RECENT_TILES_MEMORY: 5` - Number of recent tiles to remember for fitness calculation

### 2. Updated Car Class (`car.ts`)

#### New Properties:
- `tilesVisited: number` - Public counter for total unique tiles visited
- `visitedTiles: Set<string>` - Private set tracking all tiles ever visited
- `recentTiles: string[]` - Private array tracking the last N tiles visited

#### New Methods:
- `getTileKey(position: Vector): string` - Converts position to tile coordinates string

#### Modified Methods:
- **Constructor**: Now initializes with starting tile counted
- **updateFitness()**: Completely rewritten to use tile-based logic:
  1. Gets current tile coordinates
  2. Checks if tile should count (not in recent memory OR never visited)
  3. Updates visited tiles set and recent tiles array
  4. Maintains recent tiles memory limit
  5. Calculates fitness based on unique tiles visited

### 3. Updated Genetic Algorithm (`genetic-algorithm.ts`)
- **PopulationStats interface**: Added `bestTilesVisited: number`
- **getPopulationStats()**: Now tracks and returns best tiles visited

### 4. Updated UI (`ui.ts` and `index.html`)
- Added display for "Best Tiles Visited" in the stats panel
- Updated UI manager to show tiles visited counter

### 5. Updated Game (`game.ts`)
- Modified end-of-generation message to show both fitness and tiles visited

## How It Works

### Tile Tracking Logic:
1. **Position to Tile Conversion**: `Math.floor(position / MAZE_TILE_SIZE)` converts pixel coordinates to tile coordinates
2. **Recent Memory Check**: Before counting a tile, check if it's in the last 5 visited tiles
3. **Unique Counting**: Only count tiles that haven't been visited OR aren't in recent memory
4. **Memory Management**: Maintain a sliding window of recent tiles (FIFO queue)

### Fitness Calculation:
```typescript
// Primary fitness: number of unique tiles visited
this.fitness = this.tilesVisited;

// Bonus: proximity to finish line
const distanceToFinish = this.maze.getDistanceToFinish(this.pos);
this.fitness += Math.max(0, 1000 - distanceToFinish);
```

## Benefits

1. **Exploration Incentive**: Cars are rewarded for exploring new areas
2. **Anti-Looping**: Recent memory prevents endless loops in small areas
3. **Balanced Strategy**: Still rewards getting close to the finish
4. **Clear Progress Metric**: Tiles visited is easy to understand and track
5. **Configurable Memory**: The 5-tile memory can be adjusted in config

## Configuration Options

- `RECENT_TILES_MEMORY: 5` - Number of recent tiles to remember
- `MAZE_TILE_SIZE: 32` - Size of each maze tile in pixels

## UI Improvements

The stats panel now shows:
- **Generation**: Current generation number
- **Cars Alive**: Currently active cars
- **Total Cars**: Population size
- **Best Fitness**: Overall best fitness score
- **Best Tiles Visited**: Most tiles visited by any car

## Example Behavior

If a car visits tiles in this order: A → B → C → D → E → F → B

- Tile B won't count the second time because it's in recent memory (last 5: B,C,D,E,F)
- If the car later visits tile A again after visiting G,H,I,J, tile A would count because it's no longer in recent memory

This encourages exploration while preventing simple back-and-forth movements from inflating the score.
