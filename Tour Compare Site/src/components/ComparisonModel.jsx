import React from 'react';
import { X, Check, Star } from 'lucide-react';

const ComparisonModal = ({ 
  packages, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Package Comparison</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {packages.length < 2 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">
                Please select at least 2 packages to compare.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b border-gray-200"></th>
                    {packages.map((pkg) => (
                      <th key={pkg.id} className="p-2 border-b border-gray-200 min-w-[200px]">
                        <div>
                          <img 
                            src={pkg.image} 
                            alt={pkg.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Price</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        <span className="font-bold text-lg text-primary">₹{pkg.price}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Rating</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{pkg.rating.toFixed(1)}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Food & Accommodation</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        {pkg.features.foodAndAccommodation ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Travel Guide</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        {pkg.features.travelGuide ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Transportation</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        {pkg.features.transportation ? (
                          <Check className="mx-auto w-5 h-5 text-green-500" />
                        ) : (
                          <X className="mx-auto w-5 h-5 text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Duration</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        {pkg.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-b border-gray-200 font-medium">Destination</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-b border-gray-200 text-center">
                        {pkg.destination}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-2 border-gray-200 font-medium">Description</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 border-gray-200 text-center">
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
