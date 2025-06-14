import React, { useState, useEffect } from "react";

const PostMealForm = () => {
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealType, setMealType] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [bookedCount, setBookedCount] = useState("");
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [error, setError] = useState("");
  const [meals, setMeals] = useState([]);

  // Fetch all meals
  const fetchMeals = async () => {
    try {
      const response = await fetch("https://triluxy-backend-1.onrender.com/api/auth/get-meal");
      const data = await response.json();
      setMeals(data);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  // Handle image selection and enforce 4 images
  const handleImageChange = (e, index) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setImages((prevImages) => ({
        ...prevImages,
        [`image${index}`]: file,
      }));
      setError(""); // Clear error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all four images are selected
    if (!images.image1 || !images.image2 || !images.image3 || !images.image4) {
      setError("Please select exactly 4 images.");
      return;
    }

    const formData = new FormData();
    formData.append("meal_name", mealName);
    formData.append("meal_description", mealDescription);
    formData.append("meal_type", mealType);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("booked_count", bookedCount);

    // Append all images as an array under the same 'images' field
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append("images", images[key]); // Use the same 'images' key for all files
      }
    });

    try {
      const response = await fetch("https://triluxy-backend-1.onrender.com/api/auth/add-meal", {
        method: "POST",
        body: formData, // Send FormData as the body
      });

      if (!response.ok) {
        throw new Error("Failed to post meal");
      }

      alert("Meal posted successfully");
      // Reset form after success
      setMealName("");
      setMealDescription("");
      setMealType("");
      setPrice("");
      setDiscount("");
      setBookedCount("");
      setImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });

      // Re-fetch the meals after posting
      fetchMeals();
    } catch (err) {
      console.error("Error posting meal:", err);
      alert("Error posting meal. Please try again.");
    }
  };

  // Delete meal by ID
  const deleteMeal = async (id) => {
    try {
      const response = await fetch(`https://triluxy-backend-1.onrender.com/api/auth/delete-meal/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }

      alert("Meal deleted successfully");
      fetchMeals(); // Re-fetch meals after deletion
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Error deleting meal. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch all meals when the component mounts
    fetchMeals();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 min-h-screen bg-gray-100 space-y-6 md:space-y-0">
      {/* Post Meal Form Section */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center text-sky-600 mb-8">Post a New Meal</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Name:</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Description:</label>
            <textarea
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Type:</label>
            <input
              type="text"
              value={mealType}
              placeholder="Food/Drink"
              onChange={(e) => setMealType(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discount:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Booked Count:</label>
            <input
              type="number"
              value={bookedCount}
              onChange={(e) => setBookedCount(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Uploads */}
          {[1, 2, 3, 4].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">Upload Image {index}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Post Meal
            </button>
          </div>
        </form>
      </div>

      {/* Meal List Section */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-center text-sky-600 mb-8">Meals List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Meal Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">{meal.meal_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{meal.price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => deleteMeal(meal._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostMealForm;
