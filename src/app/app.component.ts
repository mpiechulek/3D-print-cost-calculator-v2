import { Component } from '@angular/core';
import { MainPageComponent } from './features/main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '3D-print-calc-v2';
}
