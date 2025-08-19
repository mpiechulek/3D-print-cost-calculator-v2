import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defaultFormData } from '@shared/data/default-form-data';
import { UserFormSettings } from '@shared/models/storage-data.model';

@Component({
  selector: 'app-caclulation-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './caclulation-form.component.html',
  styleUrls: ['./caclulation-form.component.scss'],  
  standalone: true,
})
export class CaclulationFormComponent {
  @Input() userFormSetting!:UserFormSettings;
  @Output() currenUserFormSetting = new EventEmitter<UserFormSettings>();
  protected calculationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calculationForm = this.fb.group({
      printName: [this.userFormSetting?.printName, Validators.required],
      currency: [this.userFormSetting?.currency, Validators.required],
      materialName: [this.userFormSetting?.materialName, Validators.required],
      materialPrice: [
        this.userFormSetting?.materialPrice,
        [Validators.required, Validators.min(0)],
      ],
      materialWeight: [
        this.userFormSetting?.materialWeight,
        [Validators.required, Validators.min(0)],
      ],
      printWeight: [
        this.userFormSetting?.printWeight,
        [Validators.required, Validators.min(0)],
      ],
      powerConsumption: [
        this.userFormSetting?.powerConsumption,
        [Validators.required, Validators.min(0)],
      ],
      kwhCost: [
        this.userFormSetting?.kwhCost,
        [Validators.required, Validators.min(0)],
      ],
      printTimeH: [
        this.userFormSetting?.printTimeH,
        [Validators.required, Validators.min(0)],
      ],
      printTimeM: [
        this.userFormSetting?.printTimeM,
        [Validators.required, Validators.min(0)],
      ],
      laborHourCost: [
        this.userFormSetting?.laborHourCost,
        [Validators.required, Validators.min(0)],
      ],
      laborHours: [
        this.userFormSetting?.laborHours,
        [Validators.required, Validators.min(0)],
      ],
      machineDepreciation: [
        this.userFormSetting?.machineDepreciation,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  /**
   * Handles the form submission.
   * Validates the form and logs the submitted data.
   */
  onSubmit(): void {
    if (this.calculationForm.valid) {
      const formData = this.calculationForm.value;
      this.currenUserFormSetting.emit(formData);
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Clears the form and resets all fields to their initial values.
   */
  onClearForm(): void {
    this.calculationForm.reset(defaultFormData);
    this.currenUserFormSetting.emit(defaultFormData);
  }
}
