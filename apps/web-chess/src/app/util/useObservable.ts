import { Maybe, Observable } from '@michess/common-utils';
import { useEffect, useRef, useState } from 'react';

export const useObservable = <T>(
  observableIn: Maybe<Observable<T>> | (() => Maybe<Observable<T>>),
  callback: (value: T) => void,
  onUnsubscribe?: () => void
) => {
  const [observable] = useState(observableIn);
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
