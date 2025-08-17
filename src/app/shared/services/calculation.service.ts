import { Injectable } from '@angular/core';
import { UserFormSettings, UserPrint } from '../models/storage-data.model';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  calculateCost(userFormSettings: UserFormSettings): UserPrint {
    const materialCost = Number((
      (userFormSettings.materialPrice / userFormSettings.materialWeight) *
      userFormSettings.printWeight
    ).toFixed(2));
    const electrictyCost = Number((
      userFormSettings.powerConsumption *
      userFormSettings.kwhCost *
      (userFormSettings.printTimeH + userFormSettings.printTimeM / 60)
    ).toFixed(2));
    const laborCost = Number((
      userFormSettings.laborHourCost * userFormSettings.laborHours
    ).toFixed(2));
    const depreciationCost = Number((
      userFormSettings.machineDepreciation *
      (userFormSettings.printTimeH + userFormSettings.printTimeM / 60)
    ).toFixed(2));
    const totalCost =Number(
      (materialCost + electrictyCost + laborCost + depreciationCost).toFixed(2));

    return {
      setting: {
        printName: userFormSettings.printName,
        currency: userFormSettings.currency,
        materialName: userFormSettings.materialName,
        materialPrice: userFormSettings.materialPrice,
        materialWeight: userFormSettings.materialWeight,
        printWeight: userFormSettings.printWeight,
        powerConsumption: userFormSettings.powerConsumption,
        kwhCost: userFormSettings.kwhCost,
        printTimeH: userFormSettings.printTimeH,
        printTimeM: userFormSettings.printTimeM,
        laborHourCost: userFormSettings.laborHourCost,
        laborHours: userFormSettings.laborHours,
        machineDepreciation: userFormSettings.machineDepreciation,
      },
      totalCost,
      electrictyCost,
      materialCost,
      laborCost,
      depreciationCost,
      printDate: new Date(),
    };
  }
}
