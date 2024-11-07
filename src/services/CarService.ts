// src/services/CarService.ts
import { Car } from '@/types/car';
import { API_BASE_URL } from '@/config';

interface ListCarsParams {
  skip?: number;
  limit?: number;
  active_only?: boolean;
  available_only?: boolean;
  location_id?: string;
}

export class CarService {
  static async getCars(params: ListCarsParams = {}): Promise<Car[]> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/cars/cars/list?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      return response.json();
    } catch (error) {
      console.error('CarService.getCars error:', error);
      throw error;
    }
  }

  static async getCar(id: string): Promise<Car> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/cars/${id}`);
      if (!response.ok) throw new Error('Failed to fetch car');
      return response.json();
    } catch (error) {
      console.error('CarService.getCar error:', error);
      throw error;
    }
  }

  static async createCar(car: Omit<Car, 'id' | 'created_at' | 'updated_at'>): Promise<Car> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error('Failed to create car');
      return response.json();
    } catch (error) {
      console.error('CarService.createCar error:', error);
      throw error;
    }
  }

  static async updateCar(id: string, car: Omit<Car, 'id' | 'created_at' | 'updated_at'>): Promise<Car> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error('Failed to update car');
      return response.json();
    } catch (error) {
      console.error('CarService.updateCar error:', error);
      throw error;
    }
  }

  static async deleteCar(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete car');
    } catch (error) {
      console.error('CarService.deleteCar error:', error);
      throw error;
    }
  }
}