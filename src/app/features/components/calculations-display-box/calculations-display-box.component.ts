import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { UserPrint } from 'app/shared/models/storage-data.model';

@Component({
  selector: 'app-calculations-display-box',
  imports: [CommonModule],
  templateUrl: './calculations-display-box.component.html',
  styleUrl: './calculations-display-box.component.scss'
})
export class CalculationsDisplayBoxComponent {
  readonly printList = input<UserPrint[]>([]);
  readonly clearList = output();
  readonly exportToExcel = output();
}
