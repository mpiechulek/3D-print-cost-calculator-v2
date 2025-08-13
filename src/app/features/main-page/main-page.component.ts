import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { CaclulationFormComponent } from '../components/caclulation-form/caclulation-form.component';
import { CalculationsDisplayBoxComponent } from '../components/calculations-display-box/calculations-display-box.component';
import { HeaderComponent } from '../components/header/header.component';

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
export class MainPageComponent {}
