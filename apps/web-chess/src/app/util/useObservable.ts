import { Maybe, Observable } from '@michess/common-utils';
import { useEffect, useRef } from 'react';

export const useObservable = <T>(
  observable: Maybe<Observable<T>>,
  callback: (value: T) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (observable) {
      const callbackToUse = callbackRef.current;
      return observable.subscribe((value) => {
        callbackToUse(value);
      });
    }
  }, [observable]);
};
