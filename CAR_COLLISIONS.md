# Car Collision Configuration

## Overview
Added a configurable parameter to enable or disable collisions between cars in the genetic algorithm simulation.

## Configuration Parameter

### `ENABLE_CAR_COLLISIONS: boolean`
- **Default Value**: `false`
- **Location**: `src/config.ts`
- **Description**: Controls whether cars can collide with each other during the simulation

## Implementation Details

### When `ENABLE_CAR_COLLISIONS = true`:
1. **Collision Type**: Cars use `CollisionType.Active`
2. **Car-to-Car Collisions**: When two cars collide, both cars are killed (marked as `isAlive = false`)
3. **Collision Detection**: Added collision event handler for `Car` objects
4. **Behavior**: Creates a more competitive environment where cars must avoid each other

### When `ENABLE_CAR_COLLISIONS = false` (Default):
1. **Collision Type**: Cars use `CollisionType.PreventCollision`
2. **Car-to-Car Collisions**: Cars pass through each other without interference
3. **Collision Detection**: Only responds to `MazeWall` collisions
4. **Behavior**: Cars can occupy the same space, focusing purely on maze navigation

## Code Changes

### 1. Config Interface (`config.ts`)
```typescript
export interface GameConfig {
  // ... other properties
  readonly ENABLE_CAR_COLLISIONS: boolean;
}

export const CONFIG: GameConfig = {
  // ... other properties
  ENABLE_CAR_COLLISIONS: false, // Whether cars can collide with each other
};
```

### 2. Car Constructor (`car.ts`)
```typescript
constructor(position: Vector, genome: CarGenome, maze: Maze) {
  super({
    pos: position.clone(),
    width: CONFIG.CAR_WIDTH,
    height: CONFIG.CAR_HEIGHT,
    color: Color.Blue,
    collisionType: CONFIG.ENABLE_CAR_COLLISIONS ? CollisionType.Active : CollisionType.PreventCollision,
  });
  // ...
}
```

### 3. Collision Event Handler (`car.ts`)
```typescript
this.on('collisionstart', (evt) => {
  if (evt.other.constructor.name === 'MazeWall') {
    this.kill();
  } else if (CONFIG.ENABLE_CAR_COLLISIONS && evt.other.constructor.name === 'Car') {
    // Car-to-car collision: kill this car if collisions are enabled
    this.kill();
  }
});
```

## Usage Examples

### Enable Car Collisions
```typescript
// In config.ts
export const CONFIG: GameConfig = {
  // ... other settings
  ENABLE_CAR_COLLISIONS: true,
};
```
**Result**: Cars will die when they collide with each other, creating a more challenging environment that rewards spatial awareness and collision avoidance.

### Disable Car Collisions (Default)
```typescript
// In config.ts
export const CONFIG: GameConfig = {
  // ... other settings
  ENABLE_CAR_COLLISIONS: false,
};
```
**Result**: Cars can pass through each other freely, allowing the population to focus purely on maze navigation skills without worrying about crowding.

## Strategic Implications

### With Collisions Enabled:
- **Pros**: 
  - More realistic simulation
  - Rewards spatial awareness
  - Prevents clustering at good spots
  - Encourages diverse pathfinding strategies
- **Cons**: 
  - Reduced population survival
  - May slow down evolution of navigation skills
  - Early cars might prevent later cars from exploring optimal paths

### With Collisions Disabled:
- **Pros**: 
  - Faster learning of navigation skills
  - Multiple cars can explore the same areas
  - Better for initial algorithm development
  - Simpler fitness evaluation (no collision interference)
- **Cons**: 
  - Less realistic simulation
  - No spatial competition pressure
  - May not develop collision avoidance skills

## Recommendations

1. **Development Phase**: Start with `ENABLE_CAR_COLLISIONS = false` to focus on navigation skills
2. **Advanced Evolution**: Switch to `ENABLE_CAR_COLLISIONS = true` for more sophisticated behaviors
3. **Experimentation**: Try both settings to compare evolutionary strategies and outcomes

## Technical Notes

- Cars killed by collisions still contribute to fitness statistics for that generation
- Collision detection happens immediately upon contact
- Both cars in a collision are killed (symmetric behavior)
- Wall collisions always kill cars regardless of this setting
