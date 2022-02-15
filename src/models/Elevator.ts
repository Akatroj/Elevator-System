import { Floor, ElevatorWorkingState, ElevatorStatus } from './utils';
import deepcopy from 'deepcopy';

interface ElevatorStopRequest {
  targetFloor: Floor;
  distance: number;
}

export class Elevator {
  /**
   * The stop request queue is comprised of 2 parts: currentDirectionStops and oppositeDirectionStops -
   * the oppositeDirectionStops have a negative distance, because they are in the opposite direction.
   *
   * The queues are separated for ease of implementation.
   * The actual queue is currentDirectionStops first, then oppositeDirectionStops.
   */
  private readonly currentDirectionStops: ElevatorStopRequest[] = [];
  /** See {@link currentDirectionStops} */
  private readonly oppositeDirectionStops: ElevatorStopRequest[] = [];

  private state: ElevatorWorkingState = 'idle';

  constructor(public readonly id: number, private floor: Floor) {}

  get currentFloor(): Floor {
    return this.floor;
  }

  get nextStop(): Floor {
    return this.currentDirectionStops[0]?.targetFloor ?? this.currentFloor;
  }

  /**
   * Helper method that adds or subtracts 1 from nextStop based on current move direction.
   * Necessary, because lodash inRange doesn't include the range's end value by default.
   */
  get afterNextStop(): Floor {
    const direction = this.state !== 'idle' ? (this.state === 'up' ? 1 : -1) : 0;
    return this.nextStop + direction;
  }

  get isIdle(): boolean {
    return this.state === 'idle';
  }

  get status(): ElevatorStatus {
    const stops = [...this.currentDirectionStops, ...this.oppositeDirectionStops].map(
      stopReq => stopReq.targetFloor
    );
    return {
      id: this.id,
      currentFloor: this.currentFloor,
      nextStop: this.nextStop,
      state: this.state,
      stops,
    };
  }

  reset(): void {
    this.currentDirectionStops.splice(0, this.currentDirectionStops.length);
    this.oppositeDirectionStops.splice(0, this.oppositeDirectionStops.length);
    this.floor = 0;
    this.state = 'idle';
  }

  step(): void {
    // console.log({
    //   name: `before`,
    //   id: this.id,
    //   currentFloor: this.currentFloor,
    //   stops: deepcopy([...this.currentDirectionStops, ...this.oppositeDirectionStops]),
    // });
    if (this.state === 'idle') return;

    this.move();
    console.log({
      name: `after`,
      id: this.id,
      currentFloor: this.currentFloor,
      state: this.state,
      stops: deepcopy([...this.currentDirectionStops, ...this.oppositeDirectionStops]),
    });

    // request completed
    if (this.currentFloor === this.nextStop) this.currentDirectionStops.shift();

    // all requests in current direction finished
    if (this.currentDirectionStops.length === 0) {
      // no requests in opposite direction - the elevator becomes idle
      if (this.oppositeDirectionStops.length === 0) {
        this.state = 'idle';
        return;
      }

      // there are requests in opposite direction - the elevator bounces back
      this.bounceBack();
    }
  }

  /**
   * If the floor is in the direction that the elevator is moving in,
   * or the elevator is idle, then the distance is positive.
   * Else (it's in the opposite direction), the distance is negative.
   */
  getDistance(floor: Floor): number {
    const res = floor - this.currentFloor;
    switch (this.state) {
      case 'up':
        return res;
      case 'down':
        return -res;
      default:
        return Math.abs(res);
    }
  }

  /**
   * Adds a new stop request to the queue, ensuring that the queue is optimally formed (sorted by distance).
   */
  addStop(targetFloor: Floor): void {
    const distance = this.getDistance(targetFloor);
    if (distance === 0) return;
    const newReq: ElevatorStopRequest = { targetFloor, distance };
    const arrayToInsert =
      distance > 0 ? this.currentDirectionStops : this.oppositeDirectionStops;

    if (arrayToInsert.find(stop => stop.targetFloor === targetFloor) !== undefined) return;

    let i = 0;
    for (const request of arrayToInsert) {
      if (
        (distance > 0 && request.distance <= distance) ||
        (distance < 0 && request.distance >= distance)
      )
        i++;
    }
    arrayToInsert.splice(i, 0, newReq);
    if (this.state === 'idle') this.setState(this.nextStop);

    console.log(
      `Elevator ${this.id} added new stop: {targetFloor: ${targetFloor}, distance: ${distance}}, at idx: ${i}`
    );
  }

  /**
   * Adds a new ElevatorStopRequest at the front of request queue,
   * forcing the elevator to move to the target floor first,
   * postponing it's former target.
   */
  addImmediateStop(targetFloor: Floor, distance?: number) {
    this.setState(targetFloor);
    distance = distance ?? this.getDistance(targetFloor);
    if (distance === 0) return;

    const newReq: ElevatorStopRequest = { targetFloor, distance };
    this.currentDirectionStops.unshift(newReq);
  }

  private move(): void {
    switch (this.state) {
      case 'up':
        this.floor++;
        break;
      case 'down':
        this.floor--;
        break;
      default:
        return;
    }

    this.currentDirectionStops.forEach(request => request.distance--);
    this.oppositeDirectionStops.forEach(request => request.distance--);
  }

  /**
   * Swaps the sameDirectionStops and oppositeDirectionStops,
   * sets the elevator state to face the direction of next target.
   */
  private bounceBack(): void {
    const reqCopy = [...this.currentDirectionStops];
    this.currentDirectionStops.splice(0, this.currentDirectionStops.length);

    this.oppositeDirectionStops.forEach(req => {
      req.distance *= -1;
      this.currentDirectionStops.push(req);
    });

    this.oppositeDirectionStops.splice(0, this.oppositeDirectionStops.length);

    reqCopy.forEach(req => {
      req.distance *= -1;
      this.oppositeDirectionStops.push(req);
    });

    this.setState(this.nextStop);
  }

  private setState(floorToFace: Floor): void {
    this.state =
      this.currentFloor === floorToFace
        ? 'idle'
        : this.currentFloor > floorToFace
        ? 'down'
        : 'up';
  }
}
