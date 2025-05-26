import React from 'react';
import { Star, MapPin, Check, X } from 'lucide-react';

const PackageCard = ({ 
  pkg, 
  onSelect, 
  isSelected, 
  className = "",
  showSelectButton = false
}) => {
  return (
    <div className={`overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 ${isSelected ? "ring-2 ring-primary" : ""} ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <div className="bg-white/80 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full">
            {pkg.duration}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-primary/90 backdrop-blur-md text-white text-sm font-medium px-3 py-1 rounded-full">
          ₹{pkg.price.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold line-clamp-1">{pkg.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{pkg.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{pkg.destination}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Feature 
            title="Food & Stay" 
            available={pkg.features.foodAndAccommodation} 
          />
          <Feature 
            title="Guide" 
            available={pkg.features.travelGuide} 
          />
          <Feature 
            title="Transport" 
            available={pkg.features.transportation} 
          />
        </div>
        
        {showSelectButton && (
          <div className="mt-4">
            <button 
              className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${isSelected 
                ? "bg-primary text-white" 
                : "border border-gray-300 hover:bg-gray-100"}`}
              onClick={onSelect}
            >
              {isSelected ? "Selected" : "Select for Comparison"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Feature = ({ title, available }) => (
  <div className="flex flex-col items-center text-center p-1 rounded-md bg-gray-100">
    <div className="mb-1">
      {available ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
    </div>
    <span className="text-xs font-medium">{title}</span>
  </div>
);

export default PackageCard;