import { Component, inject, OnInit, signal } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-main-page',
  imports: [
    FooterComponent,
    HeaderComponent,
    CaclulationFormComponent,
    CalculationsDisplayBoxComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  storageService = inject(StorageService);
  readonly storageKeys = StorageKeys;
  protected printList = signal<UserPrint[]>([]);
  protected userFormSetting = signal<UserFormSettings>(defaultFormData);

  ngOnInit(): void {
    this.storageService.setKeysInLocalStorage();

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
   * @param userFormSettings 
   */
  onCalculate(userFormSettings: UserFormSettings): void {   
    this.storageService.setItem(
      this.storageKeys.USER_SETTINGS_KEY,
      userFormSettings
    ); 

    // Triger calcualtion service here 
    // result save ti storage
  //   this.storageService.updatePrintList({
  // })
  }
}
