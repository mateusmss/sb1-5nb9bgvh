import { Customer } from '../types';

export interface CSVParseResult {
  success: boolean;
  data?: Omit<Customer, 'id'>[];
  error?: string;
}

export const parseCSVData = (csvText: string): CSVParseResult => {
  try {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      return {
        success: false,
        error: 'CSV file must contain a header row and at least one data row'
      };
    }

    const header = lines[0].split(',').map(col => col.trim().toLowerCase());
    const nameIndex = header.findIndex(col => col.includes('name'));
    const entryIndex = header.findIndex(col => col.includes('entry'));
    const exitIndex = header.findIndex(col => col.includes('exit'));
    const segmentIndex = header.findIndex(col => col.includes('segment'));
    const tierIndex = header.findIndex(col => col.includes('tier'));

    if (nameIndex === -1 || entryIndex === -1) {
      return {
        success: false,
        error: 'CSV must contain columns for customer name and entry date'
      };
    }

    const data = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const columns = line.split(',').map(col => col.trim());
        
        const entryDate = new Date(columns[entryIndex]);
        const exitDateStr = exitIndex !== -1 ? columns[exitIndex] : '';
        const exitDate = exitDateStr ? new Date(exitDateStr) : null;
        const segment = segmentIndex !== -1 ? columns[segmentIndex] : undefined;
        const tier = tierIndex !== -1 ? columns[tierIndex] : undefined;

        if (isNaN(entryDate.getTime())) {
          throw new Error(`Invalid entry date: ${columns[entryIndex]}`);
        }

        if (exitDate && isNaN(exitDate.getTime())) {
          throw new Error(`Invalid exit date: ${columns[exitIndex]}`);
        }

        if (exitDate && exitDate < entryDate) {
          throw new Error('Exit date cannot be earlier than entry date');
        }

        return {
          name: columns[nameIndex],
          entryDate,
          exitDate,
          segment,
          tier
        };
      });

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse CSV data'
    };
  }
}