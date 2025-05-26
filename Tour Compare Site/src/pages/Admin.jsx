import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePackages } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const { packages, addPackage, deletePackage } = usePackages();
  const [activeTab, setActiveTab] = useState('add');
  
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    price: 999,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
    description: '',
    duration: '7 days',
    rating: 4.5,
    foodAndAccommodation: 'yes',
    travelGuide: 'yes',
    transportation: 'yes',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRangeChange = (e) => {
    setFormData({
      ...formData,
      rating: parseFloat(e.target.value)
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.destination || formData.destination.length < 2) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!formData.price || formData.price < 1) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.image || !formData.image.startsWith('http')) {
      newErrors.image = 'Valid image URL is required';
    }
    
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new package object
    const newPackage = {
      id: uuidv4(),
      name: formData.name,
      destination: formData.destination,
      price: parseInt(formData.price),
      image: formData.image,
      description: formData.description,
      duration: formData.duration,
      rating: formData.rating,
      features: {
        foodAndAccommodation: formData.foodAndAccommodation === 'yes',
        travelGuide: formData.travelGuide === 'yes',
        transportation: formData.transportation === 'yes',
      },
      createdAt: new Date(),
    };
    
    // Simulate API delay
    setTimeout(() => {
      addPackage(newPackage);
      
      // Show success message
      alert('Package added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        destination: '',
        price: 999,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
        description: '',
        duration: '7 days',
        rating: 4.5,
        foodAndAccommodation: 'yes',
        travelGuide: 'yes',
        transportation: 'yes',
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleDeletePackage = (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(packageId);
      alert('Package deleted successfully!');
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-2">
              Manage your travel packages and monitor performance
            </p>
            <p className="text-sm text-gray-500">
              Logged in as: {user?.name || 'Admin'}
            </p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg border overflow-hidden">
              <button 
                className={`py-3 text-center font-medium ${activeTab === 'add' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setActiveTab('add')}
              >
                Add New Package
              </button>
              <button 
                className={`py-3 text-center font-medium ${activeTab === 'manage' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setActiveTab('manage')}
              >
                Manage Packages
              </button>
            </div>
            
            {activeTab === 'add' ? (
              <div className="bg-white p-6 rounded-lg border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Bali Paradise Retreat"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Bali, Indonesia"
                      />
                      {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (RUPEES)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="7 days"
                      />
                      {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                    </div>
                    
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter a URL for the package image</p>
                      {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>
                    
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="Describe the tour package"
                      ></textarea>
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating (1-5): {formData.rating.toFixed(1)}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleRangeChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Food & Accommodation</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="foodAndAccommodation"
                              value="yes"
                              checked={formData.foodAndAccommodation === 'yes'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="foodAndAccommodation"
                              value="no"
                              checked={formData.foodAndAccommodation === 'no'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Guide</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="travelGuide"
                              value="yes"
                              checked={formData.travelGuide === 'yes'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="travelGuide"
                              value="no"
                              checked={formData.travelGuide === 'no'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="transportation"
                              value="yes"
                              checked={formData.transportation === 'yes'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="transportation"
                              value="no"
                              checked={formData.transportation === 'no'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding Package..." : "Add Package"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="group relative">
                    <PackageCard pkg={pkg} />
                    <button
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {packages.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No packages available. Add your first package!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;