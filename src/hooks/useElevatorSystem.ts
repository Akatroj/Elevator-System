import { useContext } from 'react';
import { ElevatorSystemContext, IElevatorSystemContext } from '../contexts';

export function useElevatorSystem(): IElevatorSystemContext {
  const context = useContext(ElevatorSystemContext);
  if (context === null) throw new ReferenceError('ElevatorSystemContext not initialised!');
  return context;
}
