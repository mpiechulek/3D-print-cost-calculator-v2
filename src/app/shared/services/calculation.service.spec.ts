import { TestBed } from '@angular/core/testing';

import { CalculationService } from '../services/calculation.service';
import {
  userFormSettingsMock,
  userPrintCalculationMock,
} from '@shared/data/test-mock-data';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CalculationService] });
    service = TestBed.inject(CalculationService);
    jest.clearAllMocks();
  });

  it('should be created CalculationService', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the cost based on the input object', () => {
    jest
      .spyOn(service, 'calculateCost')
      .mockReturnValue(userPrintCalculationMock);
    const result = service.calculateCost(userFormSettingsMock);
    expect(result).toMatchObject(userFormSettingsMock);
  });
});
