// src/services/customerService.ts
import { Customer, ImportResult } from '@/types/customer';
import { API_BASE_URL } from '@/config';

export class CustomerService {
  static async getCustomers(): Promise<Customer[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/list`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return response.json();
    } catch (error) {
      console.error('CustomerService.getCustomers error:', error);
      throw error;
    }
  }

  static async importCustomers(file: File): Promise<ImportResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/customers/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to import customers');
      return response.json();
    } catch (error) {
      console.error('CustomerService.importCustomers error:', error);
      throw error;
    }
  }
}