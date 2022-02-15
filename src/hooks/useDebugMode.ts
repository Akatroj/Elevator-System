import { useContext } from 'react';
import { DebugModeContext, IDebugModeContext } from '../contexts';

export function useDebugMode(): IDebugModeContext {
  const context = useContext(DebugModeContext);
  if (context === null) throw new ReferenceError('DebugModeContext not initialised!');
  return context;
}
