import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationsDisplayBoxComponent } from './calculations-display-box.component';

describe('CalculationsDisplayBoxComponent', () => {
  let component: CalculationsDisplayBoxComponent;
  let fixture: ComponentFixture<CalculationsDisplayBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationsDisplayBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationsDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
