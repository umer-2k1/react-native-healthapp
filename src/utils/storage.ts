import {User} from '@src/types';
import {MMKV} from 'react-native-mmkv';
import {STORAGE_ENUMS} from './constants';

type MMKVValue = string | number | boolean | object;

const storage = new MMKV();

/**
 * Stores a key-value pair in MMKV
 * @param key - The storage key
 * @param value - The value to store (string, number, boolean, or object)
 */
const setItem = <T extends MMKVValue>(key: string, value: T) => {
  storage.set(key, JSON.stringify(value));
};

/**
 * Retrieves a value from MMKV storage
 * @param key - The storage key
 * @returns The parsed value if it's JSON, otherwise the raw value
 */
const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value as T;
  }
};

/**
 * Removes a key from MMKV storage
 * @param key - The storage key
 */
const removeItem = (key: string) => {
  storage.delete(key);
};

/**
 * Retrieves all stored items from MMKV
 * @returns An object containing all stored key-value pairs
 */
const getAllItems = (): Record<string, any> => {
  const keys = storage.getAllKeys();
  const allItems: Record<string, any> = {};

  keys.forEach(key => {
    const value = getItem(key);
    allItems[key] = value;
  });

  return allItems;
};

/**
 * Clears all MMKV storage data
 */
const clearStorage = () => {
  storage.clearAll();
};

const getUser = () => {
  const user = getItem<User>(STORAGE_ENUMS.USER);
  return user;
};

export {
  storage,
  setItem,
  getItem,
  removeItem,
  getAllItems,
  getUser,
  clearStorage,
};
