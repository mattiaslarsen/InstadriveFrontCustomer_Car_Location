// src/components/car/car-test/CarTest.tsx
import { useEffect } from 'react';
import { useCar } from '@/context/CarContext';
import { CarService } from '@/services/CarService';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function CarTest() {
  const { state, dispatch } = useCar();

  useEffect(() => {
    async function fetchCars() {
      dispatch({ type: 'FETCH_START' });
      try {
        const cars = await CarService.getCars();
        dispatch({ type: 'FETCH_SUCCESS', payload: cars });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch cars' });
      }
    }

    fetchCars();
  }, [dispatch]);

  if (state.loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-muted-foreground">Loading cars...</div>
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
        <h1 className="text-3xl font-bold tracking-tight">Car Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor your car fleet
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state.cars.map(car => (
          <Card key={car.id} className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{car.make} {car.model}</h3>
                  <p className="text-sm text-muted-foreground">{car.license_plate}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={car.is_available ? "success" : "secondary"}>
                    {car.is_available ? "Available" : "Unavailable"}
                  </Badge>
                  <Badge variant={car.is_active ? "default" : "destructive"}>
                    {car.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>VIN: {car.vin}</p>
                <p>Year: {car.year}</p>
                {car.location_id && <p>Location ID: {car.location_id}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CarTest;