// src/components/CustomerTest.tsx
import { useEffect } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import { CustomerService } from '@/services/CustomerService';
import CustomerCard from '@/components/customer/customer-card';
import CustomerStats from '@/components/customer/customer-stats';
import { Badge } from '@/components/ui/badge';  // Lade till denna import

function CustomerTest() {
  const { state, dispatch } = useCustomer();

  useEffect(() => {
    async function fetchCustomers() {
      dispatch({ type: 'FETCH_START' });
      try {
        const customers = await CustomerService.getCustomers();
        dispatch({ type: 'FETCH_SUCCESS', payload: customers });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch customers' });
      }
    }

    fetchCustomers();
  }, [dispatch]);

  if (state.loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-muted-foreground">Loading customers...</div>
    </div>
  );

  if (state.error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-destructive">Error: {state.error}</div>
    </div>
  );

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor your customer base
        </p>
      </div>

      <CustomerStats />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Customer List</h2>
          <Badge variant="secondary">
            {state.customers.length} total customers
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.customers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerTest;