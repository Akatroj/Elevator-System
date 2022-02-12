import { Floor, ElevatorWorkingState, ElevatorStatus } from './utils';

interface ElevatorStopRequest {
  targetFloor: Floor;
  distance: number;
}

export class Elevator {
  /**
   * The stop request queue is comprised of 2 parts: sameDirectionStops and oppositeDirectionStops -
   * the oppositeDirectionStops have a negative distance, because they are in the opposite direction.
   *
   * The queues are separated for ease of implementation.
   * The actual queue is sameDirectionStops first, then oppositeDirectionStops.
   */
  private readonly sameDirectionStops: ElevatorStopRequest[] = [];
  /** See {@link sameDirectionStops} */
  private readonly oppositeDirectionStops: ElevatorStopRequest[] = [];

  private state: ElevatorWorkingState = 'idle';

  constructor(public readonly id: number, private floor: Floor) {}

  get currentFloor(): Floor {
    return this.floor;
  }

  get nextStop(): Floor {
    return this.sameDirectionStops[0]?.targetFloor ?? this.currentFloor;
  }

  get isIdle(): boolean {
    return this.state === 'idle';
  }

  get status(): ElevatorStatus {
    return {
      id: this.id,
      currentFloor: this.currentFloor,
      nextStop: this.nextStop,
      state: this.state,
    };
  }

  step(): void {
    // sanity check, shouldn't be possible
    if (this.state === 'idle' || this.sameDirectionStops.length === 0) {
      this.state = 'idle';
      return;
    }

    this.move();

    // request completed
    if (this.currentFloor === this.nextStop) this.sameDirectionStops.shift();

    // all requests in current direction finished
    if (this.sameDirectionStops.length === 0) {
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
    const arrayToInsert = distance > 0 ? this.sameDirectionStops : this.oppositeDirectionStops;

    let i = 0;
    for (const request of arrayToInsert) {
      if (request.distance >= newReq.distance) i++;
    }
    arrayToInsert.splice(i, 0, newReq);
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
    this.sameDirectionStops.unshift(newReq);
  }

  private move(): void {
    switch (this.state) {
      case 'up':
        this.floor++;
        return;
      case 'down':
        this.floor--;
        return;
    }

    this.sameDirectionStops.forEach(request => request.distance--);
    this.oppositeDirectionStops.forEach(request => request.distance--);
  }

  /**
   * Swaps the sameDirectionStops and oppositeDirectionStops,
   * sets the elevator state to face the direction of next target.
   */
  private bounceBack(): void {
    const reqCopy = [...this.sameDirectionStops];
    this.sameDirectionStops.splice(0, this.sameDirectionStops.length);

    this.oppositeDirectionStops.forEach(req => {
      req.distance *= -1;
      this.sameDirectionStops.push(req);
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
