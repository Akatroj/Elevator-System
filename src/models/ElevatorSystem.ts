import { ElevatorDirection, Floor, ElevatorStatus } from './utils';
import { Elevator } from './Elevator';
import { inRange, sample, remove } from 'lodash-es';

interface PickUpRequest {
  sourceFloor: Floor;
  direction: ElevatorDirection;
  timeout: number;
}

interface DispatchCandidate {
  elevator: Elevator;
  distance: number;
}

export class ElevatorSystem {
  private static readonly REQUEST_TIMEOUT = 10;

  private readonly elevators: Elevator[] = [];
  private readonly pickupRequests: PickUpRequest[] = [];

  constructor(startingElevators: number) {
    for (let i = 0; i < startingElevators; i++) this.addElevator();
  }

  pickup(sourceFloor: Floor, direction: ElevatorDirection): void {
    const pickupRequest: PickUpRequest = {
      sourceFloor,
      direction,
      timeout: ElevatorSystem.REQUEST_TIMEOUT,
    };

    if (!this.tryDispatchElevator(pickupRequest)) this.pickupRequests.push(pickupRequest);
  }

  dropoff(elevatorID: number, targetFloor: Floor) {
    this.elevators[elevatorID].addStop(targetFloor);
  }

  step(): void {
    this.elevators.forEach(elevator => elevator.step());
    remove(this.pickupRequests, request => this.tryDispatchElevator(request));
  }

  status(): ElevatorStatus[] {
    return this.elevators.map(elevator => elevator.status);
  }

  addElevator(): void {
    const id = this.elevators.length;
    this.elevators.push(new Elevator(id, 0));
  }

  /**
   * Tries to find the best elevator for the request by following this algorithm:
   * - find all elevators that are either idle, or passing by the requested floor
   * - if any such elevators were found, select the one closest to
   *   the requested floor and add a new stop at the front of the elevator's queue
   * - else (none were found), decrease the request's timeout
   * - if the timeout hits 0, select a random elevator for the request
   *
   * Returns true if elevator has been dispatched, false if it failed and increased the timeout.
   */
  private tryDispatchElevator(pickupRequest: PickUpRequest): boolean {
    const targetFloor: Floor = pickupRequest.sourceFloor;
    const dispatchCandidates: DispatchCandidate[] = [];
    this.elevators.forEach(elevator => {
      if (elevator.isIdle || inRange(targetFloor, elevator.currentFloor, elevator.nextStop)) {
        const distance = elevator.getDistance(targetFloor);
        dispatchCandidates.push({ elevator, distance });
      }
    });

    if (dispatchCandidates.length === 0) {
      pickupRequest.timeout--;
      if (pickupRequest.timeout <= 0) {
        sample(this.elevators)?.addStop(pickupRequest.sourceFloor);
        return true;
      }
      return false;
    }

    dispatchCandidates.sort((a, b) => a.distance - b.distance);
    const chosenCandidate = dispatchCandidates[0];
    chosenCandidate?.elevator.addImmediateStop(targetFloor, chosenCandidate.distance);
    return true;
  }
}
