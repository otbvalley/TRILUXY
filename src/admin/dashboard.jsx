import React from 'react';
import UploadCars from './components/uploadCars';
import FetchCars from './components/fetchCars';
import PostMealForm from './components/mealForm';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-semibold text-center text-sky-600 mb-8 animate__fadeIn">
        Triluxy Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Cars Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate__fadeIn">
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">
            Upload Cars For Rent
          </h2>
          <UploadCars />
        </div>

        {/* Fetch Cars Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate__fadeIn">
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">
            Cars Currently Available
          </h2>
          <FetchCars />
        </div>
      </div>

      {/* Meal form */}
      <div className="bg-white mt-8 p-6 rounded-lg shadow-lg animate__fadeIn">
        <h2 className="text-2xl font-semibold text-sky-600 mb-4">
          Post a Meal
        </h2>
        <PostMealForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
