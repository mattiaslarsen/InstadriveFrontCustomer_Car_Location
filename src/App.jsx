// src/App.tsx
import { CustomerProvider } from './context/CustomerContext';
import { CarProvider } from './context/CarContext';
import CustomerTest from '@/components/customer/customer-test';
import CarTest from '@/components/car/car-test';
import './App.css';

function App() {
  return (
    <>
      <CustomerProvider>
        <div className="container mb-12">
          <h1>Customer Management</h1>
          <CustomerTest />
        </div>
      </CustomerProvider>

      <CarProvider>
        <div className="container">
          <h1>Car Management</h1>
          <CarTest />
        </div>
      </CarProvider>
    </>
  );
}

export default App;