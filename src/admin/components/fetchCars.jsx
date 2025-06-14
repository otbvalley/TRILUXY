import React, { useEffect, useState } from 'react';

const FetchCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching car data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://triluxy-backend-1.onrender.com/api/auth/get-cars'); // Adjust the API URL accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-sky-500">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-sky-50">
      <h1 className="text-3xl font-semibold text-center text-sky-600 mb-6">Available Cars</h1>

      {/* Table to display car data */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-sky-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Car Image</th>
              <th className="px-4 py-2 text-left">Make & Model</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Price per Day</th>
              <th className="px-4 py-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="border-t hover:bg-sky-100">
                <td className="px-4 py-2">
                  <img
                    src={car ? car.carImage : 'https://via.placeholder.com/40'}
                    alt={car.model}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{car.make} {car.model}</td>
                <td className="px-4 py-2">{car.year}</td>
                <td className="px-4 py-2">{car.location}</td>
                <td className="px-4 py-2">${car.pricePerDay}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full ${car.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {car.available ? 'Available' : 'Not Available'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchCars;
