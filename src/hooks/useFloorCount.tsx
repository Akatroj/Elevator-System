import { useContext } from 'react';
import { FloorCountContext } from '../contexts/';

export function useFloorCount() {
  return useContext(FloorCountContext);
}
