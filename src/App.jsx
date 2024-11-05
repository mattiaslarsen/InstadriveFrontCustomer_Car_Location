import { CustomerProvider } from './context/CustomerContext';
import CustomerTest from './components/CustomerTest';
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