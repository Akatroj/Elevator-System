import { useParams } from 'react-router-dom';

export function useCurrentFloor(): number {
  const currentFloor = useParams().floor;
  if (currentFloor === undefined) throw new ReferenceError('Invalid route param!');
  return Number(currentFloor);
}
