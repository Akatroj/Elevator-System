import { useParams } from 'react-router-dom';

export function useCurrentFloor(): number {
  return Number(useParams().floor);
}
