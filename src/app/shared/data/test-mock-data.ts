import { UserFormSettings, UserPrint } from '@shared/models/storage-data.model';

export const userFormSettingsMock: UserFormSettings = {
  printName: 'ABC',
  currency: 'XX',
  materialName: 'PLA',
  materialWeight: 1000,
  materialPrice: 50,
  printWeight: 25,
  powerConsumption: 0.125,
  kwhCost: 0.8,
  printTimeH: 2,
  printTimeM: 45,
  laborHourCost: 32,
  laborHours: 1,
  machineDepreciation: 1,
};

export const userPrintCalculationMock: UserPrint = {
  currency: 'XX',
  depreciationCost: 2.75,
  electrictyCost: 0.28,
  kwhCost: 0.8,
  laborCost: 32,
  laborHourCost: 32,
  laborHours: 1,
  machineDepreciation: 1,
  materialCost: 1.25,
  materialName: 'PLA',
  materialPrice: 50,
  materialWeight: 1000,
  powerConsumption: 0.125,
  printDate: new Date(1988, 11, 17, 0, 0, 0),
  printName: 'ABC',
  printTimeH: 2,
  printTimeM: 45,
  printWeight: 25,
  totalCost: 36.28,
};
