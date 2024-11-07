import { CustomerProvider } from './context/CustomerContext';
import CustomerTest from '@/components/customer/customer-test';
import './App.css';

function App() {
  return (
    <CustomerProvider>
      <div className="container">
        <h1>Customer Management</h1>
        <CustomerTest />
      </div>
    </CustomerProvider>
  );
}

export default App;