import { Injectable } from '@angular/core';
import { StorageKeys } from '../models/storage-keys.enum';
import { UserFormSettings, UserPrint } from '../models/storage-data.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKeys = StorageKeys;

  constructor() {}
  /**
   *
   * @param key
   * @param value
   */
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  /**
   *
   * @param key
   * @returns
   */
  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      console.error(`Error parsing LocalStorage key "${key}"`);
      return null;
    }
  }

  /**
   *
   */
  setKeysInLocalStorage(): void {
    if (!this.getItem(this.storageKeys.USER_PRINT_LIST_KEY)) {
      this.setItem(this.storageKeys.USER_PRINT_LIST_KEY, []);
    }
    if (!this.getItem(this.storageKeys.USER_SETTINGS_KEY)) {
      this.setItem(this.storageKeys.USER_SETTINGS_KEY, {});
    }
  }

  /**
   *
   * @param newPrint
   */
  updatePrintList(newPrint: UserPrint): void {
    const currentList =
      this.getItem<UserPrint[]>(this.storageKeys.USER_PRINT_LIST_KEY) || [];
    const updatedList = [newPrint, ...currentList];
    this.setItem(this.storageKeys.USER_PRINT_LIST_KEY, updatedList);
  }

  /**
   *
   */
  clearPrintList(): void {
    this.setItem(this.storageKeys.USER_PRINT_LIST_KEY, []);
  }

  /**
   *
   * @param newPrint
   */
  updateUserSettings(newSettings: UserFormSettings): void {
    this.setItem(this.storageKeys.USER_SETTINGS_KEY, newSettings);
  }
}
