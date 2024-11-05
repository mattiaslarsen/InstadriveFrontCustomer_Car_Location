// src/context/CustomerContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { Customer, ImportResult } from '@/types/customer';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  importResult: ImportResult | null;
}

type CustomerAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Customer[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'IMPORT_SUCCESS'; payload: ImportResult }
  | { type: 'IMPORT_ERROR'; payload: string };

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
  importResult: null,
};

const CustomerContext = createContext<{
  state: CustomerState;
  dispatch: React.Dispatch<CustomerAction>;
} | undefined>(undefined);

function customerReducer(state: CustomerState, action: CustomerAction): CustomerState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, customers: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'IMPORT_SUCCESS':
      return { ...state, importResult: action.payload };
    case 'IMPORT_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  return (
    <CustomerContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}