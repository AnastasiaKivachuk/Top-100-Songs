/* eslint-disable consistent-return */
import {
  Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState,
} from 'react';
import { NextRouter, useRouter } from 'next/router';
import { LOCAL_STORAGE_VARIABLE, REFRESH_INTERVAL_ETH, SORT_DIRECTIONS } from '@constants/global.constants';
import { removeLocalStorageItem, setLocalStorageItem } from '@helpers/localStorage.helpers';

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useDidUpdateEffect = (fn: () => void, inputs: Array<any>): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, inputs);
};

export const useUpdateRouterParams = (
  router: NextRouter,
  setParams: Dispatch<SetStateAction<any>>,
  params: Record<string, any>,
  search: string,
) => {
  const debouncedSearch = useDebounce(search, 300);

  useDidUpdateEffect(() => {
    (async () => {
      await router.push({
        query: {
          ...params,
          search: debouncedSearch,
        },
      });
    })();
  }, [params, debouncedSearch]);

  useDidUpdateEffect(() => {
    setParams((items) => ({
      ...items,
      page: 1,
    }));
  }, [debouncedSearch, setParams]);

  return { debouncedSearch };
};

export const useRequestParams = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    sort: String(router.query.sort || SORT_DIRECTIONS.ASC),
    page: Number(router.query.page || 1),
  });
  const [search, setSearch] = useState(String(router.query.search || ''));

  const { debouncedSearch } = useUpdateRouterParams(router, setParams, params, search);

  return {
    params,
    debouncedSearch,
    setParams,
    search,
    setSearch,
  };
};

export const useEventListener = (eventName: string, handler: (e: Event) => void): void => {
  const savedHandler = useRef<(e: Event) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = window && window.addEventListener;
      if (!isSupported) return;
      const eventListener = (event) => savedHandler.current(event);
      window.addEventListener(eventName, eventListener);
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, window],
  );
};

export const useOnClickOutside = (ref: RefObject<any>, handler: (e: MouseEvent) => void): void => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler],
  );
};
