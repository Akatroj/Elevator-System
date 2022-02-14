export type Floor = number;

export type ElevatorDirection = 'up' | 'down';
export type ElevatorWorkingState = ElevatorDirection | 'idle';

export interface ElevatorStatus {
  id: number;
  currentFloor: Floor;
  nextStop: Floor;
  state: ElevatorWorkingState;
  stops: Floor[];
}
