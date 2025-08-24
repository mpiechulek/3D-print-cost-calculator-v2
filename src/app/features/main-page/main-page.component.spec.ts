import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { StorageService } from '@shared/services/storage.service';
import { CalculationService } from '@shared/services/calculation.service';
import { StorageKeys } from '@shared/models/storage-keys.enum';
import { ExportToExcelService } from '@shared/services/export-to-excel.service';
import {
  userFormSettingsMock,
  userPrintCalculationMock,
} from '@shared/data/test-mock-data';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let storageServiceMock: jest.Mocked<StorageService>;
  let calculationServiceMock: jest.Mocked<CalculationService>;
  let exportToExcelServiceMock: jest.Mocked<ExportToExcelService>;

  beforeEach(async () => {
    storageServiceMock = {
      storageKeys: {
        USER_PRINT_LIST_KEY: StorageKeys.USER_PRINT_LIST_KEY,
        USER_SETTINGS_KEY: StorageKeys.USER_SETTINGS_KEY,
      },
      setItem: jest.fn(),
      getItem: jest.fn(),
      setKeysInLocalStorage: jest.fn(),
      updatePrintList: jest.fn(),
      clearPrintList: jest.fn(),
      updateUserSettings: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    calculationServiceMock = {
      calculateCost: jest.fn().mockReturnValue(userPrintCalculationMock),
    };
    exportToExcelServiceMock = {
      generateExcel: jest.fn(),
      transformHeader: jest.fn(),
    } as unknown as jest.Mocked<ExportToExcelService>;

    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceMock },
        { provide: CalculationService, useValue: calculationServiceMock },
        { provide: ExportToExcelService, useValue: exportToExcelServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call storageService.setItem, getUpdateDataFromStorage, storageService.updatePrintList ', () => {
    jest.spyOn(component, 'calculate');
    jest.spyOn(component, 'getUpdateDataFromStorage');
    // Arrange
    jest
      .spyOn(component, 'userFormSetting')
      .mockReturnValue(userFormSettingsMock);
    jest
      .spyOn(component, 'printList')
      .mockReturnValue([userPrintCalculationMock]);
    // Act
    component.calculate(userFormSettingsMock);
    // Assert
    //Call of calculate
    expect(component.calculate).toHaveBeenCalledWith(userFormSettingsMock);
    expect(storageServiceMock.setItem).toHaveBeenCalledWith(
      component.storageKeys.USER_SETTINGS_KEY,
      userFormSettingsMock
    );
    expect(storageServiceMock.updatePrintList).toHaveBeenCalledWith(
      userPrintCalculationMock
    );
    // Call of getUpdateDataFromStorage
    expect(component.getUpdateDataFromStorage).toHaveBeenCalled();
    expect(storageServiceMock.getItem).toHaveBeenCalledWith(
      component.storageKeys.USER_SETTINGS_KEY
    );
    expect(storageServiceMock.getItem).toHaveBeenCalledWith(
      component.storageKeys.USER_SETTINGS_KEY
    );
    expect(storageServiceMock.getItem).toHaveBeenCalledWith(
      component.storageKeys.USER_PRINT_LIST_KEY
    );

    expect(component.userFormSetting()).toEqual(userFormSettingsMock);
    expect(component.printList()).toContain(userPrintCalculationMock);
  });

  it('should call clearList() and clear the printList === []', () => {
    jest.spyOn(component, 'clearList');
    jest.spyOn(component, 'getUpdateDataFromStorage');
    jest.spyOn(component, 'printList').mockReturnValue([]);
    component.clearList();
    expect(component.clearList).toHaveBeenCalled();
    expect(storageServiceMock.clearPrintList).toHaveBeenCalled();
    expect(component.getUpdateDataFromStorage).toHaveBeenCalled();
    expect(component.printList()).toEqual([]);
  });

  it('should call exportToExcel() and exportToExcelService.generateExcel', () => {
    jest.spyOn(component, 'exportToExcel');
    jest
      .spyOn(component, 'printList')
      .mockReturnValue([userPrintCalculationMock]);
    jest
      .spyOn(component, 'printList')
      .mockReturnValue([userPrintCalculationMock]);
    component.exportToExcel();
    expect(component.exportToExcel).toHaveBeenCalled();
    expect(exportToExcelServiceMock.generateExcel).toHaveBeenCalledWith(
      [userPrintCalculationMock],
      'Print List'
    );
  });
});
