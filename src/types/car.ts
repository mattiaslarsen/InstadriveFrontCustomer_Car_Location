// src/types/car.ts
export interface Car {
  id: string;
  license_plate: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  features: Record<string, unknown>;
  maintenance_history: unknown[];
  location_id?: string;
  is_active: boolean;
  is_available: boolean;
  created_at: string;
  updated_at?: string;
}