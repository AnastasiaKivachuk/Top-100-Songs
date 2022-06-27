export const getLocalStorageItem = (name: string): string => localStorage?.getItem(name);

export const setLocalStorageItem = (name: string, item: string): void => localStorage.setItem(name, item);

export const removeLocalStorageItem = (name: string): void => localStorage.removeItem(name);
