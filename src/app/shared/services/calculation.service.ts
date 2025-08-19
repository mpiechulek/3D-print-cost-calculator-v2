import { Injectable } from '@angular/core';
import { UserFormSettings, UserPrint } from '../models/storage-data.model';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  calculateCost(userFormSettings: UserFormSettings): UserPrint {
    const materialCost = Number(
      (
        (userFormSettings.materialPrice / userFormSettings.materialWeight) *
        userFormSettings.printWeight
      ).toFixed(2)
    );
    const electrictyCost = Number(
      (
        userFormSettings.powerConsumption *
        userFormSettings.kwhCost *
        (userFormSettings.printTimeH + userFormSettings.printTimeM / 60)
      ).toFixed(2)
    );
    const laborCost = Number(
      (userFormSettings.laborHourCost * userFormSettings.laborHours).toFixed(2)
    );
    const depreciationCost = Number(
      (
        userFormSettings.machineDepreciation *
        (userFormSettings.printTimeH + userFormSettings.printTimeM / 60)
      ).toFixed(2)
    );
    const totalCost = Number(
      (materialCost + electrictyCost + laborCost + depreciationCost).toFixed(2)
    );

    return {
      currency: userFormSettings.currency,
      depreciationCost,
      electrictyCost,
      kwhCost: userFormSettings.kwhCost,
      laborCost,
      laborHourCost: userFormSettings.laborHourCost,
      laborHours: userFormSettings.laborHours,
      machineDepreciation: userFormSettings.machineDepreciation,
      materialCost,
      materialName: userFormSettings.materialName,
      materialPrice: userFormSettings.materialPrice,
      materialWeight: userFormSettings.materialWeight,
      powerConsumption: userFormSettings.powerConsumption,
      printDate: new Date(),
      printName: userFormSettings.printName,
      printTimeH: userFormSettings.printTimeH,
      printTimeM: userFormSettings.printTimeM,
      printWeight: userFormSettings.printWeight,
      totalCost,     
    };
  }
}
