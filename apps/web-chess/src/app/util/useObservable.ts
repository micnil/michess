import { Maybe, Observable } from '@michess/common-utils';
import { useEffect, useRef } from 'react';

export const useObservable = <T>(
  observable: Maybe<Observable<T>>,
  callback: (value: T) => void,
  onUnsubscribe?: () => void
) => {
  const callbackRef = useRef(callback);
  const onUnsubscribeRef = useRef(onUnsubscribe);

  useEffect(() => {
    if (observable) {
      const unsubscribe = observable.subscribe((value) => {
        callbackRef.current(value);
      });
      const onUnsubscribe = onUnsubscribeRef.current;
      return () => {
        unsubscribe();
        onUnsubscribe?.();
      };
    }
  }, [observable]);
};
