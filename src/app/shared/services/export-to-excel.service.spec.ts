import { TestBed } from '@angular/core/testing';
import { saveAs } from 'file-saver';
import type { Mock } from 'jest-mock';
import * as ExcelJS from 'exceljs';

import { ExportToExcelService } from './export-to-excel.service';


describe('ExportToExcelService', () => {
  let service: ExportToExcelService;
  let workbookMock: jest.Mock<any, any, any>;
  
  workbookMock = jest.fn().mockReturnValue({
     addWorksheet: jest.fn().mockReturnValue({
       addRow: jest.fn()
     }),
     xlsx: {
       writeBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0))
     }
   });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportToExcelService);
  });

  it('should be created ExportToExcelService', () => {
    expect(service).toBeTruthy();
  });

  it('should call transformHeader and input text testHeader transform to Test Header', () => {
    jest.spyOn(service, 'transformHeader');
    const result = service.transformHeader('testHeader');
    expect(result).toBe('Test Header');
  });
});
