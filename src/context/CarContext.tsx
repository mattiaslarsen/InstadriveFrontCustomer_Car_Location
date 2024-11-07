// src/context/CarContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { Car } from '@/types/car';

interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  filters: {
    available_only: boolean;
    location_id?: string;
  };
}

type CarAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Car[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<CarState['filters']> }
  | { type: 'ADD_CAR'; payload: Car }
  | { type: 'UPDATE_CAR'; payload: Car }
  | { type: 'DELETE_CAR'; payload: string };

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
  filters: {
    available_only: false
  }
};

const CarContext = createContext<{
  state: CarState;
  dispatch: React.Dispatch<CarAction>;
} | undefined>(undefined);

function carReducer(state: CarState, action: CarAction): CarState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cars: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload }
      };
    case 'ADD_CAR':
      return {
        ...state,
        cars: [...state.cars, action.payload]
      };
    case 'UPDATE_CAR':
      return {
        ...state,
        cars: state.cars.map(car => 
          car.id === action.payload.id ? action.payload : car
        )
      };
    case 'DELETE_CAR':
      return {
        ...state,
        cars: state.cars.filter(car => car.id !== action.payload)
      };
    default:
      return state;
  }
}

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(carReducer, initialState);
  return (
    <CarContext.Provider value={{ state, dispatch }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCar() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
}