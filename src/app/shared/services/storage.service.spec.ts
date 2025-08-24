import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { StorageKeys } from '@shared/models/storage-keys.enum';
import {
  userFormSettingsMock,
  userPrintCalculationMock,
} from '@shared/data/test-mock-data';

describe('SorageService', () => {
  let service: StorageService;
  let localStorageMock: any;
  const storageKeys = StorageKeys;

  beforeEach(() => {
    localStorageMock = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };

    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setItem and the item to be set in local sotrage', () => {
    jest.spyOn(service, 'setItem');
    service.setItem(storageKeys.USER_SETTINGS_KEY, userFormSettingsMock);
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(userFormSettingsMock)
    );
    const result = localStorageMock.getItem(storageKeys.USER_SETTINGS_KEY);
    expect(result).toEqual(JSON.stringify(userFormSettingsMock));
  });

  it('should call setItem and return error', () => {
    jest.spyOn(service, 'setItem');
    const error = new Error('Mocked error');

    localStorageMock.setItem.mockImplementation(() => {
      throw error;
    });
    const consoleSpy = jest.spyOn(console, 'error');
    service.setItem('test', {});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error saving to local storage:',
      error
    );
  });

  it('should call getItem and return error', () => {
    jest.spyOn(service, 'getItem');
    const response = service.getItem(storageKeys.USER_PRINT_LIST_KEY);
    const error = new Error('Mocked error');
    localStorageMock.getItem.mockImplementation(() => {
      throw error;
    });
    const consoleSpy = jest.spyOn(console, 'error');
    service.getItem('test');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error parsing LocalStorage key "test"'
    );
  });

  it('should call clearPrintList and clear the printLust to be []', () => {
    jest.spyOn(service, 'clearPrintList');
    jest.spyOn(service, 'setItem');
    jest.spyOn(service, 'getItem').mockReturnValue([]);
    service.clearPrintList();
    expect(service.setItem).toHaveBeenCalledTimes(1);
    expect(service.setItem).toHaveBeenLastCalledWith(
      storageKeys.USER_PRINT_LIST_KEY,
      []
    );
    const printList = service.getItem(storageKeys.USER_PRINT_LIST_KEY);
    expect(printList).toEqual([]);
  });

  it('should call updateUserSettings and update the user settings', () => {
    jest.spyOn(service, 'updateUserSettings');
    jest.spyOn(service, 'getItem');
    const printList1 = service.getItem(storageKeys.USER_SETTINGS_KEY);
    expect(printList1).toEqual(null);
    service.updateUserSettings(userFormSettingsMock);

    jest.spyOn(service, 'getItem').mockReturnValue(userFormSettingsMock);
    const printList2 = service.getItem(storageKeys.USER_SETTINGS_KEY);
    expect(printList2).toEqual(userFormSettingsMock);
  });

  it('should call updatePrintList and update theprint list', () => {
    jest.spyOn(service, 'updatePrintList');
    jest.spyOn(service, 'getItem');
    service.updatePrintList(userPrintCalculationMock);
    expect(service.updatePrintList).toHaveBeenCalledTimes(1);
    expect(service.updatePrintList).toHaveBeenCalledWith(
      userPrintCalculationMock
    );
    jest.spyOn(service, 'getItem').mockReturnValue([userPrintCalculationMock]);
    const printList = service.getItem(storageKeys.USER_PRINT_LIST_KEY);
    expect(printList).toEqual([userPrintCalculationMock]);
  });
});
