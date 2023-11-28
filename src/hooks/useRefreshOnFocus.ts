import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

type UseRefreshOnFocusProps = {
  refetch: () => void;
  shouldTrack?: boolean;
};

export function useRefreshOnFocus({
  refetch,
  shouldTrack = true,
}: UseRefreshOnFocusProps) {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        if (shouldTrack) {
          refetch();
        }
      } else {
        enabledRef.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldTrack]),
  );
}
