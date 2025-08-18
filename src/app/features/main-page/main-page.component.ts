import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { CaclulationFormComponent } from '../components/caclulation-form/caclulation-form.component';
import { CalculationsDisplayBoxComponent } from '../components/calculations-display-box/calculations-display-box.component';
import { HeaderComponent } from '../components/header/header.component';
import { StorageService } from 'app/shared/services/sorage.service';
import { StorageKeys } from 'app/shared/models/storage-keys.enum';
import {
  UserFormSettings,
  UserPrint,
} from 'app/shared/models/storage-data.model';
import { defaultFormData } from 'app/shared/data/default-form-data';
import { CalculationService } from 'app/shared/services/calculation.service';
import { CommonModule } from '@angular/common';
import { ExportToExcelService } from 'app/shared/services/export-to-excel.service';

@Component({
  standalone: true,
  selector: 'app-main-page',
  imports: [
    FooterComponent,
    HeaderComponent,
    CaclulationFormComponent,
    CalculationsDisplayBoxComponent,
    CommonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  storageService = inject(StorageService);
  calculationService = inject(CalculationService);
  exportToExcelService = inject(ExportToExcelService);
  readonly storageKeys = StorageKeys;
  protected printList = signal<UserPrint[]>([]);
  protected userFormSetting = signal<UserFormSettings>(defaultFormData);

  constructor() {
    this.storageService.setKeysInLocalStorage();
    this.updateData();
  }

  /**
   *
   * @param userFormSettings
   */
  onCalculate(userFormSettings: UserFormSettings): void {
    this.storageService.setItem(
      this.storageKeys.USER_SETTINGS_KEY,
      userFormSettings
    );
    this.storageService.updatePrintList(
      this.calculationService.calculateCost(userFormSettings)
    );

    this.updateData();
  }

  /**
   * Updates the print list and user form settings from local storage.
   */
  updateData(): void {
    const userSettings = this.storageService.getItem<UserFormSettings>(
      this.storageKeys.USER_SETTINGS_KEY
    );
    const printList = this.storageService.getItem<UserPrint[]>(
      this.storageKeys.USER_PRINT_LIST_KEY
    );

    if (printList) this.printList.set(printList);
    if (userSettings) this.userFormSetting.set(userSettings);
  }

  /**
   *
   */
  onClearList(): void {
    this.storageService.clearPrintList();
    this.updateData();
  }

  /**
   * Exports the current print list to an Excel file.
   */
  exportToExcel(): void {
    this.exportToExcelService.generateExcel(this.printList(), 'Print List');
  }
}
