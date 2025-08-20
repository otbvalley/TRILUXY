import React, { useEffect, useState } from 'react';

const FetchCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCars = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/cars');
      if (!res.ok) throw new Error('Failed to fetch cars');
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await fetch(`http://localhost:5000/api/auth/cars/${id}`, { method: "DELETE" });
        setCars(cars.filter(car => car._id !== id));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow rounded">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th>Image</th>
            <th>Make & Model</th>
            <th>Year</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Seats</th>
            <th>Luggage</th>
            <th>Fuel</th>
            <th>Transmission</th>
            <th>Mileage Limit</th>
            <th>Price/day</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-t">
              <td>
                <img
                  src={`http://localhost:5000/${car.carImage}`}
                  alt={`${car.make} ${car.model}`}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td>{car.make} {car.model}</td>
              <td>{car.year}</td>
              <td>{car.location?.pickup}</td>
              <td>{car.location?.dropoff}</td>
              <td>{car.seats}</td>
              <td>{car.luggageCapacity} bags</td>
              <td>{car.fuelType}</td>
              <td>{car.transmission}</td>
              <td>{car.mileageLimitPerDay} km/day</td>
              <td>{car.pricePerDay} {car.currency}</td>
              <td>{car.booked ? 'Booked' : 'Available'}</td>
              <td>
                {car.paymentStatus === 'paid' ? '✅ Paid' : 
                 car.paymentStatus === 'pending' ? '⌛ Pending' : 
                 '❌ Failed'}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchCars;
