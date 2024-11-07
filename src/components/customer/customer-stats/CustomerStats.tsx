// src/components/customer/CustomerStats/CustomerStats.tsx
import { useCustomer } from '@/context/CustomerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';  // Nu kommer denna import fungera
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const CustomerStats = () => {
  const { state } = useCustomer();
  const { customers } = state;

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.is_active).length,
    verified: customers.filter(c => c.verified).length,
    recentLogin: customers.filter(c => {
      if (!c.last_login) return false;
      const lastLogin = new Date(c.last_login);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastLogin > thirtyDaysAgo;
    }).length
  };

  const getPercentage = (value: number) => {
    return ((value / stats.total) * 100).toFixed(0);
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <Badge variant="default" className="mt-2">Base metric</Badge>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          <UserCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.active}</div>
          <Badge variant="success" className="mt-2">{getPercentage(stats.active)}% of total</Badge>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Customers</CardTitle>
          <UserX className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.verified}</div>
          <Badge variant="secondary" className="mt-2">{getPercentage(stats.verified)}% verified</Badge>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-destructive">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Logins</CardTitle>
          <Clock className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentLogin}</div>
          <Badge variant="destructive" className="mt-2">{getPercentage(stats.recentLogin)}% active</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;