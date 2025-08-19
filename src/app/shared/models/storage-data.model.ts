export interface UserFormSettings {
  printName: string;
  currency: string;
  materialName: string;
  materialPrice: number;
  materialWeight: number;
  printWeight: number;
  powerConsumption: number;
  kwhCost: number;
  printTimeH: number;
  printTimeM: number;
  laborHourCost: number;
  laborHours: number;
  machineDepreciation: number;
}

export interface UserPrint extends UserFormSettings {  
  totalCost: number;
  electrictyCost: number;
  materialCost: number;
  laborCost: number;
  depreciationCost: number;
  printDate: Date;
}
