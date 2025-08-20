import React from 'react';
import UploadCars from './components/uploadCars';
import FetchCars from './components/fetchCars';
import PostMealForm from './components/mealForm'; // ✅ Keeping the meal import

const AdminDashboard = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-sky-600 mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      {/* Responsive Grid for Cars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Add New Car */}
        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <h2 className="text-xl sm:text-2xl mb-4 text-sky-600">Add New Car</h2>
          <UploadCars />
        </div>

        {/* Manage Cars */}
        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <h2 className="text-xl sm:text-2xl mb-4 text-sky-600">Manage Cars</h2>
          <FetchCars />
        </div>
      </div>

      {/* Manage Meals Section - Full width on all devices */}
      <div className="bg-white p-4 sm:p-6 rounded shadow mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl mb-4 text-sky-600">Manage Meals</h2>
        <PostMealForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
