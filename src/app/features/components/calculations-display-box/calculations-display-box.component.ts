import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { UserPrint } from '@shared/models/storage-data.model';

@Component({
  selector: 'app-calculations-display-box',
  imports: [CommonModule],
  templateUrl: './calculations-display-box.component.html',
  styleUrl: './calculations-display-box.component.scss',
})
export class CalculationsDisplayBoxComponent {
  @Input() printList: UserPrint[] = [];
  @Output() clearList = new EventEmitter<void>();
  @Output() exportToExcel = new EventEmitter<void>();
}
