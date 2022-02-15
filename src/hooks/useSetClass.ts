import classNames from 'classnames';
import { useState } from 'react';

export function useSetClass(name: string, delay: number) {
  const [apply, setApply] = useState(false);
  const activateClass = (callback?: () => void) => {
    setApply(true);
    if (callback) setTimeout(() => callback(), delay);
  };

  const className = classNames({ [name]: apply });
  return { className, activateClass };
}
