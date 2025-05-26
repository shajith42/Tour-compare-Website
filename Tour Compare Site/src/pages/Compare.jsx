import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { Check, X, Star } from 'lucide-react';
import { usePackages } from '../utils/data';

const Compare = () => {
  const { packages } = usePackages();
  const [selectedPackages, setSelectedPackages] = useState([]);
  
  const togglePackageSelection = (pkg) => {
    if (selectedPackages.some(p => p.id === pkg.id)) {
      setSelectedPackages(selectedPackages.filter(p => p.id !== pkg.id));
    } else {
      if (selectedPackages.length < 2) {
        setSelectedPackages([...selectedPackages, pkg]);
      } else {
        // If already 2 selected, replace the second one
        setSelectedPackages([selectedPackages[0], pkg]);
      }
    }
  };
  
  const isPackageSelected = (pkg) => {
    return selectedPackages.some(p => p.id === pkg.id);
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Travel Packages
            </h1>
            <p className="text-gray-600">
              Select two packages to compare their features side by side.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Selection (Left Side) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Select Packages</h2>
                <p className="text-gray-500 mb-4">{selectedPackages.length} of 2 selected</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto p-1">
                  {packages.map(pkg => (
                    <div 
                      key={pkg.id} 
                      className={`relative cursor-pointer transition-all ${
                        isPackageSelected(pkg) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => togglePackageSelection(pkg)}
                    >
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        <div className="w-24 h-24">
                          <img 
                            src={pkg.image} 
                            alt={pkg.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <h3 className="font-medium text-sm line-clamp-1">{pkg.name}</h3>
                          <p className="text-xs text-gray-500 mb-1">{pkg.destination}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-semibold">₹{pkg.price}</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">{pkg.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Comparison Table (Right Side) */}
            <div className="lg:col-span-2">
              {selectedPackages.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No packages selected</h3>
                  <p className="text-gray-600">
                    Select packages from the left to start comparing.
                  </p>
                </div>
              ) : selectedPackages.length === 1 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">One package selected</h3>
                  <p className="text-gray-600">
                    Select one more package to compare.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-3">
                    <div className="p-4 bg-gray-50 border-r border-b">
                      <h3 className="font-medium">Features</h3>
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={pkg.id} className="p-4 border-b">
                        <img 
                          src={pkg.image} 
                          alt={pkg.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-semibold">{pkg.name}</h3>
                        <p className="text-sm text-gray-500">{pkg.destination}</p>
                      </div>
                    ))}
                    
                    {/* Price */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Price
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-price`} className="p-4 border-b">
                        <span className="font-bold text-lg text-primary">${pkg.price}</span>
                      </div>
                    ))}
                    
                    {/* Rating */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Rating
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-rating`} className="p-4 border-b">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{pkg.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Food & Accommodation */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Food & Accommodation
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-food`} className="p-4 border-b text-center">
                        {pkg.features.foodAndAccommodation ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </div>
                    ))}
                    
                    {/* Travel Guide */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Travel Guide
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-guide`} className="p-4 border-b text-center">
                        {pkg.features.travelGuide ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </div>
                    ))}
                    
                    {/* Transportation */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Transportation
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-transport`} className="p-4 border-b text-center">
                        {pkg.features.transportation ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </div>
                    ))}
                    
                    {/* Duration */}
                    <div className="p-4 bg-gray-50 border-r border-b font-medium">
                      Duration
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-duration`} className="p-4 border-b">
                        {pkg.duration}
                      </div>
                    ))}
                    
                    {/* Description */}
                    <div className="p-4 bg-gray-50 border-r font-medium">
                      Description
                    </div>
                    {selectedPackages.map(pkg => (
                      <div key={`${pkg.id}-desc`} className="p-4">
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Compare;