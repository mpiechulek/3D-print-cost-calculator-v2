import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { UserPrint } from '../models/storage-data.model';

@Injectable({
  providedIn: 'root',
})
export class ExportToExcelService {
  
  generateExcel(data: UserPrint[], fileName: string): void {
    if (!data || data.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add headers as the first column
    const headers = Object.keys(data[0]) as (keyof UserPrint)[];
    const headerRow = ['Header', ...data.map((_, i) => `Value ${i + 1}`)];
    worksheet.addRow(headerRow);

    // Add each property as a row: first cell is header, next cells are values for each object
    headers.forEach((header) => {
      const row = [
        this.transformHeader(header),
        ...data.map((item) => item[header]),
      ];
      worksheet.addRow(row);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  /**
   *
   * @param key
   * @returns
   */
  transformHeader(key: string): string {
    // Split by camelCase and underscores
    const parts = key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase() // Convert to lowercase
      .trim(); // Remove leading/trailing spaces

    // Capitalize first letter of each word
    return parts
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
