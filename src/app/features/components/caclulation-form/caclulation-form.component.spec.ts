import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaclulationFormComponent } from './caclulation-form.component';

describe('CaclulationFormComponent', () => {
  let component: CaclulationFormComponent;
  let fixture: ComponentFixture<CaclulationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaclulationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaclulationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
