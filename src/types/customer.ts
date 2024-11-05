// src/types/customer.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  verified: boolean;
  preferences: Record<string, unknown>;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}

export interface ImportResult {
  successful: number;
  failed: { [key: string]: string }[];
  total: number;
}
