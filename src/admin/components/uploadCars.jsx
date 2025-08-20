import React, { useState } from 'react';

function UploadCars() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    transmission: 'Automatic', // default valid value
    fuelType: 'Petrol', // default valid value
    seats: '',
    luggageCapacity: '',
    locationPickup: '',
    locationDropoff: '',
    mileageLimitPerDay: '',
    pricePerDay: '',
    currency: 'USD',
    taxesAndFees: '',
    gps: '',
    childSeat: '',
    additionalDriver: '',
    description: '',
    available: true
  });

  const [carImages, setCarImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCarImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carImages.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'locationPickup') {
        data.append('location[pickup]', value);
      } else if (key === 'locationDropoff') {
        data.append('location[dropoff]', value);
      } else if (['gps', 'childSeat', 'additionalDriver'].includes(key)) {
        data.append(`extraCharges[${key}]`, value);
      } else {
        data.append(key, value);
      }
    });

    // Append images — backend expects "carImages"
    carImages.forEach(file => data.append('carImages', file));

    try {
      const res = await fetch('http://localhost:5000/api/auth/admin/add-car', {
        method: 'POST',
        body: data
      });

      if (!res.ok) throw new Error('Failed to add car');
      alert('Car added successfully!');
      setFormData({
        make: '', model: '', year: '', transmission: 'Automatic',
        fuelType: 'Petrol', seats: '', luggageCapacity: '',
        locationPickup: '', locationDropoff: '', mileageLimitPerDay: '',
        pricePerDay: '', currency: 'USD', taxesAndFees: '',
        gps: '', childSeat: '', additionalDriver: '',
        description: '', available: true
      });
      setCarImages([]);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      alert('Error uploading car.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Text & Number Inputs */}
      {[
        { name: 'make' }, { name: 'model' }, { name: 'year', type: 'number' },
        { name: 'seats', type: 'number' }, { name: 'luggageCapacity', type: 'number' },
        { name: 'locationPickup', label: 'Pickup Location' },
        { name: 'locationDropoff', label: 'Dropoff Location' },
        { name: 'mileageLimitPerDay', type: 'number' },
        { name: 'pricePerDay', type: 'number' },
        { name: 'currency' },
        { name: 'taxesAndFees', type: 'number' },
        { name: 'gps', label: 'GPS Charge', type: 'number' },
        { name: 'childSeat', label: 'Child Seat Charge', type: 'number' },
        { name: 'additionalDriver', label: 'Additional Driver Charge', type: 'number' },
        { name: 'description' }
      ].map(({ name, label, type }) => (
        <div key={name} className="col-span-1">
          <label className="block font-medium capitalize">{label || name}</label>
          <input
            type={type || 'text'}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={['make', 'model', 'year', 'pricePerDay', 'luggageCapacity', 'mileageLimitPerDay'].includes(name)}
          />
        </div>
      ))}

      {/* Transmission Dropdown */}
      <div className="col-span-1">
        <label className="block font-medium">Transmission</label>
        <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Fuel Type Dropdown */}
      <div className="col-span-1">
        <label className="block font-medium">Fuel Type</label>
        <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="col-span-1">
        <label className="block font-medium">Car Images</label>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt="Preview" className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      {/* Availability Checkbox */}
      <div className="flex items-center col-span-1">
        <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        <label className="ml-2">Available</label>
      </div>

      {/* Submit */}
      <div className="col-span-2">
        <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
          Submit
        </button>
      </div>
    </form>
  );
}

export default UploadCars;
