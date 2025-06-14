import React, { useState } from 'react';
import axios from 'axios';

function UploadCars() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerDay, setPrice] = useState('');
  const [carImage, setCarImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setCarImage(selectedFile);

    const fileURL = URL.createObjectURL(selectedFile);
    setImagePreview(fileURL);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    if (!make || !model || !year || !location || !pricePerDay || !carImage) {
      alert('Please fill all fields and upload an image.');
      return;
    }
  
    const formdata = new FormData();
    formdata.append('car', carImage);  // Changed 'carImage' to 'car' to match multer's field name
    formdata.append('make', make);
    formdata.append('model', model);
    formdata.append('year', year);
    formdata.append('pricePerDay', pricePerDay);
    formdata.append('location', location);
  
    try {
      const response = await axios.post('https://triluxy-backend-1.onrender.com/api/auth/add-car', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log('Error uploading car:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-sky-600 mb-6 animate__fadeIn">
        Upload a New Car
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Make</label>
          <input
            type="text"
            value={make}
            onChange={(event) => setMake(event.target.value)}
            placeholder="Enter car make"
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Car Image</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 max-w-xs rounded-md transition-all duration-300 ease-in-out transform hover:scale-110"
            />
          )}
        </div>

        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Car Model</label>
          <input
            type="text"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            placeholder="Enter car model"
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Year</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="Enter production year"
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Car Location</label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city location"
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="animate__fadeIn">
          <label className="block text-lg text-sky-600 font-medium mb-2">Car Booking Price</label>
          <input
            type="number"
            value={pricePerDay}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Enter booking price"
            className="w-full p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="col-span-2 text-center animate__fadeIn">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadCars;
