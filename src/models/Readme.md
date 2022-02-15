# Elevator System data model

## How it works
The system handles 2 types of requests - PickUpRequests and ElevatorStopRequests (or DropOffRequests).


### ElevatorStopRequests
When you are inside of an elevator and press the internal buttons, you create a ElevatorStopRequest - you're telling the elevator to move and stop at the floor you picked.
When the request is created, the distance from current position to this target is calculated. The calculation takes the current move direction of the elevator: 
When the target is in the direction the elevator is moving in, then the distance is calculated as positive. When the target is in the opposite direction, the distance is negative. When the elevator is idle it's also positive. Example:

Elevator is currently at floor 6, and travelling up to floor 9. The distance to floor 9 is +3. The distance to floor 0 is -6.

Then, the request gets queued in either `currentDirectionStops` queue if the distance is positive, or `oppositeDirectionStops` if it's negative. These queues are separated for ease of use, but could be merged.

The request gets placed in the queue at the correct position, so that both queues are always sorted by distance ascendingly. This is done by always inserting at the correct index, so it takes linear time proportional to the queue size.

Every simulation step, the elevator moves one floor closer to it's first target (`currentDirectionStops[0]`), and the distance of ALL requests (sameDirection and oppositeDirection) is decreased by one. When the distance reaches 0, the request is removed as the target has been reached.

When `currentDirectionStops` gets empty, the elevator bounces back - `currentDirectionStops` and `oppositeDirectionStops` get swapped, and all the distances are multiplied by -1.

This means, that when a button is pressed in the elevator, it will prioritise efficiency and try to bounce back as little as possible - because otherwise it would be a huge waste of time for people going from ground floor to top floor or back.
If the elevator is going up, and you want to go down, you will have to wait or take a different elevator.

The requests get removed from the front of the queue, which in JS has linear complexity, however the queues could be reversed to achieve removal in constant time (albeit making it harder to program).


### PickUpRequests

When you press the triangular button near the elevators, the closest elevator will be dispatched to your floor.

Basically, the system iterates over all elevators, searches for all elevators that are either not moving, or moving in your direction (and planning to travel past your floor).

Then it calculates your distance from each of the elevators, and chooses the closest one. It does that by sorting the array (O(n*logn) time, where n is the number of found elevators).

Of course, it's possible that no elevators fulfilling these conditions are found. The system will then enqueue this request, and try this approach 9 more times, after every simulated step. If it fails for the 10th time (very unlikely), it will pick a random elevator for you.

If it does however, find the perfect elevator for you, it will generate a ElevatorStopRequests for the chosen elevator. Your request will be inserted to the front of the queue, as we are sure it is the closest for the chosen elevator - we were just looking for the perfect one!. (again, insertion at the front is linear time but only because of ease of implementation, you should treat it as constant time).


## Interfaces and types
Public:
```typescript
export type Floor = number;
```
I like funny aliases.

```typescript
export type ElevatorDirection = 'up' | 'down';
```
Elevator go ~~brrr~~ up and down...

```typescript
export type ElevatorWorkingState = ElevatorDirection | 'idle';
```
or not at all.

```typescript
export interface ElevatorStatus {
  id: number;
  currentFloor: Floor;
  nextStop: Floor;
  state: ElevatorWorkingState;
  stops: Floor[];
}
```
This is what's passed to the front-end.


For internal use:
```typescript
interface PickUpRequest {
  sourceFloor: Floor;
  direction: ElevatorDirection;
  timeout: number;
}
```

```typescript
interface DispatchCandidate {
  elevator: Elevator;
  distance: number;
}
```

```typescript
interface ElevatorStopRequest {
  targetFloor: Floor;
  distance: number;
}
```



## Elevator.ts
### Important methods

```typescript
get status(): ElevatorStatus
```
```typescript
step(): void
```

```typescript
getDistance(floor: Floor): number
```

```typescript
addStop(targetFloor: Floor): void
```

Adds the ElevatorStopRequest so that the queue stays sorted

```typescript
addImmediateStop(targetFloor: Floor, distance?: number): void
```

Adds the request at the front of the queue, forcing the elevator to finish it first.

```typescript
private move(): void
```
Helper method, moves up or down based on your direction, and decreases the distance of all requests by 1.

```typescript
private bounceBack(): void
```
Helper method, swaps the queues.

## ElevatorSystem.ts
### Important methods

```typescript
pickup(sourceFloor: Floor, direction: ElevatorDirection): void
```
Creates a PickUpRequest and tries to find the perfect fit for it. If it fails, the request gets enqueued for 9 more rounds.

```typescript
dropoff(elevatorID: number, targetFloor: Floor): void
```
Adds a stop for selected elevator.

```typescript
step(): void
```
Advance all elevators, try to fulfill awaiting PickUpRequests.

```typescript
status(): ElevatorStatus[]
```
Returns the status of all elevators.

```typescript
addElevator(): void
removeElevator(elevatorID: number): void
```

```typescript
resetElevators(): void 
```
Clears all requests from the system, teleports all elevators to the ground floor. Useful for front-end.

```typescript
private tryDispatchElevator(pickupRequest: PickUpRequest): boolean
```
The meat and potatoes of this class. Finds the best elevator for the PickUpRequests, returns true if it succedeed or false if it failed and decreased the timeout. 


