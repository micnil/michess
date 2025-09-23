import { Observable } from '@michess/common-utils';
import { useEffect, useRef, useState } from 'react';

export const useObservable = <T>(
  observable: Observable<T> | (() => Observable<T>),
  callback: (value: T) => void
) => {
  const callbackRef = useRef(callback);
  const [observableState] = useState(observable);
  useEffect(() => {
    return observableState.subscribe((value) => {
      callbackRef.current(value);
    });
  }, [observableState]);
};
